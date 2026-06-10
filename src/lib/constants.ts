export const SITE = {
  name: "Crédito para Startups",
  shortName: "CréditoPS",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.creditoparastartups.com.br",
  description:
    "Diretório gratuito com mais de R$ 5 milhões em créditos de cloud e IA, programas, aceleradoras, editais e benefícios para startups brasileiras. Compare e aplique.",
  locale: "pt_BR",
  twitter: "@creditops",
};

export interface CategoryDef {
  slug: string;
  name: string;
  nameSingular: string;
  description: string;
  seoTitle: string;
}

export const CATEGORIES: CategoryDef[] = [
  {
    slug: "creditos",
    name: "Créditos",
    nameSingular: "Crédito",
    description:
      "Créditos de cloud, IA e ferramentas de desenvolvimento — de AWS e Google Cloud a OpenAI e Anthropic.",
    seoTitle: "Créditos de Cloud e IA para Startups",
  },
  {
    slug: "programas",
    name: "Programas",
    nameSingular: "Programa",
    description:
      "Programas oficiais para startups com créditos, suporte técnico, mentoria e acesso a parceiros.",
    seoTitle: "Programas para Startups",
  },
  {
    slug: "editais",
    name: "Editais",
    nameSingular: "Edital",
    description:
      "Editais e fomento público no Brasil — FAPESP, Finep, BNDES, Sebrae, CNPq e programas estaduais de inovação.",
    seoTitle: "Editais e Fomento Público para Startups no Brasil",
  },
  {
    slug: "aceleradoras",
    name: "Aceleradoras",
    nameSingular: "Aceleradora",
    description:
      "Aceleradoras e hubs de inovação no Brasil e no mundo — investimento, rede e acesso a clientes.",
    seoTitle: "Aceleradoras de Startups",
  },
  {
    slug: "perks",
    name: "Perks & Benefícios",
    nameSingular: "Benefício",
    description:
      "Descontos e planos gratuitos nas ferramentas que toda startup usa — banco, jurídico, produtividade e vendas.",
    seoTitle: "Perks e Benefícios para Startups",
  },
  {
    slug: "inteligencia-artificial",
    name: "Inteligência Artificial",
    nameSingular: "Crédito de IA",
    description:
      "Créditos e programas focados em IA — APIs de modelos, GPUs, infraestrutura de ML e ferramentas de dados.",
    seoTitle: "Créditos e Programas de IA para Startups",
  },
  {
    slug: "cloud",
    name: "Cloud",
    nameSingular: "Crédito de cloud",
    description:
      "Créditos de infraestrutura em nuvem — AWS, Google Cloud, Azure, Oracle, IBM, DigitalOcean e Cloudflare.",
    seoTitle: "Créditos de Cloud para Startups",
  },
  {
    slug: "brasil",
    name: "Brasil 🇧🇷",
    nameSingular: "Oportunidade no Brasil",
    description:
      "Exclusivo para startups brasileiras — Sebrae, FAPESP, Finep, BNDES, editais do governo e programas locais de inovação.",
    seoTitle: "Oportunidades Exclusivas para Startups Brasileiras",
  },
];

export const CATEGORY_SLUGS = CATEGORIES.map((c) => c.slug);

export const FILTER_TAGS = [
  { slug: "cloud", label: "Cloud" },
  { slug: "ia", label: "IA" },
  { slug: "saas", label: "SaaS" },
  { slug: "fintech", label: "Fintech" },
  { slug: "editais", label: "Editais" },
  { slug: "aceleradoras", label: "Aceleradoras" },
  { slug: "creditos", label: "Créditos" },
  { slug: "gratuito", label: "Gratuito" },
  { slug: "brasil", label: "Brasil" },
  { slug: "global", label: "Global" },
];

export const DIFFICULTY_META: Record<
  string,
  { label: string; hint: string; className: string }
> = {
  aberto: {
    label: "Aberto a todos",
    hint: "Disponível para a maioria das startups",
    className: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  },
  condicoes: {
    label: "Com condições",
    hint: "Critérios específicos de elegibilidade",
    className: "bg-amber-50 text-amber-700 ring-amber-600/20",
  },
  vc: {
    label: "Requer VC / parceiro",
    hint: "Normalmente exige indicação de fundo ou aceleradora parceira",
    className: "bg-violet-50 text-violet-700 ring-violet-600/20",
  },
};

export function logoUrl(domain: string | null, company: string) {
  if (!domain) {
    return `https://www.google.com/s2/favicons?domain=example.com&sz=128`;
  }
  const token = process.env.NEXT_PUBLIC_LOGO_DEV_TOKEN;
  if (token) {
    return `https://img.logo.dev/${domain}?token=${token}&size=120&format=png`;
  }
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
}
