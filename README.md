# 🚀 Dev.Blogs – A Developer's Blogging Platform

![React Blog Banner](https://react-blog-appl.netlify.app/screenshot.png) <!-- Add your own screenshot if needed -->

Welcome to **Dev.Blogs**, a modern and developer-focused blog platform where you can **write, edit, and share** posts with a powerful UI and seamless backend integration using **Appwrite**. Built with **React + Vite**, animated with **Framer Motion**, and styled using **Tailwind CSS**.

---

## 🔗 Live Demo

🌐 [https://react-blog-appl.netlify.app](https://react-blog-appl.netlify.app)

---

## 📸 Homepage Preview

![Homepage Screenshot](<your image upload link or screenshot URL>)

---

## 🧰 Tech Stack

### 💻 Frontend

- **React** (with Hooks)
- **Vite**
- **React Router DOM**
- **React Hook Form**
- **Redux Toolkit** (Auth state)
- **TinyMCE** (Rich Text Editor)
- **Lucide Icons**
- **html-react-parser** (to render blog content safely)
- **Framer Motion** (for animations)
- **Tailwind CSS** (for modern styling)

### ☁️ Backend (Appwrite)

- **Authentication** (Email & Password)
- **Database** (for posts)
- **Storage Bucket** (for image upload)

---

## 🔥 Features

- ✅ Full auth flow (Signup / Login / Logout)
- ✅ Create, edit, and delete rich-text blog posts
- ✅ Upload images to Appwrite Storage
- ✅ Auto-generate slugs from titles
- ✅ Featured blogs section on homepage
- ✅ Post previews with author name and "Read More" link
- ✅ Filter by status (Active / Inactive)
- ✅ Modern animated UI with Framer Motion
- ✅ Fully responsive layout using Tailwind

---

## 📁 Directory Overview

```bash
karn30chavda-react-blog-app/
├── netlify.toml
├── vite.config.js
├── .env.sample
├── public/
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   ├── appwrite/               # Appwrite APIs
│   ├── components/             # Reusable components + postForm, footer, header, layout
│   ├── config/                 # Appwrite config
│   ├── features/               # Redux auth slice
│   ├── pages/                  # Route pages (Home, Post, CreatePost, etc.)
│   ├── SkeletonLoader/         # Loaders for each page
│   └── store/                  # Redux store setup


```

🛠️ Setup Instructions

1. 📦 Install Dependencies

npm install

2. ⚙️ Add .env file (copy from .env.sample)

VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_COLLECTION_ID=your_collection_id
VITE_APPWRITE_BUCKET_ID=your_bucket_id

3. ▶️ Start the Dev Server

npm run dev


---

🧪 Appwrite Setup

✅ Auth

Enable Email + Password


📂 Storage

Create a bucket (blog-images) with Read/Write access


🗃️ Database

Create a collection called Posts with fields:

Field	Type

title	string
slug	string
content	string
featuredimage	string
status	string
userid	string
username	string


Give read/write permissions to logged-in users.


---


📌 Future Enhancements

💬 Comments on posts

👤 Public author profiles

📅 Drafts and post scheduling

📈 Views tracking

🌙 Theme toggle (light/dark)



---

👨‍💻 Author

Made with ❤️ by Karan Chavda

> Dev by passion | Learning full-stack | Cricket fan | Building stuff on the web




---

📄 License

Licensed under the MIT License — Use freely and contribute!

---