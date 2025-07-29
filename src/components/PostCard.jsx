import { ArrowRight, UserPen } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import service from "../appwrite/appwritedata";

function PostCard({ $id, title, featuredimage, username }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <Link
      to={`/post/${$id}`}
      className="group w-full sm:w-[300px] bg-white/10 backdrop-blur-md border-none rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="overflow-hidden relative">
        {!imgLoaded && (
          <div className="absolute inset-0 bg-gray-300 animate-pulse" />
        )}
        <img
          src={service.getFilePreview(featuredimage)}
          alt={title}
          crossOrigin="anonymous"
          className={`w-full h-[220px] sm:h-[270px] object-cover group-hover:scale-105 transition-transform duration-300  ${
            imgLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImgLoaded(true)}
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col justify-between min-h-[120px]">
        <h2 className="text-2xl font-bold border-b uppercase text-center border-gray-600 pb-1  truncate">
          {title}
        </h2>
        <div className="mt-2 text-sm font-semibold hover:cursor-pointer rounded-lg transition bg-white/3 p-1">
          <p className="text-sm text-gray-400  ml-3 flex items-center gap-3 animate-pulse">
            <UserPen
              size={16}
              className="text-green-500 transition-transform duration-200 group-hover:scale-110 "
            />
            <span className="text-blue-400 hover:text-blue-600 hover:underline tracking-wider  font-bold cursor-pointer transition-all duration-200 ease-in-out">
              {username}
            </span>
          </p>
        </div>

        <button className="mt-3 inline-flex items-center justify-between gap-5 px-3 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 hover:cursor-pointer rounded-lg transition">
          Read more
          <ArrowRight />
        </button>
      </div>
    </Link>
  );
}

export default PostCard;
