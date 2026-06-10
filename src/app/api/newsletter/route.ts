import { NextResponse } from "next/server";
import { hasSupabaseEnv, createAdminClient } from "@/lib/supabase/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: { email?: string; source?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase();
  const source = (body.source ?? "site").slice(0, 60);

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Informe um e-mail válido." },
      { status: 400 }
    );
  }

  // Sem Supabase configurado (preview local), responde ok sem persistir.
  if (!hasSupabaseEnv() || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({
      message: "Inscrição confirmada. Bem-vindo(a) a bordo!",
    });
  }

  const supabase = createAdminClient();
  const { error } = await supabase
    .from("newsletter_subscribers")
    .insert({ email, source });

  if (error) {
    // 23505 = unique_violation (já inscrito)
    if (error.code === "23505") {
      return NextResponse.json({
        message: "Você já está inscrito — fique de olho na caixa de entrada!",
      });
    }
    return NextResponse.json(
      { error: "Não foi possível concluir a inscrição. Tente novamente." },
      { status: 500 }
    );
  }

  // E-mail de boas-vindas via Resend (opcional)
  if (process.env.RESEND_API_KEY) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from:
          process.env.RESEND_FROM ??
          "Crédito para Startups <onboarding@resend.dev>",
        to: email,
        subject: "Bem-vindo(a) ao Crédito para Startups 🚀",
        html: `
          <div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:0 auto;color:#0f172a">
            <h1 style="font-size:22px">Inscrição confirmada!</h1>
            <p>A partir de agora você recebe, <strong>uma vez por mês</strong>, as novas
            oportunidades de créditos de cloud e IA, editais e programas para startups brasileiras.</p>
            <p>Enquanto isso, explore o diretório completo:</p>
            <p><a href="${process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.creditoparastartups.com.br"}"
              style="display:inline-block;background:#3556e0;color:#fff;padding:12px 20px;border-radius:10px;text-decoration:none;font-weight:600">
              Ver todas as oportunidades →</a></p>
            <p style="color:#64748b;font-size:13px">Sem spam. Cancele quando quiser.</p>
          </div>`,
      });
    } catch {
      // Falha no e-mail de boas-vindas não impede a inscrição.
    }
  }

  return NextResponse.json({
    message: "Inscrição confirmada. Bem-vindo(a) a bordo!",
  });
}
