import { Link } from "react-router-dom";
import service from "../appwrite/appwritedata";

function PostCard({ $id, title, featuredimage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-[#F4D35E] rounded-xl p-4 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
        <div className="w-full flex justify-center mb-4">
          <img
            src={service.getFilePreview(featuredimage)}
            alt={title}
            className="rounded-xl object-cover max-h-60 w-full"
          />
        </div>
        <h2 className="text-xl font-semibold text-[#1F271B] hover:text-[#19647E] transition-colors duration-300">
          {title}
        </h2>
      </div>
    </Link>
  );
}

export default PostCard;
