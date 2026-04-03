import Link from "next/link";
export default function Home() {
  return (
   <div>
     <h1 className="text-4xl font-bold">Welcome to My App</h1>
     <p className="text-lg">This is the home page of my Next.js application.</p>
     <Link href="/blogs">Go to Blogs</Link>
   </div>
  );
}
