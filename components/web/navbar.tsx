import Link from "next/link";

export function Navbar() {
  return (
    <nav className="w-full py-5 flex items-center justify-between bg-gray-800 text-white">
      <div className="flex items-center gap-8">
        <Link href="/">
          <h1 className="text-3xl font-bold">Next<span className="text-blue-500">Pro</span></h1>
        </Link>

        <div className="flex items-center gap-2">
          <Link href="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link href="/blog" className="hover:text-gray-300">
           Blog
          </Link>
          <Link href="/create" className="hover:text-gray-300">
            Create
          </Link>
        </div>
      </div>

       <div className="flex items-center gap-2">
          <Link href="/auth/login" className="hover:text-gray-300">
            Login
          </Link>
          <Link
            href="/auth/signup"
            className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 transition-colors"
          >
            Sign Up
          </Link>
        </div>
    </nav>
  );
}