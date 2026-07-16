"use client";

import { ErrorState } from "@/components/shared/error-state";
import { CardSkeleton } from "@/components/shared/loading-spinner";
import { RoomCard } from "@/components/rooms/room-card";
import { roomService } from "@/services/rooms";
import type { Room } from "@/types/api";
import { useCallback, useEffect, useState } from "react";

export function LatestRooms() {
  const [rooms, setRooms] = useState<Room[]>([]); const [loading, setLoading] = useState(true); const [error, setError] = useState("");
  const load = useCallback(async () => { setLoading(true); setError(""); try { setRooms((await roomService.latest()).slice(0, 6)); } catch (value) { setError(value instanceof Error ? value.message : "Could not load the latest rooms"); } finally { setLoading(false); } }, []);
  useEffect(() => { queueMicrotask(() => void load()); }, [load]);
  if (loading) return <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 6 }, (_, index) => <CardSkeleton key={index}/>)}</div>;
  if (error) return <div className="mt-10"><ErrorState message={error} onRetry={load}/></div>;
  return <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{rooms.map((room) => <RoomCard key={room._id} room={room}/>)}</div>;
}
