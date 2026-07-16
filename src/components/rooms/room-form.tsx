"use client";

import type { Room, RoomInput } from "@/types/api";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";

export const AMENITIES = ["Whiteboard", "Projector", "Wi-Fi", "Power Outlets", "Quiet Zone", "Air Conditioning"];

export function RoomForm({ room, onSubmit, submitLabel = "Add Room" }: { room?: Room; onSubmit: (value: RoomInput) => Promise<void>; submitLabel?: string }) {
  const [values, setValues] = useState<RoomInput>({ roomName: room?.roomName ?? "", description: room?.description ?? "", image: room?.image ?? "", floor: String(room?.floor ?? ""), capacity: room?.capacity ?? 1, hourlyRate: room?.hourlyRate ?? 1, amenities: room?.amenities ?? [] });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  function update<K extends keyof RoomInput>(key: K, value: RoomInput[K]) { setValues((current) => ({ ...current, [key]: value })); }
  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (!values.roomName.trim()) next.roomName = "Room name is required";
    if (values.description.trim().length < 20) next.description = "Please provide at least 20 characters";
    try { new URL(values.image); } catch { next.image = "Enter a valid image URL"; }
    if (!values.floor.trim()) next.floor = "Floor is required";
    if (values.capacity < 1) next.capacity = "Capacity must be at least 1";
    if (values.hourlyRate <= 0) next.hourlyRate = "Hourly rate must be greater than 0";
    setErrors(next);
    if (Object.keys(next).length) return;
    setSubmitting(true);
    try { await onSubmit({ ...values, roomName: values.roomName.trim(), description: values.description.trim(), image: values.image.trim(), floor: values.floor.trim() }); } finally { setSubmitting(false); }
  }
  return <form onSubmit={handleSubmit} className="grid gap-6 rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8"><div className="grid gap-5 sm:grid-cols-2"><Field label="Room name" error={errors.roomName}><input className="field-input" value={values.roomName} onChange={(e) => update("roomName", e.target.value)} placeholder="The Oak Reading Room"/></Field><Field label="Floor" error={errors.floor}><input className="field-input" value={values.floor} onChange={(e) => update("floor", e.target.value)} placeholder="2"/></Field></div><Field label="Description" error={errors.description}><textarea rows={5} className="field-input resize-y" value={values.description} onChange={(e) => update("description", e.target.value)} placeholder="Describe the room, atmosphere, and best uses…"/></Field><Field label="Image URL" error={errors.image}><input type="url" className="field-input" value={values.image} onChange={(e) => update("image", e.target.value)} placeholder="https://example.com/room.jpg"/></Field><div className="grid gap-5 sm:grid-cols-2"><Field label="Capacity" error={errors.capacity}><input type="number" min="1" className="field-input" value={values.capacity} onChange={(e) => update("capacity", Number(e.target.value))}/></Field><Field label="Hourly rate ($)" error={errors.hourlyRate}><input type="number" min="1" step="0.01" className="field-input" value={values.hourlyRate} onChange={(e) => update("hourlyRate", Number(e.target.value))}/></Field></div><fieldset><legend className="field-label">Amenities</legend><div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">{AMENITIES.map((item) => <label key={item} className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 text-sm font-semibold ${values.amenities.includes(item) ? "border-amber-700 bg-amber-50 text-amber-900" : "border-stone-200"}`}><input type="checkbox" className="accent-amber-800" checked={values.amenities.includes(item)} onChange={(e) => update("amenities", e.target.checked ? [...values.amenities, item] : values.amenities.filter((value) => value !== item))}/>{item}</label>)}</div></fieldset><button disabled={submitting} className="btn-primary justify-self-start disabled:opacity-60">{submitting && <LoaderCircle className="size-4 animate-spin"/>}{submitting ? "Saving…" : submitLabel}</button></form>;
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) { return <label><span className="field-label">{label}</span>{children}{error && <span className="field-error">{error}</span>}</label>; }
