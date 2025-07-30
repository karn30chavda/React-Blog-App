import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, FormLoader, Input, RTE, Select } from "..";

import service from "../../appwrite/appwritedata";

function PostForm({ post }) {
  const { register, handleSubmit, watch, control, setValue, getValues, reset } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        content: post?.content || "",
        status: post?.status || "Active",
        username: post?.username || "",
      },
    });

  const [selectedFileName, setSelectedFileName] = useState("No file chosen");
  const [slug, setSlug] = useState(post?.title || "");
  const [rteLoaded, setRteLoaded] = useState(true);
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const slugTransform = useCallback((value) => {
    return (
      value
        ?.trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-") || ""
    );
  }, []);

  // Sync slug with title (both create & edit)
  useEffect(() => {
    const sub = watch((value, { name }) => {
      if (name === "title") {
        const newSlug = slugTransform(value.title);
        setSlug(newSlug);
        setValue("slug", newSlug);
      }
    });

    return () => sub.unsubscribe();
  }, [watch, slugTransform, setValue]);

  // Set slug on edit directly from post
  useEffect(() => {
    if (post) {
      const newSlug = post.slug ? post.slug : slugTransform(post.title);
      setSlug(newSlug);
      setValue("slug", newSlug);
    }
  }, [post, setValue, slugTransform]);

  useEffect(() => {
    const timer = setTimeout(() => setRteLoaded(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const submit = async (data) => {
    const finalData = {
      ...data,
      slug: slug, // force slug to be synced
    };

    if (post) {
      const file = data.image[0]
        ? await service.uploadFile(data.image[0])
        : null;

      if (file) await service.deleteFile(post.featuredimage);

      const dbPost = await service.updatePost(post.$id, {
        ...finalData,
        featuredimage: file ? file.$id : post.featuredimage,
      });

      if (dbPost) navigate(`/post/${dbPost.$id}`);
    } else {
      const file = await service.uploadFile(data.image[0]);
      if (file) {
        const dbPost = await service.createPost({
          ...finalData,
          userid: userData.$id,
          username: userData.name,
          featuredimage: file.$id,
        });

        if (dbPost) navigate(`/post/${dbPost.$id}`);
      }
    }
  };

  return rteLoaded ? (
    <FormLoader />
  ) : (
    <form
      onSubmit={handleSubmit(submit)}
      className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-4"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Panel - Post Settings */}
        <div className="bg-white/10 backdrop-blur-md border border-[#893168]/20 rounded-3xl p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-[#F25F4C] mb-4">
            🛠️ Blog Settings
          </h2>

          <div className="space-y-4">
            <Input
              label="Title"
              placeholder="Enter Blog title"
              {...register("title", { required: true })}
            />

            <Input
              label="Slug (auto-generated)"
              placeholder="Auto-generated slug"
              value={slug}
              disabled
              className="cursor-not-allowed bg-[#f5f5f5] text-gray-500"
            />

            {/* File Upload */}
            <div className="w-full">
              <label
                htmlFor="featuredImageInput"
                className="block mb-1 pl-1 text-sm font-medium text-[#d6afd0]"
              >
                Featured Image
              </label>

              <label
                htmlFor="featuredImageInput"
                className="flex items-center justify-between px-4 py-2 rounded-xl bg-[#EAEAEA] text-[#2E1C2B] border border-[#893168] cursor-pointer hover:bg-[#e3d4dc] transition-all duration-200"
              >
                <span
                  className="truncate text-sm max-w-[60%]"
                  title={selectedFileName}
                >
                  {selectedFileName}
                </span>
                <span className="text-sm font-medium text-[#893168]">
                  📁 Choose File
                </span>
              </label>

              <input
                id="featuredImageInput"
                type="file"
                accept="image/*"
                className="hidden"
                {...register("image", {
                  required: !post,
                  onChange: (e) =>
                    setSelectedFileName(
                      e.target.files[0]?.name || "No file chosen"
                    ),
                })}
              />
            </div>

            {/* Preview */}
            {post?.featuredimage && (
              <img
                src={service.getFilePreview(post.featuredimage)}
                alt={post.title}
                className="w-full rounded-2xl mt-3 border border-[#893168]/20"
              />
            )}

            <Select
              options={["Active", "Not Active"]}
              label="Status"
              {...register("status", { required: true })}
            />
          </div>
        </div>

        {/* Right Panel - Content */}
        <div className="col-span-full lg:col-span-2 bg-white/10 backdrop-blur-md border border-[#893168]/20 rounded-3xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-[#F25F4C] mb-4">
            📝 Blog Content
          </h2>

          <div className="w-full">
            <RTE
              label=""
              name="content"
              control={control}
              defaultValue={getValues("content")}
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="bg-white/10 backdrop-blur-md border border-[#893168]/20 rounded-3xl p-6 shadow-lg">
        <Button
          type="submit"
          bgcolor={post ? "bg-green-600" : "bg-indigo-600"}
          className="w-full text-white hover:opacity-90"
        >
          {post ? "Update Blog" : "Create Blog"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
