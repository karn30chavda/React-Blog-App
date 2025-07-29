function PostLoader() {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white/5 p-6 rounded-2xl border border-white/10 shadow-md animate-pulse">
      <div className="w-full h-[400px] bg-white/10 rounded-xl mb-6"></div>
      <div className="h-6 w-3/4 bg-white/10 rounded mb-4"></div>
      <div className="space-y-2">
        <div className="h-4 w-full bg-white/10 rounded"></div>
        <div className="h-4 w-5/6 bg-white/10 rounded"></div>
        <div className="h-4 w-2/3 bg-white/10 rounded"></div>
      </div>
    </div>
  );
}

export default PostLoader;
