import { BookOpen } from "lucide-react";
import Link from "next/link";

interface SocialIconProps {
  path: string;
}

function XLogo() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-5"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  );
}

function SocialIcon({ path }: SocialIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-5"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="mt-auto bg-stone-950 text-stone-300">
      <div className="container-shell grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-serif text-xl font-bold text-white"
          >
            <BookOpen className="size-6 text-amber-500" />
            StudyNook
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-stone-400">
            A calmer way to discover and reserve private library study rooms
            built for focused work.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-white">Explore</h2>
          <div className="mt-4 flex flex-col gap-2 text-sm">
            <Link href="/">Home</Link>
            <Link href="/rooms">Rooms</Link>
            <Link href="/#about">About</Link>
          </div>
        </div>

        <div>
          <h2 className="font-semibold text-white">Contact</h2>
          <div className="mt-4 space-y-2 text-sm">
            <a className="block" href="mailto:sharifshiam@gmail.com">
              sharifshiam@gmail.com
            </a>
            <a className="block" href="tel:+8801725547494">
              +880 1725-547494
            </a>

            <div className="flex gap-4 pt-3">
              <a href="https://facebook.com" aria-label="Facebook">
                <SocialIcon path="M22 12a10 10 0 1 0-11.56 9.88v-6.99H8V12h2.44V9.8c0-2.42 1.44-3.75 3.64-3.75 1.05 0 2.15.19 2.15.19v2.36h-1.21c-1.19 0-1.56.74-1.56 1.5V12h2.66l-.43 2.89h-2.23v6.99A10 10 0 0 0 22 12Z" />
              </a>
              <a href="https://x.com" aria-label="X">
                <XLogo />
              </a>
              <a href="https://linkedin.com" aria-label="LinkedIn">
                <SocialIcon path="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V8.98h3.42v1.57h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.29ZM5.32 7.41a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13Zm1.78 13.04H3.54V8.98H7.1v11.47Z" />
              </a>
              <a href="https://instagram.com" aria-label="Instagram">
                <SocialIcon path="M12 2c2.72 0 3.06.01 4.13.06 2.75.13 4.03 1.43 4.16 4.16.05 1.07.06 1.4.06 4.13s-.01 3.06-.06 4.13c-.13 2.74-1.42 4.03-4.16 4.16-1.07.05-1.4.06-4.13.06s-3.06-.01-4.13-.06c-2.75-.13-4.03-1.43-4.16-4.16-.05-1.07-.06-1.4-.06-4.13s.01-3.06.06-4.13C3.84 3.48 5.13 2.19 7.87 2.06 8.94 2.01 9.27 2 12 2Zm0 4.86a5.14 5.14 0 1 0 0 10.28 5.14 5.14 0 0 0 0-10.28Zm0 8.48a3.34 3.34 0 1 1 0-6.68 3.34 3.34 0 0 1 0 6.68Zm5.34-9.89a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-stone-800 py-5 text-center text-xs text-stone-500">
        © {new Date().getFullYear()} StudyNook. Made for focused minds.
      </div>
    </footer>
  );
}
