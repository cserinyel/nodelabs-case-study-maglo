import React from "react";
import { Toaster, type ToasterProps } from "react-hot-toast";

const ToastManager = ({ children }: { children: React.ReactNode }) => {
  const toastOptions: ToasterProps = {
    position: "top-right",
    reverseOrder: false,
  };

  return (
    <div>
      <Toaster {...toastOptions} />
      {children}
    </div>
  );
};

export default ToastManager;
