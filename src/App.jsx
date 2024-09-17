import { useState } from "react";
import Modal from "./Modal";
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="App">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Page</h1>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none"
        onClick={openModal}
      >
        Open Modal
      </button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-xl font-bold mb-4">Modal Dialog</h2>
        <p>This is a modal. You can add more content here.</p>
      </Modal>
    </div>
  );
}

export default App;
