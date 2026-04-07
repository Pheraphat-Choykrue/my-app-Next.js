import { NextResponse } from "next/server";

export async function POST(){
    console.log("Creating post");
    return NextResponse.json({ success: true, message: "Post created successfully!" });
}