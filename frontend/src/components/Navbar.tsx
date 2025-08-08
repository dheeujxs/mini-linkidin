"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface User {
  name: string;
}

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Not authorized");
        return res.json();
      })
      .then((data) => setUser(data))
      .catch(() => setUser(null));
  }, []);

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 shadow-md flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">
        Mini LinkedIn
      </Link>
      <div className="space-x-4 flex items-center">
        <Link href="/feed" className="hover:underline">
          Feed
        </Link>
        <Link href="/profile" className="hover:underline">
          Profile
        </Link>

        {user ? (
          <span className="ml-4 font-semibold">Welcome, {user.name}</span>
        ) : (
            <div className="gap-2 flex items-center justify-center">
          <Link 
          href="/login" className="hover:underline">
            Login
          </Link>
          <Link href="/register" className="hover:underline">
            Register
          </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
