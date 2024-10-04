import { useRef, useEffect } from "react";

function NativeModal({ isOpen, onClose, children }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialogElement = dialogRef.current;

    if (isOpen) {
      dialogElement.showModal();
    } else {
      dialogElement.close();
    }
  }, [isOpen]);

  return (
    <>
      <style>{`
        .modal-dialog {
          opacity: 0;
          transform: scale(0.95);
          transition:
          all 500ms cubic-bezier(0.16, 1, 0.3, 1) allow-discrete;
        }

        .modal-dialog[open] {
          opacity: 1;
          transform: scale(1);
        }

        @starting-style {
          .modal-dialog[open] {
            opacity: 0;
            transform: scale(0.95);
          }
        }

        .modal-dialog::backdrop {
          background-color: rgba(0, 0, 0, 0);
          transition:
            all 500ms cubic-bezier(0.16, 1, 0.3, 1) allow-discrete;
        }

        .modal-dialog[open]::backdrop {
          background-color: rgba(0, 0, 0, 0.1);
        }

        @starting-style {
          .modal-dialog[open]::backdrop {
            background-color: rgba(0, 0, 0, 0);
          }
        }
      `}</style>
      <dialog
        ref={dialogRef}
        onClose={onClose}
        className="modal-dialog 
          fixed inset-0 
          bg-white
          rounded-lg shadow-xl 
          p-6
          outline-none
          w-full max-w-md
          mx-auto my-auto"
      >
        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300
                transition-colors duration-200"
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
          <div>{children}</div>
        </div>
      </dialog>
    </>
  );
}

export default NativeModal;
