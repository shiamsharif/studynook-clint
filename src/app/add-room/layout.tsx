import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Room",
};

export default function AddRoomLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
