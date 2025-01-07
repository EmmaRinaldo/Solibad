// app/page.jsx
"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Home = () => {
  // Get session from useSession hook
  const { data: session } = useSession();

  // Get the router object
  const router = useRouter();

  return (
    <>
      <title>Auction - Solibad</title>
      <meta name="description" content="..." />
      <meta name="keywords" content="auction" />

      <Navbar />
      <div className="navbar-padding-protection"></div>
      <Footer />
    </>
  );
};

export default Home;
