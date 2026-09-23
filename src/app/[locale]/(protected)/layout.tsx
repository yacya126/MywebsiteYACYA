import {LayoutDashboard, Settings, UserRound} from "lucide-react";
import {getTranslations} from "next-intl/server";
import {redirect} from "@/i18n/navigation";
import {Link} from "@/i18n/navigation";
import {createClient} from "@/lib/supabase/server";
import {hasSupabaseEnv} from "@/lib/supabase/env";
import {LogoutButton} from "@/components/auth/logout-button";
import type {AppLocale} from "@/i18n/routing";

export default async function ProtectedLayout({children, params}: {children: React.ReactNode; params: Promise<{locale: string}>}) {
  const {locale: localeParam} = await params;
  const locale = localeParam as AppLocale;
  if (!hasSupabaseEnv()) redirect({href: "/login?error=notConfigured", locale});
  const supabase = await createClient();
  const {data: {user}} = await supabase.auth.getUser();
  if (!user) redirect({href: "/login", locale});
  const t = await getTranslations("dashboard");
  const items = [{href: "/dashboard", label: t("navOverview"), icon: LayoutDashboard}, {href: "/profile", label: t("navProfile"), icon: UserRound}, {href: "/settings", label: t("navSettings"), icon: Settings}] as const;

  return <div className="min-h-screen bg-muted/30"><header className="border-b bg-background"><div className="mx-auto flex h-16 max-w-6xl items-center px-5"><Link href="/" className="font-semibold">{t("brand")}</Link><div className="ml-auto"><LogoutButton /></div></div></header><div className="mx-auto grid max-w-6xl gap-8 px-5 py-8 md:grid-cols-[210px_1fr]"><aside><nav className="flex gap-2 overflow-x-auto md:flex-col">{items.map(({href, label, icon: Icon}) => <Link key={href} href={href} className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-muted-foreground hover:bg-background hover:text-foreground"><Icon className="size-4" />{label}</Link>)}</nav></aside><main>{children}</main></div></div>;
}
