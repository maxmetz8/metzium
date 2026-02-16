"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { registerAction, type RegisterState } from "@/app/register/actions";

const initialState: RegisterState = {
  error: null,
};

export default function RegisterForm() {
  const [state, formAction, isPending] = useActionState(registerAction, initialState);
  const [accountType, setAccountType] = useState<"INDIVIDUAL" | "COMPANY">("INDIVIDUAL");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
          className="w-full rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-white focus:border-cyan-300 focus:outline-none"
        >
          <option value="INDIVIDUAL" className="bg-slate-900 text-white">
            Individual
          </option>
          <option value="COMPANY" className="bg-slate-900 text-white">
            Company
          </option>
        </select>
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
            className="w-full rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-white placeholder:text-slate-300 focus:border-cyan-300 focus:outline-none"
            placeholder="Jane"
            required
          />
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
            className="w-full rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-white placeholder:text-slate-300 focus:border-cyan-300 focus:outline-none"
            placeholder="Doe"
            required
          />
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
            className="w-full rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-white placeholder:text-slate-300 focus:border-cyan-300 focus:outline-none"
            placeholder="Acme BV"
            required
          />
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
          className="w-full rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-white placeholder:text-slate-300 focus:border-cyan-300 focus:outline-none"
          placeholder="you@example.com"
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="mb-1 block text-sm text-slate-200">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-white placeholder:text-slate-300 focus:border-cyan-300 focus:outline-none"
          placeholder="Min 12 chars, mixed case, number, symbol"
          required
        />
      </div>

      <div>
        <label htmlFor="confirmPassword" className="mb-1 block text-sm text-slate-200">
          Confirm password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          className="w-full rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-white placeholder:text-slate-300 focus:border-cyan-300 focus:outline-none"
          placeholder="Repeat your password"
          required
        />
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
