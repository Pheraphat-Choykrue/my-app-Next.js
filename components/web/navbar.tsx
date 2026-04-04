import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { ThemeProvider } from "../ui/theme-provider";
import { ThemeToggle } from "../ui/theme-toggle";

export function Navbar() {
  return (
    <nav className="w-full py-5 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <Link href="/">
          <h1 className="text-3xl font-bold">Next<span className="text-blue-500">Pro</span></h1>
        </Link>

        <div className="flex items-center gap-2">
          <Link href="/" className={buttonVariants({ variant: "ghost" })}>
            Home
          </Link>
          <Link href="/blog" className={buttonVariants({ variant: "ghost" })}>
           Blog
          </Link>
          <Link href="/create" className={buttonVariants({ variant: "ghost" })}>
            Create
          </Link>
        </div>
      </div>

       <div className="flex items-center gap-2">
          <Link href="/auth/login" className={buttonVariants({ variant: "secondary" })}>
            Login
          </Link>
          <Link
            href="/auth/signup"
            className={buttonVariants({ variant: "default" })} 
          >
            Sign Up
          </Link>
          <ThemeProvider />
          <ThemeToggle />
        </div>
    </nav>
  );
}