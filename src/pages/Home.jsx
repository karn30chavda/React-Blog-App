import { AnimatePresence, motion } from "framer-motion";
import {
  Code2,
  Flame,
  Lightbulb,
  LockKeyholeOpen,
  LogIn,
  PenLine,
  Sparkles,
  Users2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import service from "../appwrite/appwritedata";
import { Container, HomeLoader } from "../components";
import HomeBlogCard from "../components/HomeBlog"; // <-- Import your card

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  useEffect(() => {
    service.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
      setLoading(false);
    });
  }, []);

  // Auto-play effect
  useEffect(() => {
    if (!authStatus || posts.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % posts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [posts, authStatus]);

  return loading ? (
    <HomeLoader />
  ) : (
    <div className="w-full min-h-screen bg-[#0F0E17] text-white">
      <Container>
        {/* 🚀 Hero Section */}
        <section className="text-center py-20">
          <h1 className="text-5xl font-extrabold text-[#FFD803] mb-4">
            <span className="flex justify-center items-center gap-2">
              <PenLine className="w-8 h-8 text-[#F25F4C]" />
              Dev.Blogs
            </span>
          </h1>
          <p className="text-lg text-gray-300 max-w-xl mx-auto mb-6">
            Code your thoughts. Share your ideas. Build your voice.
          </p>
          <button
            onClick={() => navigate("/create-post")}
            className="bg-[#F25F4C] px-6 py-3 rounded-full text-white font-semibold hover:cursor-pointer hover:scale-95  hover:bg-[#ff705c] transition"
          >
            Start Writing
          </button>
        </section>

        {/* 🧠 Blog Cards */}
        <section className="pb-15">
          {!authStatus ? (
            <div className="text-center ">
              <LogIn className="w-10 h-10 text-yellow-300 mx-auto mb-2 animate-bounce" />
              <h2 className=" flex justify-center items-center  gap-2 text-2xl font-semibold text-yellow-300">
                Login or Sign Up to view blog posts{" "}
                <LockKeyholeOpen className="text-orange-400 w-6 h-6 animate-pulse" />
              </h2>
              <p className="text-gray-400 mt-2">
                We don’t want you to miss out on awesome content.
              </p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-semibold text-red-300">
                No posts found.
              </h2>
              <p className="text-gray-400 mt-2">
                Be the first to share something awesome!
              </p>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold mb-10 text-center text-white">
                <span className="flex justify-center items-center gap-2 animate-bounce">
                  <Flame className="text-[#FFD803] animate-pulse" />
                  Featured Blogs
                </span>
              </h2>
              <div className="flex justify-center items-center min-h-[400px]">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={posts[current].$id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <HomeBlogCard
                      {...posts[current]}
                      onReadMore={() => navigate(`/post/${posts[current].$id}`)}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          )}
        </section>

        {/* 💡 Platform Features */}
        <section className="grid md:grid-cols-3 gap-8 text-center py-16 border-y border-white/10">
          <div>
            <Code2 className="mx-auto w-10 h-10 text-[#FFD803]" />
            <h3 className="text-xl font-bold mt-4">Built for Devs</h3>
            <p className="text-gray-400 mt-2 text-sm">
              Write about code, tools, projects — all in one space.
            </p>
          </div>
          <div>
            <Users2 className="mx-auto w-10 h-10 text-[#FFD803]" />
            <h3 className="text-xl font-bold mt-4">Engage Community</h3>
            <p className="text-gray-400 mt-2 text-sm">
              Like-minded devs read and support your content.
            </p>
          </div>
          <div>
            <Sparkles className="mx-auto w-10 h-10 text-[#FFD803]" />
            <h3 className="text-xl font-bold mt-4">Slick Writing</h3>
            <p className="text-gray-400 mt-2 text-sm">
              Rich editor, preview, and blazing fast UI.
            </p>
          </div>
        </section>

        {/* 📊 Stats Section */}
        <section className="p-16 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-left space-y-4 max-w-xl">
            <h2 className="text-3xl font-bold text-[#FFD803]">
              Powering the next-gen devs
            </h2>
            <p className="text-gray-300">
              Thousands of blogs read, written, and shared every day. Be a part
              of the dev wave.
            </p>
          </div>
          <div className="flex items-center gap-10 text-center">
            <div>
              <h3 className="text-4xl font-bold text-[#F25F4C]">100+</h3>
              <p className="text-gray-400">Blogs</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-[#F25F4C]">50+</h3>
              <p className="text-gray-400">Authors</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-[#F25F4C]">∞</h3>
              <p className="text-gray-400">Ideas</p>
            </div>
          </div>
        </section>

        {/* 📣 Final CTA */}
        <section className="bg-white/5 backdrop-blur-md rounded-3xl p-10 my-10 mx-auto max-w-3xl text-center shadow-lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-4"
          >
            <Lightbulb className="text-yellow-400 w-10 h-10 animate-pulse" />
            <h2 className="text-2xl font-bold text-[#F25F4C]">Did You Know?</h2>
            <p className="text-gray-300 italic">
              The word <span className="font-semibold text-white">"blog"</span>
              came from a joke! In 1999, Peter Merholz broke the word "weblog"
              into "we blog" — and just like that,
              <span className="text-white font-medium"> blogs were born.</span>
            </p>
          </motion.div>
        </section>
      </Container>
    </div>
  );
}

export default Home;
