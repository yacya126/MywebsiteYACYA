import type {LucideIcon} from "lucide-react";

export function ContentPage({eyebrow, title, description, icon: Icon, children}: {eyebrow: string; title: string; description: string; icon: LucideIcon; children?: React.ReactNode}) {
  return <section className="mx-auto min-h-[68vh] max-w-6xl px-5 py-20 sm:py-28"><div className="max-w-3xl"><div className="mb-7 grid size-12 place-items-center rounded-2xl border bg-card"><Icon className="size-5 text-accent" /></div><p className="text-sm font-medium text-accent">{eyebrow}</p><h1 className="mt-3 text-4xl font-semibold tracking-[-0.035em] sm:text-6xl">{title}</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">{description}</p></div>{children}</section>;
}
