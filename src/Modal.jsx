import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const ANIMATION_DURATION = 150;

function Modal({ portalId = "modal-root", isOpen = false, onClose, children }) {
  const [shouldMount, setShouldMount] = useState(isOpen);
  const dialogRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setShouldMount(true);
      document.body.style.overflow = "hidden";
      dialogRef.current?.focus();
    } else {
      const timer = setTimeout(() => {
        setShouldMount(false);
        document.body.style.overflow = "unset";
      }, ANIMATION_DURATION);
      return () => clearTimeout(timer);
    }

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    const handleOutsideClick = (e) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!shouldMount) return null;

  return ReactDOM.createPortal(
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }

        @keyframes subtleScaleUp {
          from {
            transform: scale(0.98);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes subtleScaleDown {
          from {
            transform: scale(1);
            opacity: 1;
          }
          to {
            transform: scale(0.98);
            opacity: 0;
          }
        }

        .modal-backdrop {
          background-color: rgba(0, 0, 0, 0.4);
          animation: ${
            isOpen ? "fadeIn" : "fadeOut"
          } ${ANIMATION_DURATION}ms ease-out forwards;
        }

        .modal-content {
          animation: ${
            isOpen ? "subtleScaleUp" : "subtleScaleDown"
          } ${ANIMATION_DURATION}ms ease-out forwards;
        }
      `}</style>
      <div className="fixed inset-0 z-50 flex items-center justify-center modal-backdrop">
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
          className="relative bg-white rounded-lg shadow-lg max-w-md w-full modal-content focus:outline-none"
        >
          <div className="flex justify-between items-start p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Modal Title</h2>
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-1 transition-colors hover:bg-gray-100"
            >
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="text-black p-6">{children}</div>
        </div>
      </div>
    </>,
    document.getElementById(portalId)
  );
}

export default Modal;
