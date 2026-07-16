"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { RoomCard } from "@/components/rooms/room-card";
import { RoomForm } from "@/components/rooms/room-form";
import { ConfirmModal } from "@/components/shared/confirm-modal";
import { EmptyState } from "@/components/shared/empty-state";
import { ErrorState } from "@/components/shared/error-state";
import { CardSkeleton } from "@/components/shared/loading-spinner";
import { roomService } from "@/services/rooms";
import type { Room, RoomInput } from "@/types/api";
import { Pencil, Trash2, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export default function MyListingsPage() {
  const [rooms, setRooms] = useState<Room[]>([]); const [loading, setLoading] = useState(true); const [error, setError] = useState(""); const [editing, setEditing] = useState<Room | null>(null); const [deleting, setDeleting] = useState<Room | null>(null); const [busy, setBusy] = useState(false);
  const load = useCallback(async () => { setLoading(true); setError(""); try { setRooms(await roomService.mine()); } catch (value) { setError(value instanceof Error ? value.message : "Could not load your listings"); } finally { setLoading(false); } }, []);
  useEffect(() => { queueMicrotask(() => void load()); }, [load]);
  async function update(input: RoomInput) { if (!editing) return; try { const room = await roomService.update(editing._id, input); setRooms((current) => current.map((item) => item._id === room._id ? room : item)); setEditing(null); toast.success("Room updated successfully"); } catch (value) { toast.error(value instanceof Error ? value.message : "Could not update room"); throw value; } }
  async function remove() { if (!deleting) return; setBusy(true); try { await roomService.remove(deleting._id); setRooms((current) => current.filter((item) => item._id !== deleting._id)); toast.success("Room deleted successfully"); setDeleting(null); } catch (value) { toast.error(value instanceof Error ? value.message : "Could not delete room"); } finally { setBusy(false); } }
  return <ProtectedRoute><section className="page-section"><div className="container-shell"><p className="eyebrow">Your hosted spaces</p><h1 className="page-title mt-4">My Listings</h1><p className="mt-5 text-stone-600">Keep room details fresh and manage what you share with the StudyNook community.</p>{loading ? <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 3 }, (_, index) => <CardSkeleton key={index}/>)}</div> : error ? <div className="mt-10"><ErrorState message={error} onRetry={load}/></div> : rooms.length ? <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{rooms.map((room) => <RoomCard key={room._id} room={room} actions={<><button onClick={() => setEditing(room)} className="btn-secondary px-3" aria-label={`Edit ${room.roomName}`}><Pencil className="size-4"/></button><button onClick={() => setDeleting(room)} className="btn-secondary px-3 text-red-700" aria-label={`Delete ${room.roomName}`}><Trash2 className="size-4"/></button></>}/>)}</div> : <div className="mt-10"><EmptyState title="You have no room listings yet" description="Share a quiet space with learners looking for their next place to focus." action="Add your first room" href="/add-room"/></div>}</div></section>{editing && <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 p-4"><div className="relative mx-auto my-8 max-w-3xl"><button onClick={() => setEditing(null)} className="absolute top-5 right-5 z-10 rounded-xl bg-stone-100 p-2" aria-label="Close edit form"><X/></button><RoomForm key={editing._id} room={editing} onSubmit={update} submitLabel="Save Changes"/></div></div>}<ConfirmModal open={Boolean(deleting)} title="Delete this room?" description={`“${deleting?.roomName ?? "This room"}” will be permanently removed. This action cannot be undone.`} confirmLabel="Delete Room" busy={busy} onClose={() => setDeleting(null)} onConfirm={remove}/></ProtectedRoute>;
}
