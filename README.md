# Crédito para Startups 🇧🇷

Diretório de créditos de cloud e IA, programas, aceleradoras, editais e benefícios
para startups brasileiras — inspirado no creditforstartups.com, 100% em português.

**Stack:** Next.js 15 · TypeScript · Tailwind CSS · Supabase (PostgreSQL + Auth) · Resend · Vercel

---

## ⚡ Rodando localmente (sem configurar nada)

O projeto funciona **imediatamente** com dados de demonstração (29 oportunidades + 4 artigos),
mesmo sem Supabase configurado:

```bash
npm install
npm run dev
# http://localhost:3000
```

A camada de dados (`src/lib/data.ts`) usa fallback automático quando as variáveis do
Supabase não existem — ideal para preview e desenvolvimento do frontend.

---

## 🗄️ 1. Configurar o Supabase

1. Crie um projeto em [supabase.com](https://supabase.com).
2. No **SQL Editor**, execute na ordem:
   - `supabase/schema.sql` (tabelas, índices, full-text search em português, RLS)
   - `supabase/seed.sql` (8 categorias, 29 oportunidades, 4 artigos)
3. Em **Project Settings → API**, copie:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` → `SUPABASE_SERVICE_ROLE_KEY` *(secreta — nunca exponha no client)*

### Segurança (RLS)

- Leitura pública: apenas conteúdo `published = true`
- Newsletter: o público só consegue **inserir** (nunca ler a lista)
- Escrita de conteúdo: **somente** via `service_role` no servidor (painel admin)

---

## 🔐 2. Criar o usuário admin

1. No Supabase: **Authentication → Users → Add user** (e-mail + senha, marque *Auto confirm*).
2. Adicione o e-mail em `ADMIN_EMAILS` no `.env` (aceita vários, separados por vírgula).
3. Acesse `/admin/login`.

O `middleware.ts` bloqueia `/admin/*` para qualquer sessão cujo e-mail não esteja em
`ADMIN_EMAILS`, e as server actions revalidam isso antes de cada escrita.

### Funções do painel

- CRUD completo de **oportunidades** (destaque, patrocinado, link afiliado, rascunho)
- CRUD completo de **artigos** (Markdown, rascunho/publicado)
- Lista de **inscritos da newsletter** com origem da inscrição

---

## ✉️ 3. Newsletter (Resend)

1. Crie uma conta em [resend.com](https://resend.com) e verifique seu domínio.
2. Preencha `RESEND_API_KEY` e `RESEND_FROM` no `.env`.

Sem a chave, a inscrição continua funcionando (salva no banco) — apenas o e-mail de
boas-vindas não é enviado. Endpoint: `POST /api/newsletter`.

---

## 🚀 4. Deploy na Vercel

1. Suba o repositório para o GitHub.
2. Importe na [Vercel](https://vercel.com) (framework: Next.js, zero config).
3. Configure as variáveis de ambiente (copie do `.env.example`):

| Variável | Obrigatória |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | ✅ (URL final do site) |
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ (admin + newsletter) |
| `ADMIN_EMAILS` | ✅ |
| `RESEND_API_KEY` / `RESEND_FROM` | opcional |
| `NEXT_PUBLIC_LOGO_DEV_TOKEN` | opcional (logos premium via logo.dev; sem token usa favicons do Google) |

4. **Analytics:** ative Vercel Analytics no dashboard do projeto (1 clique), ou adicione
   `@vercel/analytics` se preferir o componente.

---

## 🔍 SEO incluído

- Metadata dinâmica + template de título por página
- OpenGraph e Twitter Cards
- `sitemap.xml` automático (home, categorias, todas as oportunidades, blog)
- `robots.txt` (bloqueia `/admin` e `/api`)
- JSON-LD: `WebSite`, `Organization`, `Offer` (oportunidades), `Article` (blog), `BreadcrumbList`
- URLs canônicas, `lang="pt-BR"`, conteúdo estático com ISR (`revalidate: 3600`)

## 💰 Monetização (estrutura pronta)

- `featured` → sistema de destaque no topo do diretório
- `sponsored` → badge "Patrocinado" em listagens
- `affiliate_url` → o CTA "Aplicar agora" usa o link afiliado quando existir
  (com `rel="sponsored nofollow"`)
- Posts patrocinados: use o campo `author` + badge no conteúdo

## 🗂️ Estrutura

```
src/
├── app/
│   ├── page.tsx                  # Home (hero, categorias, diretório, guia)
│   ├── [categoria]/page.tsx      # /creditos /editais /brasil ...
│   ├── [categoria]/[slug]/       # Página de oportunidade
│   ├── blog/ blog/[slug]/        # Blog com Markdown
│   ├── admin/                    # Painel protegido (login, CRUDs, newsletter)
│   ├── api/newsletter/route.ts   # Inscrição + e-mail de boas-vindas
│   ├── sitemap.ts · robots.ts
├── components/                   # Header, busca ⌘K, diretório, forms...
├── lib/
│   ├── data.ts                   # Queries com fallback automático
│   ├── fallback-data.ts          # Dados de demonstração/seed
│   ├── supabase/                 # Clients (browser, server, service role)
│   └── seo.ts · constants.ts
└── supabase/schema.sql · seed.sql
```

## Busca e filtros

- **Busca instantânea** no diretório (nome, empresa, categoria, conteúdo) com
  normalização de acentos
- **⌘K / Ctrl+K** — busca global em qualquer página
- **Filtros combináveis**: Cloud, IA, SaaS, Fintech, Editais, Aceleradoras,
  Créditos, Gratuito, Brasil, Global
- **Full-text search em português** no PostgreSQL (`search_opportunities(q)`) pronta
  para quando o catálogo crescer além do client-side
