import {getTranslations} from "next-intl/server";

export async function SiteFooter() {
  const t = await getTranslations("footer");
  return (
    <footer className="border-t border-border/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>{t("copyright", {year: new Date().getFullYear()})}</p>
        <p>{t("builtWith")}</p>
      </div>
    </footer>
  );
}
