import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { api } from "@/convex/_generated/api"
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { fetchQuery, } from "convex/nextjs";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function blogPage() {
    return ( 
        <div className="py-12">
            <div className="text-center pb-12">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Blog Page</h1>
                <p className="max-w-2xl mx-auto text-xl text-muted-foreground pt-4">Welcome to the blog page! Here you can find all the latest posts and updates.</p>
            </div>
            
            <Suspense fallback={<SkeletonLoader/>}>
                <LoadBlogList />
            </Suspense>
        </div>
    )
}

async function LoadBlogList(){
    await new Promise((resolve) => setTimeout(resolve, 5000));
    const data = await fetchQuery(api.post.getPosts);
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data?.map((post)=>(
                    <Card key={post._id} className="pt-0">
                        <div className="relative h-48 w-full overflow-hidden">
                            <Image src={post.ImageUrl ?? "https://flipaquatics.com/cdn/shop/files/FA-Fish-SantaMariaEndler-M4W124_5000x.jpg?v=1716579505"} alt="image" width={500} height={800} className="round--t-lg object-cover"
                            loading="eager" />
                        </div>

                        <CardContent>
                            <Link href={'/blog/${post._id}'}>
                                <h1 className="text-2xl font-bold hover:text-primary">{post.title}</h1>
                            </Link>
                            <p className="text-muted-foreground line-clamp-3 wrap-break-word">{post.content}</p>
                        </CardContent>
                        <CardFooter>
                            <Link href={`/blog/${post._id}`} className={buttonVariants({ className: "w-full" })}>
                                Read more
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
        </div>
    )
}

function SkeletonLoader() {
    return (
        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-3">
            {[...Array(3)].map((_,i) => <div className="flex flex-col space-y-3" key={i}>
                <Skeleton className="h-48 w-full rounded-xl" />
                <div className="space-y-2 flex flex-col">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                </div>
            </div>)}
        </div>
    )
}