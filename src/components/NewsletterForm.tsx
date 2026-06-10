"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Variant = "hero" | "inline" | "footer";

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

  const dark = variant === "hero";

  if (status === "ok") {
    return (
      <p
        className={cn(
          "rounded-xl px-4 py-3 text-sm font-medium",
          dark ? "bg-white/10 text-emerald-300" : "bg-emerald-50 text-emerald-700"
        )}
      >
        ✓ {message}
      </p>
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
