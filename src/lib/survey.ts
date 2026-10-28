export const SURVEY = [
  { id: "q1", q: "Você já tinha ouvido falar em TI Verde antes deste site?", options: ["Sim, conheço bem", "Já ouvi falar", "Nunca ouvi falar"] },
  { id: "q2", q: "Você sabia que data centers consomem uma parcela relevante da eletricidade mundial?", options: ["Sim", "Tinha uma ideia", "Não sabia"] },
  { id: "q3", q: "Com que frequência você descarta eletrônicos de forma correta (reciclagem/coleta)?", options: ["Sempre", "Às vezes", "Nunca", "Nunca precisei descartar"] },
  { id: "q4", q: "Na sua opinião, quem tem maior responsabilidade pela TI sustentável?", options: ["Empresas de tecnologia", "Governos", "Profissionais de TI", "Usuários", "Todos igualmente"] },
  { id: "q5", q: "Você conhecia o ODS 9 da ONU?", options: ["Sim", "Não", "Conhecia os ODS, mas não o 9"] },
] as const;

export type SurveyId = (typeof SURVEY)[number]["id"];

export function isValidAnswer(id: string, value: string) {
  const q = SURVEY.find((s) => s.id === id);
  return !!q && (q.options as readonly string[]).includes(value);
}
