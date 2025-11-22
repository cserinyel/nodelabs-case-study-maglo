import React from "react";
import { Toaster, type ToasterProps } from "react-hot-toast";

const ToastManager = ({ children }: { children: React.ReactNode }) => {
  const toastOptions: ToasterProps = {
    position: "top-center",
    reverseOrder: false,
  };

  return (
    <div className="fixed top-0 right-0 w-full h-full">
      <Toaster {...toastOptions} />
      {children}
    </div>
  );
};

export default ToastManager;
