// app/page.jsx
"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import Auction from "@/components/Auction"; // Import du composant d'enchères

const Home = () => {
  const { t } = useTranslation();
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <>
      <title>Auction - Solibad</title>
      <meta name="description" content="Auction site" />
      <meta name="keywords" content="auction" />
      <h1>{t("greeting")}</h1>
      <p>{t("about")}</p>
      <Navbar />
      <div className="navbar-padding-protection"></div>
      {/* Ajout du composant d'enchères */}
      <Auction />
      <Footer />
    </>
  );
};

export default Home;
