import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

function Modal({ isModalOpen, closeModal, children }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen, closeModal]);

  if (!isModalOpen) return null; // if isOpen is set to false the component returns null
  //important part, modal closing and showing is controlled here

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div
        ref={modalRef}
        className="bg-black shadow-md shadow-white p-8 rounded-lg max-w-md w-full relative"
      >
        <button
          className="absolute top-4 right-4 text-2xl font-bold text-gray-600 hover:text-gray-800 focus:outline-none"
          onClick={closeModal}
        >
          &times;
        </button>
        <div className="mt-4">{children}</div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}
export default Modal;
