import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { PageHero, Section, seo } from "@/components/site";

export const Route = createFileRoute("/empresas")({
  head: () => seo("Empresas Sustentáveis: Google, Microsoft, AWS e Equinix | EcoTech", "Conheça as metas e iniciativas de sustentabilidade de Google, Microsoft, AWS e Equinix em seus data centers."),
  component: Page,
});

const EMPRESAS = [
  { nome: "Google", meta: "Energia livre de carbono 24/7 até 2030", texto: "O Google tem como objetivo operar com energia livre de carbono em todas as horas do dia, em todas as redes onde atua, até 2030, além de buscar emissões líquidas zero em suas operações e cadeia de valor. Utiliza IA para otimizar o resfriamento dos data centers e publica relatórios anuais de impacto ambiental.", exemplos: ["Monitoramento horário de energia limpa por região", "Ferramenta Carbon Footprint no Google Cloud", "Metas de reposição de água"], link: "https://sustainability.google/" },
  { nome: "Microsoft", meta: "Carbono negativo até 2030", texto: "A Microsoft se comprometeu a ser carbono negativa, positiva em água e zero resíduos até 2030, e a remover até 2050 todo o carbono emitido historicamente desde sua fundação. Investe em remoção de carbono, novos materiais de construção e projetos de resfriamento com menor uso de água.", exemplos: ["Emissions Impact Dashboard para clientes", "Circular Centers para reuso de servidores", "Pesquisa em data centers com resfriamento sem água evaporativa"], link: "https://www.microsoft.com/sustainability" },
  { nome: "AWS", meta: "Net zero até 2040 (The Climate Pledge)", texto: "A Amazon Web Services faz parte do The Climate Pledge, compromisso da Amazon de alcançar emissões líquidas zero até 2040. A Amazon é uma das maiores compradoras corporativas de energia renovável do mundo e a AWS busca ser positiva em água até 2030.", exemplos: ["Processadores Graviton com melhor desempenho por watt", "Customer Carbon Footprint Tool", "Pilar de Sustentabilidade no AWS Well-Architected"], link: "https://sustainability.aboutamazon.com/" },
  { nome: "Equinix", meta: "Neutralidade climática até 2030", texto: "A Equinix, uma das maiores operadoras de data centers de colocation do mundo, tem meta de neutralidade climática até 2030, apoiada por metas baseadas na ciência (SBTi). Amplia o uso de energia renovável em seus sites e testa tecnologias como resfriamento líquido e reaproveitamento de calor.", exemplos: ["Cobertura renovável crescente no portfólio global", "Projetos de reuso de calor para comunidades", "Relatórios anuais de sustentabilidade"], link: "https://sustainability.equinix.com/" },
];

function Page() {
  return (
    <>
      <PageHero eyebrow="Casos reais" title="Empresas que lideram a infraestrutura sustentável">
        Quatro gigantes da infraestrutura digital e suas estratégias públicas para reduzir o impacto ambiental.
      </PageHero>

      <Section kicker="Panorama" title="Metas declaradas">
        <div className="grid gap-6 md:grid-cols-2">
          {EMPRESAS.map((e) => (
            <article key={e.nome} className="flex flex-col rounded-2xl border bg-card p-7 shadow-card">
              <h3 className="text-2xl font-semibold">{e.nome}</h3>
              <p className="mt-2 inline-block w-fit rounded-full bg-secondary px-3 py-1 text-sm font-semibold text-secondary-foreground">{e.meta}</p>
              <p className="mt-4 leading-relaxed text-muted-foreground">{e.texto}</p>
              <ul className="mt-4 space-y-1 text-sm">
                {e.exemplos.map((x) => <li key={x} className="flex gap-2"><span className="text-primary" aria-hidden>●</span>{x}</li>)}
              </ul>
              <a href={e.link} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-1 font-semibold text-primary hover:underline">Site oficial de sustentabilidade <ExternalLink className="h-4 w-4" aria-hidden /></a>
            </article>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted-foreground">As metas acima são resumos de compromissos públicos das empresas. Consulte as fontes oficiais para os detalhes e atualizações mais recentes.</p>
      </Section>

      <Section kicker="Lições" title="O que essas estratégias têm em comum">
        <ol className="grid gap-4 md:grid-cols-4">
          {["Metas públicas e com prazo", "Compra de energia renovável", "Inovação em resfriamento e hardware", "Ferramentas de transparência para clientes"].map((t, i) => (
            <li key={t} className="rounded-2xl bg-forest p-6 text-forest-foreground"><span className="font-display text-3xl text-leaf">{i + 1}</span><p className="mt-2 font-semibold">{t}</p></li>
          ))}
        </ol>
      </Section>
    </>
  );
}
