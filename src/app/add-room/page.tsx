"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { RoomForm } from "@/components/rooms/room-form";
import { roomService } from "@/services/rooms";
import type { RoomInput } from "@/types/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Could not add room";
}

export default function AddRoomPage() {
  const router = useRouter();

  // API orchestration stays at the route level so RoomForm remains reusable
  // for both room creation and editing workflows.
  async function handleCreateRoom(input: RoomInput) {
    try {
      await roomService.create(input);
      toast.success("Room added successfully");

      // Replace the route so Back does not reopen a successfully submitted form.
      router.replace("/my-listings");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  }

  return (
    <ProtectedRoute>
      <section className="page-section">
        <div className="container-shell max-w-4xl">
          <p className="eyebrow">Share a study space</p>
          <h1 className="page-title mt-4">Add a room</h1>
          <p className="mt-5 mb-9 max-w-2xl text-stone-600">
            Give learners a clear picture of the room, its atmosphere, and what
            they will find inside.
          </p>

          <RoomForm onSubmit={handleCreateRoom} />
        </div>
      </section>
    </ProtectedRoute>
  );
}
