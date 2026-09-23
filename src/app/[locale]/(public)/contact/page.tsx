import {Mail} from "lucide-react";
import {getTranslations} from "next-intl/server";
import {ContentPage} from "@/components/content-page";
import {Button} from "@/components/ui/button";
export default async function Page() { const t = await getTranslations("contact"); return <ContentPage icon={Mail} eyebrow={t("eyebrow")} title={t("title")} description={t("description")}><Button className="mt-10" asChild><a href="mailto:hello@example.com"><Mail className="size-4" />{t("emailMe")}</a></Button></ContentPage>; }
