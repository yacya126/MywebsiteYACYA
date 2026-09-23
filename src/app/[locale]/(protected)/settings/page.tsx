import {getTranslations} from "next-intl/server";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
export default async function Page() { const t = await getTranslations("settings"); return <div><h1 className="text-3xl font-semibold tracking-tight">{t("title")}</h1><p className="mt-2 text-muted-foreground">{t("description")}</p><Card className="mt-8"><CardHeader><CardTitle>{t("cardTitle")}</CardTitle></CardHeader><CardContent className="text-sm text-muted-foreground">{t("comingSoon")}</CardContent></Card></div>; }
