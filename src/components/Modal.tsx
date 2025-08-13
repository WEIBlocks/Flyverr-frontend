import React, { useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Modal = ({ children, size = 'md' }: ModalProps) => {
  useEffect(() => {
    // Prevent scrolling on the body while the modal is open
    document.body.style.overflow = "hidden";
    return () => {
      // Restore scrolling when the modal unmounts
      document.body.style.overflow = "auto";
    };
  }, []);

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'max-w-sm w-full';
      case 'md':
        return 'max-w-md w-full';
      case 'lg':
        return 'max-w-lg w-full';
      case 'xl':
        return 'max-w-xl w-full';
      default:
        return 'max-w-md w-full';
    }
  };

  // Create a portal to render the modal at the root level
  return createPortal(
    <div className="fixed inset-0 w-full h-screen bg-black/20 dark:bg-black/40 backdrop-blur-sm overflow-y-auto z-50">
      <div className="w-full min-h-screen p-4 sm:p-5 flex justify-center items-center">
        <div className={`slide-down-big-in ${getSizeClasses()} mx-auto rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-2xl dark:shadow-black/25`}>
          <div className="pt-[29px] pr-[30px] pb-[21px] pl-[35px] w-full">
            {children}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal; 