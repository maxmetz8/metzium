import { redirect } from "next/navigation";
import { getCurrentUser, getUserDisplayName, isAdminUser } from "@/lib/auth";
import { logoutAction } from "@/app/admin/actions";

export default async function AdminPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }
  if (!isAdminUser(user)) {
    redirect("/");
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-6 py-24">
      <section className="rounded-2xl border border-white/20 bg-slate-900/60 p-6 shadow-2xl backdrop-blur">
        <h1 className="text-2xl font-semibold text-white">Admin Dashboard</h1>
        <p className="mt-3 text-slate-200">Logged in as {getUserDisplayName(user)}</p>

        <form action={logoutAction} className="mt-8">
          <button
            type="submit"
            className="rounded-lg border border-rose-300/50 bg-rose-500/20 px-4 py-2 font-medium text-rose-100 transition hover:bg-rose-500/30"
          >
            Sign out
          </button>
        </form>
      </section>
    </main>
  );
}
