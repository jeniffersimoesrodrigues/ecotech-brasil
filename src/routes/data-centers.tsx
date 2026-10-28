import { createFileRoute } from "@tanstack/react-router";
import { Snowflake, Sun, Gauge, Droplets, Cpu, Flame } from "lucide-react";
import { InfoCard, PageHero, Section, seo } from "@/components/site";

export const Route = createFileRoute("/data-centers")({
  head: () => seo("Data Centers Sustentáveis | EcoTech", "Entenda o consumo energético dos data centers, o indicador PUE e as tecnologias que tornam essas instalações mais sustentáveis."),
  component: Page,
});

// Valores aproximados do relatório "Energy and AI" (IEA, 2025), cenário base.
const DATA = [
  { year: "2024", value: 415, label: "Estimativa" },
  { year: "2030", value: 945, label: "Projeção" },
];

function EnergyChart() {
  const max = 1000;
  return (
    <figure className="rounded-2xl border bg-card p-6 shadow-card">
      <figcaption className="font-semibold">Consumo global de eletricidade dos data centers (TWh)</figcaption>
      <div className="mt-8 flex h-72 items-end gap-10 border-b border-l pl-4" role="img" aria-label="Gráfico de barras: cerca de 415 TWh em 2024 e projeção de cerca de 945 TWh em 2030">
        {DATA.map((d) => (
          <div key={d.year} className="flex flex-1 flex-col items-center justify-end h-full">
            <span className="mb-2 font-display text-2xl text-primary">~{d.value}</span>
            <div className={`w-full max-w-32 rounded-t-xl ${d.label === "Projeção" ? "bg-leaf" : "bg-primary"}`} style={{ height: `${(d.value / max) * 100}%` }} />
          </div>
        ))}
      </div>
      <div className="mt-2 flex gap-10 pl-4">
        {DATA.map((d) => <p key={d.year} className="flex-1 text-center text-sm"><strong>{d.year}</strong> · {d.label}</p>)}
      </div>
      <p className="mt-6 text-xs text-muted-foreground">Gráfico ilustrativo com valores aproximados do cenário base do relatório <a className="underline" href="https://www.iea.org/reports/energy-and-ai" target="_blank" rel="noreferrer">Energy and AI (IEA, 2025)</a>. Projeções dependem de premissas e podem ser revisadas.</p>
    </figure>
  );
}

function Page() {
  return (
    <>
      <PageHero eyebrow="Infraestrutura" title="Data Centers Sustentáveis">
        Os data centers são o coração da internet e da nuvem. Torná-los eficientes é uma das maiores alavancas da TI Verde.
      </PageHero>

      <Section kicker="Contexto" title="Quanta energia os data centers consomem?">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="prose-eco">
            <p>Um data center abriga milhares de servidores, sistemas de armazenamento e equipamentos de rede que funcionam 24 horas por dia. Além dos equipamentos de TI, há consumo com <strong>resfriamento, iluminação, segurança e conversão de energia</strong>.</p>
            <p>A IEA estima que os data centers usaram cerca de <strong>415 TWh em 2024</strong> — aproximadamente 1,5% da eletricidade mundial — e projeta perto de <strong>945 TWh em 2030</strong> no cenário base, com a inteligência artificial como principal fator de crescimento.</p>
            <p>Por isso, eficiência e energia limpa são decisivas: o mesmo serviço digital pode ter pegadas muito diferentes dependendo de onde e como é executado.</p>
          </div>
          <EnergyChart />
        </div>
      </Section>

      <Section kicker="Indicador-chave" title="PUE: Power Usage Effectiveness">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div className="rounded-2xl bg-forest p-8 text-forest-foreground">
            <p className="text-sm uppercase tracking-widest opacity-70">Fórmula</p>
            <p className="mt-4 font-display text-3xl md:text-4xl">PUE = Energia total ÷ Energia de TI</p>
            <p className="mt-4 opacity-85">Um PUE de 1,0 seria o ideal teórico: toda a energia indo para a computação.</p>
          </div>
          <div className="prose-eco">
            <p><strong>Exemplo prático:</strong> se uma instalação consome 1.500 kWh e os equipamentos de TI usam 1.000 kWh, o PUE é 1,5 — ou seja, 500 kWh foram gastos com resfriamento e outras estruturas.</p>
            <p>Outros indicadores complementam o PUE, como o <strong>WUE</strong> (eficiência no uso da água) e o <strong>CUE</strong> (intensidade de carbono).</p>
          </div>
        </div>
      </Section>

      <Section kicker="Soluções" title="Tecnologias que fazem a diferença">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <InfoCard icon={<Snowflake />} title="Free cooling">Uso do ar ou da água externos frios para resfriar a instalação, reduzindo o uso de compressores.</InfoCard>
          <InfoCard icon={<Droplets />} title="Resfriamento líquido">Líquido levado diretamente aos chips, essencial para servidores de IA de alta densidade.</InfoCard>
          <InfoCard icon={<Sun />} title="Energia renovável">Contratos de compra de energia (PPAs) solar e eólica e metas de energia livre de carbono.</InfoCard>
          <InfoCard icon={<Gauge />} title="Gestão por IA">Algoritmos ajustam resfriamento e cargas em tempo real para economizar energia.</InfoCard>
          <InfoCard icon={<Cpu />} title="Hardware eficiente">Processadores e chips especializados que entregam mais desempenho por watt.</InfoCard>
          <InfoCard icon={<Flame />} title="Reuso de calor">O calor gerado pode aquecer prédios e redes de aquecimento urbano.</InfoCard>
        </div>
      </Section>
    </>
  );
}
