import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-site flex-col items-center px-4 py-28 text-center">
      <p className="text-sm font-bold uppercase tracking-widest text-brand-600">Erro 404</p>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
        Página não encontrada
      </h1>
      <p className="mt-3 max-w-md text-ink-mute dark:text-slate-400">
        O endereço pode ter mudado — mas as oportunidades continuam no diretório.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700"
      >
        Voltar ao diretório
      </Link>
    </div>
  );
}
