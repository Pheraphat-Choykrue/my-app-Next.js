"use server";

import z from "zod";
import { BlogSchema } from "./schemas/blog";
import { fetchMutation, fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { redirect } from "next/navigation";
import { getToken } from "@/lib/auth-server";

export async function createPost(values: z.infer<typeof BlogSchema>) {
  const parsed = BlogSchema.safeParse(values);

  if (!parsed.success) {
    throw new Error("Invalid input");
  }
  const token = await getToken();

  await fetchMutation(api.post.createPost, {
    title: parsed.data.title,
    content: parsed.data.content
  },{token});

  return redirect("/");
}