import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { PageHero, Section, seo } from "@/components/site";

export const Route = createFileRoute("/referencias")({
  head: () => seo("Referências e fontes oficiais | EcoTech", "Links oficiais da IEA, ONU, Google, Microsoft, AWS e Equinix usados no conteúdo do EcoTech."),
  component: Page,
});

const REFS = [
  { org: "IEA – Agência Internacional de Energia", items: [["Energy and AI (2025)", "https://www.iea.org/reports/energy-and-ai"], ["Data centres and data transmission networks", "https://www.iea.org/energy-system/buildings/data-centres-and-data-transmission-networks"]] },
  { org: "ONU – Organização das Nações Unidas", items: [["ODS 9 – Nações Unidas Brasil", "https://brasil.un.org/pt-br/sdgs/9"], ["Goal 9 – UN Sustainable Development", "https://sdgs.un.org/goals/goal9"], ["Global E-waste Monitor (UNITAR/ITU)", "https://ewastemonitor.info/"]] },
  { org: "Google", items: [["Google Sustainability", "https://sustainability.google/"], ["Google data centers – eficiência", "https://datacenters.google/efficiency/"]] },
  { org: "Microsoft", items: [["Microsoft Sustainability", "https://www.microsoft.com/sustainability"], ["Relatórios ambientais da Microsoft", "https://www.microsoft.com/corporate-responsibility/sustainability/report"]] },
  { org: "AWS / Amazon", items: [["AWS Sustainability", "https://aws.amazon.com/sustainability/"], ["Amazon Sustainability", "https://sustainability.aboutamazon.com/"]] },
  { org: "Equinix", items: [["Equinix Sustainability", "https://sustainability.equinix.com/"]] },
];

function Page() {
  return (
    <>
      <PageHero eyebrow="Fontes" title="Referências">Todo o conteúdo do EcoTech se baseia em fontes oficiais. Acesse-as para aprofundar seus estudos.</PageHero>
      <Section title="Links oficiais">
        <div className="grid gap-6 md:grid-cols-2">
          {REFS.map((r) => (
            <div key={r.org} className="rounded-2xl border bg-card p-6 shadow-card">
              <h3 className="text-xl font-semibold">{r.org}</h3>
              <ul className="mt-4 space-y-3">
                {r.items.map(([t, url]) => (
                  <li key={url}>
                    <a href={url} target="_blank" rel="noreferrer" className="group inline-flex items-start gap-2 font-medium text-primary hover:underline">
                      <ExternalLink className="mt-1 h-4 w-4 shrink-0" aria-hidden />
                      <span>{t}<span className="block break-all text-xs font-normal text-muted-foreground">{url}</span></span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
