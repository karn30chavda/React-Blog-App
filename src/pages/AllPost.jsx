import {
  CheckCircle,
  ChevronDown,
  FileText,
  Filter,
  FrownIcon,
  Search,
  Sparkles,
  User,
  XCircle,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import service from "../appwrite/appwritedata";
import { AllPostLoader } from "../components";
import PostCard from "../components/PostCard";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All Posts");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const authStatus = useSelector((state) => state.auth.userData);

  const sortOptions = [
    { label: "All Blogs", value: "All Posts", icon: FileText },
    { label: "My Blogs", value: "My Posts", icon: User },
    { label: "Active Blogs", value: "Active Posts", icon: CheckCircle },
    { label: "Not Active Blogs", value: "Not Active Posts", icon: XCircle },
  ];

  useEffect(() => {
    if (filter === "My Posts" && !authStatus?.$id) return;

    setLoading(true);
    service
      .getPosts([])
      .then((res) => {
        if (res && res.documents) {
          let filtered = res.documents;

          // Apply Filter
          switch (filter) {
            case "My Posts":
              filtered = filtered.filter(
                (post) => post.userid === authStatus?.$id
              );
              break;
            case "Active Posts":
              filtered = filtered.filter((post) => post.status === "Active");
              break;
            case "Not Active Posts":
              filtered = filtered.filter(
                (post) => post.status === "Not Active"
              );
              break;
            default:
              break;
          }

          // Apply Search
          if (searchTerm.trim() !== "") {
            filtered = filtered.filter((post) =>
              (post.title + post.username)
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            );
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
  }, [filter, authStatus, searchTerm]);

  return (
    <section className="py-10 px-5 sm:px-10 lg:px-20">
      {/* Explore Heading */}
      <div className="text-center mb-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#F25F4C] flex justify-center items-center gap-2">
          <Sparkles className="w-7 h-7 text-purple-400" />
          Explore All Blogs
        </h2>
      </div>

      {/* Search + Filter Row */}
      <div className="flex flex-col sm:flex-row justify-center items-start sm:items-end gap-4 mb-10">
        {/* Search Block */}
        <div className="w-full sm:w-72">
          <label className="flex items-center gap-2 mb-2 text-sm text-[#d6afd0] font-medium pl-1">
            <Search className="w-4 h-4 text-[#d6afd0]" />
            Search blog
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Search by title or username..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#2f2f2f] text-white px-4 py-2 pr-10 rounded-xl border border-[#555] focus:outline-none"
            />
            <Search className="absolute right-3 top-2.5 w-5 h-5 text-purple-400" />
          </div>
        </div>

        {/* Filter Block */}
        <div className="w-full sm:w-60">
          <label className="flex items-center gap-2 mb-2 text-sm text-[#d6afd0] font-medium pl-1">
            <Filter className="w-4 h-4 text-[#d6afd0]" />
            Sort by
          </label>
          <div
            className="bg-[#2f2f2f] text-white px-4 py-2 rounded-xl border border-[#555] cursor-pointer flex justify-between items-center"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <div className="flex items-center gap-2">
              {React.createElement(
                sortOptions.find((opt) => opt.value === filter).icon,
                { className: "w-4 h-4 text-purple-400" }
              )}
              <span>
                {sortOptions.find((opt) => opt.value === filter).label}
              </span>
            </div>
            <ChevronDown className="w-4 h-4 ml-2" />
          </div>

          {/* Dropdown Options */}
          {dropdownOpen && (
            <ul className="absolute z-10 w-full sm:w-60 mt-2 bg-[#2f2f2f] border border-[#555] rounded-xl overflow-hidden shadow-lg">
              {sortOptions.map((opt) => (
                <li
                  key={opt.value}
                  className={`px-4 py-2 hover:bg-[#3f3f3f] cursor-pointer transition-all flex items-center gap-2 ${
                    filter === opt.value ? "bg-[#444]" : ""
                  }`}
                  onClick={() => {
                    setFilter(opt.value);
                    setDropdownOpen(false);
                  }}
                >
                  <opt.icon className="w-4 h-4 text-purple-400" />
                  <span>{opt.label}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Posts List or Loader */}
      {loading ? (
        <AllPostLoader />
      ) : posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-10">
          <FileText size={48} className="text-violet-500 mb-4" />
          <p className="text-center text-gray-300 flex items-center">
            No posts found <FrownIcon className="text-blue-500 ml-2" />
          </p>
        </div>
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
