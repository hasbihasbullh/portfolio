import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist or has been removed. Return to the homepage or contact us for assistance.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
      <div className="text-center max-w-lg w-full">
        <h1 className="text-8xl sm:text-9xl font-extrabold text-white">404</h1>
        <p className="mt-2 text-2xl sm:text-3xl font-semibold text-zinc-200">Page Not Found</p>
        <p className="mt-4 text-zinc-400">Oops... the page you are looking for is not available or has been removed.</p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/" className="px-6 py-3 rounded-lg bg-white text-zinc-900 font-medium hover:bg-zinc-200 transition-colors duration-200">
            Back to Home
          </Link>
          <Link href="/contact" className="px-6 py-3 rounded-lg border border-zinc-500 text-zinc-300 hover:bg-zinc-800 transition-colors duration-200">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
