import {Code2} from "lucide-react";
import {getTranslations} from "next-intl/server";
import {Link} from "@/i18n/navigation";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {AuthForm} from "./auth-form";

type Mode = "login" | "register" | "forgot" | "reset";

export async function AuthShell({mode}: {mode: Mode}) {
  const t = await getTranslations("auth");
  return <main className="grid min-h-screen place-items-center bg-muted/35 px-5 py-14">
    <div className="w-full max-w-md">
      <Link href="/" className="mx-auto mb-8 flex w-fit items-center gap-2 font-semibold"><span className="grid size-8 place-items-center rounded-full bg-foreground text-background"><Code2 className="size-4" /></span>{t("brand")}</Link>
      <Card><CardHeader className="pb-5"><CardTitle className="text-2xl">{t(`${mode}Title`)}</CardTitle><CardDescription>{t(`${mode}Description`)}</CardDescription></CardHeader><CardContent><AuthForm mode={mode} /><AuthLinks mode={mode} labels={{forgot: t("forgotLink"), create: t("createLink"), signIn: t("signInLink"), back: t("backToSignIn")}} /></CardContent></Card>
    </div>
  </main>;
}

function AuthLinks({mode, labels}: {mode: Mode; labels: {forgot: string; create: string; signIn: string; back: string}}) {
  if (mode === "login") return <div className="mt-6 flex justify-between text-sm"><Link href="/forgot-password" className="text-muted-foreground hover:text-foreground">{labels.forgot}</Link><Link href="/register" className="font-medium">{labels.create}</Link></div>;
  if (mode === "register") return <p className="mt-6 text-center text-sm text-muted-foreground"><Link href="/login" className="font-medium text-foreground">{labels.signIn}</Link></p>;
  return <p className="mt-6 text-center text-sm text-muted-foreground"><Link href="/login" className="font-medium text-foreground">{labels.back}</Link></p>;
}
