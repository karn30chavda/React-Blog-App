import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Button, Input, RTE, Select } from ".."
import service from "../../appwrite/appwritedata"

function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, getValues, formState: { errors } } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  })

  const [slugEdited, setSlugEdited] = useState(false)
  const navigate = useNavigate()
  const userData = useSelector(state => state.auth.userData)

  const title = watch("title")
  const slug = watch("slug")

  // Slug auto-update logic
  useEffect(() => {
    if (!slugEdited) {
      const generatedSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
      setValue("slug", generatedSlug)
    }
  }, [title, slugEdited, setValue])

  // Detect manual slug edit
  useEffect(() => {
    const generatedSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
    if (slug !== generatedSlug) {
      setSlugEdited(true)
    }
  }, [slug, title])

  const submit = async (data) => {
    if (post) {
      const file = data.image[0] ? await service.uploadFile(data.image[0]) : null
      if (file) {
        await service.deleteFile(post.featuredimage)
      }
      const dbPost = await service.updatePost(post.$id, {
        ...data,
        featuredimage: file ? file.$id : post.featuredimage,
      })
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`)
      }
    } else {
      const file = await service.uploadFile(data.image[0])
      if (file) {
        const dbPost = await service.createPost({
          ...data,
          featuredimage: file.$id,
          userid: userData.$id,
          username: userData.name,
        })
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`)
        }
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-4 w-full">
      <Input
        label="Title"
        placeholder="Enter title here"
        {...register("title", { required: true })}
      />
      {errors.title && <span className="text-red-500 text-sm">Title is required</span>}

      <Input
        label="Slug"
        placeholder="post-slug"
        {...register("slug", { required: true })}
      />
      {errors.slug && <span className="text-red-500 text-sm">Slug is required</span>}

      <RTE
        label="Content"
        name="content"
        control={control}
        defaultValue={getValues("content")}
      />
      {errors.content && <span className="text-red-500 text-sm">Content is required</span>}

      <Input
        label="Featured Image"
        type="file"
        accept="image/*"
        {...register("image", { required: !post })}
      />
      {!post && errors.image && <span className="text-red-500 text-sm">Image is required</span>}

      <Select
        label="Status"
        options={["active", "inactive"]}
        {...register("status", { required: true })}
      />

      <Button type="submit" className="w-full">{post ? "Update" : "Submit"}</Button>
    </form>
  )
}

export default PostForm