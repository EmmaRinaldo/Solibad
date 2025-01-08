// app/page.jsx
"use client";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useSession } from "next-auth/react";

export default function Home() {
  
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
}
