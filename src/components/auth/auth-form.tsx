"use client";

import {useState, useTransition} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {ArrowRight, LoaderCircle} from "lucide-react";
import {useLocale, useTranslations} from "next-intl";
import {useRouter} from "@/i18n/navigation";
import {useForm, type Resolver} from "react-hook-form";
import {forgotPasswordSchema, loginSchema, registerSchema, resetPasswordSchema} from "@/lib/validations/auth";
import type {AppLocale} from "@/i18n/routing";
import {forgotPasswordAction, loginAction, registerAction, resetPasswordAction} from "@/app/[locale]/(auth)/actions";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";

type Mode = "login" | "register" | "forgot" | "reset";
type Values = {email?: string; password?: string; displayName?: string; confirmPassword?: string};

const schemas = {login: loginSchema, register: registerSchema, forgot: forgotPasswordSchema, reset: resetPasswordSchema};

export function AuthForm({mode}: {mode: Mode}) {
  const t = useTranslations("auth");
  const locale = useLocale() as AppLocale;
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<{kind: "error" | "success"; key: string} | null>(null);
  const form = useForm<Values>({resolver: zodResolver(schemas[mode]) as Resolver<Values>, defaultValues: {email: "", password: "", displayName: "", confirmPassword: ""}});

  function submit(values: Values) {
    setMessage(null);
    startTransition(async () => {
      const actions = {login: loginAction, register: registerAction, forgot: forgotPasswordAction, reset: resetPasswordAction};
      const result = await actions[mode](values, locale);
      if (!result.ok) {
        setMessage({kind: "error", key: result.error ?? "unknownError"});
        return;
      }
      if (result.redirectTo) {
        router.push(result.redirectTo);
        router.refresh();
        return;
      }
      setMessage({kind: "success", key: mode === "register" ? "checkEmail" : "resetEmailSent"});
      form.reset();
    });
  }

  const showEmail = mode !== "reset";
  const showPassword = mode === "login" || mode === "register" || mode === "reset";

  return (
    <form onSubmit={form.handleSubmit(submit)} className="space-y-5" noValidate>
      {mode === "register" && <Field label={t("displayName")} error={form.formState.errors.displayName ? t("invalidField") : undefined}>
        <Input autoComplete="name" {...form.register("displayName")} />
      </Field>}
      {showEmail && <Field label={t("email")} error={form.formState.errors.email ? t("invalidField") : undefined}>
        <Input type="email" autoComplete="email" inputMode="email" {...form.register("email")} />
      </Field>}
      {showPassword && <Field label={t("password")} hint={t("passwordHint")} error={form.formState.errors.password ? t("invalidField") : undefined}>
        <Input type="password" autoComplete={mode === "login" ? "current-password" : "new-password"} {...form.register("password")} />
      </Field>}
      {mode === "reset" && <Field label={t("confirmPassword")} error={form.formState.errors.confirmPassword ? t("passwordsMismatch") : undefined}>
        <Input type="password" autoComplete="new-password" {...form.register("confirmPassword")} />
      </Field>}
      {message && <p role="status" className={message.kind === "error" ? "text-sm text-destructive" : "text-sm text-emerald-600 dark:text-emerald-400"}>{t(message.key)}</p>}
      <Button className="w-full" size="lg" disabled={pending}>
        {pending ? <LoaderCircle className="size-4 animate-spin" /> : <ArrowRight className="size-4" />}
        {t(`${mode}Submit`)}
      </Button>
    </form>
  );
}

function Field({label, hint, error, children}: {label: string; hint?: string; error?: string; children: React.ReactNode}) {
  return <div className="space-y-2"><Label>{label}</Label>{children}{hint && !error && <p className="text-xs text-muted-foreground">{hint}</p>}{error && <p className="text-xs text-destructive">{error}</p>}</div>;
}
