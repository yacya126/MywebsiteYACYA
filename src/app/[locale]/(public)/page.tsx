import {ArrowRight, Database, Globe2, Layers3, ShieldCheck, Sparkles} from "lucide-react";
import {getTranslations, setRequestLocale} from "next-intl/server";
import {Link} from "@/i18n/navigation";
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";

export default async function HomePage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const features = [
    {icon: Layers3, title: t("featureStackTitle"), text: t("featureStackText")},
    {icon: ShieldCheck, title: t("featureSecurityTitle"), text: t("featureSecurityText")},
    {icon: Globe2, title: t("featureI18nTitle"), text: t("featureI18nText")}
  ];

  return <>
    <section className="relative overflow-hidden border-b border-border/60">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_75%_25%,color-mix(in_oklab,var(--accent)_18%,transparent),transparent_32%),radial-gradient(circle_at_20%_80%,color-mix(in_oklab,var(--primary)_8%,transparent),transparent_30%)]" />
      <div className="mx-auto grid min-h-[72vh] max-w-6xl items-center gap-12 px-5 py-24 lg:grid-cols-[1.2fr_.8fr]">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background/70 px-3 py-1.5 text-sm text-muted-foreground"><Sparkles className="size-4 text-accent" />{t("eyebrow")}</div>
          <h1 className="max-w-3xl text-5xl font-semibold leading-[1.05] tracking-[-0.045em] sm:text-7xl">{t("title")}</h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">{t("subtitle")}</p>
          <div className="mt-9 flex flex-wrap gap-3"><Button asChild size="lg"><Link href="/projects">{t("viewProjects")}<ArrowRight className="size-4" /></Link></Button><Button asChild size="lg" variant="outline"><Link href="/about">{t("aboutMe")}</Link></Button></div>
        </div>
        <div className="relative mx-auto aspect-square w-full max-w-sm rounded-[2.5rem] border bg-card p-5 shadow-2xl shadow-foreground/5">
          <div className="flex h-full flex-col justify-between rounded-[1.75rem] bg-foreground p-7 text-background">
            <Database className="size-8 text-accent" />
            <div><p className="font-mono text-xs uppercase tracking-[.2em] text-background/55">{t("cardLabel")}</p><p className="mt-3 text-3xl font-medium tracking-tight">{t("cardTitle")}</p></div>
            <div className="grid grid-cols-3 gap-2">{["Next.js", "Supabase", "TypeScript"].map((item) => <span key={item} className="rounded-full border border-background/15 px-2 py-1 text-center text-[10px] text-background/65">{item}</span>)}</div>
          </div>
        </div>
      </div>
    </section>
    <section className="mx-auto max-w-6xl px-5 py-24"><div className="mb-12 max-w-xl"><p className="text-sm font-medium text-accent">{t("foundation")}</p><h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{t("foundationTitle")}</h2></div><div className="grid gap-5 md:grid-cols-3">{features.map(({icon: Icon, title, text}) => <Card key={title} className="bg-card/65"><CardContent className="p-7"><Icon className="mb-10 size-6 text-accent" /><h3 className="text-lg font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p></CardContent></Card>)}</div></section>
  </>;
}
