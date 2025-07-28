import { BookText, CardSim, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import service from "../appwrite/appwritedata";
import { Container, PostCard } from "../components";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    service.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
      setLoading(false);
    });
  }, []);

  const renderSkeletonCards = () => {
    return Array.from({ length: 3 }).map((_, index) => (
      <div
        key={index}
        className="w-full sm:w-[300px] h-[320px] bg-white/5 rounded-3xl overflow-hidden shadow animate-pulse"
      >
        <div className="h-[200px] bg-gray-700 flex items-center justify-center"></div>
        <div className="p-4 space-y-2">
          <div className="h-4 bg-gray-600 rounded w-3/4"></div>
          <div className="h-3 bg-gray-600 rounded w-1/2"></div>
          <div className="h-8 bg-gray-700 rounded w-full mt-3"></div>
        </div>
      </div>
    ));
  };

  return (
    <div className="w-full min-h-screen bg-[#0F0E17] text-white py-10">
      <Container>
        {/* 🔥 Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#FFD803] flex justify-center items-center gap-2">
            <BookText className="w-8 h-8 text-[#F25F4C]" />
            Dev.Blogs
          </h1>
          <p className="text-gray-300 text-lg mt-2 flex justify-center items-center gap-1">
            <Sparkles className="w-5 h-5 text-yellow-300" />
            Share your knowledge with the world.
          </p>
        </div>

        {/* 🌀 Loading */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {renderSkeletonCards()}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="flex justify-center items-center gap-3 text-2xl font-semibold text-red-300">
              No posts yet <CardSim />
            </h2>
            <p className="text-gray-400 mt-2">
              Please Login/Sign up First or Create Post
            </p>
            <p className="text-gray-400 mt-2">
              Be the first one to publish something amazing!
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {posts.map((post) => (
                <PostCard key={post.$id} {...post} />
              ))}
            </div>
          </>
        )}
      </Container>
    </div>
  );
}

export default Home;
