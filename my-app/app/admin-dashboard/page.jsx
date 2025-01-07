"use client";

import { useSession } from "next-auth/react";

export default function AdminDashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session || session.user.role !== "admin") {
    return <p>You are not authorized to view this page.</p>;
  }

  return (
    <div>
      <h1>Welcome, Admin!</h1>
      <p>You are logged in as {session.user.email}.</p>
    </div>
  );
}
