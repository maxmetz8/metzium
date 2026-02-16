import { redirect } from "next/navigation";
import { getCurrentUser, getUserDisplayName, isAdminUser } from "@/lib/auth";
import { logoutAction } from "@/app/admin/actions";
import { prisma } from "@/lib/prisma";

export default async function AdminPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }
  if (!isAdminUser(user)) {
    redirect("/");
  }

  const recentUsers = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      accountType: true,
    },
  });

  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-6 py-24">
      <section className="rounded-2xl border border-white/20 bg-slate-900/60 p-6 shadow-2xl backdrop-blur">
        <h1 className="text-2xl font-semibold text-white">Admin Dashboard</h1>
        <p className="mt-3 text-slate-200">Logged in as {getUserDisplayName(user)}</p>

        <div className="mt-6 rounded-xl border border-white/15 bg-white/5 p-4">
          <h2 className="text-lg font-medium text-white">Recent Users</h2>
          {recentUsers.length === 0 ? (
            <p className="mt-2 text-sm text-slate-300">No users yet. New registrations will appear here.</p>
          ) : (
            <ul className="mt-3 space-y-2">
              {recentUsers.map((recentUser) => (
                <li key={recentUser.id} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                  <p className="text-sm font-medium text-white">
                    {recentUser.firstName} {recentUser.lastName}
                  </p>
                  <p className="text-xs text-slate-300">
                    {recentUser.email} - {recentUser.accountType.toLowerCase()}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

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
