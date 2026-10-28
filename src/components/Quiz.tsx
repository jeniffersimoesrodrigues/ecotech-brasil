import { useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";

const QUESTIONS = [
  { q: "O que mede o indicador PUE em um data center?", options: ["A velocidade da rede", "A relação entre a energia total da instalação e a energia usada pelos equipamentos de TI", "O número de servidores ativos", "A quantidade de água consumida"], correct: 1, explain: "PUE = energia total ÷ energia de TI. Quanto mais próximo de 1, mais eficiente." },
  { q: "Qual prática reduz o lixo eletrônico?", options: ["Trocar equipamentos todo ano", "Descartar no lixo comum", "Reparar, reutilizar e reciclar com empresas certificadas", "Guardar aparelhos antigos sem uso"], correct: 2, explain: "A economia circular prolonga a vida útil e recupera materiais." },
  { q: "A virtualização de servidores ajuda a TI Verde porque…", options: ["Permite rodar várias máquinas virtuais em menos hardware físico", "Aumenta o número de servidores físicos", "Desliga a internet à noite", "Elimina a necessidade de energia"], correct: 0, explain: "Consolidar cargas reduz equipamentos ociosos e o consumo de energia." },
  { q: "Qual ODS trata de indústria, inovação e infraestrutura?", options: ["ODS 7", "ODS 9", "ODS 12", "ODS 13"], correct: 1, explain: "O ODS 9 busca infraestrutura resiliente, industrialização sustentável e inovação." },
  { q: "Um exemplo de ação de software verde é:", options: ["Carregar imagens sem compressão", "Fazer consultas repetidas desnecessárias", "Otimizar algoritmos e usar cache", "Manter processos rodando sem necessidade"], correct: 2, explain: "Menos processamento significa menos energia gasta." },
];

export function Quiz() {
  const [answers, setAnswers] = useState<(number | null)[]>(QUESTIONS.map(() => null));
  const done = answers.every((a) => a !== null);
  const score = answers.filter((a, i) => a === QUESTIONS[i]?.correct).length;

  return (
    <div className="space-y-6">
      {QUESTIONS.map((item, i) => (
        <fieldset key={i} className="rounded-2xl border bg-card p-6 shadow-card">
          <legend className="sr-only">Pergunta {i + 1}</legend>
          <p className="font-semibold"><span className="text-primary">{i + 1}.</span> {item.q}</p>
          <div className="mt-4 grid gap-2">
            {item.options.map((opt, j) => {
              const chosen = answers[i] === j;
              const answered = answers[i] !== null;
              const isCorrect = j === item.correct;
              const state = answered && isCorrect ? "border-primary bg-secondary" : chosen ? "border-destructive bg-destructive/10" : "hover:bg-muted";
              return (
                <button key={j} type="button" disabled={answered} aria-pressed={chosen} onClick={() => setAnswers((a) => a.map((v, k) => (k === i ? j : v)))} className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition ${state}`}>
                  {opt}
                  {answered && isCorrect && <CheckCircle2 className="h-5 w-5 text-primary" aria-label="Correta" />}
                  {chosen && !isCorrect && <XCircle className="h-5 w-5 text-destructive" aria-label="Incorreta" />}
                </button>
              );
            })}
          </div>
          {answers[i] !== null && <p className="mt-3 text-sm text-muted-foreground" role="status">{item.explain}</p>}
        </fieldset>
      ))}
      {done && (
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-forest p-6 text-forest-foreground" role="status">
          <p className="text-lg">Você acertou <strong>{score} de {QUESTIONS.length}</strong> perguntas.</p>
          <button type="button" onClick={() => setAnswers(QUESTIONS.map(() => null))} className="rounded-full bg-accent px-5 py-2 font-semibold text-accent-foreground">Refazer quiz</button>
        </div>
      )}
    </div>
  );
}
