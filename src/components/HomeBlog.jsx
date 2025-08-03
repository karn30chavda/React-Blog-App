import { useState } from "react";
import service from "../appwrite/appwritedata";

function HomeBlogCard({ $id, title, featuredimage, username, onReadMore }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div className="relative w-80 sm:w-80 flex flex-col rounded-2xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-lg border border-white/20 transition hover:scale-105 hover:shadow-3xl duration-300 min-h-[480px] sm:min-h-[420px]">

      {/* Image */}
      <div className="relative">
        {!imgLoaded && (
          <div className="absolute inset-0 bg-gray-200/60 animate-pulse h-80 sm:h-56 w-full" />
        )}
        <img
          src={service.getFilePreview(featuredimage)}
          alt={title}
          className={`w-full h-80 sm:h-56 object-cover transition-opacity duration-300 ${
            imgLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImgLoaded(true)}
        />
      </div>
      {/* Card Content */}
      <div className="flex flex-col flex-1 justify-between p-5 pt-8 mt-[-1.5rem] bg-white/60 dark:bg-[#181A2A]/70 backdrop-blur-xl rounded-b-2xl">
        {/* Username */}
        <div className="flex items-center gap-2 mb-2">
          <span className="font-semibold text-indigo-600 dark:text-[#FFD803] text-base">
            @{username}
          </span>
        </div>
        {/* Title as caption */}
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
          {title}
        </h3>
        {/* Read More Button */}
        <button
          onClick={onReadMore}
          className="mt-auto bg-indigo-600 px-4 py-2 rounded-full text-white font-semibold shadow hover:brightness-110 transition"
        >
          Read More
        </button>
      </div>
    </div>
  );
}

export default HomeBlogCard;
