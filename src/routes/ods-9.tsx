import { createFileRoute } from "@tanstack/react-router";
import { Factory, Lightbulb, Network, Code2, Database, ShieldCheck, Brain, GraduationCap } from "lucide-react";
import { InfoCard, PageHero, Section, seo } from "@/components/site";

export const Route = createFileRoute("/ods-9")({
  head: () => seo("ODS 9: Indústria, Inovação e Infraestrutura | EcoTech", "O ODS 9 da ONU e as contribuições do profissional de Ciência da Computação para uma infraestrutura sustentável."),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero eyebrow="Agenda 2030 da ONU" title="ODS 9 — Indústria, Inovação e Infraestrutura">
        Construir infraestruturas resilientes, promover a industrialização inclusiva e sustentável e fomentar a inovação.
      </PageHero>

      <section className="mx-auto -mt-10 max-w-6xl px-4">
        <div className="grid items-center gap-6 rounded-3xl bg-accent p-8 text-accent-foreground shadow-card md:grid-cols-[auto_1fr]">
          <p className="font-display text-8xl font-semibold leading-none">9</p>
          <p className="text-lg">O ODS 9 é um dos 17 Objetivos de Desenvolvimento Sustentável adotados pelos Estados-membros da ONU em 2015. A tecnologia da informação é base para quase todas as suas metas: conectividade, pesquisa, indústria limpa e infraestrutura digital.</p>
        </div>
      </section>

      <Section kicker="Metas" title="Destaques do ODS 9">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <InfoCard icon={<Network />} title="9.1 Infraestrutura">Infraestrutura de qualidade, confiável, sustentável e resiliente, com acesso equitativo.</InfoCard>
          <InfoCard icon={<Factory />} title="9.4 Indústria limpa">Modernizar indústrias com uso eficiente de recursos e tecnologias limpas.</InfoCard>
          <InfoCard icon={<Lightbulb />} title="9.5 Pesquisa">Fortalecer a pesquisa científica e incentivar a inovação.</InfoCard>
          <InfoCard icon={<Network />} title="9.c Conectividade">Ampliar o acesso às tecnologias de informação e comunicação e à internet.</InfoCard>
        </div>
      </Section>

      <Section kicker="Profissão" title="Contribuições do profissional de Ciência da Computação">
        <div className="prose-eco max-w-3xl">
          <p>Quem estuda Ciência da Computação tem papel direto no ODS 9: é esse profissional que <strong>projeta, programa e otimiza</strong> os sistemas que sustentam a infraestrutura digital. Escolhas técnicas aparentemente pequenas, multiplicadas por milhões de usuários, têm grande impacto energético.</p>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <InfoCard icon={<Code2 />} title="Software eficiente">Escolher algoritmos e estruturas de dados com menor complexidade reduz tempo de CPU e energia.</InfoCard>
          <InfoCard icon={<Database />} title="Arquitetura de nuvem">Dimensionar recursos corretamente, usar autoescalonamento e regiões com energia mais limpa.</InfoCard>
          <InfoCard icon={<Brain />} title="IA responsável">Treinar modelos de forma eficiente, reutilizar modelos e medir a pegada de carbono.</InfoCard>
          <InfoCard icon={<ShieldCheck />} title="Infraestrutura resiliente">Sistemas seguros, redundantes e acessíveis que sustentam serviços essenciais.</InfoCard>
          <InfoCard icon={<Network />} title="Inclusão digital">Soluções leves que funcionam em conexões lentas e aparelhos simples.</InfoCard>
          <InfoCard icon={<GraduationCap />} title="Pesquisa e inovação">Desenvolver novas técnicas de computação verde, sensores e cidades inteligentes.</InfoCard>
        </div>
      </Section>
    </>
  );
}
