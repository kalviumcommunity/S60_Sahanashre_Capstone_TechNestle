import React from 'react';
import Modal from 'react-modal';

const MyModal = ({ isOpen, onClose, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="fixed inset-0 flex items-center justify-center outline-none"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="relative bg-white p-6 w-[80vh] h-[65vh] overflow-auto rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-bold mb-2">Comments</span>
          <button
            className="bg-red-500 text-white p-2 font-bold rounded-lg pr-2.5 pl-2.5 hover:bg-red-600"
            onClick={onClose}
          >
            X
          </button>
        </div>
        <div>
          {children}
        </div>
      </div>
    </Modal>
  );
};

export default MyModal;
