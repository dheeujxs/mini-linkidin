"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import FeedPage from "./feed/page";

interface Post {
  _id: string;
  content: string;
  author: { name: string };
  createdAt: string;
}

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/api/posts")
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  const handlePost = async () => {
    await fetch("http://localhost:8000/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token") || "",
      },
      body: JSON.stringify({ content: newPost }),
    });
    setNewPost("");
    const res = await fetch("http://localhost:8000/api/posts");
    setPosts(await res.json());
  };

  return (
    <div className="max-w-lg mx-auto p-4 space-y-4">
      <Card>
        <CardContent className="p-4 space-y-2">
          <Textarea
            placeholder="What's on your mind?"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          />
          <Button onClick={handlePost}>Post</Button>
        </CardContent>
      </Card>

      {posts.map((post) => (
        <Card key={post._id}>
          <CardContent className="p-4">
            <p className="font-semibold">{post.author?.name}</p>
            <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
            <p>{post.content}</p>
            <FeedPage />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
