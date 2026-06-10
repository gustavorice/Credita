import type { Opportunity, BlogPost } from "@/types";

/**
 * Dados de demonstração usados quando o Supabase ainda não está configurado
 * (ou como base para o seed). Em produção, os dados vêm do banco.
 */

const NOW = "2026-06-01T12:00:00.000Z";

type Seed = Omit<
  Opportunity,
  "id" | "created_at" | "updated_at" | "published" | "sponsored" | "affiliate_url"
> & Partial_;
type Partial_ = Partial<Pick<Opportunity, "sponsored" | "affiliate_url">>;

function op(o: Seed, i: number): Opportunity {
  return {
    id: `seed-${i.toString().padStart(3, "0")}`,
    published: true,
    sponsored: false,
    affiliate_url: null,
    created_at: NOW,
    updated_at: NOW,
    ...o,
  };
}

const seeds: Seed[] = [
  {
    slug: "anthropic-claude-para-startups",
    title: "Anthropic Claude para Startups",
    company: "Anthropic",
    company_domain: "anthropic.com",
    category: "inteligencia-artificial",
    tags: ["ia", "creditos", "global", "saas"],
    value_label: "Até US$ 100.000",
    value_brl: 550000,
    short_description:
      "De US$ 25 mil a US$ 100 mil+ em créditos de API do Claude, conforme o estágio da startup.",
    description:
      "O programa de startups da Anthropic concede créditos para uso da API do Claude, permitindo que times early-stage construam produtos com modelos de ponta sem comprometer o caixa. O valor varia conforme o estágio da empresa e a relação com fundos parceiros, podendo ultrapassar US$ 100 mil para startups em rodadas mais avançadas.",
    eligibility: [
      "Startup investida por um dos fundos de venture capital parceiros da Anthropic",
      "Produto em desenvolvimento que utilize a API do Claude",
      "Indicação feita diretamente pelo fundo parceiro",
    ],
    application_process: [
      "Verifique se o seu fundo investidor é parceiro do programa",
      "Peça ao partner do fundo a indicação formal para a Anthropic",
      "Crie uma conta na plataforma de API e aguarde a aplicação dos créditos",
    ],
    difficulty: "vc",
    external_url: "https://www.anthropic.com/startups",
    featured: true,
  },
  {
    slug: "google-cloud-para-startups",
    title: "Google for Startups Cloud Program",
    company: "Google Cloud",
    company_domain: "cloud.google.com",
    category: "cloud",
    tags: ["cloud", "ia", "creditos", "global"],
    value_label: "Até US$ 350.000",
    value_brl: 1900000,
    short_description:
      "Até US$ 200 mil em créditos de infraestrutura (US$ 350 mil para startups de IA) ao longo de dois anos.",
    description:
      "O programa de cloud do Google cobre custos de infraestrutura, banco de dados, Kubernetes e APIs de IA (incluindo Gemini e Vertex AI) por até dois anos. Startups de IA elegíveis acessam o teto ampliado do programa. Inclui suporte técnico, créditos de Workspace e acesso a especialistas.",
    eligibility: [
      "Empresa fundada há menos de 5 anos (10 para startups de IA, conforme trilha)",
      "Sem rodada Series A concluída no momento da inscrição (trilhas variam por estágio)",
      "Não ter participado do programa anteriormente",
      "Site institucional ativo e domínio próprio",
    ],
    application_process: [
      "Acesse a página do Google for Startups Cloud Program",
      "Preencha o formulário com dados da empresa e do uso previsto de cloud",
      "Vincule a conta de billing do Google Cloud para receber os créditos",
    ],
    difficulty: "condicoes",
    external_url: "https://cloud.google.com/startup",
    featured: true,
  },
  {
    slug: "aws-activate",
    title: "AWS Activate",
    company: "AWS",
    company_domain: "aws.amazon.com",
    category: "cloud",
    tags: ["cloud", "ia", "creditos", "global"],
    value_label: "Até US$ 100.000",
    value_brl: 550000,
    short_description:
      "Até US$ 100 mil em créditos AWS para infraestrutura e IA via Bedrock — e até US$ 1 milhão para coortes selecionadas.",
    description:
      "O AWS Activate é o maior programa de créditos de cloud do mundo. Startups bootstrapped começam com créditos menores na trilha aberta; empresas ligadas a aceleradoras e fundos parceiros acessam pacotes muito maiores, incluindo créditos para modelos de IA no Amazon Bedrock. Inclui suporte técnico, treinamentos e arquitetos de soluções.",
    eligibility: [
      "Empresa com menos de 10 anos de fundação",
      "Capital fechado (não listada em bolsa)",
      "Não ter recebido créditos Activate anteriormente",
      "Site e e-mail profissional da empresa",
    ],
    application_process: [
      "Crie uma conta AWS com o e-mail corporativo",
      "Inscreva-se no AWS Activate (trilha Founders ou Portfolio)",
      "Se estiver em aceleradora/fundo parceiro, informe o Org ID para o pacote ampliado",
    ],
    difficulty: "aberto",
    external_url: "https://aws.amazon.com/activate",
    featured: true,
  },
  {
    slug: "microsoft-for-startups",
    title: "Microsoft for Startups",
    company: "Microsoft",
    company_domain: "microsoft.com",
    category: "cloud",
    tags: ["cloud", "ia", "creditos", "global", "saas"],
    value_label: "Até US$ 150.000",
    value_brl: 825000,
    short_description:
      "Até US$ 150 mil em créditos Azure, além de GitHub Enterprise, Microsoft 365 e acesso a modelos OpenAI no Azure.",
    description:
      "O Microsoft for Startups concede créditos Azure que escalam conforme o estágio da empresa, com acesso a modelos da OpenAI via Azure AI Foundry, GitHub Enterprise, Microsoft 365 e suporte técnico dedicado. É um dos pacotes mais completos para startups B2B e de IA.",
    eligibility: [
      "Empresa com menos de 7 anos e receita anual abaixo de US$ 10 milhões",
      "Desenvolvimento de produto próprio de software",
      "Não ter participado do programa anteriormente",
      "Site profissional ativo",
    ],
    application_process: [
      "Inscreva-se no portal do Microsoft for Startups",
      "Descreva o produto e o estágio da empresa",
      "Após aprovação, os créditos são liberados em níveis progressivos",
    ],
    difficulty: "condicoes",
    external_url: "https://www.microsoft.com/startups",
    featured: true,
  },
  {
    slug: "openai-para-startups",
    title: "OpenAI para Startups",
    company: "OpenAI",
    company_domain: "openai.com",
    category: "inteligencia-artificial",
    tags: ["ia", "creditos", "global"],
    value_label: "Até US$ 5.000",
    value_brl: 27500,
    short_description:
      "Créditos de API da OpenAI para startups early-stage, geralmente via fundos e aceleradoras parceiras.",
    description:
      "A OpenAI distribui créditos de API por meio de parcerias com aceleradoras, fundos de VC e provedores de cloud. Os pacotes típicos ficam em torno de US$ 2.500 a US$ 5.000 e cobrem uso de GPT, embeddings, áudio e visão durante a fase de construção do produto.",
    eligibility: [
      "Startup vinculada a aceleradora ou fundo parceiro da OpenAI",
      "Conta de API ativa em nome da empresa",
    ],
    application_process: [
      "Confirme com sua aceleradora/fundo a disponibilidade do benefício",
      "Solicite o código de resgate ao parceiro",
      "Aplique o código na organização da API da OpenAI",
    ],
    difficulty: "vc",
    external_url: "https://openai.com/form/startups",
    featured: false,
  },
  {
    slug: "cloudflare-for-startups",
    title: "Cloudflare for Startups",
    company: "Cloudflare",
    company_domain: "cloudflare.com",
    category: "creditos",
    tags: ["cloud", "creditos", "global", "gratuito"],
    value_label: "Até US$ 250.000",
    value_brl: 1375000,
    short_description:
      "Créditos escalonados de US$ 5 mil a US$ 250 mil conforme o estágio de funding, cobrindo CDN, Workers e R2.",
    description:
      "O programa da Cloudflare cobre toda a plataforma — CDN, segurança, Workers (edge computing), R2 (storage sem taxa de egress) e Workers AI. Os créditos são escalonados por estágio, de bootstrapped a growth, e valem por um ano.",
    eligibility: [
      "Startup construindo produto de software",
      "Empresa com até 5 anos de fundação (regra geral)",
      "Tier definido pelo estágio de captação",
    ],
    application_process: [
      "Inscreva-se no Cloudflare for Startups com a conta da empresa",
      "Informe estágio de funding e investidores (se houver)",
      "Créditos aplicados diretamente na conta após aprovação",
    ],
    difficulty: "aberto",
    external_url: "https://www.cloudflare.com/forstartups/",
    featured: false,
  },
  {
    slug: "zendesk-for-startups",
    title: "Zendesk for Startups",
    company: "Zendesk",
    company_domain: "zendesk.com",
    category: "perks",
    tags: ["saas", "gratuito", "global"],
    value_label: "Até US$ 80.000",
    value_brl: 440000,
    short_description:
      "Até 2 anos gratuitos na plataforma da Zendesk para até 50 agentes de suporte.",
    description:
      "Startups aprovadas usam a plataforma de atendimento da Zendesk sem custo por até dois anos, com limite de 50 agentes — o suficiente para estruturar toda a operação de suporte sem mensalidade durante a fase de tração.",
    eligibility: [
      "Empresa com menos de 10 anos",
      "Rodada até Series B (sem Series C+)",
      "Até 50 funcionários (ou 250 se indicada por parceiro)",
      "Não ser cliente pago atual ou anterior da Zendesk",
    ],
    application_process: [
      "Inscreva-se no Zendesk for Startups",
      "Comprove estágio e data de fundação",
      "Ative o workspace gratuito após aprovação",
    ],
    difficulty: "condicoes",
    external_url: "https://www.zendesk.com.br/campaign/startups/",
    featured: false,
  },
  {
    slug: "mixpanel-startup-program",
    title: "Mixpanel Startup Program",
    company: "Mixpanel",
    company_domain: "mixpanel.com",
    category: "perks",
    tags: ["saas", "gratuito", "global"],
    value_label: "Até US$ 150.000",
    value_brl: 825000,
    short_description:
      "Um ano gratuito de Mixpanel com até 1 bilhão de eventos para analytics de produto.",
    description:
      "O programa de startups da Mixpanel libera o plano completo de analytics de produto por um ano, com volume de até 1 bilhão de eventos — valor de mercado acima de US$ 150 mil. Ideal para times que querem instrumentar ativação, retenção e funis desde o início.",
    eligibility: [
      "Empresa constituída há no máximo 5 anos",
      "Captação total de até US$ 8 milhões",
      "Não ser cliente pago atual da Mixpanel",
    ],
    application_process: [
      "Crie uma conta gratuita na Mixpanel",
      "Inscreva-se no Startup Program com dados da empresa",
      "Plano liberado automaticamente após validação",
    ],
    difficulty: "condicoes",
    external_url: "https://mixpanel.com/startups",
    featured: false,
  },
  {
    slug: "ibm-cloud-para-startups",
    title: "IBM para Startups",
    company: "IBM",
    company_domain: "ibm.com",
    category: "cloud",
    tags: ["cloud", "ia", "creditos", "global"],
    value_label: "Até US$ 120.000",
    value_brl: 660000,
    short_description:
      "Até US$ 120 mil em créditos IBM Cloud para infraestrutura e IA (watsonx).",
    description:
      "O programa da IBM concede créditos de cloud que podem ser usados em infraestrutura, Kubernetes, bancos de dados e na plataforma de IA watsonx. Bom encaixe para startups B2B que vendem para grandes empresas, pelo acesso ao ecossistema corporativo da IBM.",
    eligibility: [
      "Empresa com menos de 5 anos",
      "Receita anual abaixo de US$ 1 milhão",
      "Não ser cliente atual da IBM Cloud",
      "Produto minimamente viável (MVP) no ar",
    ],
    application_process: [
      "Inscreva-se no IBM para Startups",
      "Apresente o MVP e o plano de uso de cloud",
      "Créditos liberados em fases conforme o consumo",
    ],
    difficulty: "condicoes",
    external_url: "https://www.ibm.com/startups",
    featured: false,
  },
  {
    slug: "digitalocean-hatch",
    title: "DigitalOcean Hatch",
    company: "DigitalOcean",
    company_domain: "digitalocean.com",
    category: "cloud",
    tags: ["cloud", "creditos", "global"],
    value_label: "Até US$ 100.000",
    value_brl: 550000,
    short_description:
      "Créditos de infraestrutura na nuvem da DigitalOcean para startups ligadas a aceleradoras e fundos parceiros.",
    description:
      "O Hatch é o programa de startups da DigitalOcean: créditos de infraestrutura (Droplets, Kubernetes, bancos gerenciados e GPUs) por 12 meses, com suporte prioritário. A porta de entrada é a rede de aceleradoras, incubadoras e fundos parceiros.",
    eligibility: [
      "Empresa com menos de 5 anos",
      "Participação em aceleradora, incubadora ou fundo aprovado",
      "Não ter recebido créditos DigitalOcean antes",
      "Site institucional ativo",
    ],
    application_process: [
      "Confirme se sua aceleradora/fundo é parceiro do Hatch",
      "Inscreva-se com o código ou link do parceiro",
      "Créditos aplicados na conta após aprovação",
    ],
    difficulty: "vc",
    external_url: "https://www.digitalocean.com/hatch",
    featured: false,
  },
  {
    slug: "datadog-for-startups",
    title: "Datadog for Startups",
    company: "Datadog",
    company_domain: "datadoghq.com",
    category: "creditos",
    tags: ["cloud", "saas", "creditos", "global"],
    value_label: "Até US$ 100.000",
    value_brl: 550000,
    short_description:
      "Até US$ 100 mil em créditos para um ano de observabilidade com o Datadog Pro.",
    description:
      "Startups early-stage ganham um ano de Datadog Pro — monitoramento de infraestrutura, APM, logs e dashboards — via parceiros do programa. O valor do pacote varia conforme o parceiro que faz a indicação.",
    eligibility: [
      "Startup early-stage vinculada a parceiro do programa",
      "Não ser cliente pago atual do Datadog",
    ],
    application_process: [
      "Verifique a lista de parceiros do Datadog for Startups",
      "Solicite a indicação ao seu fundo ou aceleradora",
      "Ative os créditos na criação da conta",
    ],
    difficulty: "condicoes",
    external_url: "https://www.datadoghq.com/partner/datadog-for-startups/",
    featured: false,
  },
  {
    slug: "notion-for-startups",
    title: "Notion for Startups",
    company: "Notion",
    company_domain: "notion.so",
    category: "perks",
    tags: ["saas", "gratuito", "global"],
    value_label: "Até US$ 12.000",
    value_brl: 66000,
    short_description:
      "6 meses do plano Business com Notion AI incluído para organizar docs, wiki e projetos.",
    description:
      "O Notion oferece seis meses gratuitos do plano Business (com IA ilimitada) para startups indicadas por parceiros — aceleradoras, fundos e comunidades. É o suficiente para estruturar wiki, CRM leve e gestão de projetos sem custo no primeiro ano.",
    eligibility: [
      "Startup com até 50 funcionários",
      "Indicação por parceiro do programa (fundo, aceleradora ou comunidade)",
      "Workspace novo ou em plano gratuito",
    ],
    application_process: [
      "Obtenha o link/código com o parceiro",
      "Inscreva-se na página do Notion for Startups",
      "Benefício aplicado ao workspace após validação",
    ],
    difficulty: "aberto",
    external_url: "https://www.notion.com/startups",
    featured: false,
  },
  {
    slug: "github-for-startups",
    title: "GitHub for Startups",
    company: "GitHub",
    company_domain: "github.com",
    category: "perks",
    tags: ["saas", "gratuito", "global"],
    value_label: "20 assentos Enterprise",
    value_brl: 120000,
    short_description:
      "GitHub Enterprise gratuito no primeiro ano (até 20 assentos) e 50% no segundo, para startups de fundos parceiros.",
    description:
      "O GitHub for Startups dá acesso ao plano Enterprise — incluindo recursos avançados de segurança e o Copilot em planos elegíveis — sem custo no primeiro ano e com desconto no segundo. A inscrição passa pelos fundos e aceleradoras parceiros.",
    eligibility: [
      "Startup até Series A",
      "Vinculada a fundo ou aceleradora parceira",
      "Nova no GitHub Enterprise",
    ],
    application_process: [
      "Confirme a parceria com seu investidor",
      "Inscreva-se na página do GitHub for Startups",
      "Upgrade aplicado à organização após aprovação",
    ],
    difficulty: "vc",
    external_url: "https://github.com/enterprise/startups",
    featured: false,
  },
  {
    slug: "nvidia-inception",
    title: "NVIDIA Inception",
    company: "NVIDIA",
    company_domain: "nvidia.com",
    category: "programas",
    tags: ["ia", "global", "gratuito"],
    value_label: "Benefícios variados",
    value_brl: 200000,
    short_description:
      "Programa gratuito para startups de IA: descontos em GPUs, créditos de cloud parceiros e acesso técnico à NVIDIA.",
    description:
      "O Inception é o programa global da NVIDIA para startups de IA e computação acelerada. Sem custo e sem equity, dá acesso a descontos em hardware, créditos em clouds parceiras, treinamentos do Deep Learning Institute e visibilidade junto a fundos do ecossistema.",
    eligibility: [
      "Startup de IA, ML ou computação acelerada",
      "Empresa constituída com site ativo",
      "Sem limite rígido de estágio — early stage é bem-vindo",
    ],
    application_process: [
      "Inscreva-se no portal do NVIDIA Inception",
      "Descreva o produto e o uso de GPU/IA",
      "Acesso liberado ao hub de benefícios após aprovação",
    ],
    difficulty: "aberto",
    external_url: "https://www.nvidia.com/en-us/startups/",
    featured: false,
  },
  {
    slug: "stripe-atlas",
    title: "Stripe Atlas",
    company: "Stripe",
    company_domain: "stripe.com",
    category: "perks",
    tags: ["fintech", "saas", "global"],
    value_label: "US$ 500 + perks",
    value_brl: 100000,
    short_description:
      "Incorporação de empresa nos EUA (Delaware C-Corp) em poucos dias, com créditos e benefícios de dezenas de parceiros.",
    description:
      "O Stripe Atlas resolve a constituição de uma C-Corp em Delaware — passo comum para startups brasileiras que captam com fundos internacionais. Inclui emissão de equity para fundadores, EIN, conta bancária via parceiros e um pacote de créditos e descontos em ferramentas.",
    eligibility: [
      "Fundadores de qualquer país (incluindo Brasil)",
      "Pagamento da taxa única do serviço",
    ],
    application_process: [
      "Crie a conta no Stripe Atlas e preencha os dados da empresa",
      "Assine os documentos eletronicamente",
      "Receba EIN, documentos e acesso aos perks",
    ],
    difficulty: "aberto",
    external_url: "https://stripe.com/atlas",
    featured: false,
  },
  {
    slug: "y-combinator",
    title: "Y Combinator",
    company: "Y Combinator",
    company_domain: "ycombinator.com",
    category: "aceleradoras",
    tags: ["aceleradoras", "global"],
    value_label: "US$ 500.000",
    value_brl: 2750000,
    short_description:
      "A aceleradora mais conhecida do mundo: US$ 500 mil em investimento padrão e acesso à maior rede de founders.",
    description:
      "O YC investe US$ 500 mil em cada startup aceita (deal padrão: US$ 125 mil por 7% + US$ 375 mil em SAFE uncapped MFN). Além do capital, o programa de 3 meses dá acesso a parceiros, Demo Day e a um pacote enorme de créditos de cloud e ferramentas. Startups brasileiras são aceitas regularmente.",
    eligibility: [
      "Aplicação aberta a fundadores de qualquer país",
      "Ideia ou produto em qualquer estágio inicial",
      "Disponibilidade para o batch (presencial em São Francisco)",
    ],
    application_process: [
      "Preencha a aplicação online dentro do prazo do batch",
      "Se selecionado, participe da entrevista (remota)",
      "Aceite o investimento e participe do programa",
    ],
    difficulty: "condicoes",
    external_url: "https://www.ycombinator.com/apply",
    featured: false,
  },
  // ----------------- BRASIL -----------------
  {
    slug: "fapesp-pipe",
    title: "FAPESP PIPE — Pesquisa Inovativa em Pequenas Empresas",
    company: "FAPESP",
    company_domain: "fapesp.br",
    category: "editais",
    tags: ["editais", "brasil", "gratuito"],
    value_label: "Até R$ 2 milhões",
    value_brl: 2000000,
    short_description:
      "Fomento não reembolsável para P&D em pequenas empresas paulistas — até R$ 2 milhões somando as fases do programa.",
    description:
      "O PIPE financia pesquisa e desenvolvimento de inovação em empresas com até 250 funcionários sediadas no Estado de São Paulo. O recurso é não reembolsável (não vira dívida nem equity): a Fase 1 valida a viabilidade técnica e a Fase 2 desenvolve a tecnologia, com bolsas e custeio do projeto.",
    eligibility: [
      "Empresa sediada no Estado de São Paulo",
      "Até 250 funcionários",
      "Projeto de pesquisa com desafio tecnológico real",
      "Pesquisador responsável vinculado à empresa",
    ],
    application_process: [
      "Leia o edital vigente no site da FAPESP",
      "Monte o projeto de pesquisa no formato exigido (SAGe)",
      "Submeta e acompanhe a avaliação por assessores científicos",
    ],
    difficulty: "condicoes",
    external_url: "https://fapesp.br/pipe",
    featured: true,
  },
  {
    slug: "finep-startup",
    title: "Finep Startup",
    company: "Finep",
    company_domain: "finep.gov.br",
    category: "editais",
    tags: ["editais", "brasil"],
    value_label: "Até R$ 1 milhão",
    value_brl: 1000000,
    short_description:
      "Investimento direto da Finep em startups inovadoras via contrato de opção de compra de participação.",
    description:
      "O Finep Startup aporta recursos públicos em startups de base tecnológica por meio de instrumento conversível, sem tomada imediata de participação. O foco é acelerar empresas com produto inovador e potencial de escala, em chamadas públicas periódicas por setor.",
    eligibility: [
      "Empresa brasileira de base tecnológica",
      "Receita e tempo de fundação dentro dos limites da chamada vigente",
      "Produto inovador validado ou em validação",
    ],
    application_process: [
      "Acompanhe as chamadas públicas no site da Finep",
      "Submeta o plano de negócios e os documentos da empresa",
      "Participe das bancas de avaliação e diligência",
    ],
    difficulty: "condicoes",
    external_url: "https://www.finep.gov.br/apoio-e-financiamento-externa/programas-e-linhas/finep-startup",
    featured: true,
  },
  {
    slug: "bndes-garagem",
    title: "BNDES Garagem",
    company: "BNDES",
    company_domain: "bndes.gov.br",
    category: "programas",
    tags: ["brasil", "aceleradoras", "gratuito"],
    value_label: "Aceleração gratuita",
    value_brl: 150000,
    short_description:
      "Programa de aceleração do BNDES para startups de impacto, com mentorias, conexões e apoio ao desenvolvimento de negócios — sem equity.",
    description:
      "O BNDES Garagem acelera startups brasileiras em ciclos temáticos (govtech, impacto socioambiental, economia verde, entre outros), oferecendo trilha de capacitação, mentorias com especialistas e conexão com grandes empresas e órgãos públicos — sem cobrar participação societária.",
    eligibility: [
      "Startup brasileira com CNPJ ativo",
      "Aderência ao tema do ciclo vigente",
      "Produto em validação ou tração",
    ],
    application_process: [
      "Acompanhe a abertura dos ciclos no site do BNDES Garagem",
      "Inscreva-se no edital com pitch e dados da empresa",
      "Participe das etapas de seleção e do programa",
    ],
    difficulty: "aberto",
    external_url: "https://www.bndesgaragem.com.br",
    featured: false,
  },
  {
    slug: "sebrae-para-startups",
    title: "Sebrae para Startups (Capital Empreendedor e Inovativa)",
    company: "Sebrae",
    company_domain: "sebrae.com.br",
    category: "programas",
    tags: ["brasil", "gratuito", "editais"],
    value_label: "Capacitação + conexões",
    value_brl: 50000,
    short_description:
      "Programas gratuitos do Sebrae que preparam startups para captação e conectam fundadores a investidores em todo o Brasil.",
    description:
      "O Sebrae mantém trilhas nacionais para startups: o Capital Empreendedor prepara a empresa para captar investimento e a conecta a fundos e investidores-anjo; o InovAtiva (em parceria com o MDIC) é o maior programa gratuito de aceleração da América Latina, com mentorias e demoday nacional.",
    eligibility: [
      "Startup brasileira com CNPJ",
      "Qualquer estágio — ideação a tração, conforme a trilha",
      "Inscrição nos ciclos abertos",
    ],
    application_process: [
      "Inscreva-se no ciclo aberto do programa escolhido",
      "Complete a trilha de capacitação online",
      "Participe das bancas e rodadas de conexão com investidores",
    ],
    difficulty: "aberto",
    external_url: "https://sebrae.com.br/sites/PortalSebrae/inovacao",
    featured: false,
  },
  {
    slug: "inovativa-brasil",
    title: "InovAtiva Brasil",
    company: "InovAtiva",
    company_domain: "inovativa.online",
    category: "aceleradoras",
    tags: ["brasil", "aceleradoras", "gratuito"],
    value_label: "Aceleração gratuita",
    value_brl: 80000,
    short_description:
      "O maior programa gratuito de aceleração da América Latina — mentoria, capacitação e demoday, sem equity.",
    description:
      "Mantido pelo MDIC e Sebrae, o InovAtiva já acelerou milhares de startups brasileiras. O programa é 100% gratuito e não pede participação societária: inclui mentorias individuais com executivos, trilha de conteúdo e apresentação para investidores e corporates no demoday nacional.",
    eligibility: [
      "Startup brasileira de base tecnológica",
      "Produto lançado ou MVP em validação",
      "Inscrição dentro do ciclo semestral",
    ],
    application_process: [
      "Inscreva-se gratuitamente no ciclo vigente",
      "Passe pela seleção de pitch e formulário",
      "Conclua a jornada de aceleração e o demoday",
    ],
    difficulty: "aberto",
    external_url: "https://www.inovativa.online",
    featured: false,
  },
  {
    slug: "cubo-itau",
    title: "Cubo Itaú",
    company: "Cubo",
    company_domain: "cubo.network",
    category: "programas",
    tags: ["brasil", "saas", "fintech"],
    value_label: "Hub + conexões",
    value_brl: 100000,
    short_description:
      "Um dos maiores hubs de inovação da América Latina: residência em São Paulo, conexão com corporates e comunidade de startups.",
    description:
      "O Cubo, mantido pelo Itaú e parceiros, seleciona startups com tração para integrar sua comunidade — com espaço físico na Vila Olímpia, agenda de negócios com grandes empresas patrocinadoras e acesso a um ecossistema denso de founders, fundos e clientes corporativos.",
    eligibility: [
      "Startup com produto no mercado e receita recorrente",
      "Aderência aos verticais do hub (fintech, saúde, varejo, agro etc.)",
      "Processo seletivo contínuo",
    ],
    application_process: [
      "Inscreva-se no site do Cubo",
      "Participe da avaliação de tração e fit",
      "Assine o plano de residência (físico ou digital)",
    ],
    difficulty: "condicoes",
    external_url: "https://cubo.network",
    featured: false,
  },
  {
    slug: "google-for-startups-brasil",
    title: "Google for Startups Brasil",
    company: "Google for Startups",
    company_domain: "startup.google.com",
    category: "programas",
    tags: ["brasil", "ia", "gratuito", "aceleradoras"],
    value_label: "Aceleração + créditos",
    value_brl: 1900000,
    short_description:
      "Programas de aceleração do Google no Brasil (incluindo trilhas de IA), sem equity, com mentoria e créditos de cloud.",
    description:
      "O Google for Startups mantém no Brasil programas de aceleração sem participação societária — incluindo edições dedicadas a IA e a fundadores negros (Black Founders Fund, com aporte não diluitivo). Participantes recebem mentoria de times do Google, créditos de Google Cloud e acesso à rede global.",
    eligibility: [
      "Startup brasileira com produto lançado",
      "Aderência ao foco do ciclo (IA, impacto, etc.)",
      "Time dedicado em tempo integral",
    ],
    application_process: [
      "Acompanhe a abertura das turmas no site do Google for Startups",
      "Envie a aplicação com métricas e pitch",
      "Participe das entrevistas de seleção",
    ],
    difficulty: "condicoes",
    external_url: "https://startup.google.com/intl/pt_br/",
    featured: true,
  },
  {
    slug: "ace-startups",
    title: "ACE Cortex / ACE Startups",
    company: "ACE",
    company_domain: "ace.vc",
    category: "aceleradoras",
    tags: ["brasil", "aceleradoras"],
    value_label: "Investimento + aceleração",
    value_brl: 500000,
    short_description:
      "Uma das aceleradoras pioneiras do Brasil: investimento pré-seed, metodologia própria e rede de mentores.",
    description:
      "A ACE acelera e investe em startups brasileiras early-stage há mais de uma década, com cheques pré-seed, metodologia estruturada de tração e acesso a uma rede ampla de mentores, fundos e corporates para rodadas seguintes.",
    eligibility: [
      "Startup brasileira early-stage (pré-seed/seed)",
      "Time fundador dedicado",
      "Produto em validação com sinais de tração",
    ],
    application_process: [
      "Inscreva-se no funil contínuo da ACE",
      "Participe das etapas de avaliação e entrevistas",
      "Negocie termos de investimento e aceleração",
    ],
    difficulty: "condicoes",
    external_url: "https://ace.vc",
    featured: false,
  },
  {
    slug: "bndes-credito-inovacao",
    title: "BNDES Crédito Inovação",
    company: "BNDES",
    company_domain: "bndes.gov.br",
    category: "editais",
    tags: ["brasil", "editais"],
    value_label: "Financiamento subsidiado",
    value_brl: 3000000,
    short_description:
      "Linhas de financiamento do BNDES com juros reduzidos para projetos de inovação e transformação digital.",
    description:
      "O BNDES opera linhas de crédito dedicadas a inovação — com taxas menores que o mercado e prazos longos — para empresas que investem em P&D, desenvolvimento de produtos e transformação digital. Para startups com receita, é alternativa de capital não dilutivo.",
    eligibility: [
      "Empresa brasileira com faturamento e capacidade de crédito",
      "Projeto de inovação estruturado",
      "Análise de crédito via BNDES ou agente financeiro",
    ],
    application_process: [
      "Estruture o projeto de inovação com orçamento e cronograma",
      "Submeta via Canal MPME ou diretamente ao BNDES",
      "Passe pela análise de crédito e contrate a operação",
    ],
    difficulty: "condicoes",
    external_url: "https://www.bndes.gov.br/wps/portal/site/home/financiamento/produto/bndes-credito-inovacao",
    featured: false,
  },
  {
    slug: "cnpq-rhae",
    title: "CNPq — Bolsas e Fomento (RHAE)",
    company: "CNPq",
    company_domain: "cnpq.br",
    category: "editais",
    tags: ["brasil", "editais", "gratuito"],
    value_label: "Bolsas de pesquisa",
    value_brl: 300000,
    short_description:
      "Bolsas do CNPq para inserir mestres e doutores em projetos de P&D dentro de empresas privadas.",
    description:
      "O programa RHAE do CNPq paga bolsas para pesquisadores (mestres e doutores) trabalharem em projetos de inovação dentro de micro, pequenas e médias empresas — reduzindo o custo de montar um time técnico de P&D na startup.",
    eligibility: [
      "Micro, pequena ou média empresa brasileira",
      "Projeto de P&D com pesquisador qualificado",
      "Submissão dentro do edital vigente",
    ],
    application_process: [
      "Acompanhe os editais RHAE no site do CNPq",
      "Cadastre o projeto na Plataforma Carlos Chagas",
      "Indique os bolsistas após aprovação",
    ],
    difficulty: "condicoes",
    external_url: "https://www.gov.br/cnpq/pt-br",
    featured: false,
  },
  {
    slug: "darwin-startups",
    title: "Darwin Startups",
    company: "Darwin",
    company_domain: "darwinstartups.com",
    category: "aceleradoras",
    tags: ["brasil", "aceleradoras", "fintech"],
    value_label: "Investimento pré-seed",
    value_brl: 300000,
    short_description:
      "Aceleradora catarinense com investimento pré-seed e foco em startups B2B e fintechs.",
    description:
      "A Darwin investe cheques pré-seed em startups brasileiras e roda programas intensivos de aceleração com foco em tração comercial B2B, conectando fundadores a fundos e clientes corporativos do Sul do país e além.",
    eligibility: [
      "Startup brasileira early-stage",
      "Modelo B2B ou fintech (preferencial)",
      "Disponibilidade para o programa intensivo",
    ],
    application_process: [
      "Inscreva-se no batch aberto",
      "Participe das entrevistas e análise",
      "Feche o investimento e inicie a aceleração",
    ],
    difficulty: "condicoes",
    external_url: "https://darwinstartups.com",
    featured: false,
  },
  {
    slug: "vercel-for-startups",
    title: "Vercel for Startups",
    company: "Vercel",
    company_domain: "vercel.com",
    category: "creditos",
    tags: ["cloud", "saas", "creditos", "global"],
    value_label: "Créditos de plataforma",
    value_brl: 60000,
    short_description:
      "Créditos na plataforma da Vercel para hospedar aplicações Next.js com escala global.",
    description:
      "Startups ligadas a aceleradoras e fundos parceiros recebem créditos na Vercel para deploy de aplicações front-end e full-stack — incluindo recursos de IA (AI SDK) e infraestrutura serverless, sem custo durante a fase inicial.",
    eligibility: [
      "Startup early-stage vinculada a parceiro",
      "Projeto hospedado (ou a hospedar) na Vercel",
    ],
    application_process: [
      "Solicite o benefício via parceiro ou formulário da Vercel",
      "Vincule o time da empresa na plataforma",
      "Créditos aplicados na fatura mensal",
    ],
    difficulty: "condicoes",
    external_url: "https://vercel.com/startups",
    featured: false,
  },
  {
    slug: "supabase-para-startups",
    title: "Supabase Launch Week Credits",
    company: "Supabase",
    company_domain: "supabase.com",
    category: "creditos",
    tags: ["cloud", "saas", "creditos", "global", "gratuito"],
    value_label: "Créditos de plataforma",
    value_brl: 30000,
    short_description:
      "Créditos do Supabase para startups de aceleradoras parceiras (YC, entre outras) usarem Postgres, Auth e Storage gerenciados.",
    description:
      "O Supabase distribui créditos por meio de parcerias com aceleradoras e programas de startups, cobrindo banco PostgreSQL gerenciado, autenticação, storage e edge functions — uma alternativa open source ao Firebase para o backend da startup.",
    eligibility: [
      "Startup em aceleradora parceira ou programa de deals",
      "Organização nova ou em plano gratuito",
    ],
    application_process: [
      "Resgate o código pelo portal de perks da sua aceleradora",
      "Aplique o código na organização do Supabase",
      "Faça o upgrade do projeto para o plano Pro",
    ],
    difficulty: "vc",
    external_url: "https://supabase.com",
    featured: false,
  },
];

export const FALLBACK_OPPORTUNITIES: Opportunity[] = seeds.map(op);

const POST_NOW = "2026-05-20T12:00:00.000Z";

export const FALLBACK_POSTS: BlogPost[] = [
  {
    id: "post-001",
    slug: "como-conseguir-creditos-aws-startup-brasileira",
    title: "Como conseguir créditos AWS para sua startup brasileira (guia 2026)",
    excerpt:
      "O AWS Activate pode cobrir sua infraestrutura por 1 a 2 anos. Veja o passo a passo real para startups brasileiras, com e sem aceleradora.",
    content: `O AWS Activate é o caminho mais comum para uma startup brasileira zerar a conta de cloud nos primeiros anos. Mas o valor que você recebe depende muito de **como** você entra no programa.

## As duas portas de entrada

**1. Trilha Founders (sem indicação).** Aberta a qualquer startup com CNPJ ou C-Corp, site profissional e e-mail corporativo. Os créditos iniciais são menores, mas o processo é simples e a aprovação costuma sair em poucos dias.

**2. Trilha Portfolio (com indicação).** Se a sua startup participa de uma aceleradora, incubadora ou tem investimento de um fundo parceiro da AWS, você recebe um **Org ID** do parceiro e acessa pacotes muito maiores — que podem chegar a US$ 100 mil, e a até US$ 1 milhão em coortes selecionadas de IA.

## Checklist antes de aplicar

- Site no ar com domínio próprio (nada de página no Notion)
- E-mail corporativo no mesmo domínio
- Conta AWS criada em nome da empresa, não do fundador
- Empresa com menos de 10 anos e capital fechado
- Nunca ter recebido créditos Activate antes

## Dicas que aumentam a aprovação

1. Descreva o produto de forma específica: o que ele faz, para quem, e como usa a AWS.
2. Se estiver em programa como InovAtiva, Cubo ou ACE, **pergunte pelo Org ID** — muitos founders deixam dinheiro na mesa por não saber que o parceiro é credenciado.
3. Use os créditos com calma: eles têm validade (normalmente 1 a 2 anos). Arquitete para não criar custos que você não conseguirá pagar quando os créditos acabarem.

## E depois que os créditos acabam?

Negocie. A AWS tem times de startups no Brasil e oferece *private pricing* e descontos por compromisso de uso (Savings Plans). Startups que mostram crescimento conseguem condições bem melhores do que o preço de tabela.

> Regra de ouro: trate crédito de cloud como extensão de runway, não como desculpa para desperdiçar infraestrutura.`,
    cover_image: null,
    author: "Equipe Crédito para Startups",
    reading_min: 7,
    published: true,
    created_at: POST_NOW,
    updated_at: POST_NOW,
  },
  {
    id: "post-002",
    slug: "como-conseguir-creditos-openai-anthropic",
    title: "Como conseguir créditos de IA: OpenAI, Anthropic e Google em 2026",
    excerpt:
      "APIs de IA são o novo custo de cloud. Veja como startups brasileiras conseguem créditos da OpenAI, Anthropic e Google para construir produtos de IA.",
    content: `Se a sua startup constrói produto com LLMs, a conta de API pode crescer mais rápido que a de infraestrutura. A boa notícia: os três grandes laboratórios têm programas de créditos — cada um com uma porta de entrada diferente.

## OpenAI

A OpenAI distribui créditos principalmente **via parceiros**: aceleradoras, fundos e provedores de cloud. Os pacotes típicos ficam entre US$ 2.500 e US$ 5.000. Se você está em uma aceleradora, verifique o portal de perks antes de pagar a primeira fatura.

## Anthropic (Claude)

O programa da Anthropic é mais generoso — de US$ 25 mil a mais de US$ 100 mil em créditos de API — mas a entrada padrão é por **indicação de fundos parceiros**. Se sua startup é investida, peça ao partner do fundo para verificar a parceria. O Claude também entra no pacote de créditos da AWS (via Bedrock) e do Google Cloud (via Vertex AI), o que é um atalho útil.

## Google (Gemini / Vertex AI)

O caminho aqui é o **Google for Startups Cloud Program**: os créditos de cloud valem para as APIs de IA, e startups de IA acessam o teto ampliado do programa (até US$ 350 mil em dois anos). Para quem roda tudo no GCP, é o pacote mais completo.

## Estratégia: empilhe créditos sem violar regras

- Os programas de cloud (AWS, GCP, Azure) **podem coexistir** — nada impede ter créditos nos três.
- Créditos de modelo via cloud (Bedrock, Vertex) contam como crédito de cloud, então você pode usá-los **além** dos créditos diretos do laboratório.
- Leia os termos: alguns programas vetam participação anterior ou exigem exclusividade temporária de workload.

## Ordem sugerida para uma startup de IA no Brasil

1. AWS Activate ou Google Cloud (infra + modelos via Bedrock/Vertex)
2. Programa direto do laboratório que você mais usa (OpenAI ou Anthropic)
3. NVIDIA Inception para descontos de GPU e créditos extras de parceiros`,
    cover_image: null,
    author: "Equipe Crédito para Startups",
    reading_min: 8,
    published: true,
    created_at: "2026-05-12T12:00:00.000Z",
    updated_at: "2026-05-12T12:00:00.000Z",
  },
  {
    id: "post-003",
    slug: "melhores-programas-para-startups-brasileiras",
    title: "Os melhores programas para startups brasileiras em 2026",
    excerpt:
      "Do Sebrae à FAPESP, do Cubo ao Google for Startups: um mapa do fomento e da aceleração disponíveis para quem empreende no Brasil.",
    content: `O ecossistema brasileiro tem uma vantagem pouco explorada: uma camada inteira de fomento público e programas gratuitos que não existe em muitos países. Este é o mapa.

## Fomento público (dinheiro não dilutivo)

**FAPESP PIPE** — para empresas paulistas com projeto de P&D. Recursos não reembolsáveis que podem passar de R$ 2 milhões somando as fases. É o programa mais robusto de pesquisa aplicada em empresa do país.

**Finep Startup** — aporte público via instrumento conversível para startups de base tecnológica, em chamadas periódicas.

**BNDES** — linhas de crédito para inovação com juros subsidiados, além do BNDES Garagem (aceleração gratuita, sem equity).

**CNPq RHAE** — bolsas para colocar mestres e doutores dentro do time de P&D da sua empresa.

## Aceleração gratuita

**InovAtiva Brasil** — o maior programa gratuito de aceleração da América Latina (MDIC + Sebrae). Mentoria, trilha de conteúdo e demoday nacional, sem equity.

**Sebrae Capital Empreendedor** — prepara a startup para captação e conecta com investidores.

**Google for Startups Brasil** — turmas de aceleração sem equity, incluindo trilhas de IA e o Black Founders Fund (aporte não dilutivo).

## Hubs e comunidades

**Cubo Itaú** — residência e agenda de negócios com corporates em São Paulo. **ACE** e **Darwin** — aceleradoras com investimento pré-seed.

## Como combinar tudo

1. Comece pelo gratuito: InovAtiva ou Sebrae para estruturar pitch e métricas.
2. Se há P&D de verdade, rode FAPESP/Finep em paralelo — o ciclo é longo, então quanto antes, melhor.
3. Créditos de cloud e IA (AWS, Google, Microsoft) entram em qualquer estágio e liberam caixa imediato.
4. Hub ou aceleradora com equity só quando o valor da rede superar o custo da diluição.`,
    cover_image: null,
    author: "Equipe Crédito para Startups",
    reading_min: 9,
    published: true,
    created_at: "2026-04-28T12:00:00.000Z",
    updated_at: "2026-04-28T12:00:00.000Z",
  },
  {
    id: "post-004",
    slug: "como-reduzir-custos-de-infraestrutura-startup",
    title: "Como reduzir custos de infraestrutura na sua startup (sem reescrever tudo)",
    excerpt:
      "Créditos, arquitetura enxuta e negociação: um plano prático para cortar a conta de cloud em até 80% nos primeiros anos.",
    content: `Infraestrutura é o segundo maior custo de muitas startups de software — e o mais fácil de atacar. O plano abaixo segue a ordem de esforço: do que dá resultado hoje ao que exige mudança de arquitetura.

## 1. Créditos primeiro (resultado imediato)

Antes de otimizar qualquer coisa, garanta que você não está pagando o que poderia ser grátis:

- **AWS Activate, Google Cloud ou Microsoft for Startups** — escolha a nuvem principal e aplique.
- **Cloudflare for Startups** — CDN, segurança e R2 (storage sem taxa de saída de dados).
- **Datadog / Mixpanel / Zendesk** — observabilidade, analytics e suporte com 1 a 2 anos gratuitos.

Uma startup early-stage bem organizada opera 12 a 24 meses com custo de infraestrutura próximo de zero só com esses programas.

## 2. Higiene básica (primeira semana)

- Desligue ambientes de staging fora do horário comercial.
- Apague recursos órfãos: volumes, IPs elásticos e snapshots esquecidos.
- Configure alertas de billing com teto por serviço.
- Revise instâncias superdimensionadas — o padrão é começar grande "por garantia".

## 3. Arquitetura enxuta (primeiro trimestre)

- Prefira serviços gerenciados com plano gratuito generoso (Postgres gerenciado, filas, storage de objetos).
- Egress é o imposto invisível da cloud: mantenha dados e computação na mesma região e use CDN para estáticos.
- Serverless para cargas irregulares; instâncias reservadas para cargas constantes.

## 4. Negocie (quando os créditos acabarem)

Com 12+ meses de histórico de consumo, fale com o time de startups do seu provedor. Savings Plans, descontos por compromisso e *private pricing* são padrão para quem pergunta — e invisíveis para quem não pergunta.

> Meta realista: conta de infraestrutura abaixo de 5% da receita até a Série A.`,
    cover_image: null,
    author: "Equipe Crédito para Startups",
    reading_min: 7,
    published: true,
    created_at: "2026-04-10T12:00:00.000Z",
    updated_at: "2026-04-10T12:00:00.000Z",
  },
];
