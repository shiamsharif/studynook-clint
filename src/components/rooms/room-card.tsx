import { SafeImage } from "@/components/shared/safe-image";
import type { Room } from "@/types/api";
import { Building2, Users } from "lucide-react";
import Link from "next/link";

export function RoomCard({ room, actions }: { room: Room; actions?: React.ReactNode }) {
  const description = room.description.length > 105 ? `${room.description.slice(0, 102)}…` : room.description;
  const visible = room.amenities.slice(0, 3);
  return <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"><div className="relative aspect-[4/3] overflow-hidden bg-stone-200"><SafeImage src={room.image || "/room-placeholder.svg"} alt={`${room.roomName} study room`} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover transition duration-500 group-hover:scale-105"/></div><div className="flex flex-1 flex-col p-5"><div className="mb-3 flex items-start justify-between gap-3"><h3 className="font-serif text-xl font-semibold text-stone-900">{room.roomName}</h3><span className="shrink-0 rounded-full bg-amber-100 px-3 py-1 text-sm font-bold text-amber-900">${Number(room.hourlyRate).toFixed(0)}/hr</span></div><p className="min-h-12 text-sm leading-6 text-stone-600">{description}</p><div className="mt-4 flex gap-4 text-sm text-stone-600"><span className="flex items-center gap-1.5"><Building2 className="size-4 text-amber-700"/>Floor {room.floor}</span><span className="flex items-center gap-1.5"><Users className="size-4 text-amber-700"/>{room.capacity} seats</span></div><div className="mt-4 flex min-h-7 flex-wrap gap-2">{visible.map((item) => <span key={item} className="chip">{item}</span>)}{room.amenities.length > 3 && <span className="chip">+{room.amenities.length - 3} more</span>}</div><div className="mt-auto flex gap-2 pt-5"><Link className="btn-secondary flex-1" href={`/rooms/${room._id}`}>View Details</Link>{actions}</div></div></article>;
}
