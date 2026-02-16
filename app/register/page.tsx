import { redirect } from "next/navigation";
import RegisterForm from "@/components/RegisterForm";
import { getCurrentUser, isAdminUser } from "@/lib/auth";

export default async function RegisterPage() {
  const user = await getCurrentUser();
  if (user) {
    redirect(isAdminUser(user) ? "/admin" : "/");
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md items-center px-6 py-24">
      <section className="w-full rounded-2xl border border-white/20 bg-slate-900/60 p-6 shadow-2xl backdrop-blur">
        <h1 className="text-2xl font-semibold text-white">Create account</h1>
        <p className="mt-2 text-sm text-slate-300">
          Register as an individual or a company.
        </p>
        <div className="mt-6">
          <RegisterForm />
        </div>
      </section>
    </main>
  );
}
