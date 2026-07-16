"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { RoomForm } from "@/components/rooms/room-form";
import { roomService } from "@/services/rooms";
import type { RoomInput } from "@/types/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AddRoomPage() {
  const router = useRouter();

  // Keep creation and navigation at the route level so the shared form can
  // also support editing rooms elsewhere in the application.
  async function save(input: RoomInput) {
    try {
      await roomService.create(input);
      toast.success("Room added successfully");
      router.push("/my-listings");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not add room",
      );

      // Preserve the rejection so RoomForm retains the original submit behavior.
      throw error;
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

          <RoomForm onSubmit={save} />
        </div>
      </section>
    </ProtectedRoute>
  );
}
