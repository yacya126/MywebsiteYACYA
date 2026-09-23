import {getTranslations} from "next-intl/server";
import {Link} from "@/i18n/navigation";
import {Button} from "@/components/ui/button";
export default async function NotFound() { const t = await getTranslations("notFound"); return <main className="grid min-h-screen place-items-center px-5 text-center"><div><p className="font-mono text-accent">404</p><h1 className="mt-4 text-4xl font-semibold">{t("title")}</h1><p className="mt-3 text-muted-foreground">{t("description")}</p><Button asChild className="mt-7"><Link href="/">{t("home")}</Link></Button></div></main>; }
