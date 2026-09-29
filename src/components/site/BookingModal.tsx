import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  Clock,
  Loader2,
  Phone,
  Sparkles,
  X,
} from "lucide-react";
import { ALL_BOOKABLE, SALON, TIME_SLOTS, formatINR } from "@/data/salon";
import { createBooking, type BookingResult } from "@/lib/booking-api";
import { useBooking } from "./booking-context";
import { cn } from "@/lib/utils";

const STEPS = ["Service", "Date", "Time", "Details", "Confirm"];

type Details = { fullName: string; phone: string; email: string; notes: string };
type Errors = Partial<Record<keyof Details, string>>;

function nextDays(count: number) {
  const out: Date[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    out.push(d);
  }
  return out;
}

function toISO(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function prettyDate(iso: string) {
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function BookingModal() {
  const { open, closeBooking, preselected } = useBooking();

  const [step, setStep] = useState(0);
  const [selectionId, setSelectionId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [details, setDetails] = useState<Details>({ fullName: "", phone: "", email: "", notes: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [result, setResult] = useState<BookingResult | null>(null);

  const days = useMemo(() => nextDays(21), []);
  const selection = ALL_BOOKABLE.find((s) => s.id === selectionId) ?? null;

  useEffect(() => {
    if (!open) return;
    setStep(preselected ? 1 : 0);
    setSelectionId(preselected ?? null);
    setQuery("");
    setDate(null);
    setTime(null);
    setErrors({});
    setSubmitError(null);
    setResult(null);
    setSubmitting(false);
  }, [open, preselected]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeBooking();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, closeBooking]);

  const grouped = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q
      ? ALL_BOOKABLE.filter(
          (s) => s.label.toLowerCase().includes(q) || s.group.toLowerCase().includes(q),
        )
      : ALL_BOOKABLE;
    return list.reduce<Record<string, typeof ALL_BOOKABLE>>((acc, item) => {
      (acc[item.group] ??= []).push(item);
      return acc;
    }, {});
  }, [query]);

  function validateDetails() {
    const next: Errors = {};
    if (details.fullName.trim().length < 2) next.fullName = "Please enter your full name.";
    if (!/^[0-9+\s-]{10,15}$/.test(details.phone.trim()))
      next.phone = "Enter a valid phone number (at least 10 digits).";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(details.email.trim()))
      next.email = "Enter a valid email address.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  const canAdvance =
    (step === 0 && !!selectionId) ||
    (step === 1 && !!date) ||
    (step === 2 && !!time) ||
    step === 3 ||
    step === 4;

  function goNext() {
    if (step === 3 && !validateDetails()) return;
    setStep((s) => Math.min(4, s + 1));
  }

  async function confirm() {
    if (!selection || !date || !time) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await createBooking({
        selectionId: selection.id,
        selectionLabel: selection.label,
        selectionGroup: selection.group,
        price: selection.price,
        date,
        time,
        fullName: details.fullName.trim(),
        phone: details.phone.trim(),
        email: details.email.trim(),
        notes: details.notes.trim() || undefined,
      });
      setResult(res);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown Supabase error";
      console.error("Booking submission failed:", error);
      setSubmitError(`We couldn't save the booking. ${message}`);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-primary/60 p-4 backdrop-blur-lg sm:items-center sm:p-6"
          onClick={closeBooking}
          role="dialog"
          aria-modal="true"
          aria-label="Book an appointment"
        >
          <motion.div
            initial={{ opacity: 0, y: 40, rotateX: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{ perspective: 1400 }}
            className="glass-panel relative my-auto w-full max-w-3xl overflow-hidden rounded-[1.8rem] bg-card/95 shadow-float"
          >
            <button
              type="button"
              aria-label="Close booking"
              onClick={closeBooking}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-card/85 text-primary shadow-soft"
            >
              <X className="h-4 w-4" />
            </button>

            {result ? (
              <SuccessScreen
                result={result}
                selectionLabel={selection?.label ?? ""}
                date={date!}
                time={time!}
                onClose={closeBooking}
              />
            ) : (
              <div className="p-6 sm:p-9">
                <p className="eyebrow">Book an appointment</p>
                <h2 className="mt-3 font-display text-3xl text-primary">
                  {STEPS[step] === "Confirm" ? "Review your visit" : `Step ${step + 1} — ${STEPS[step]}`}
                </h2>

                {/* Progress */}
                <ol className="mt-6 flex items-center gap-2">
                  {STEPS.map((label, i) => (
                    <li key={label} className="flex flex-1 items-center gap-2">
                      <span
                        className={cn(
                          "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[0.65rem] font-medium transition-all duration-400",
                          i < step && "bg-accent text-accent-foreground",
                          i === step && "bg-wine-gradient text-primary-foreground shadow-lift",
                          i > step && "bg-muted text-muted-foreground",
                        )}
                      >
                        {i < step ? <Check className="h-3 w-3" /> : i + 1}
                      </span>
                      {i < STEPS.length - 1 && (
                        <span
                          className={cn(
                            "h-px flex-1 transition-colors duration-400",
                            i < step ? "bg-accent" : "bg-border",
                          )}
                        />
                      )}
                    </li>
                  ))}
                </ol>

                <div className="mt-7 min-h-[19rem]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -24 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {step === 0 && (
                        <div>
                          <input
                            type="search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search a service or package…"
                            className="w-full rounded-full gold-hairline bg-background px-5 py-3 text-sm outline-none transition-shadow focus:shadow-gold"
                          />
                          <div className="mt-4 max-h-[15rem] space-y-5 overflow-y-auto pr-1">
                            {Object.entries(grouped).map(([group, items]) => (
                              <div key={group}>
                                <p className="eyebrow">{group}</p>
                                <div className="mt-2.5 grid gap-2 sm:grid-cols-2">
                                  {items.map((item) => {
                                    const active = item.id === selectionId;
                                    return (
                                      <button
                                        key={item.id}
                                        type="button"
                                        onClick={() => setSelectionId(item.id)}
                                        className={cn(
                                          "flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all duration-300",
                                          active
                                            ? "-translate-y-0.5 border-accent bg-card shadow-gold"
                                            : "border-border bg-background hover:-translate-y-0.5 hover:shadow-soft",
                                        )}
                                      >
                                        <span className="text-foreground">{item.label}</span>
                                        <span className="shrink-0 text-xs text-muted-foreground">
                                          {item.kind === "package" ? "" : "from "}
                                          {formatINR(item.price)}
                                        </span>
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            ))}
                            {Object.keys(grouped).length === 0 && (
                              <p className="py-8 text-center text-sm text-muted-foreground">
                                Nothing matched &ldquo;{query}&rdquo;. Try another word.
                              </p>
                            )}
                          </div>
                        </div>
                      )}

                      {step === 1 && (
                        <div>
                          <p className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CalendarDays className="h-4 w-4 text-accent" aria-hidden />
                            Choose a day in the next three weeks.
                          </p>
                          <div className="mt-5 grid grid-cols-3 gap-2.5 sm:grid-cols-5">
                            {days.map((d) => {
                              const iso = toISO(d);
                              const active = iso === date;
                              const sunday = d.getDay() === 0;
                              return (
                                <button
                                  key={iso}
                                  type="button"
                                  onClick={() => setDate(iso)}
                                  className={cn(
                                    "rounded-xl border px-2 py-3 text-center transition-all duration-300",
                                    active
                                      ? "-translate-y-0.5 border-accent bg-card shadow-gold"
                                      : "border-border bg-background hover:-translate-y-0.5 hover:shadow-soft",
                                  )}
                                >
                                  <span className="block text-[0.6rem] uppercase tracking-[0.16em] text-muted-foreground">
                                    {d.toLocaleDateString("en-IN", { weekday: "short" })}
                                  </span>
                                  <span className="mt-1 block font-display text-xl text-primary">
                                    {d.getDate()}
                                  </span>
                                  <span className="block text-[0.6rem] text-muted-foreground">
                                    {sunday ? "10–6" : "9–8"}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {step === 2 && (
                        <div>
                          <p className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4 text-accent" aria-hidden />
                            Available slots for {date ? prettyDate(date) : "your date"}.
                          </p>
                          <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-5">
                            {TIME_SLOTS.map((slot) => {
                              const active = slot === time;
                              return (
                                <button
                                  key={slot}
                                  type="button"
                                  onClick={() => setTime(slot)}
                                  className={cn(
                                    "rounded-xl border py-3 text-sm transition-all duration-300",
                                    active
                                      ? "-translate-y-0.5 border-accent bg-card text-primary shadow-gold"
                                      : "border-border bg-background text-foreground hover:-translate-y-0.5 hover:shadow-soft",
                                  )}
                                >
                                  {slot}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {step === 3 && (
                        <div className="grid gap-4 sm:grid-cols-2">
                          <Field
                            label="Full name"
                            value={details.fullName}
                            error={errors.fullName}
                            onChange={(v) => setDetails((d) => ({ ...d, fullName: v }))}
                            placeholder="Ananya Sharma"
                          />
                          <Field
                            label="Phone number"
                            value={details.phone}
                            error={errors.phone}
                            onChange={(v) => setDetails((d) => ({ ...d, phone: v }))}
                            placeholder="+91 98200 00000"
                            type="tel"
                          />
                          <div className="sm:col-span-2">
                            <Field
                              label="Email"
                              value={details.email}
                              error={errors.email}
                              onChange={(v) => setDetails((d) => ({ ...d, email: v }))}
                              placeholder="you@email.com"
                              type="email"
                            />
                          </div>
                          <div className="sm:col-span-2">
                            <label className="block">
                              <span className="eyebrow">Special request</span>
                              <textarea
                                rows={3}
                                value={details.notes}
                                onChange={(e) => setDetails((d) => ({ ...d, notes: e.target.value }))}
                                placeholder="Allergies, preferred artist, occasion…"
                                className="mt-2 w-full resize-none rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition-shadow focus:border-accent focus:shadow-gold"
                              />
                            </label>
                          </div>
                        </div>
                      )}

                      {step === 4 && selection && date && time && (
                        <div className="rounded-2xl bg-muted/70 p-6">
                          <SummaryRow label="Service" value={`${selection.label} · ${selection.group}`} />
                          <SummaryRow label="Date" value={prettyDate(date)} />
                          <SummaryRow label="Time" value={time} />
                          <SummaryRow
                            label="Price"
                            value={`${selection.kind === "package" ? "" : "from "}${formatINR(selection.price)}`}
                          />
                          <SummaryRow label="Name" value={details.fullName} />
                          <SummaryRow label="Phone" value={details.phone} />
                          <SummaryRow label="Email" value={details.email} />
                          {details.notes && <SummaryRow label="Request" value={details.notes} />}
                          {submitError && (
                            <p className="mt-4 rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
                              {submitError}
                            </p>
                          )}
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="mt-7 flex items-center justify-between gap-4 border-t border-border pt-6">
                  <button
                    type="button"
                    onClick={() => setStep((s) => Math.max(0, s - 1))}
                    disabled={step === 0}
                    className="inline-flex items-center gap-2 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-primary disabled:opacity-35"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    Back
                  </button>

                  {step < 4 ? (
                    <button
                      type="button"
                      onClick={goNext}
                      disabled={!canAdvance}
                      className="btn-lux disabled:pointer-events-none disabled:opacity-45"
                    >
                      Continue
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={confirm}
                      disabled={submitting}
                      className="btn-lux btn-lux-gold disabled:pointer-events-none disabled:opacity-60"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          Confirming
                        </>
                      ) : (
                        <>
                          Confirm Appointment
                          <Sparkles className="h-3.5 w-3.5" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  error,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="eyebrow">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-invalid={!!error}
        className={cn(
          "mt-2 w-full rounded-full border bg-background px-5 py-3 text-sm outline-none transition-shadow focus:shadow-gold",
          error ? "border-destructive" : "border-border focus:border-accent",
        )}
      />
      {error && <span className="mt-1.5 block text-xs text-destructive">{error}</span>}
    </label>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-6 border-b border-border/70 py-2.5 last:border-0">
      <span className="text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground">{label}</span>
      <span className="text-right text-sm text-foreground">{value}</span>
    </div>
  );
}

function SuccessScreen({
  result,
  selectionLabel,
  date,
  time,
  onClose,
}: {
  result: BookingResult;
  selectionLabel: string;
  date: string;
  time: string;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative overflow-hidden bg-wine-gradient px-7 py-14 text-center text-primary-foreground sm:px-12"
    >
      <motion.span
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.12, type: "spring", stiffness: 160, damping: 14 }}
        className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blush-gradient shadow-gold"
      >
        <Check className="h-8 w-8 text-primary" />
      </motion.span>

      <h2 className="mt-7 font-display text-[clamp(2rem,4.5vw,3rem)] leading-tight">
        Your appointment is confirmed ✨
      </h2>
      <p className="mt-3 text-sm text-primary-foreground/70">
        We&apos;ve saved your slot. A confirmation will reach you on WhatsApp shortly.
      </p>

      <div className="mx-auto mt-9 max-w-sm rounded-2xl bg-primary-foreground/10 p-6 text-left backdrop-blur">
        <SuccessRow label="Booking ID" value={result.bookingId} />
        <SuccessRow label="Service" value={selectionLabel} />
        <SuccessRow label="Date" value={prettyDate(date)} />
        <SuccessRow label="Time" value={time} />
      </div>

      <div className="mt-8 space-y-1.5 text-xs text-primary-foreground/65">
        <p>{SALON.address}</p>
        <p>
          {SALON.phone} · {SALON.email}
        </p>
      </div>

      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <a href={`tel:${SALON.phone.replace(/\s/g, "")}`} className="btn-lux btn-lux-ghost">
          <Phone className="h-3.5 w-3.5" />
          Call the studio
        </a>
        <button type="button" onClick={onClose} className="btn-lux btn-lux-gold">
          Done
        </button>
      </div>
    </motion.div>
  );
}

function SuccessRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-5 border-b border-primary-foreground/15 py-2.5 last:border-0">
      <span className="text-[0.6rem] uppercase tracking-[0.2em] text-primary-foreground/60">
        {label}
      </span>
      <span className="text-sm">{value}</span>
    </div>
  );
}
