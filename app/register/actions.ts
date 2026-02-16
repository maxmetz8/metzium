"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/auth";
import { hashPassword } from "@/lib/password";
import { checkRegisterRateLimit, getRequestIp, isValidAuthOrigin } from "@/lib/auth-security";

const registerSchema = z
  .object({
    accountType: z.enum(["INDIVIDUAL", "COMPANY"]),
    firstName: z.string().trim().min(2, "First name is required."),
    lastName: z.string().trim().min(2, "Last name is required."),
    companyName: z.string().trim().optional(),
    email: z.email("Please provide a valid email address.").trim().toLowerCase(),
    password: z
      .string()
      .min(12, "Password must be at least 12 characters.")
      .regex(/[a-z]/, "Password must contain a lowercase letter.")
      .regex(/[A-Z]/, "Password must contain an uppercase letter.")
      .regex(/[0-9]/, "Password must contain a number.")
      .regex(/[^A-Za-z0-9]/, "Password must contain a special character."),
    confirmPassword: z.string().min(1, "Please confirm your password."),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Passwords do not match.",
      });
    }

    if (data.accountType === "COMPANY" && !data.companyName) {
      ctx.addIssue({
        code: "custom",
        path: ["companyName"],
        message: "Company name is required for company accounts.",
      });
    }
  });

export type RegisterState = {
  error: string | null;
  fieldErrors: Partial<
    Record<
      "accountType" | "firstName" | "lastName" | "companyName" | "email" | "password" | "confirmPassword",
      string
    >
  >;
};

export async function registerAction(
  _prevState: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  if (!(await isValidAuthOrigin())) {
    return {
      error: "Invalid request.",
      fieldErrors: {},
    };
  }

  const requestIp = await getRequestIp();
  const rateLimit = await checkRegisterRateLimit(requestIp);
  if (!rateLimit.allowed) {
    return {
      error: `Too many registration attempts. Try again in ${rateLimit.retryAfterSeconds} seconds.`,
      fieldErrors: {},
    };
  }

  const parsed = registerSchema.safeParse({
    accountType: formData.get("accountType"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    companyName: (formData.get("companyName") as string | null) ?? undefined,
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!parsed.success) {
    const flattened = parsed.error.flatten().fieldErrors;
    return {
      error: null,
      fieldErrors: {
        accountType: flattened.accountType?.[0],
        firstName: flattened.firstName?.[0],
        lastName: flattened.lastName?.[0],
        companyName: flattened.companyName?.[0],
        email: flattened.email?.[0],
        password: flattened.password?.[0],
        confirmPassword: flattened.confirmPassword?.[0],
      },
    };
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: parsed.data.email },
    select: { id: true },
  });

  if (existingUser) {
    return {
      error: "Could not create account with these details.",
      fieldErrors: {
        email: "An account with this email already exists.",
      },
    };
  }

  const passwordHash = await hashPassword(parsed.data.password);

  const user = await prisma.user.create({
    data: {
      firstName: parsed.data.firstName,
      lastName: parsed.data.lastName,
      email: parsed.data.email,
      passwordHash,
      accountType: parsed.data.accountType,
      companyName: parsed.data.accountType === "COMPANY" ? parsed.data.companyName : null,
    },
    select: { id: true },
  });

  await createSession(user.id);
  redirect("/");
}
