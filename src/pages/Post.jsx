import parse from "html-react-parser";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/appwritedata";
import { Button, Container } from "../components";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((postData) => {
        if (postData) {
          setPost(postData);
        } else {
          navigate("/");
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  const isAuthor = post && post.userid === userData?.$id;

  const deletePost = () => {
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
        {post ? (
          <div className="w-full max-w-4xl mx-auto bg-white/5 p-6 rounded-2xl border border-white/10 shadow-md">
            <div className="relative mb-6 overflow-hidden rounded-xl">
              <img
                src={service.getFilePreview(post.featuredimage)}
                alt={post.title}
                className="w-full max-h-[400px] object-cover rounded-xl border border-white/10"
              />
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

            <h1 className="text-3xl font-bold text-white mb-4 border-b border-white/10 pb-2">
              {post.title}
            </h1>
            <div className="prose prose-invert max-w-none browser-css">
              {parse(post.content)}
            </div>
          </div>
        ) : (
          <div className="w-full max-w-4xl mx-auto bg-white/5 p-6 rounded-2xl border border-white/10 shadow-md animate-pulse">
            <div className="w-full h-[400px] bg-white/10 rounded-xl mb-6"></div>
            <div className="h-6 w-3/4 bg-white/10 rounded mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 w-full bg-white/10 rounded"></div>
              <div className="h-4 w-5/6 bg-white/10 rounded"></div>
              <div className="h-4 w-2/3 bg-white/10 rounded"></div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
