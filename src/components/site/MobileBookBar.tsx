import { useBooking } from "./booking-context";

export function MobileBookBar() {
  const { openBooking, open } = useBooking();

  if (open) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 px-4 pb-4 sm:hidden">
      <button type="button" onClick={() => openBooking()} className="btn-lux w-full">
        Book Appointment
      </button>
    </div>
  );
}
