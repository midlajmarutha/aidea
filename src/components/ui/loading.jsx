import { cn } from "@/lib/utils";

export default function Loading({ className, size }) {
    return (
        <div className="flex justify-center items-center flex-grow h-svh">

            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={size?size:"34"}
                height={size?size:"34"}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={cn("animate-spin", className)}
            >
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
        </div>

    )
}