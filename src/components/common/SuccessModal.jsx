"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const SuccessModal = ({ isOpen, onClose }) => {
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      // Prevent revisiting this page on reload
      localStorage.setItem("bookingCompleted", "true");
    }
  }, [isOpen]);

  const handleOk = () => {
    onClose();
    router.push("/");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Blurred background */}
      <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm"></div>

      {/* Modal */}
      <div className="relative z-10 bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-md">
        <h2 className="text-xl font-semibold mb-4">Booking Successful 🎉</h2>
        <p className="text-sm text-gray-700">
          Your booking request has been received. Details have been sent to your
          email. Our team will contact you shortly.
        </p>
        <button
          onClick={handleOk}
          className="mt-6 w-full bg-pastoral-theme-color text-white py-2 rounded-md font-medium"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
