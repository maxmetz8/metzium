"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { registerAction, type RegisterState } from "@/app/register/actions";

const initialState: RegisterState = {
  error: null,
  fieldErrors: {},
};

function getPasswordStrength(password: string): { label: "Weak" | "Medium" | "Strong"; value: number } {
  let score = 0;
  if (password.length >= 12) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  if (score >= 5) return { label: "Strong", value: 100 };
  if (score >= 3) return { label: "Medium", value: 65 };
  return { label: "Weak", value: 35 };
}

export default function RegisterForm() {
  const [state, formAction, isPending] = useActionState(registerAction, initialState);
  const [accountType, setAccountType] = useState<"INDIVIDUAL" | "COMPANY">("INDIVIDUAL");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const strength = getPasswordStrength(password);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="accountType" className="mb-1 block text-sm text-slate-200">
          Account type
        </label>
        <select
          id="accountType"
          name="accountType"
          value={accountType}
          onChange={(event) => {
            const nextType = event.target.value as "INDIVIDUAL" | "COMPANY";
            setAccountType(nextType);
            if (nextType === "INDIVIDUAL") {
              setCompanyName("");
            }
          }}
          disabled={isPending}
          className="w-full rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-white focus:border-cyan-300 focus:outline-none"
        >
          <option value="INDIVIDUAL" className="bg-slate-900 text-white">
            Individual
          </option>
          <option value="COMPANY" className="bg-slate-900 text-white">
            Company
          </option>
        </select>
        {state.fieldErrors.accountType ? (
          <p className="mt-1 text-sm text-rose-300">{state.fieldErrors.accountType}</p>
        ) : null}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="mb-1 block text-sm text-slate-200">
            First name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            autoComplete="given-name"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            disabled={isPending}
            className="w-full rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-white placeholder:text-slate-300 focus:border-cyan-300 focus:outline-none"
            placeholder="Jane"
            required
          />
          {state.fieldErrors.firstName ? (
            <p className="mt-1 text-sm text-rose-300">{state.fieldErrors.firstName}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="lastName" className="mb-1 block text-sm text-slate-200">
            Last name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            autoComplete="family-name"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            disabled={isPending}
            className="w-full rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-white placeholder:text-slate-300 focus:border-cyan-300 focus:outline-none"
            placeholder="Doe"
            required
          />
          {state.fieldErrors.lastName ? (
            <p className="mt-1 text-sm text-rose-300">{state.fieldErrors.lastName}</p>
          ) : null}
        </div>
      </div>

      {accountType === "COMPANY" ? (
        <div>
          <label htmlFor="companyName" className="mb-1 block text-sm text-slate-200">
            Company name
          </label>
          <input
            id="companyName"
            name="companyName"
            type="text"
            value={companyName}
            onChange={(event) => setCompanyName(event.target.value)}
            disabled={isPending}
            className="w-full rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-white placeholder:text-slate-300 focus:border-cyan-300 focus:outline-none"
            placeholder="Acme BV"
            required
          />
          {state.fieldErrors.companyName ? (
            <p className="mt-1 text-sm text-rose-300">{state.fieldErrors.companyName}</p>
          ) : null}
        </div>
      ) : null}

      <div>
        <label htmlFor="email" className="mb-1 block text-sm text-slate-200">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
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
            autoComplete="new-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            disabled={isPending}
            className="w-full rounded-lg border border-white/30 bg-white/10 px-3 py-2 pr-20 text-white placeholder:text-slate-300 focus:border-cyan-300 focus:outline-none"
            placeholder="Min 12 chars, mixed case, number, symbol"
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
        <div className="mt-2 h-2 rounded-full bg-white/10">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              strength.label === "Strong"
                ? "bg-emerald-400"
                : strength.label === "Medium"
                  ? "bg-amber-400"
                  : "bg-rose-400"
            }`}
            style={{ width: `${strength.value}%` }}
          />
        </div>
        <p className="mt-1 text-xs text-slate-300">Password strength: {strength.label}</p>
        <ul className="mt-1 space-y-1 text-xs text-slate-400">
          <li className={password.length >= 12 ? "text-emerald-300" : ""}>At least 12 characters</li>
          <li className={/[A-Z]/.test(password) ? "text-emerald-300" : ""}>One uppercase letter</li>
          <li className={/[a-z]/.test(password) ? "text-emerald-300" : ""}>One lowercase letter</li>
          <li className={/[0-9]/.test(password) ? "text-emerald-300" : ""}>One number</li>
          <li className={/[^A-Za-z0-9]/.test(password) ? "text-emerald-300" : ""}>One special character</li>
        </ul>
        {state.fieldErrors.password ? (
          <p className="mt-1 text-sm text-rose-300">{state.fieldErrors.password}</p>
        ) : null}
      </div>

      <div>
        <label htmlFor="confirmPassword" className="mb-1 block text-sm text-slate-200">
          Confirm password
        </label>
        <div className="relative">
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            disabled={isPending}
            className="w-full rounded-lg border border-white/30 bg-white/10 px-3 py-2 pr-20 text-white placeholder:text-slate-300 focus:border-cyan-300 focus:outline-none"
            placeholder="Repeat your password"
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((previous) => !previous)}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-xs text-slate-200 transition hover:bg-white/10"
          >
            {showConfirmPassword ? "Hide" : "Show"}
          </button>
        </div>
        {state.fieldErrors.confirmPassword ? (
          <p className="mt-1 text-sm text-rose-300">{state.fieldErrors.confirmPassword}</p>
        ) : null}
      </div>

      {state.error ? <p className="text-sm text-rose-300">{state.error}</p> : null}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-lg border border-cyan-300/50 bg-cyan-500/20 px-4 py-2 font-medium text-cyan-100 transition hover:bg-cyan-500/30 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Creating account..." : "Create account"}
      </button>

      <p className="text-center text-sm text-slate-300">
        Already registered?{" "}
        <Link href="/login" className="text-cyan-300 hover:text-cyan-200">
          Sign in
        </Link>
      </p>
    </form>
  );
}
