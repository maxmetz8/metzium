"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { DUMMY_PASSWORD_HASH, verifyPassword } from "@/lib/password";
import { createSession, isAdminUser } from "@/lib/auth";
import { checkLoginRateLimit, getRequestIp, isValidAuthOrigin } from "@/lib/auth-security";

const loginSchema = z.object({
  email: z.email("Please provide a valid email address.").trim().toLowerCase(),
  password: z.string().min(1, "Password is required."),
});

export type LoginState = {
  error: string | null;
};

export async function loginAction(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  if (!(await isValidAuthOrigin())) {
    return {
      error: "Invalid request.",
    };
  }

  const requestIp = await getRequestIp();
  const emailValue = String(formData.get("email") ?? "").trim().toLowerCase();
  const rateLimit = await checkLoginRateLimit(requestIp, emailValue || "unknown");
  if (!rateLimit.allowed) {
    return {
      error: `Too many login attempts. Try again in ${rateLimit.retryAfterSeconds} seconds.`,
    };
  }

  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Invalid credentials.",
    };
  }

  const user = await prisma.user.findUnique({
    where: { email: parsed.data.email },
  });
  const hashToCheck = user?.passwordHash ?? DUMMY_PASSWORD_HASH;
  const isValid = await verifyPassword(parsed.data.password, hashToCheck);
  if (!user || !isValid) {
    return {
      error: "Invalid email or password.",
    };
  }

  await createSession(user.id);

  if (isAdminUser(user)) {
    redirect("/admin");
  }

  redirect("/");
}
