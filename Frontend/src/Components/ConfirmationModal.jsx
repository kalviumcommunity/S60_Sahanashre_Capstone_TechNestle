import { useState, useEffect } from 'react';
import Modal from 'react-modal';

const ConfirmationModal = ({ isOpen, onRequestClose, user, getCookie, onSubmit }) => {
  const [emailData, setEmailData] = useState({});

  useEffect(() => {
    if (user) {
      setEmailData({
        from: getCookie("username"),
        to: user.username,
        subject: 'Request to Learn a Skill',
        text: `Hello ${user.username},\n\nI am ${getCookie("username")}. I would like to learn ${user.skills.join(", ")} from you.\n\nWith regards,\n${getCookie("username")}`
      });
    }
  }, [user, getCookie]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailData({ ...emailData, [name]: value });
  };

  const handleSubmit = () => {
    console.log(emailData)
    onSubmit(emailData);
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="flex items-center justify-center"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div className="bg-white rounded-lg p-6 w-96 max-h-full overflow-y-auto">
        <h2 className="text-lg font-bold mb-4" style={{ fontSize: '20px' }}>Learning Request</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" style={{ fontSize: '18px' }}>Subject:</label>
          <input
            type="text"
            name="subject"
            value={emailData.subject}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            style={{ fontSize: '18px' }}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" style={{ fontSize: '18px' }}>Message:</label>
          <textarea
            name="text"
            value={emailData.text}
            onChange={handleChange}
            rows="8"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm resize-none"
            style={{ fontSize: '18px' }}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" style={{ fontSize: '18px' }}>Skills:</label>
          <p className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 sm:text-sm" style={{ fontSize: '18px' }}>
            {user.skills.join(', ')}
          </p>
        </div>
        <div className="flex justify-between">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
            style={{ fontSize: '18px' }}
          >
            Send Request
          </button>
          <button
            onClick={onRequestClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700"
            style={{ fontSize: '18px' }}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;