"use client";

import { BookingModal } from "@/components/bookings/booking-modal";
import { RoomForm } from "@/components/rooms/room-form";
import { ConfirmModal } from "@/components/shared/confirm-modal";
import { ErrorState } from "@/components/shared/error-state";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { SafeImage } from "@/components/shared/safe-image";
import { ApiError } from "@/lib/api";
import { useAuth } from "@/providers/auth-provider";
import { roomService } from "@/services/rooms";
import type { Owner, Room, RoomInput } from "@/types/api";
import {
  Building2,
  CalendarCheck,
  Pencil,
  Trash2,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

interface FactProps {
  icon: typeof Building2;
  label: string;
  value: string;
}

export default function RoomDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const router = useRouter();

  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [booking, setBooking] = useState(false);
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      setRoom(await roomService.get(id));
    } catch (value) {
      if (value instanceof ApiError && value.status === 404) {
        setNotFound(true);
      } else {
        setError(
          value instanceof Error ? value.message : "Could not load this room",
        );
      }
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    // Defer the async request until after the effect has finished running.
    queueMicrotask(() => void load());
  }, [load]);

  if (loading) {
    return <LoadingSpinner label="Opening the room…" />;
  }

  if (notFound) {
    return (
      <section className="page-section">
        <ErrorState message="This room could not be found. It may have been removed." />
      </section>
    );
  }

  if (error || !room) {
    return (
      <section className="page-section">
        <ErrorState message={error || "Room unavailable"} onRetry={load} />
      </section>
    );
  }

  // The API may return an owner ID or a populated owner object.
  const ownerId = typeof room.owner === "string" ? room.owner : room.owner._id;
  const owner = typeof room.owner === "object" ? (room.owner as Owner) : null;
  const isOwner = Boolean(user && user._id === ownerId);

  async function update(input: RoomInput) {
    try {
      setRoom(await roomService.update(room!._id, input));
      setEditing(false);
      toast.success("Room updated successfully");
    } catch (value) {
      toast.error(
        value instanceof Error ? value.message : "Could not update room",
      );
      throw value;
    }
  }

  async function remove() {
    setBusy(true);

    try {
      await roomService.remove(room!._id);
      toast.success("Room deleted successfully");
      router.push("/my-listings");
    } catch (value) {
      toast.error(
        value instanceof Error ? value.message : "Could not delete room",
      );
      setBusy(false);
    }
  }

  return (
    <>
      <section className="page-section">
        <div className="container-shell">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_.85fr]">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-stone-200 shadow-xl">
              <SafeImage
                src={room.image || "/room-placeholder.svg"}
                alt={`${room.roomName} study room`}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
            </div>

            <div className="flex flex-col justify-center">
              <p className="eyebrow">Private study room</p>

              <div className="mt-3 flex items-start justify-between gap-4">
                <h1 className="page-title !text-[clamp(2.8rem,5vw,4.2rem)]">
                  {room.roomName}
                </h1>
                <span className="shrink-0 rounded-2xl bg-amber-100 px-4 py-2 font-bold text-amber-900">
                  ${Number(room.hourlyRate).toFixed(2)}/hr
                </span>
              </div>

              <p className="mt-6 leading-7 text-stone-600">
                {room.description}
              </p>

              <div className="mt-7 grid grid-cols-3 gap-3">
                <Fact
                  icon={Building2}
                  label="Floor"
                  value={String(room.floor)}
                />
                <Fact
                  icon={Users}
                  label="Capacity"
                  value={`${room.capacity} people`}
                />
                <Fact
                  icon={CalendarCheck}
                  label="Bookings"
                  value={String(room.bookingCount ?? 0)}
                />
              </div>

              <div className="mt-7">
                <h2 className="text-sm font-bold text-stone-900">Amenities</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {room.amenities.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-stone-200 px-3 py-1.5 text-xs font-bold text-stone-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {owner && (
                <div className="mt-7 border-t border-stone-200 pt-5">
                  <p className="text-xs font-bold uppercase tracking-widest text-stone-400">
                    Hosted by
                  </p>
                  <p className="mt-1 font-semibold">
                    {owner.name ?? "StudyNook host"}
                  </p>
                  {owner.email && (
                    <p className="text-sm text-stone-500">{owner.email}</p>
                  )}
                </div>
              )}

              <div className="mt-8 flex flex-wrap gap-3">
                {user ? (
                  <button
                    onClick={() => setBooking(true)}
                    className="btn-primary flex-1"
                  >
                    Book Now
                  </button>
                ) : (
                  <Link
                    href={`/login?redirect=${encodeURIComponent(`/rooms/${room._id}`)}`}
                    className="btn-primary flex-1"
                  >
                    Login to Book
                  </Link>
                )}

                {isOwner && (
                  <>
                    <button
                      onClick={() => setEditing(true)}
                      className="btn-secondary"
                    >
                      <Pencil className="size-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleting(true)}
                      className="btn-secondary text-red-700"
                    >
                      <Trash2 className="size-4" />
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {booking && (
        <BookingModal
          room={room}
          open={booking}
          onClose={() => setBooking(false)}
          onBooked={load}
        />
      )}

      {editing && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 p-4">
          <div className="relative mx-auto my-8 max-w-3xl">
            <button
              onClick={() => setEditing(false)}
              className="absolute top-5 right-5 z-10 rounded-xl bg-stone-100 p-2"
              aria-label="Close edit form"
            >
              <X />
            </button>
            <RoomForm
              room={room}
              onSubmit={update}
              submitLabel="Save Changes"
            />
          </div>
        </div>
      )}

      <ConfirmModal
        open={deleting}
        title="Delete this room?"
        description={`“${room.roomName}” will be permanently removed.`}
        confirmLabel="Delete Room"
        busy={busy}
        onClose={() => setDeleting(false)}
        onConfirm={remove}
      />
    </>
  );
}

function Fact({ icon: Icon, label, value }: FactProps) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <Icon className="size-5 text-amber-700" />
      <p className="mt-3 text-xs text-stone-500">{label}</p>
      <p className="mt-1 text-sm font-bold text-stone-900">{value}</p>
    </div>
  );
}
