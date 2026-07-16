"use client";

import { SafeImage } from "@/components/shared/safe-image";
import { useAuth } from "@/providers/auth-provider";
import { BookOpen, ChevronDown, LogOut, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const publicLinks = [
  { href: "/", label: "Home" },
  { href: "/rooms", label: "Rooms" },
  { href: "/login", label: "Login" },
  { href: "/register", label: "Register" },
];

const privateLinks = [
  { href: "/", label: "Home" },
  { href: "/rooms", label: "Rooms" },
  { href: "/add-room", label: "Add Room" },
  { href: "/my-listings", label: "My Listings" },
  { href: "/my-bookings", label: "My Bookings" },
];

export function Navbar() {
  const { user, loading, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const links = user ? privateLinks : publicLinks;

  useEffect(() => {
    function close(event: MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    }

    // Close the profile menu when the user clicks anywhere outside it.
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  async function handleLogout() {
    try {
      await logout();
      toast.success("Logged out successfully");
      router.push("/");
    } catch {
      toast.error("Could not log out. Please try again.");
    }
  }

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-[#f8f5ed]/90 backdrop-blur-xl">
      <nav
        className="container-shell flex h-18 items-center justify-between"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="flex items-center gap-2 font-serif text-xl font-bold tracking-tight text-stone-900"
        >
          <span className="grid size-9 place-items-center rounded-xl bg-amber-800 text-amber-50">
            <BookOpen className="size-5" />
          </span>
          StudyNook
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {!loading &&
            links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${pathname === link.href ? "nav-link-active" : ""}`}
              >
                {link.label}
              </Link>
            ))}

          {!loading && user && (
            <div className="relative ml-2" ref={menuRef}>
              <button
                onClick={() => setProfileOpen((value) => !value)}
                className="flex items-center gap-2 rounded-full border border-stone-200 bg-white py-1.5 pr-3 pl-1.5 text-sm font-semibold text-stone-800 hover:border-amber-700"
                aria-expanded={profileOpen}
              >
                <span className="relative size-8 overflow-hidden rounded-full bg-amber-100">
                  {user.photoURL ? (
                    <SafeImage
                      src={user.photoURL}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="32px"
                    />
                  ) : (
                    <span className="grid h-full place-items-center text-amber-800">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </span>
                {user.name.split(" ")[0]}
                <ChevronDown className="size-4" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-stone-200 bg-white p-2 shadow-xl">
                  <div className="border-b border-stone-100 px-3 py-2">
                    <p className="font-semibold text-stone-900">{user.name}</p>
                    <p className="truncate text-xs text-stone-500">
                      {user.email}
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="mt-1 flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
                  >
                    <LogOut className="size-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <button
          className="rounded-xl p-2 text-stone-800 hover:bg-stone-200 md:hidden"
          onClick={() => setMobileOpen((value) => !value)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-stone-200 bg-[#f8f5ed] px-4 py-4 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {!loading &&
              links.map((link) => (
                <Link
                  onClick={() => setMobileOpen(false)}
                  key={link.href}
                  href={link.href}
                  className={`nav-link ${pathname === link.href ? "nav-link-active" : ""}`}
                >
                  {link.label}
                </Link>
              ))}

            {user && (
              <button
                onClick={handleLogout}
                className="nav-link flex items-center gap-2 text-red-700"
              >
                <LogOut className="size-4" />
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
