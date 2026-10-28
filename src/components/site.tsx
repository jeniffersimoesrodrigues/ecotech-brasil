import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Leaf, Menu, X } from "lucide-react";

export const NAV = [
  { to: "/", label: "Início" },
  { to: "/ti-verde", label: "TI Verde" },
  { to: "/data-centers", label: "Data Centers" },
  { to: "/empresas", label: "Empresas" },
  { to: "/ods-9", label: "ODS 9" },
  { to: "/pesquisa", label: "Pesquisa" },
  { to: "/referencias", label: "Referências" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground">
        Pular para o conteúdo
      </a>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-semibold text-primary">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground"><Leaf className="h-5 w-5" aria-hidden /></span>
          EcoTech
        </Link>
        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex gap-1">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link to={n.to} activeOptions={{ exact: true }} className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground" activeProps={{ className: "bg-secondary text-secondary-foreground" }}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <button className="rounded-md p-2 lg:hidden" aria-expanded={open} aria-controls="menu-movel" aria-label={open ? "Fechar menu" : "Abrir menu"} onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav id="menu-movel" aria-label="Menu móvel" className="border-t lg:hidden">
          <ul className="mx-auto grid max-w-6xl gap-1 px-4 py-3">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link to={n.to} onClick={() => setOpen(false)} activeOptions={{ exact: true }} className="block rounded-md px-3 py-2 font-medium" activeProps={{ className: "bg-secondary text-secondary-foreground" }}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-forest text-forest-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl">EcoTech</p>
          <p className="mt-2 text-sm opacity-80">TI Verde e Infraestrutura Sustentável — um projeto educacional sobre tecnologia responsável e o ODS 9.</p>
        </div>
        <nav aria-label="Rodapé">
          <p className="text-sm font-semibold uppercase tracking-wider opacity-70">Páginas</p>
          <ul className="mt-3 grid grid-cols-2 gap-2 text-sm">
            {NAV.map((n) => <li key={n.to}><Link to={n.to} className="opacity-90 hover:underline">{n.label}</Link></li>)}
          </ul>
        </nav>
        <div className="text-sm opacity-80">
          <p className="font-semibold uppercase tracking-wider opacity-90">Privacidade</p>
          <p className="mt-3">A pesquisa é anônima: não coletamos nomes, e-mails, telefones nem IPs.</p>
          <p className="mt-3">Conteúdo para fins educacionais. Dados citados com fontes oficiais.</p>
        </div>
      </div>
      <p className="border-t border-forest-foreground/15 py-4 text-center text-xs opacity-70">© {new Date().getFullYear()} EcoTech · Projeto educacional</p>
    </footer>
  );
}

export function PageHero({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <section className="bg-hero text-forest-foreground">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-leaf">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight md:text-6xl">{title}</h1>
        {children && <div className="mt-6 max-w-2xl text-lg opacity-90">{children}</div>}
      </div>
    </section>
  );
}

export function InfoCard({ icon, title, children }: { icon?: ReactNode; title: string; children: ReactNode }) {
  return (
    <article className="rounded-2xl border bg-card p-6 shadow-card">
      {icon && <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-secondary text-secondary-foreground">{icon}</div>}
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="mt-2 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </article>
  );
}

export function Section({ title, kicker, children }: { title: string; kicker?: string; children: ReactNode }) {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-16">
      {kicker && <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">{kicker}</p>}
      <h2 className="mt-2 text-3xl font-semibold md:text-4xl">{title}</h2>
      <div className="mt-8">{children}</div>
    </section>
  );
}

export function seo(title: string, description: string) {
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  };
}
