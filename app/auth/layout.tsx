import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AuthLayout(){
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="absolute top-5 left-5">
                <Link href="/">
                    <ArrowLeft className="size-4" />
                    Go Back
                </Link>
            </div>

        </div>
    )
}