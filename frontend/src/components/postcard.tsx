'use client';
import { useState } from 'react';
import { api } from '../../utils/api';


interface Post {
  _id: string;
  content: string;
  createdAt: string;
  author: { name: string };
  likesCount: number;
  dislikesCount: number;
  likedByUser: boolean;
  dislikedByUser: boolean;
}

export default function PostCard({ post, onUpdate }: { post: Post; onUpdate: () => void }) {
  const [loading, setLoading] = useState(false);

  const likePost = async () => {
    setLoading(true);
    try {
      await api.post(`/posts/${post._id}/like`);
      onUpdate();
    } finally {
      setLoading(false);
    }
  };

  const dislikePost = async () => {
    setLoading(true);
    try {
      await api.post(`/posts/${post._id}/dislike`);
      onUpdate();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border rounded p-4 bg-white shadow hover:shadow-lg transition mb-4">
      <p className="mb-2">{post.content}</p>
      <div className="flex justify-between text-sm text-gray-600">
        <span>By: {post.author.name}</span>
        <span>{new Date(post.createdAt).toLocaleString()}</span>
      </div>
      <div className="mt-2 flex space-x-4">
        <button disabled={loading} onClick={likePost}>
          👍 {post.likesCount}
        </button>
        <button disabled={loading} onClick={dislikePost}>
          👎 {post.dislikesCount}
        </button>
      </div>
    </div>
  );
}
