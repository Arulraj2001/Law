export default function Loading() {
  return (
    <div className="min-h-screen bg-white animate-pulse">
      {/* Navbar skeleton */}
      <div className="h-[72px] bg-navy-dark" />

      {/* Hero skeleton */}
      <div className="min-h-[500px] bg-gradient-to-br from-navy-dark to-navy-light flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/60 text-sm">Loading...</p>
        </div>
      </div>
    </div>
  );
}
