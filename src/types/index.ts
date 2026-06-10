export type Difficulty = "aberto" | "condicoes" | "vc";

export interface Opportunity {
  id: string;
  slug: string;
  title: string;
  company: string;
  company_domain: string | null;
  category: string;
  tags: string[];
  value_label: string | null;
  value_brl: number | null;
  short_description: string;
  description: string;
  eligibility: string[];
  application_process: string[];
  difficulty: Difficulty;
  external_url: string | null;
  featured: boolean;
  sponsored: boolean;
  affiliate_url: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  author: string;
  reading_min: number;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  position: number;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  source: string | null;
  created_at: string;
}
