import { useState } from "react";
import Modal from "./Modal";
import NativeModal from "./NativeModal";

function App() {
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [isNativeModalOpen, setIsNativeModalOpen] = useState(false);

  return (
    <div className="grid place-items-center w-screen h-screen bg-white space-y-6">
      <div>
        <button
          onClick={() => setIsCustomModalOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Open Custom Modal
        </button>

        <Modal
          isOpen={isCustomModalOpen}
          onClose={() => setIsCustomModalOpen(false)}
        >
          <p>This is a custom modal using React portal and CSS animations.</p>
          <button
            onClick={() => setIsCustomModalOpen(false)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Close Modal
          </button>
        </Modal>
      </div>

      <div>
        <button
          onClick={() => setIsNativeModalOpen(true)}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Open Native Modal
        </button>

        <NativeModal
          isOpen={isNativeModalOpen}
          onClose={() => setIsNativeModalOpen(false)}
        >
          <p>This is a modal dialog using the native HTML dialog element.</p>
          <button
            onClick={() => setIsNativeModalOpen(false)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Close Modal
          </button>
        </NativeModal>
      </div>
    </div>
  );
}

export default App;
