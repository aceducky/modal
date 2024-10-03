import { useState } from "react";
import Modal from "./Modal";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="grid place-items-center w-screen h-screen">
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Open Modal
      </button>

      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <p className="mb-4">
          This modal uses simplified animations with CSS keyframes.
        </p>
        <button
          onClick={() => setIsOpen(false)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Close Modal
        </button>
      </Modal>
    </div>
  );
}

export default App;
