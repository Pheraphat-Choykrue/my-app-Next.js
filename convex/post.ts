import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { authComponent } from "./auth";

export const createPost = mutation({
  args: { title: v.string(), content: v.string(), ImageStorageId:v.id("_storage") },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);

    if(!user){
        throw new ConvexError("Unauthorized");
    }
    
    const blogArticle = await ctx.db.insert("post", { title: args.title, content: args.content, authorId: user._id, ImageStorageId: args.ImageStorageId });
    return blogArticle;
  },
});

export const getPosts = query({
    args: {},
    handler: async (ctx) => {
        const posts = await ctx.db.query("post").order("desc").collect();

        return await Promise.all(posts.map(async (post) => {
          const resolvedImageUrl = post.ImageStorageId !== undefined ? await ctx.storage.getUrl(post.ImageStorageId) : null;
          return {
            ...post,
            ImageUrl: resolvedImageUrl
          };
        }));
    },
});

export const generateImageUploadUrlId = mutation({
    args: {},
    handler: async (ctx) => {
       const user = await authComponent.safeGetAuthUser(ctx);

      if(!user){
        throw new ConvexError("Unauthorized");
      }

        return await ctx.storage.generateUploadUrl();
    }
    //default max file size is 5MB, but you can configure it in the convex dashboard storage settings. For this example, we will set it to 1MB for next.js and 4.5MB for vercel, which is the maximum file size allowed by vercel. You can adjust these values as needed.
});