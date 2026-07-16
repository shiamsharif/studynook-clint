"use client";

import { AMENITIES } from "@/components/rooms/room-form";
import { RoomCard } from "@/components/rooms/room-card";
import { EmptyState } from "@/components/shared/empty-state";
import { ErrorState } from "@/components/shared/error-state";
import { CardSkeleton } from "@/components/shared/loading-spinner";
import { roomService } from "@/services/rooms";
import type { Room } from "@/types/api";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export function RoomsExplorer() {
  const searchParams = useSearchParams(); const pathname = usePathname(); const router = useRouter();
  const search = searchParams.get("search") ?? ""; const selected = (searchParams.get("amenities") ?? "").split(",").filter(Boolean);
  const [input, setInput] = useState(search); const [rooms, setRooms] = useState<Room[]>([]); const [loading, setLoading] = useState(true); const [error, setError] = useState("");
  const load = useCallback(async () => { setLoading(true); setError(""); try { const query = searchParams.toString(); setRooms(await roomService.list(query ? `?${query}` : "")); } catch (value) { setError(value instanceof Error ? value.message : "Could not load rooms"); } finally { setLoading(false); } }, [searchParams]);
  useEffect(() => { queueMicrotask(() => void load()); }, [load]);
  function update(params: URLSearchParams) { router.push(`${pathname}${params.size ? `?${params}` : ""}`); }
  function submit(event: React.FormEvent) { event.preventDefault(); const params = new URLSearchParams(searchParams); if (input.trim()) params.set("search", input.trim()); else params.delete("search"); update(params); }
  function toggle(item: string) { const params = new URLSearchParams(searchParams); const values = (params.get("amenities") ?? "").split(",").filter(Boolean); const next = values.includes(item) ? values.filter((value) => value !== item) : [...values, item]; if (next.length) params.set("amenities", next.join(",")); else params.delete("amenities"); update(params); }
  function reset() { setInput(""); router.push(pathname); }
  return <><section className="border-b border-stone-200 bg-[#efe7d5] py-16"><div className="container-shell"><p className="eyebrow">The room collection</p><h1 className="page-title mt-4">Find space for your <em className="text-amber-800">best work</em></h1><p className="mt-5 max-w-2xl text-stone-600">Search quiet library rooms and filter by the tools and comforts that help you focus.</p></div></section><section className="page-section"><div className="container-shell"><div className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm"><form onSubmit={submit} className="flex gap-2"><label className="relative flex-1"><span className="sr-only">Search rooms by name</span><Search aria-hidden="true" className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-stone-400"/><input className="field-input field-input-with-icon" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Search by room name…"/></label><button className="btn-primary">Search</button></form><div className="mt-5 flex flex-wrap items-center gap-2"><span className="mr-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-500"><SlidersHorizontal className="size-4"/>Amenities</span>{AMENITIES.map((item) => <button key={item} onClick={() => toggle(item)} className={`rounded-full border px-3 py-1.5 text-xs font-bold ${selected.includes(item) ? "border-amber-800 bg-amber-800 text-white" : "border-stone-200 bg-stone-50 text-stone-600 hover:border-amber-700"}`}>{item}</button>)}{(search || selected.length > 0) && <button onClick={reset} className="ml-auto flex items-center gap-1 text-xs font-bold text-red-700"><X className="size-4"/>Reset Filters</button>}</div></div><div className="mt-9 flex items-center justify-between"><h2 className="font-serif text-3xl font-semibold">Available rooms</h2>{!loading && !error && <p className="text-sm text-stone-500">{rooms.length} {rooms.length === 1 ? "room" : "rooms"}</p>}</div>{loading ? <div className="mt-7 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 6 }, (_, index) => <CardSkeleton key={index}/>)}</div> : error ? <div className="mt-7"><ErrorState message={error} onRetry={load}/></div> : rooms.length ? <div className="mt-7 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{rooms.map((room) => <RoomCard room={room} key={room._id}/>)}</div> : <div className="mt-7"><EmptyState title="No rooms found" description="Try a different room name or clear one of your filters."/></div>}</div></section></>;
}
