"use client"

import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"

export default function blogPage() {
    const data = useQuery(api.post.getPosts, {});
    return ( 
        <div>
            <h1 className="text-2xl font-bold">Blog Page</h1>
            <p>{data?.[0].title}</p>
        </div>
    )
}