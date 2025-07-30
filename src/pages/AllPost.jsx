import {
  CheckCircle,
  ChevronDown,
  FileText,
  Filter,
  FrownIcon,
  Search,
  Sparkles,
  XCircle,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
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
  const userData = useSelector((state) => state.auth.userData);

  const dropdownRef = useRef();

  const sortOptions = [
    { label: "All Blogs", value: "All Posts", icon: FileText },
    { label: "My Blogs", value: "My Posts", icon: Sparkles },
    { label: "Active Blogs", value: "Active Posts", icon: CheckCircle },
    { label: "Not Active Blogs", value: "Not Active Posts", icon: XCircle },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setLoading(true);

    service
      .getPosts([])
      .then((res) => {
        if (res && res.documents) {
          let filtered = res.documents;

          switch (filter) {
            case "Active Posts":
              filtered = filtered.filter((post) => post.status === "Active");
              break;

            case "Not Active Posts":
              filtered = filtered.filter(
                (post) => post.status === "Not Active"
              );
              break;

            case "My Posts":
              filtered = filtered.filter(
                (post) => post.userid === userData?.$id
              );
              break;

            default:
            // All Posts – no filter needed
          }

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
        console.error("Error fetching posts:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [filter, searchTerm, userData?.$id]);

  return (
    <section className="py-10 px-5 sm:px-10 lg:px-20">
      <div className="text-center mb-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#F25F4C] flex justify-center items-center gap-2">
          <Sparkles className="w-7 h-7 text-purple-400" />
          Explore All Blogs
        </h2>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row justify-center items-start sm:items-end gap-4 mb-10">
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
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setDropdownOpen(false);
              }}
              className="w-full bg-[#2f2f2f] text-white px-4 py-2 pr-10 rounded-xl border border-[#555] focus:outline-none"
            />
            <Search className="absolute right-3 top-2.5 w-5 h-5 text-purple-400" />
          </div>
        </div>

        {/* Dropdown */}
        <div className="w-full sm:w-60 relative" ref={dropdownRef}>
          <label className="flex items-center gap-2 mb-2 text-sm text-[#d6afd0] font-medium pl-1">
            <Filter className="w-4 h-4 text-[#d6afd0]" />
            Sort by
          </label>
          <div
            className="bg-[#2f2f2f] text-white px-4 py-2 rounded-xl border border-[#555] cursor-pointer flex justify-between items-center"
            onClick={() => setDropdownOpen((prev) => !prev)}
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

          {dropdownOpen && (
            <ul className="absolute left-0 z-20 w-full mt-2 bg-[#2f2f2f] border border-[#555] rounded-xl overflow-hidden shadow-lg">
              {sortOptions.map((opt) => (
                <li
                  key={opt.value}
                  className={`px-4 py-2 hover:bg-[#3f3f3f] cursor-pointer flex items-center gap-2 ${
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

      {/* Posts Section */}
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
