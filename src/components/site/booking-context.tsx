import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

type BookingState = {
  open: boolean;
  preselected: string | null;
  openBooking: (preselected?: string) => void;
  closeBooking: () => void;
};

const BookingContext = createContext<BookingState | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [preselected, setPreselected] = useState<string | null>(null);

  const openBooking = useCallback((value?: string) => {
    setPreselected(value ?? null);
    setOpen(true);
  }, []);

  const closeBooking = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ open, preselected, openBooking, closeBooking }),
    [open, preselected, openBooking, closeBooking],
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used inside BookingProvider");
  return ctx;
}
