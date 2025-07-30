import parse from "html-react-parser";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/appwritedata";
import { Button, Container } from "../components";
import PostLoader from "../SkeletonLoader/PostLoader";

export default function Post() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const navigate = useNavigate();
  const { userData, isAuthReady } = useSelector((state) => state.auth);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    if (slug) {
      setLoading(true);
      service.getPost(slug).then((postData) => {
        if (postData) {
          setPost(postData);
        } else {
          navigate("/");
        }
        setLoading(false);
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  const isAuthor = isAuthReady && post && post.userid === userData?.$id;

  const deletePost = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) return;

    service.deletePost(post.$id).then((status) => {
      if (status) {
        service.deleteFile(post.featuredimage);
        navigate("/");
      }
    });
  };

  return (
    <div className="py-8">
      <Container>
        {loading ? (
          <PostLoader />
        ) : post ? (
          <div className="w-full max-w-4xl mx-auto bg-white/5 p-6 rounded-2xl border border-white/10 shadow-md">
            {/* Post Image */}
            <div className="relative mb-6 overflow-hidden rounded-xl">
              {!imgLoaded && (
                <div className="absolute inset-0 bg-white/5 animate-pulse" />
              )}
              <img
                src={service.getFilePreview(post.featuredimage)}
                alt={post.title}
                className={`w-full max-h-[400px] object-cover group-hover:scale-105 transition-transform duration-300  ${
                  imgLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setImgLoaded(true)}
              />
              {/* Edit/Delete Buttons */}
              {isAuthor && (
                <div className="absolute top-4 right-4 flex gap-2">
                  <Link to={`/edit-post/${post.$id}`}>
                    <Button
                      bgcolor="bg-green-500"
                      className="flex items-center gap-2"
                    >
                      <Pencil size={16} /> Edit
                    </Button>
                  </Link>
                  <Button
                    bgcolor="bg-red-500"
                    className="flex items-center gap-2"
                    onClick={deletePost}
                  >
                    <Trash2 size={16} /> Delete
                  </Button>
                </div>
              )}
            </div>

            {/* Post Title */}
            <h1 className="text-3xl font-bold text-white mb-4 border-b border-white/10 pb-2">
              {post.title}
            </h1>

            {/* Post Content */}
            <div className="prose prose-invert max-w-none browser-css">
              {parse(post.content)}
            </div>
          </div>
        ) : (
          <p className="text-center text-white">Post not found.</p>
        )}
      </Container>
    </div>
  );
}
