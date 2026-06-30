export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] w-full">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-zinc-800 border-t-zinc-400 rounded-full animate-spin"></div>
        <p className="text-zinc-500 text-sm font-medium animate-pulse">Loading...</p>
      </div>
    </div>
  );
}
