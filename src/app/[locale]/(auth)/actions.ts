"use server";

import {headers} from "next/headers";
import {createClient} from "@/lib/supabase/server";
import {forgotPasswordSchema, loginSchema, registerSchema, resetPasswordSchema} from "@/lib/validations/auth";
import type {AppLocale} from "@/i18n/routing";

export type AuthResult = {ok: boolean; error?: string; redirectTo?: string};

function siteOrigin(headerOrigin: string | null) {
  return headerOrigin ?? process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

export async function loginAction(input: unknown, locale: AppLocale): Promise<AuthResult> {
  const parsed = loginSchema.safeParse(input);
  if (!parsed.success) return {ok: false, error: "invalidForm"};

  try {
    const supabase = await createClient();
    const {error} = await supabase.auth.signInWithPassword(parsed.data);
    if (error) return {ok: false, error: "invalidCredentials"};
    return {ok: true, redirectTo: `/${locale}/dashboard`};
  } catch {
    return {ok: false, error: "notConfigured"};
  }
}

export async function registerAction(input: unknown, locale: AppLocale): Promise<AuthResult> {
  const parsed = registerSchema.safeParse(input);
  if (!parsed.success) return {ok: false, error: "invalidForm"};

  try {
    const supabase = await createClient();
    const origin = siteOrigin((await headers()).get("origin"));
    const {error} = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
      options: {
        data: {display_name: parsed.data.displayName, preferred_locale: locale},
        emailRedirectTo: `${origin}/auth/callback?next=/${locale}/dashboard`
      }
    });
    if (error) return {ok: false, error: "registerFailed"};
    return {ok: true};
  } catch {
    return {ok: false, error: "notConfigured"};
  }
}

export async function forgotPasswordAction(input: unknown, locale: AppLocale): Promise<AuthResult> {
  const parsed = forgotPasswordSchema.safeParse(input);
  if (!parsed.success) return {ok: false, error: "invalidForm"};

  try {
    const supabase = await createClient();
    const origin = siteOrigin((await headers()).get("origin"));
    const {error} = await supabase.auth.resetPasswordForEmail(parsed.data.email, {
      redirectTo: `${origin}/auth/callback?next=/${locale}/reset-password`
    });
    if (error) return {ok: false, error: "requestFailed"};
    return {ok: true};
  } catch {
    return {ok: false, error: "notConfigured"};
  }
}

export async function resetPasswordAction(input: unknown, locale: AppLocale): Promise<AuthResult> {
  const parsed = resetPasswordSchema.safeParse(input);
  if (!parsed.success) return {ok: false, error: "invalidForm"};

  try {
    const supabase = await createClient();
    const {error} = await supabase.auth.updateUser({password: parsed.data.password});
    if (error) return {ok: false, error: "resetFailed"};
    return {ok: true, redirectTo: `/${locale}/dashboard`};
  } catch {
    return {ok: false, error: "notConfigured"};
  }
}

export async function logoutAction(locale: AppLocale) {
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
  } finally {
    return {redirectTo: `/${locale}`};
  }
}
