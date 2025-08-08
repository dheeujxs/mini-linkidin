"use client";

import PostForm from "@/components/postForm";
import { useEffect, useState } from "react";


interface Post {
  _id: string;
  content: string;
  createdAt: string;
  author: {
    name: string;
  };
}

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = () => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) return <p className="p-6 text-center">Loading posts...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <PostForm onPostCreated={fetchPosts} />
      {posts.length === 0 ? (
        <p>No posts to show.</p>
      ) : (
        posts.map((post) => (
          <div
            key={post._id}
            className="border rounded p-4 bg-white shadow hover:shadow-lg transition"
          >
            <p className="text-gray-700 mb-2">{post.content}</p>
            <div className="text-sm text-gray-500 flex justify-between">
              <span>By: {post.author.name}</span>
              <span>{new Date(post.createdAt).toLocaleString()}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
