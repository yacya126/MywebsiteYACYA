import {Activity, FolderKanban, UserRound} from "lucide-react";
import {getTranslations} from "next-intl/server";
import {createClient} from "@/lib/supabase/server";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

export default async function Page() {
  const t = await getTranslations("dashboard");
  const supabase = await createClient();
  const {data: {user}} = await supabase.auth.getUser();
  const cards = [{icon: UserRound, title: t("account"), value: user?.email ?? "—"}, {icon: FolderKanban, title: t("projects"), value: t("zero")}, {icon: Activity, title: t("status"), value: t("active")}];
  return <div><h1 className="text-3xl font-semibold tracking-tight">{t("title")}</h1><p className="mt-2 text-muted-foreground">{t("welcome")}</p><div className="mt-8 grid gap-4 lg:grid-cols-3">{cards.map(({icon: Icon, title, value}) => <Card key={title}><CardHeader><Icon className="size-5 text-accent" /><CardTitle className="text-sm text-muted-foreground">{title}</CardTitle></CardHeader><CardContent className="font-medium">{value}</CardContent></Card>)}</div></div>;
}
