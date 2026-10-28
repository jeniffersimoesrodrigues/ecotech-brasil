import { createFileRoute } from "@tanstack/react-router";
import { Recycle, Zap, Code2, Laptop, Cloud, Users } from "lucide-react";
import { InfoCard, PageHero, Section, seo } from "@/components/site";
import { Quiz } from "@/components/Quiz";

export const Route = createFileRoute("/ti-verde")({
  head: () => seo("TI Verde: o que é e como aplicar | EcoTech", "Conceitos, pilares e exemplos práticos de TI Verde, com quiz educativo para testar seus conhecimentos."),
  component: Page,
});

const ciclo = ["Projeto eco-eficiente", "Fabricação responsável", "Uso eficiente", "Reuso e reparo", "Reciclagem certificada"];

function Page() {
  return (
    <>
      <PageHero eyebrow="Conceitos" title="TI Verde: tecnologia com responsabilidade ambiental">
        TI Verde (Green IT) é o conjunto de práticas que reduz o impacto ambiental da tecnologia durante todo o seu ciclo de vida.
      </PageHero>

      <Section kicker="Entenda" title="O que é TI Verde?">
        <div className="prose-eco max-w-3xl">
          <p>O termo engloba o <strong>projeto, a fabricação, o uso e o descarte</strong> de computadores, servidores, redes e software de forma eficiente e com o menor impacto possível. Não se trata apenas de economizar energia: envolve também a escolha de materiais, a redução de emissões de gases de efeito estufa, o uso consciente de água e a gestão correta do lixo eletrônico.</p>
          <p>Para organizações, a TI Verde costuma trazer um benefício duplo: <strong>redução de custos operacionais</strong> (menos energia e equipamentos) e <strong>alinhamento com metas ambientais</strong> e de governança (ESG).</p>
        </div>
      </Section>

      <Section kicker="Pilares" title="Seis frentes de atuação">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <InfoCard icon={<Zap />} title="Eficiência energética">Equipamentos com certificações de eficiência, gerenciamento de energia e desligamento automático de máquinas ociosas.</InfoCard>
          <InfoCard icon={<Cloud />} title="Virtualização e nuvem">Consolidar cargas em menos servidores físicos aumenta a taxa de utilização e reduz desperdício.</InfoCard>
          <InfoCard icon={<Code2 />} title="Software verde">Algoritmos eficientes, cache, compressão de dados e menos requisições reduzem o processamento.</InfoCard>
          <InfoCard icon={<Recycle />} title="Economia circular">Prolongar a vida útil, reparar, recondicionar e reciclar com empresas certificadas.</InfoCard>
          <InfoCard icon={<Laptop />} title="Trabalho digital consciente">Videoconferências no lugar de viagens, impressão sob demanda e documentos digitais.</InfoCard>
          <InfoCard icon={<Users />} title="Cultura e governança">Políticas internas, metas mensuráveis e capacitação das equipes.</InfoCard>
        </div>
      </Section>

      <Section kicker="Infográfico" title="Ciclo de vida sustentável de um equipamento">
        <ol className="grid gap-4 md:grid-cols-5" aria-label="Etapas do ciclo de vida">
          {ciclo.map((c, i) => (
            <li key={c} className="relative rounded-2xl bg-secondary p-5 text-secondary-foreground">
              <span className="font-display text-4xl text-primary">{String(i + 1).padStart(2, "0")}</span>
              <p className="mt-2 font-semibold">{c}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section kicker="Na prática" title="Exemplos que você pode aplicar">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border p-6"><h3 className="font-semibold">Em casa</h3><ul className="prose-eco"><li>Ative o modo de economia de energia.</li><li>Desligue roteadores e monitores sem uso.</li><li>Doe ou recicle celulares antigos em pontos de coleta.</li></ul></div>
          <div className="rounded-2xl border p-6"><h3 className="font-semibold">Na empresa</h3><ul className="prose-eco"><li>Virtualize servidores subutilizados.</li><li>Defina políticas de renovação de hardware mais longas.</li><li>Escolha provedores de nuvem com metas de energia limpa.</li></ul></div>
          <div className="rounded-2xl border p-6"><h3 className="font-semibold">No código</h3><ul className="prose-eco"><li>Otimize imagens e use carregamento sob demanda.</li><li>Evite consultas repetidas ao banco de dados.</li><li>Agende tarefas pesadas para horários de energia mais limpa.</li></ul></div>
        </div>
      </Section>

      <Section kicker="Quiz educativo" title="Teste seus conhecimentos">
        <div className="max-w-3xl"><Quiz /></div>
      </Section>
    </>
  );
}
