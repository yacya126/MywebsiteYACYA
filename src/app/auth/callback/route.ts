import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";
import {createServerClient} from "@supabase/ssr";
import {getSupabaseEnv} from "@/lib/supabase/env";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") ?? "/zh/dashboard";
  const safeNext = next.startsWith("/") && !next.startsWith("//") ? next : "/zh/dashboard";
  const response = NextResponse.redirect(new URL(safeNext, requestUrl.origin));

  if (!code) return response;

  const {url, key} = getSupabaseEnv();
  const supabase = createServerClient(url, key, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (items) => items.forEach(({name, value, options}) => response.cookies.set(name, value, options))
    }
  });

  const {error} = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    return NextResponse.redirect(new URL("/zh/login?error=callback", requestUrl.origin));
  }

  return response;
}
