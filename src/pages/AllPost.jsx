import { FileText, FrownIcon, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import service from "../appwrite/appwritedata";
import { AllPostLoader } from "../components/index";
import PostCard from "../components/PostCard";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const authStatus = useSelector((state) => state.auth.userData);

  useEffect(() => {
    setLoading(true);

    service
      .getPosts([])
      .then((res) => {
        if (res && res.documents) {
          let filtered = res.documents;

          if (filter === "my") {
            filtered = filtered.filter(
              (post) => post.userid === authStatus?.$id
            );
          } else if (filter === "active") {
            filtered = filtered.filter((post) => post.status === "Active");
          } else if (filter === "inactive") {
            filtered = filtered.filter((post) => post.status === "Not Active");
          }

          setPosts(filtered);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch posts:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [filter, authStatus]);

  return (
    <section className="py-10 px-5 sm:px-10 lg:px-20">
      {/* Heading */}
      <div className="flex items-center justify-center mb-10 gap-2">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#F25F4C] mb-6 flex justify-center items-center gap-2">
          <Sparkles className="w-7 h-7 text-purple-400" />
          Explore All Posts
        </h2>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        <button
          className={`px-4 py-2 rounded-full border ${
            filter === "all"
              ? "bg-blue-600 text-white"
              : "bg-white/10 text-blue-300"
          } hover:bg-blue-700 transition hover:cursor-pointer`}
          onClick={() => setFilter("all")}
        >
          All Posts
        </button>
        <button
          className={`px-4 py-2 rounded-full border ${
            filter === "my"
              ? "bg-green-600 text-white"
              : "bg-white/10 text-green-300"
          } hover:bg-green-700 transition hover:cursor-pointer`}
          onClick={() => setFilter("my")}
        >
          My Posts
        </button>
        <button
          className={`px-4 py-2 rounded-full border ${
            filter === "active"
              ? "bg-indigo-600 text-white"
              : "bg-white/10 text-indigo-300"
          } hover:bg-indigo-700 transition hover:cursor-pointer`}
          onClick={() => setFilter("active")}
        >
          Active
        </button>
        <button
          className={`px-4 py-2 rounded-full border ${
            filter === "inactive"
              ? "bg-red-600 text-white"
              : "bg-white/10 text-red-300"
          } hover:bg-red-700 transition hover:cursor-pointer`}
          onClick={() => setFilter("inactive")}
        >
          Not Active
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <AllPostLoader />
      ) : posts.length === 0 ? (
        <>
          <div className="flex flex-col items-center justify-center mt-10">
            <div className="mb-4">
              <FileText size={48} className="text-violet-500" />
            </div>
            <p className="text-center text-gray-300 flex items-center">
              No posts found <FrownIcon className="text-blue-500 ml-2" />
            </p>
          </div>
        </>
      ) : (
        <div className="flex flex-wrap justify-center gap-6">
          {posts.map((post) => (
            <PostCard key={post.$id} {...post} />
          ))}
        </div>
      )}
    </section>
  );
}

export default AllPosts;
