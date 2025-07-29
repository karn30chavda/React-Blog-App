function FormLoader() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-4 animate-pulse text-white">
      {/* Top Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Settings Panel */}
        <div className="bg-white/10 backdrop-blur-md border border-[#893168]/20 rounded-3xl p-6 shadow-lg space-y-4">
          <div className="h-6 bg-white/20 w-1/2 rounded" />
          <div className="h-10 bg-white/10 rounded" />
          <div className="h-10 bg-white/10 rounded" />
          <div className="h-10 bg-white/10 rounded" />
          <div className="h-[180px] bg-white/10 rounded-2xl" />
          <div className="h-10 bg-white/10 rounded" />
        </div>

        {/* Content Panel */}
        <div className="col-span-full lg:col-span-2 bg-white/10 backdrop-blur-md border border-[#893168]/20 rounded-3xl p-6 shadow-lg space-y-4">
          <div className="h-6 bg-white/20 w-1/2 rounded" />
          <div className="h-[300px] bg-white/10 rounded-xl" />
        </div>
      </div>

      {/* Submit Button */}
      <div className="bg-white/10 backdrop-blur-md border border-[#893168]/20 rounded-3xl p-6 shadow-lg">
        <div className="h-12 w-full bg-white/20 rounded-lg" />
      </div>
    </div>
  );
}

export default FormLoader;
