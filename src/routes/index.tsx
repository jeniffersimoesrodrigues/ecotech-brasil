import { createFileRoute, Link } from "@tanstack/react-router";
import { Cpu, Server, Building2, Target, ClipboardList, BookOpen, ArrowRight } from "lucide-react";
import hero from "@/assets/hero-datacenter.jpg";
import { InfoCard, Section, seo } from "@/components/site";

export const Route = createFileRoute("/")({
  head: () => seo("EcoTech – TI Verde e Infraestrutura Sustentável", "Aprenda sobre TI Verde, data centers sustentáveis, empresas líderes e o ODS 9 da ONU em um site educacional completo."),
  component: Index,
});

const cards = [
  { to: "/ti-verde", icon: <Cpu />, title: "TI Verde", text: "Práticas para reduzir o impacto ambiental da tecnologia, do hardware ao software." },
  { to: "/data-centers", icon: <Server />, title: "Data Centers Sustentáveis", text: "Eficiência energética, PUE, resfriamento e energia renovável." },
  { to: "/empresas", icon: <Building2 />, title: "Empresas Sustentáveis", text: "Como Google, Microsoft, AWS e Equinix enfrentam o desafio climático." },
  { to: "/ods-9", icon: <Target />, title: "ODS 9", text: "Indústria, inovação e infraestrutura — e o papel da Ciência da Computação." },
  { to: "/pesquisa", icon: <ClipboardList />, title: "Pesquisa Comunitária", text: "Questionário anônimo sobre seus conhecimentos de TI Verde." },
  { to: "/referencias", icon: <BookOpen />, title: "Referências", text: "Fontes oficiais da IEA, ONU e das empresas citadas." },
] as const;

function Index() {
  return (
    <>
      <section className="relative overflow-hidden bg-forest text-forest-foreground">
        <img src={hero} alt="Data center moderno cercado por floresta, painéis solares e turbinas eólicas" className="absolute inset-0 h-full w-full object-cover opacity-40" width={1600} height={900} />
        <div className="absolute inset-0 bg-hero opacity-70" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-4 py-24 md:py-36">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-leaf">Projeto educacional</p>
          <h1 className="mt-4 max-w-3xl text-5xl font-semibold leading-[1.05] md:text-7xl">Tecnologia que respeita o planeta.</h1>
          <p className="mt-6 max-w-2xl text-lg opacity-90">
            O EcoTech explica, de forma clara e com fontes oficiais, como a Tecnologia da Informação pode crescer consumindo menos energia, gerando menos resíduos e apoiando a Agenda 2030 da ONU.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/ti-verde" className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-accent-foreground transition hover:brightness-105">Começar a aprender <ArrowRight className="h-4 w-4" /></Link>
            <Link to="/pesquisa" className="inline-flex items-center rounded-full border border-forest-foreground/40 px-6 py-3 font-semibold hover:bg-forest-foreground/10">Responder à pesquisa</Link>
          </div>
        </div>
      </section>

      <Section kicker="Por que importa" title="O digital também tem pegada ambiental">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="prose-eco">
            <p>Cada busca, vídeo, mensagem ou modelo de inteligência artificial depende de servidores, redes e dispositivos que consomem energia e matérias-primas. Segundo a Agência Internacional de Energia (IEA), os data centers consumiram cerca de <strong>1,5% da eletricidade mundial em 2024</strong>, e esse consumo pode mais que dobrar até 2030, impulsionado principalmente pela IA.</p>
            <p>A <strong>TI Verde</strong> reúne práticas, tecnologias e políticas para que esse crescimento aconteça com eficiência, energia limpa e economia circular.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <InfoCard title="Energia">Eficiência de servidores, resfriamento inteligente e compra de energia renovável.</InfoCard>
            <InfoCard title="Água">Data centers usam água para resfriamento; empresas buscam reduzir e repor esse uso.</InfoCard>
            <InfoCard title="Resíduos">Lixo eletrônico exige reutilização, reparo e reciclagem responsável.</InfoCard>
            <InfoCard title="Software">Código eficiente consome menos processamento — e, portanto, menos energia.</InfoCard>
          </div>
        </div>
      </Section>

      <Section kicker="Explore" title="O que você encontra aqui">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => (
            <Link key={c.to} to={c.to} className="group rounded-2xl border bg-card p-6 shadow-card transition hover:-translate-y-1 hover:border-primary">
              <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-secondary text-secondary-foreground">{c.icon}</div>
              <h3 className="text-lg font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.text}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">Acessar <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
