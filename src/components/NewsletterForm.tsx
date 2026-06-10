"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Variant = "hero" | "inline" | "footer" | "spotlight";

export default function NewsletterForm({
  variant = "inline",
  source = "site",
}: {
  variant?: Variant;
  source?: string;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");

  async function subscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro ao inscrever");
      setStatus("ok");
      setMessage(data.message || "Inscrição confirmada. Bem-vindo(a)!");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Não foi possível inscrever. Tente novamente.");
    }
  }

  const dark = variant === "hero" || variant === "spotlight";

  if (status === "ok") {
    return (
      <p
        className={cn(
          "rounded-xl px-4 py-3 text-sm font-medium",
          variant === "spotlight" && "mx-auto max-w-md text-center",
          dark ? "bg-white/10 text-emerald-300" : "bg-emerald-50 text-emerald-700"
        )}
      >
        ✓ {message}
      </p>
    );
  }

  // Variante destaque (hero central, estilo creditforstartups): input com ícone + botão roxo embaixo
  if (variant === "spotlight") {
    return (
      <form onSubmit={subscribe} className="mx-auto w-full max-w-md">
        <label htmlFor={`nl-${source}`} className="sr-only">
          Seu e-mail
        </label>
        <div className="relative">
          <svg
            width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden
          >
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m3 7 9 6 9-6" />
          </svg>
          <input
            id={`nl-${source}`}
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="fundador@suastartup.com.br"
            className="h-14 w-full rounded-xl border border-white/15 bg-white/[0.06] pl-11 pr-4 text-[15px] text-white outline-none transition placeholder:text-slate-400 focus:border-brand-400/60 focus:ring-2 focus:ring-brand-500/30"
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="mt-3 flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-brand-500 to-brand-600 text-[15px] font-semibold text-white shadow-lg shadow-brand-600/30 transition hover:from-brand-400 hover:to-brand-500 disabled:opacity-60"
        >
          {status === "loading" ? "Inscrevendo…" : "Receber novidades mensais"}
          {status !== "loading" && (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
              <path d="m9 6 6 6-6 6" />
            </svg>
          )}
        </button>
        {status === "error" && (
          <p className="mt-2 text-center text-sm font-medium text-red-400">{message}</p>
        )}
        <p className="mt-3 text-center text-sm text-slate-400">
          Grátis. Um e-mail por mês. Cancele quando quiser.
        </p>
      </form>
    );
  }

  return (
    <form onSubmit={subscribe} className="w-full">
      <div className="flex w-full max-w-xl flex-col gap-2 sm:flex-row">
        <label htmlFor={`nl-${variant}-${source}`} className="sr-only">
          Seu e-mail
        </label>
        <input
          id={`nl-${variant}-${source}`}
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="fundador@suastartup.com.br"
          className={cn(
            "h-12 flex-1 rounded-xl border px-4 text-[15px] outline-none transition focus:ring-2",
            dark
              ? "border-white/15 bg-white/10 text-white placeholder:text-slate-400 focus:border-white/30 focus:ring-white/20"
              : "border-slate-300 bg-white text-ink placeholder:text-slate-400 focus:border-brand-500 focus:ring-brand-500/20"
          )}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className={cn(
            "h-12 rounded-xl px-6 text-[15px] font-semibold transition disabled:opacity-60",
            dark
              ? "bg-white text-ink hover:bg-slate-100"
              : "bg-brand-600 text-white hover:bg-brand-700"
          )}
        >
          {status === "loading" ? "Inscrevendo…" : "Inscrever grátis"}
        </button>
      </div>
      {status === "error" && (
        <p className="mt-2 text-sm font-medium text-red-500">{message}</p>
      )}
      <p className={cn("mt-2 text-xs", dark ? "text-slate-400" : "text-ink-mute")}>
        Grátis. Um e-mail por mês. Cancele quando quiser.
      </p>
    </form>
  );
}
