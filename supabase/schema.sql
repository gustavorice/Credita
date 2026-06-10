-- ============================================================
-- Crédito para Startups — Schema (Supabase / PostgreSQL)
-- Execute no SQL Editor do Supabase
-- ============================================================

create extension if not exists "pgcrypto";
create extension if not exists "unaccent";

-- ------------------------------------------------------------
-- Categorias
-- ------------------------------------------------------------
create table if not exists public.categories (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  slug        text not null unique,
  description text,
  position    int  not null default 0,
  created_at  timestamptz not null default now()
);

-- ------------------------------------------------------------
-- Oportunidades
-- ------------------------------------------------------------
create table if not exists public.opportunities (
  id                  uuid primary key default gen_random_uuid(),
  slug                text not null unique,
  title               text not null,
  company             text not null,
  company_domain      text,
  category            text not null references public.categories(slug) on update cascade,
  tags                text[] not null default '{}',
  value_label         text,
  value_brl           numeric,
  short_description   text not null,
  description         text not null,
  eligibility         text[] not null default '{}',
  application_process text[] not null default '{}',
  difficulty          text not null default 'aberto'
                      check (difficulty in ('aberto','condicoes','vc')),
  external_url        text,
  featured            boolean not null default false,
  sponsored           boolean not null default false,
  affiliate_url       text,
  published           boolean not null default true,
  search              tsvector,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create index if not exists opportunities_search_idx   on public.opportunities using gin (search);
create index if not exists opportunities_category_idx on public.opportunities (category);
create index if not exists opportunities_featured_idx on public.opportunities (featured) where featured;

-- ------------------------------------------------------------
-- Blog
-- ------------------------------------------------------------
create table if not exists public.blog_posts (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  title       text not null,
  excerpt     text not null,
  content     text not null,
  cover_image text,
  author      text not null default 'Equipe Crédito para Startups',
  reading_min int  not null default 6,
  published   boolean not null default false,
  search      tsvector,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists blog_posts_search_idx on public.blog_posts using gin (search);

-- ------------------------------------------------------------
-- Newsletter
-- ------------------------------------------------------------
create table if not exists public.newsletter_subscribers (
  id         uuid primary key default gen_random_uuid(),
  email      text not null unique,
  source     text,
  confirmed  boolean not null default true,
  created_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- updated_at automático
-- ------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists trg_opportunities_updated on public.opportunities;
create trigger trg_opportunities_updated before update on public.opportunities
for each row execute function public.set_updated_at();

drop trigger if exists trg_blog_updated on public.blog_posts;
create trigger trg_blog_updated before update on public.blog_posts
for each row execute function public.set_updated_at();

-- ------------------------------------------------------------
-- search tsvector via trigger (immutable-safe)
-- ------------------------------------------------------------
create or replace function public.opportunities_search_update()
returns trigger language plpgsql as $$
begin
  new.search := to_tsvector('portuguese',
    coalesce(new.title,'') || ' ' || coalesce(new.company,'') || ' ' ||
    coalesce(new.short_description,'') || ' ' || coalesce(new.description,'') || ' ' ||
    coalesce(new.category,'') || ' ' || array_to_string(new.tags,' ')
  );
  return new;
end $$;

drop trigger if exists trg_opportunities_search on public.opportunities;
create trigger trg_opportunities_search before insert or update on public.opportunities
for each row execute function public.opportunities_search_update();

create or replace function public.blog_posts_search_update()
returns trigger language plpgsql as $$
begin
  new.search := to_tsvector('portuguese',
    coalesce(new.title,'') || ' ' || coalesce(new.excerpt,'') || ' ' || coalesce(new.content,'')
  );
  return new;
end $$;

drop trigger if exists trg_blog_posts_search on public.blog_posts;
create trigger trg_blog_posts_search before insert or update on public.blog_posts
for each row execute function public.blog_posts_search_update();

-- ------------------------------------------------------------
-- Busca full-text (RPC)
-- ------------------------------------------------------------
create or replace function public.search_opportunities(q text)
returns setof public.opportunities
language sql stable as $$
  select o.*
  from public.opportunities o
  where o.published
    and (q is null or q = '' or o.search @@ websearch_to_tsquery('portuguese', q))
  order by o.featured desc, o.value_brl desc nulls last;
$$;

-- ------------------------------------------------------------
-- RLS
-- ------------------------------------------------------------
alter table public.categories             enable row level security;
alter table public.opportunities          enable row level security;
alter table public.blog_posts             enable row level security;
alter table public.newsletter_subscribers enable row level security;

create policy "categorias publicas"    on public.categories    for select using (true);
create policy "oportunidades publicas" on public.opportunities for select using (published);
create policy "posts publicos"         on public.blog_posts    for select using (published);
create policy "inscricao publica"      on public.newsletter_subscribers for insert with check (true);
-- Escrita: somente via service_role (o painel /admin usa o servidor).
