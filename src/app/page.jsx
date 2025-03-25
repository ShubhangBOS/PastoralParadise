"use client";
import AuthModal from "@/components/auth/AuthModal";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import { useAppStore } from "@/store/store";

export default function Home() {
  const { isAuthModalOpen } = useAppStore();
  return (
    <>
      <Navbar />
      <Footer />
      {isAuthModalOpen && <AuthModal />}
    </>
  );
}
