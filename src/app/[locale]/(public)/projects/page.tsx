import {Blocks} from "lucide-react";
import {getTranslations} from "next-intl/server";
import {ContentPage} from "@/components/content-page";
import {Card, CardContent} from "@/components/ui/card";
export default async function Page() { const t = await getTranslations("projects"); return <ContentPage icon={Blocks} eyebrow={t("eyebrow")} title={t("title")} description={t("description")}><Card className="mt-12 max-w-2xl border-dashed"><CardContent className="p-10 text-center text-muted-foreground">{t("empty")}</CardContent></Card></ContentPage>; }
