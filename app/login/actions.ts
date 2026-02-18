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
  fieldErrors: Partial<Record<"email" | "password", string>>;
};

export async function loginAction(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  if (!(await isValidAuthOrigin())) {
    return {
      error: "Invalid request.",
      fieldErrors: {},
    };
  }

  const requestIp = await getRequestIp();
  const emailValue = String(formData.get("email") ?? "").trim().toLowerCase();
  const rateLimit = await checkLoginRateLimit(requestIp, emailValue || "unknown");
  if (!rateLimit.allowed) {
    return {
      error: `Too many login attempts. Try again in ${rateLimit.retryAfterSeconds} seconds.`,
      fieldErrors: {},
    };
  }

  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    const flattened = parsed.error.flatten().fieldErrors;
    return {
      error: null,
      fieldErrors: {
        email: flattened.email?.[0],
        password: flattened.password?.[0],
      },
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
      fieldErrors: {},
    };
  }

  await createSession(user.id);

  if (isAdminUser(user)) {
    redirect("/admin");
  }

  redirect("/");
}
