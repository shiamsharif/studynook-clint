"use client";

import { LoaderCircle, X } from "lucide-react";

export function ConfirmModal({ open, title, description, confirmLabel, busy = false, onConfirm, onClose }: { open: boolean; title: string; description: string; confirmLabel: string; busy?: boolean; onConfirm: () => void; onClose: () => void }) {
  if (!open) return null;
  return <div className="fixed inset-0 z-50 grid place-items-center bg-stone-950/60 p-4" role="dialog" aria-modal="true" aria-labelledby="confirm-title" onMouseDown={(e) => { if (e.target === e.currentTarget && !busy) onClose(); }}><div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl"><div className="flex items-start justify-between gap-4"><div><h2 id="confirm-title" className="font-serif text-2xl font-semibold text-stone-900">{title}</h2><p className="mt-2 text-sm leading-6 text-stone-600">{description}</p></div><button onClick={onClose} disabled={busy} aria-label="Close confirmation" className="rounded-lg p-1 hover:bg-stone-100"><X className="size-5"/></button></div><div className="mt-6 flex justify-end gap-3"><button className="btn-secondary" onClick={onClose} disabled={busy}>Keep it</button><button className="btn-danger" onClick={onConfirm} disabled={busy}>{busy && <LoaderCircle className="size-4 animate-spin"/>}{confirmLabel}</button></div></div></div>;
}
