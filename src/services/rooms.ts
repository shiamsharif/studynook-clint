import { api, unwrap } from "@/lib/api";
import type { ApiEnvelope, Room, RoomInput } from "@/types/api";

export const roomService = {
  async list(query = "") { return unwrap<Room[]>(await api<ApiEnvelope<Room[]>>(`/api/rooms${query}`), ["rooms"]); },
  async latest() { return unwrap<Room[]>(await api<ApiEnvelope<Room[]>>("/api/rooms/latest"), ["rooms"]); },
  async mine() { return unwrap<Room[]>(await api<ApiEnvelope<Room[]>>("/api/rooms/my-listings"), ["rooms"]); },
  async get(id: string) { return unwrap<Room>(await api<ApiEnvelope<Room>>(`/api/rooms/${id}`), ["room"]); },
  async create(input: RoomInput) { return unwrap<Room>(await api<ApiEnvelope<Room>>("/api/rooms", { method: "POST", body: JSON.stringify(input) }), ["room"]); },
  async update(id: string, input: RoomInput) { return unwrap<Room>(await api<ApiEnvelope<Room>>(`/api/rooms/${id}`, { method: "PATCH", body: JSON.stringify(input) }), ["room"]); },
  async remove(id: string) { await api(`/api/rooms/${id}`, { method: "DELETE" }); },
};
