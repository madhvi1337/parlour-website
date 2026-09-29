import { supabase } from "@/lib/supabase";

/** Data sent by the booking form. */
export type BookingRequest = {
  selectionId: string;
  selectionLabel: string;
  selectionGroup: string;
  price: number;
  date: string; // ISO yyyy-mm-dd
  time: string;
  fullName: string;
  phone: string;
  email: string;
  notes?: string;
};

export type BookingResult = {
  bookingId: string;
  status: "confirmed";
  createdAt: string;
};

export async function createBooking(request: BookingRequest): Promise<BookingResult> {
  if (!request.fullName || !request.phone || !request.date || !request.time) {
    throw new Error("Missing booking details");
  }

  // Generate the values in the browser so we don't need a SELECT policy just
  // to read the row back after inserting it. The public website only needs
  // INSERT permission on the bookings table.
  const bookingId = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  const { error } = await supabase.from("bookings").insert({
    id: bookingId,
    selection_id: request.selectionId,
    selection_label: request.selectionLabel,
    selection_group: request.selectionGroup,
    price: request.price,
    booking_date: request.date,
    booking_time: request.time,
    full_name: request.fullName,
    phone: request.phone,
    email: request.email,
    notes: request.notes ?? null,
    status: "confirmed",
    created_at: createdAt,
  });

  if (error) {
    console.error("Supabase booking insert failed:", error);
    throw new Error(error.message || "Unable to save booking");
  }

  return {
    bookingId,
    status: "confirmed",
    createdAt,
  };
}
