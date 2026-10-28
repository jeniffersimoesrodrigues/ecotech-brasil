import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";
import { PageHero, Section, seo } from "@/components/site";
import { supabase } from "@/integrations/supabase/client";
import { SURVEY, isValidAnswer, type SurveyId } from "@/lib/survey";

export const Route = createFileRoute("/pesquisa")({
  head: () => seo("Pesquisa Comunitária anônima sobre TI Verde | EcoTech", "Responda a um questionário anônimo sobre TI Verde e veja os resultados reais da comunidade."),
  component: Page,
});

type Stat = { question: string; answer: string; total: number };

function Results({ refreshKey }: { refreshKey: number }) {
  const [stats, setStats] = useState<Stat[] | null>(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    supabase.rpc("survey_stats").then(({ data, error }) => {
      if (error) setError(true);
      else setStats((data ?? []).map((d) => ({ ...d, total: Number(d.total) })));
    });
  }, [refreshKey]);

  if (error) return <p className="text-muted-foreground">Não foi possível carregar os resultados agora.</p>;
  if (!stats) return <p className="text-muted-foreground">Carregando resultados…</p>;
  const n = stats.filter((s) => s.question === "q1").reduce((a, s) => a + s.total, 0);
  if (n === 0) return <p className="rounded-2xl border border-dashed p-8 text-center text-muted-foreground">Ainda não há respostas. Os resultados aparecerão aqui quando as primeiras pessoas responderem.</p>;

  return (
    <div>
      <p className="mb-6 text-muted-foreground">Total de respostas reais recebidas: <strong className="text-foreground">{n}</strong></p>
      <div className="grid gap-6 md:grid-cols-2">
        {SURVEY.map((q) => (
          <div key={q.id} className="rounded-2xl border bg-card p-6 shadow-card">
            <p className="font-semibold">{q.q}</p>
            <ul className="mt-4 space-y-3">
              {q.options.map((opt) => {
                const t = stats.find((s) => s.question === q.id && s.answer === opt)?.total ?? 0;
                const pct = Math.round((t / n) * 100);
                return (
                  <li key={opt}>
                    <div className="flex justify-between text-sm"><span>{opt}</span><span className="text-muted-foreground">{t} ({pct}%)</span></div>
                    <div className="mt-1 h-2 rounded-full bg-muted"><div className="h-2 rounded-full bg-primary" style={{ width: `${pct}%` }} /></div>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function Page() {
  const [answers, setAnswers] = useState<Partial<Record<SurveyId, string>>>({});
  const [feedback, setFeedback] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [refresh, setRefresh] = useState(0);
  const complete = SURVEY.every((q) => answers[q.id] && isValidAnswer(q.id, answers[q.id]!));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!complete) return;
    setStatus("sending");
    const { error } = await supabase.from("survey_responses").insert({
      q1: answers.q1!, q2: answers.q2!, q3: answers.q3!, q4: answers.q4!, q5: answers.q5!,
      feedback: feedback.trim() ? feedback.trim().slice(0, 1000) : null,
    });
    if (error) return setStatus("error");
    setStatus("done");
    setRefresh((r) => r + 1);
  }

  return (
    <>
      <PageHero eyebrow="Participe" title="Pesquisa Comunitária">Um questionário rápido e anônimo para entender o que a comunidade sabe sobre TI Verde.</PageHero>

      <Section title="Questionário">
        <div className="mb-8 flex gap-3 rounded-2xl bg-secondary p-5 text-secondary-foreground">
          <ShieldCheck className="h-6 w-6 shrink-0" aria-hidden />
          <p className="text-sm">Esta pesquisa é <strong>100% anônima</strong>. Não pedimos nem armazenamos nome, e-mail, telefone, endereço IP ou qualquer outro identificador. Evite escrever dados pessoais no campo de feedback.</p>
        </div>

        {status === "done" ? (
          <div className="rounded-2xl bg-forest p-8 text-forest-foreground" role="status">
            <p className="font-display text-2xl">Obrigado por participar!</p>
            <p className="mt-2 opacity-85">Sua resposta anônima foi registrada e já está incluída nos resultados abaixo.</p>
          </div>
        ) : (
          <form onSubmit={submit} className="max-w-3xl space-y-6">
            {SURVEY.map((q, i) => (
              <fieldset key={q.id} className="rounded-2xl border bg-card p-6 shadow-card">
                <legend className="px-1 font-semibold"><span className="text-primary">{i + 1}.</span> {q.q}</legend>
                <div className="mt-3 grid gap-2">
                  {q.options.map((opt) => (
                    <label key={opt} className="flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm has-[:checked]:border-primary has-[:checked]:bg-secondary">
                      <input type="radio" name={q.id} value={opt} required checked={answers[q.id] === opt} onChange={() => setAnswers((a) => ({ ...a, [q.id]: opt }))} className="accent-primary" />
                      {opt}
                    </label>
                  ))}
                </div>
              </fieldset>
            ))}
            <div className="rounded-2xl border bg-card p-6 shadow-card">
              <label htmlFor="feedback" className="font-semibold">Feedback (opcional)</label>
              <p className="text-sm text-muted-foreground">Sugestões sobre o site ou o tema. Máximo de 1000 caracteres.</p>
              <textarea id="feedback" maxLength={1000} rows={4} value={feedback} onChange={(e) => setFeedback(e.target.value)} className="mt-3 w-full rounded-xl border bg-background p-3 text-sm" />
              <p className="mt-1 text-right text-xs text-muted-foreground">{feedback.length}/1000</p>
            </div>
            {status === "error" && <p className="text-destructive" role="alert">Não foi possível enviar. Tente novamente.</p>}
            <button type="submit" disabled={!complete || status === "sending"} className="rounded-full bg-primary px-8 py-3 font-semibold text-primary-foreground transition hover:brightness-110 disabled:opacity-50">
              {status === "sending" ? "Enviando…" : "Enviar respostas"}
            </button>
          </form>
        )}
      </Section>

      <Section kicker="Dados reais" title="Resultados da comunidade">
        <Results refreshKey={refresh} />
      </Section>
    </>
  );
}
