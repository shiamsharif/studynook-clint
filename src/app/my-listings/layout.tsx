import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Listings",
};

export default function MyListingsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
