import {ArrowUpRight, Code2} from "lucide-react";
import {getTranslations} from "next-intl/server";
import {Link} from "@/i18n/navigation";
import {Button} from "@/components/ui/button";
import {LocaleSwitcher} from "@/components/locale-switcher";
import {ThemeToggle} from "@/components/theme-toggle";
import {createClient} from "@/lib/supabase/server";
import {hasSupabaseEnv} from "@/lib/supabase/env";

export async function SiteHeader() {
  const t = await getTranslations("nav");
  let signedIn = false;
  if (hasSupabaseEnv()) {
    const supabase = await createClient();
    const {data} = await supabase.auth.getUser();
    signedIn = Boolean(data.user);
  }

  const links = [
    ["about", t("about")],
    ["projects", t("projects")],
    ["blog", t("blog")],
    ["contact", t("contact")]
  ] as const;

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-5 px-5">
        <Link href="/" className="mr-auto flex items-center gap-2 font-semibold tracking-tight">
          <span className="grid size-8 place-items-center rounded-full bg-foreground text-background"><Code2 className="size-4" /></span>
          {t("brand")}
        </Link>
        <nav className="hidden items-center gap-5 text-sm text-muted-foreground md:flex" aria-label={t("primaryNav")}>
          {links.map(([href, label]) => <Link key={href} href={`/${href}`} className="transition-colors hover:text-foreground">{label}</Link>)}
        </nav>
        <LocaleSwitcher />
        <ThemeToggle />
        <Button asChild size="sm">
          <Link href={signedIn ? "/dashboard" : "/login"}>
            {signedIn ? t("dashboard") : t("login")}<ArrowUpRight className="size-4" />
          </Link>
        </Button>
      </div>
    </header>
  );
}
