import {UserRound} from "lucide-react";
import {getTranslations} from "next-intl/server";
import {ContentPage} from "@/components/content-page";
export default async function Page() { const t = await getTranslations("about"); return <ContentPage icon={UserRound} eyebrow={t("eyebrow")} title={t("title")} description={t("description")}><p className="mt-12 max-w-2xl leading-8 text-muted-foreground">{t("body")}</p></ContentPage>; }
