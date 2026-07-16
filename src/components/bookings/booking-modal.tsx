"use client";

import { bookingService } from "@/services/bookings";
import type { Room } from "@/types/api";
import { ApiError } from "@/lib/api";
import { LoaderCircle, X } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

const TIMES = Array.from({ length: 13 }, (_, index) => `${String(index + 8).padStart(2, "0")}:00`);
const today = () => new Date().toLocaleDateString("en-CA");

export function BookingModal({ room, open, onClose, onBooked }: { room: Room; open: boolean; onClose: () => void; onBooked: () => Promise<void> | void }) {
  const [date, setDate] = useState(today);
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("09:00");
  const [specialNote, setSpecialNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const endOptions = useMemo(() => TIMES.filter((time) => time > startTime), [startTime]);
  const hours = Number(endTime.slice(0, 2)) - Number(startTime.slice(0, 2));
  async function submit(event: React.FormEvent) { event.preventDefault(); setSubmitting(true); try { await bookingService.create({ room: room._id, date, startTime, endTime, specialNote: specialNote.trim() }); toast.success("Room booked successfully!"); await onBooked(); onClose(); } catch (error) { toast.error(error instanceof ApiError && error.status === 409 ? "This time slot is already booked" : error instanceof Error ? error.message : "Could not book this room"); } finally { setSubmitting(false); } }
  if (!open) return null;
  return <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-stone-950/60 p-4" role="dialog" aria-modal="true" aria-labelledby="booking-title"><form onSubmit={submit} className="my-6 w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl sm:p-8"><div className="flex items-start justify-between"><div><p className="eyebrow">Reserve your nook</p><h2 id="booking-title" className="mt-1 font-serif text-3xl font-semibold">Book {room.roomName}</h2></div><button type="button" onClick={onClose} aria-label="Close booking form" className="rounded-lg p-1 hover:bg-stone-100"><X/></button></div><div className="mt-6 grid gap-5"><label><span className="field-label">Room</span><input className="field-input bg-stone-50" value={room.roomName} disabled/></label><label><span className="field-label">Date</span><input type="date" min={today()} className="field-input" value={date} onChange={(e) => setDate(e.target.value)} required/></label><div className="grid grid-cols-2 gap-4"><label><span className="field-label">Start time</span><select className="field-input" value={startTime} onChange={(e) => { setStartTime(e.target.value); const next = TIMES.find((time) => time > e.target.value); if (next) setEndTime(next); }}>{TIMES.slice(0, -1).map((time) => <option key={time}>{time}</option>)}</select></label><label><span className="field-label">End time</span><select className="field-input" value={endTime} onChange={(e) => setEndTime(e.target.value)}>{endOptions.map((time) => <option key={time}>{time}</option>)}</select></label></div><label><span className="field-label">Special note <span className="font-normal text-stone-400">(optional)</span></span><textarea className="field-input" rows={3} value={specialNote} onChange={(e) => setSpecialNote(e.target.value)} placeholder="Accessibility needs or setup requests…"/></label><div className="flex items-center justify-between rounded-2xl bg-amber-50 p-4"><span className="text-sm font-semibold text-amber-900">Estimated total · {hours} {hours === 1 ? "hour" : "hours"}</span><strong className="text-xl text-amber-950">${(hours * room.hourlyRate).toFixed(2)}</strong></div><button disabled={submitting} className="btn-primary w-full">{submitting && <LoaderCircle className="size-4 animate-spin"/>}{submitting ? "Booking…" : "Confirm Booking"}</button></div></form></div>;
}
