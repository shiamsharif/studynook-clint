import { LatestRooms } from "@/components/rooms/latest-rooms";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  Check,
  Clock3,
  KeyRound,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Home",
};

const benefits = [
  {
    icon: Search,
    title: "Thoughtful discovery",
    description:
      "Find the right atmosphere, amenities, capacity, and price without the guesswork.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted spaces",
    description:
      "See clear room details and reserve through a secure, straightforward flow.",
  },
  {
    icon: Users,
    title: "Room to think",
    description:
      "Choose private spaces for solo deep work, tutoring, or focused collaboration.",
  },
];

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Explore",
    description:
      "Browse rooms and narrow the collection by name and the amenities you need.",
  },
  {
    icon: CalendarCheck,
    number: "02",
    title: "Reserve",
    description:
      "Pick an available date and time. Your price updates before you confirm.",
  },
  {
    icon: KeyRound,
    number: "03",
    title: "Settle in",
    description:
      "Arrive at your chosen room and give your best work the space it deserves.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="landing-hero relative overflow-hidden border-b border-stone-200">
        <div className="landing-grid absolute inset-0" aria-hidden="true" />
        <div
          className="landing-orb landing-orb-one absolute rounded-full"
          aria-hidden="true"
        />
        <div
          className="landing-orb landing-orb-two absolute rounded-full"
          aria-hidden="true"
        />

        <div className="container-shell relative grid min-h-[720px] items-center gap-16 py-20 lg:grid-cols-[1.02fr_.98fr] lg:py-24">
          <div className="relative z-10">
            <div className="hero-reveal hero-delay-1 inline-flex items-center gap-2 rounded-full border border-amber-800/15 bg-white/65 px-3 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-amber-900 shadow-sm backdrop-blur">
              <Sparkles className="size-4 text-amber-600" aria-hidden="true" />
              Your quiet corner awaits
            </div>

            <h1 className="hero-reveal hero-delay-2 mt-7 max-w-3xl font-serif text-[clamp(3.4rem,7vw,6.3rem)] font-semibold leading-[0.88] tracking-[-0.045em] text-stone-950">
              Space to think.
              <span className="mt-2 block font-medium italic text-amber-800">
                Room to grow.
              </span>
            </h1>

            <p className="hero-reveal hero-delay-3 mt-8 max-w-xl text-lg leading-8 text-stone-600 sm:text-xl">
              Discover beautifully quiet study rooms, choose your ideal time,
              and reserve a space where your best work can happen.
            </p>

            <div className="hero-reveal hero-delay-4 mt-10 flex flex-col gap-3 sm:flex-row">
              <Link href="/rooms" className="btn-primary group min-h-13 px-7">
                Explore rooms
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
              <a href="#how-it-works" className="btn-secondary min-h-13 px-7">
                See how it works
              </a>
            </div>

            <div className="hero-reveal hero-delay-5 mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm font-semibold text-stone-600">
              <span className="flex items-center gap-2">
                <span className="grid size-5 place-items-center rounded-full bg-amber-100 text-amber-800">
                  <Check className="size-3.5" aria-hidden="true" />
                </span>
                Instant booking
              </span>
              <span className="flex items-center gap-2">
                <span className="grid size-5 place-items-center rounded-full bg-amber-100 text-amber-800">
                  <Check className="size-3.5" aria-hidden="true" />
                </span>
                Clear hourly pricing
              </span>
            </div>
          </div>

          <div className="hero-reveal hero-delay-3 relative mx-auto w-full max-w-[34rem] lg:mr-0">
            <div className="hero-frame relative rounded-[2.5rem] border border-white/70 bg-stone-950 p-3 shadow-[0_35px_90px_rgba(69,26,3,0.24)]">
              <div className="flex items-center justify-between px-4 py-2 text-white/70">
                <div className="flex gap-1.5" aria-hidden="true">
                  <span className="size-2 rounded-full bg-red-400" />
                  <span className="size-2 rounded-full bg-amber-300" />
                  <span className="size-2 rounded-full bg-emerald-400" />
                </div>
                <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em]">
                  The Oak Room
                </span>
                <span className="size-2 rounded-full bg-white/30" aria-hidden="true" />
              </div>

              <div
                className="hero-room-art relative aspect-[4/4.25] overflow-hidden rounded-[1.8rem]"
                aria-label="A calm private study room with a desk and window"
                role="img"
              >
                <div className="hero-window" aria-hidden="true" />
                <div className="hero-sunbeam" aria-hidden="true" />
                <div className="hero-shelf" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
                <div className="hero-desk" aria-hidden="true">
                  <div className="hero-lamp" />
                  <div className="hero-books" />
                </div>
                <div className="absolute inset-x-6 bottom-5 flex items-center justify-between rounded-2xl border border-white/60 bg-white/88 p-4 shadow-xl backdrop-blur-md">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-amber-800">
                      Calm &amp; private
                    </p>
                    <p className="mt-1 font-serif text-xl font-semibold text-stone-900">
                      Made for deep focus
                    </p>
                  </div>
                  <span className="grid size-11 place-items-center rounded-xl bg-amber-800 text-white">
                    <Sparkles className="size-5" aria-hidden="true" />
                  </span>
                </div>
              </div>
            </div>

            <div className="hero-float-slow absolute -left-3 top-20 rounded-2xl border border-stone-200 bg-white/95 p-4 shadow-xl backdrop-blur sm:-left-12">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-emerald-100 text-emerald-700">
                  <Clock3 className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[0.65rem] font-extrabold uppercase tracking-wider text-stone-400">
                    Available now
                  </p>
                  <p className="mt-0.5 text-sm font-bold text-stone-800">
                    Your desk is ready
                  </p>
                </div>
              </div>
            </div>

            <div className="hero-float-fast absolute -right-2 bottom-16 rounded-2xl border border-amber-100 bg-[#fffaf0]/95 p-4 shadow-xl backdrop-blur sm:-right-8">
              <div className="flex items-center gap-1 text-amber-500">
                {Array.from({ length: 5 }, (_, index) => (
                  <Star
                    key={index}
                    className="size-3.5 fill-current"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="mt-2 text-sm font-bold text-stone-800">
                Loved by focused minds
              </p>
            </div>
          </div>
        </div>

        <div className="container-shell relative z-10 pb-8">
          <div className="grid overflow-hidden rounded-2xl border border-stone-200/80 bg-white/60 backdrop-blur sm:grid-cols-3">
            {[
              ["Flexible", "Book around your schedule"],
              ["Transparent", "Know the price before you reserve"],
              ["Effortless", "From discovery to booking in minutes"],
            ].map(([title, description], index) => (
              <div
                key={title}
                className={`px-5 py-4 ${index ? "border-t border-stone-200/80 sm:border-t-0 sm:border-l" : ""}`}
              >
                <p className="font-serif text-lg font-semibold text-stone-900">
                  {title}
                </p>
                <p className="mt-0.5 text-xs text-stone-500">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section bg-[#fbfaf6]">
        <div className="container-shell">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow">Freshly listed</p>
              <h2 className="section-title mt-3">Spaces ready for ideas</h2>
              <p className="mt-4 max-w-xl text-stone-600">
                Thoughtful rooms with the essentials already waiting for you.
              </p>
            </div>
            <Link
              href="/rooms"
              className="group flex items-center gap-2 font-bold text-amber-800 hover:text-amber-950"
            >
              View every room
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
          <LatestRooms />
        </div>
      </section>

      <section id="about" className="page-section relative overflow-hidden bg-stone-950 text-white">
        <div className="absolute -right-28 -top-28 size-96 rounded-full border-[4rem] border-amber-500/5" aria-hidden="true" />
        <div className="container-shell relative">
          <div className="max-w-2xl">
            <p className="eyebrow !text-amber-400">Why choose StudyNook</p>
            <h2 className="mt-3 font-serif text-4xl font-semibold leading-tight sm:text-5xl">
              Built around the way focus feels.
            </h2>
            <p className="mt-5 max-w-xl leading-7 text-stone-400">
              Fewer distractions, clearer choices, and a booking experience that
              gets out of your way.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {benefits.map(({ icon: Icon, title, description }, index) => (
              <article
                key={title}
                className="group rounded-3xl border border-stone-800 bg-stone-900/70 p-7 transition duration-300 hover:-translate-y-1 hover:border-amber-800/60 hover:bg-stone-900"
              >
                <div className="flex items-center justify-between">
                  <span className="grid size-12 place-items-center rounded-2xl bg-amber-400/10 text-amber-400 transition group-hover:bg-amber-400 group-hover:text-stone-950">
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <span className="font-serif text-3xl text-stone-700">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-7 font-serif text-2xl font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-stone-400">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="page-section overflow-hidden">
        <div className="container-shell">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">How booking works</p>
            <h2 className="section-title mt-3">
              From search to study in three simple steps
            </h2>
          </div>

          <div className="relative mt-16 grid gap-10 md:grid-cols-3">
            <div className="absolute top-8 right-[16%] left-[16%] hidden border-t border-dashed border-amber-800/30 md:block" aria-hidden="true" />
            {steps.map(({ icon: Icon, number, title, description }) => (
              <article key={number} className="relative text-center">
                <span className="relative z-10 mx-auto grid size-16 place-items-center rounded-2xl border border-amber-200 bg-amber-100 text-amber-800 shadow-[0_0_0_8px_#f8f5ed] transition duration-300 hover:-translate-y-1 hover:rotate-3">
                  <Icon className="size-7" aria-hidden="true" />
                </span>
                <p className="mt-6 text-xs font-black tracking-[0.2em] text-amber-700">
                  STEP {number}
                </p>
                <h3 className="mt-2 font-serif text-2xl font-semibold">{title}</h3>
                <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-stone-600">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
