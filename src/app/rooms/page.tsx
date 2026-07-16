import type { Metadata } from "next";
import { Suspense } from "react";
import { RoomsExplorer } from "@/components/rooms/rooms-explorer";
import { LoadingSpinner } from "@/components/shared/loading-spinner";

export const metadata: Metadata = { title: "Available Rooms" };
export default function RoomsPage() { return <Suspense fallback={<LoadingSpinner label="Preparing room search…"/>}><RoomsExplorer/></Suspense>; }
