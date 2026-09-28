export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="h-[320px] bg-navy-dark animate-pulse" />
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-gray-100 rounded-xl h-[320px] animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
