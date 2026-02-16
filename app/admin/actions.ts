"use server";

import { redirect } from "next/navigation";
import { clearSession } from "@/lib/auth";
import { isValidAuthOrigin } from "@/lib/auth-security";

export async function logoutAction() {
  if (!(await isValidAuthOrigin())) {
    redirect("/");
  }

  await clearSession();
  redirect("/");
}
