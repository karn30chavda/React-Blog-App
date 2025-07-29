function AllPostLoader({ count = 4 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array(count)
        .fill(null)
        .map((_, idx) => (
          <div
            key={idx}
            className="w-full h-[320px] bg-white/5 rounded-3xl overflow-hidden shadow animate-pulse"
          >
            <div className="h-[270px] bg-gray-700 flex items-center justify-center"></div>
            <div className="p-4 space-y-2">
              <div className="h-4 bg-gray-600 rounded w-3/4"></div>
              <div className="h-3 bg-gray-600 rounded w-1/2"></div>
              <div className="h-8 bg-gray-700 rounded w-full mt-3"></div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default AllPostLoader;
