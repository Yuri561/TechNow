import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface NotesProps {
  isOpen: boolean;
  onClose: () => void;
  initialNotes: string;
  onSave: (notes: string) => void;
}

const Notes: React.FC<NotesProps> = ({ isOpen, onClose, initialNotes, onSave }) => {
  const [notes, setNotes] = useState(initialNotes);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
  };

  const handleSave = () => {
    onSave(notes);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="bg-gray-800 p-6 rounded-2xl shadow-md w-full max-w-lg relative"
      >
        <h3 className="text-xl font-semibold mb-4 text-white">Edit Notes</h3>
        <textarea
          value={notes}
          onChange={handleChange}
          className="w-full p-2 bg-gray-700 rounded-lg text-white mb-4"
          rows={10}
        />
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Save
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Notes;
