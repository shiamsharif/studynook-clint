import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { Providers } from "@/components/providers";

export const metadata: Metadata = { title: { default: "StudyNook", template: "StudyNook – %s" }, description: "Discover and book private library study rooms." };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><Providers><div className="flex min-h-screen flex-col"><Navbar/><main className="flex-1">{children}</main><Footer/></div></Providers></body></html>;
}
