"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCcw } from "lucide-react";
import { Button } from "@/common/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] w-full px-4 text-center">
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 max-w-md w-full backdrop-blur-sm shadow-xl">
        <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-6 h-6 text-red-500" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Something went wrong!</h2>
        <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
          We encountered an unexpected error while trying to load this page.
        </p>
        <Button
          onClick={() => reset()}
          className="w-full flex items-center justify-center gap-2 bg-zinc-200 text-zinc-900 hover:bg-white"
        >
          <RefreshCcw className="w-4 h-4" />
          Try again
        </Button>
      </div>
    </div>
  );
}
