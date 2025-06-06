"use client";

import { useAppStore } from "@/store/store";
import AuthModal from "../auth/AuthModal";


export default function ModalWrapper() {
  const { authModal } = useAppStore();


    return <>
    {authModal && <AuthModal/>}
    </>
}
