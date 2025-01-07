// app/page.jsx
"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();

  // Get session from useSession hook
  const { data: session } = useSession();

  // Get the router object
  const router = useRouter();

  return (
    <>
      <title>Auction - Solibad</title>
      <meta name="description" content="..." />
      <meta name="keywords" content="auction" />
      <h1>{t("greeting")}</h1>
      <p>{t("about")}</p>
      <Navbar />
      <div className="navbar-padding-protection"></div>
      <Footer />
    </>
  );
};

export default Home;
