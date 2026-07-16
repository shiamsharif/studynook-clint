import { api, unwrap } from "@/lib/api";
import type { ApiEnvelope, Booking, BookingInput } from "@/types/api";

export const bookingService = {
  async create(input: BookingInput) { return unwrap<Booking>(await api<ApiEnvelope<Booking>>("/api/bookings", { method: "POST", body: JSON.stringify(input) }), ["booking"]); },
  async mine() { return unwrap<Booking[]>(await api<ApiEnvelope<Booking[]>>("/api/bookings/my-bookings"), ["bookings"]); },
  async cancel(id: string) { return unwrap<Booking>(await api<ApiEnvelope<Booking>>(`/api/bookings/${id}/cancel`, { method: "PATCH" }), ["booking"]); },
};
