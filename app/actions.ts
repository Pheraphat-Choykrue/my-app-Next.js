"use server";

import z from "zod";
import { BlogSchema } from "./schemas/blog";
import { fetchMutation, fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { redirect } from "next/navigation";
import { getToken } from "@/lib/auth-server";

export async function createPost(values: z.infer<typeof BlogSchema>) {
  try {
    const parsed = BlogSchema.safeParse(values);

  if (!parsed.success) {
    throw new Error("Invalid input");
  }
  const token = await getToken();

   const imageUrl = await fetchMutation(api.post.generateImageUploadUrlId,{},{token});
   const uploadResult = await fetch(imageUrl, {
    method: "POST",
    headers: {
      "Content-Type": parsed.data.image.type,
    },
    body: parsed.data.image
  });

    if (!uploadResult.ok) {
      return {
        error: "Failed to upload image"
      };
    }

    const {storageId} = await uploadResult.json();
    await fetchMutation(api.post.createPost, {
        title: parsed.data.title,
        content: parsed.data.content,
        ImageStorageId: storageId
    },{token});
    
  } catch (error) {
    return {
        error: "An error occurred while creating the post"
    };
  }

  return redirect("/blog");
}