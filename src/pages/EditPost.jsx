import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/appwritedata";
import { Container, PostForm } from "../components/index";

function EditPost() {
  const [post, setPost] = useState(null);
  const { slug } = useParams(); // ✅ FIXED: Call useParams as function
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      service
        .getPost(slug)
        .then((fetchedPost) => {
          if (fetchedPost) {
            setPost(fetchedPost);
          } else {
            console.error("Post not found for slug:", slug);
            navigate("/"); // fallback redirect
          }
        })
        .catch((err) => {
          console.error("Error fetching post:", err);
          navigate("/");
        });
    } else {
      navigate("/"); // No slug? Redirect to home
    }
  }, [slug, navigate]);

  return post ? (
    <div>
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : (
    <div className="text-center mt-10 text-xl text-gray-600">
      Loading post...
    </div>
  );
}

export default EditPost;
