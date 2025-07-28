import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import service from "../appwrite/appwritedata";
import PostCard from "../components/PostCard";

// Skeleton Loader Component
const PostCardSkeleton = () => (
  <div className="w-full sm:w-[300px] h-[320px] bg-white/5 rounded-3xl overflow-hidden shadow animate-pulse">
    <div className="h-[270px] bg-gray-700 flex items-center justify-center"></div>
    <div className="p-4 space-y-2">
      <div className="h-4 bg-gray-600 rounded w-3/4"></div>
      <div className="h-3 bg-gray-600 rounded w-1/2"></div>
      <div className="h-8 bg-gray-700 rounded w-full mt-3"></div>
    </div>
  </div>
);

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    service
      .getPosts([])
      .then((res) => {
        if (res && res.documents) {
          setPosts(res.documents);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch posts:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-10 px-5 sm:px-10 lg:px-20">
      <div className="flex items-center justify-center mb-10 gap-2">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#F25F4C] mb-10 flex justify-center items-center gap-2">
          <Sparkles className="w-7 h-7 text-purple-400" />
          Explore All Posts
        </h2>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {loading
          ? Array(3)
              .fill(null)
              .map((_, idx) => <PostCardSkeleton key={idx} />)
          : posts.map((post) => <PostCard key={post.$id} {...post} />)}
      </div>

      {!loading && posts.length === 0 && (
        <p className="text-center text-gray-300 mt-10">
          <FileText className="inline-block mr-2" />
          No posts found 😢
        </p>
      )}
    </section>
  );
}

export default AllPosts;
