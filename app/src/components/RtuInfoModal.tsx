import React, { useState } from 'react';

// Data array for job listings or similar data
const jobList = [
  { title: "Package Furnace", company: "Gas" },
  { title: "Package Heat Pump", company: "Electric" },
  { title: "Reach-in Freezer", company: "Refrigeration" }
];

const ModalToggleButton = ({ toggleModal }) => (
  <button onClick={toggleModal} className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
    Toggle modal
  </button>
);

const ModalHeader = ({ toggleModal }) => (
  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">RTU Information</h3>
    <button onClick={toggleModal} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
);

const ModalBody = ({ toggleModal }) => (
  <div className="p-4 md:p-5">
    <ul className="space-y-4 mb-4">
      {jobList.map((job, index) => (
        <li key={index} className="bg-gray-700 rounded-lg border border-gray-200 p-5 cursor-pointer hover:bg-gray-800">
          <div className="flex justify-between items-center">
            <span>{job.title} - {job.company}</span>
            <span>→</span>
          </div>
        </li>
      ))}
    </ul>
    <button onClick={toggleModal} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4">
      Next step
    </button>
  </div>
);

const RtuInfoModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  if (!isModalOpen) return <ModalToggleButton toggleModal={toggleModal} />;

  return (
    <div className="fixed  rounded inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative p-4 w-full max-w-md max-h-full bg-gray-800 rounded shadow dark:bg-gray-700">
        <ModalHeader toggleModal={toggleModal} />
        <ModalBody toggleModal={toggleModal} />
      </div>
    </div>
  );
};

export default RtuInfoModal;
