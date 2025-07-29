function HomeLoader() {
  return (
    <div className="animate-pulse text-white">
      <section className="text-center py-20 space-y-4">
        <div className="h-10 bg-white/10 w-3/4 mx-auto rounded" />
        <div className="h-6 bg-white/10 w-2/3 mx-auto rounded" />
        <div className="h-10 bg-white/10 w-40 mx-auto rounded-full" />
      </section>

      <section className="py-10">
        <div className="h-6 bg-white/10 w-52 mx-auto mb-6 rounded" />
        <div className="flex justify-center items-center gap-6 flex-wrap">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-full sm:w-[300px] h-[320px] bg-white/5 rounded-3xl overflow-hidden shadow"
            >
              <div className="h-[270px] bg-gray-700" />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-gray-600 rounded w-3/4"></div>
                <div className="h-3 bg-gray-600 rounded w-1/2"></div>
                <div className="h-8 bg-gray-700 rounded w-full mt-3"></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-8 text-center py-16 border-y border-white/10">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-4">
            <div className="mx-auto h-10 w-10 bg-white/10 rounded-full" />
            <div className="h-6 bg-white/10 w-1/2 mx-auto rounded" />
            <div className="h-4 bg-white/10 w-3/4 mx-auto rounded" />
          </div>
        ))}
      </section>

      <section className="py-16 flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="space-y-4 max-w-xl w-full">
          <div className="h-8 bg-white/10 w-3/4 rounded" />
          <div className="h-4 bg-white/10 w-full rounded" />
        </div>
        <div className="flex items-center justify-center gap-10 text-center">
          {[...Array(3)].map((_, i) => (
            <div key={i}>
              <div className="h-8 w-20 bg-white/10 rounded mb-2" />
              <div className="h-4 w-16 bg-white/10 rounded" />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white/5 backdrop-blur-md rounded-3xl p-10 my-10 mx-auto max-w-3xl text-center shadow-lg space-y-4">
        <div className="h-10 w-10 mx-auto bg-yellow-400/20 rounded-full" />
        <div className="h-6 bg-white/10 w-1/2 mx-auto rounded" />
        <div className="h-4 bg-white/10 w-full rounded" />
      </section>
    </div>
  );
}

export default HomeLoader;
