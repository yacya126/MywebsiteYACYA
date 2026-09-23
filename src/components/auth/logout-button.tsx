"use client";

import {LogOut} from "lucide-react";
import {useLocale, useTranslations} from "next-intl";
import {useTransition} from "react";
import {useRouter} from "@/i18n/navigation";
import type {AppLocale} from "@/i18n/routing";
import {logoutAction} from "@/app/[locale]/(auth)/actions";
import {Button} from "@/components/ui/button";

export function LogoutButton() {
  const t = useTranslations("auth");
  const locale = useLocale() as AppLocale;
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  return <Button variant="outline" disabled={pending} onClick={() => startTransition(async () => {
    const result = await logoutAction(locale);
    router.push(result.redirectTo);
    router.refresh();
  })}><LogOut className="size-4" />{t("logout")}</Button>;
}
