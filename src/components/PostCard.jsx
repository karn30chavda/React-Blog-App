import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import service from "../appwrite/appwritedata";

function PostCard({ $id, title, featuredimage }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <Link
      to={`/post/${$id}`}
      className="group w-full sm:w-[300px] bg-white/10 backdrop-blur-md border-none rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="overflow-hidden relative">
        {!imgLoaded && (
          <div className="absolute inset-0 bg-gray-400 animate-pulse" />
        )}
        <img
          src={service.getFilePreview(featuredimage)}
          alt={title}
          crossOrigin="anonymous"
          className={`w-full h-[180px] sm:h-[200px] object-cover group-hover:scale-105 transition-transform duration-300  ${
            imgLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImgLoaded(true)}
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col justify-between min-h-[120px]">
        <h2 className="text-2xl font-bold border-b uppercase text-center border-gray-600 pb-1">
          {title}
        </h2>

        <button className="mt-4 inline-flex items-center justify-between gap-5 px-2 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 hover:cursor-pointer rounded-lg transition">
          Read more
          <ArrowRight />
        </button>
      </div>
    </Link>
  );
}

export default PostCard;
