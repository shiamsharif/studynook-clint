import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Room Details",
};

export default function RoomDetailsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
