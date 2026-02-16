"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { loginAction, type LoginState } from "@/app/login/actions";

const initialState: LoginState = {
  error: null,
  fieldErrors: {},
};

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, isPending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="email" className="mb-1 block text-sm text-slate-200">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          disabled={isPending}
          className="w-full rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-white placeholder:text-slate-300 focus:border-cyan-300 focus:outline-none"
          placeholder="you@example.com"
          required
        />
        {state.fieldErrors.email ? <p className="mt-1 text-sm text-rose-300">{state.fieldErrors.email}</p> : null}
      </div>

      <div>
        <label htmlFor="password" className="mb-1 block text-sm text-slate-200">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            disabled={isPending}
            className="w-full rounded-lg border border-white/30 bg-white/10 px-3 py-2 pr-20 text-white placeholder:text-slate-300 focus:border-cyan-300 focus:outline-none"
            placeholder="Your password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((previous) => !previous)}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-xs text-slate-200 transition hover:bg-white/10"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        {state.fieldErrors.password ? (
          <p className="mt-1 text-sm text-rose-300">{state.fieldErrors.password}</p>
        ) : null}
      </div>

      {state.error ? <p className="text-sm text-rose-300">{state.error}</p> : null}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-lg border border-cyan-300/50 bg-cyan-500/20 px-4 py-2 font-medium text-cyan-100 transition hover:bg-cyan-500/30 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Signing in..." : "Sign in"}
      </button>

      <p className="text-center text-sm text-slate-300">
        No account yet?{" "}
        <Link href="/register" className="text-cyan-300 hover:text-cyan-200">
          Register here
        </Link>
      </p>
    </form>
  );
}
