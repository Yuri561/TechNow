import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Equipment: React.FC = () => {
  const username: string = localStorage.getItem('username') || 'Guest';
  const equipmentDetails = {
    workOrder: 'WO001',
    unitInformation: 'HVAC Unit #1234',
    rtuInformation: 'RTU #5678',
    maintenanceHistory: [
      '2024-05-01: Replaced filter',
      '2024-04-15: Checked refrigerant levels',
      '2024-03-20: Cleaned coils'
    ],
    additionalNotes: 'Ensure to check the ductwork for leaks during the next maintenance check.'
  };

  const [formState, setFormState] = useState({
    workPerformed: '',
    recommendations: '',
    labor: '',
    materialUsed: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formState);
    setFormState({
      workPerformed: '',
      recommendations: '',
      labor: '',
      materialUsed: ''
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="equipment p-8 w-full h-full bg-gray-900 text-white flex flex-col items-center overflow-y-auto"
    >
      <header className="page-header w-full max-w-5xl mb-6 bg-gray-800 p-4 rounded-2xl flex justify-between items-center shadow-md">
        <h2 className="text-2xl font-semibold">Equipment Details</h2>
        <div className="user-info text-lg">Welcome, {username}</div>
      </header>
      <div className="equipment-content w-full max-w-5xl flex flex-col space-y-6">
        <div className="bg-gray-800 p-6 rounded-2xl shadow-md">
          <h3 className="text-xl font-semibold mb-2">Work Order: {equipmentDetails.workOrder}</h3>
          <p className="text-lg">{equipmentDetails.unitInformation}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-2xl shadow-md">
          <h3 className="text-xl font-semibold mb-2">RTU Information</h3>
          <p className="text-lg">{equipmentDetails.rtuInformation}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-2xl shadow-md">
          <h3 className="text-xl font-semibold mb-2">Maintenance History</h3>
          <ul className="list-disc list-inside">
            {equipmentDetails.maintenanceHistory.map((entry, index) => (
              <li key={index} className="text-lg">{entry}</li>
            ))}
          </ul>
        </div>
        <div className="bg-gray-800 p-6 rounded-2xl shadow-md">
          <h3 className="text-xl font-semibold mb-2">Additional Notes</h3>
          <p className="text-lg">{equipmentDetails.additionalNotes}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-2xl shadow-md">
          <form onSubmit={handleSubmit} className="equipment-form flex flex-col space-y-4">
            <label className="flex flex-col space-y-2">
              <span>Work Performed:</span>
              <textarea name="workPerformed" value={formState.workPerformed} onChange={handleChange} className="p-2 bg-gray-700 rounded-lg"/>
            </label>
            <label className="flex flex-col space-y-2">
              <span>Recommendations:</span>
              <textarea name="recommendations" value={formState.recommendations} onChange={handleChange} className="p-2 bg-gray-700 rounded-lg"/>
            </label>
            <label className="flex flex-col space-y-2">
              <span>Labor:</span>
              <input type="text" name="labor" value={formState.labor} onChange={handleChange} className="p-2 bg-gray-700 rounded-lg"/>
            </label>
            <label className="flex flex-col space-y-2">
              <span>Material Used:</span>
              <input type="text" name="materialUsed" value={formState.materialUsed} onChange={handleChange} className="p-2 bg-gray-700 rounded-lg"/>
            </label>
            <div className="flex justify-between w-full mt-4">
              <button type="button" className="bg-gray-500 text-white py-2 px-4 rounded-2xl hover:bg-gray-700 transition duration-300 shadow">
                <span className="material-icons">arrow_back</span>
              </button>
              <button type="button" className="bg-gray-500 text-white py-2 px-4 rounded-2xl hover:bg-gray-700 transition duration-300 shadow">
                <span className="material-icons">arrow_forward</span>
              </button>
            </div>
            <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-2xl hover:bg-blue-700 transition duration-300 shadow">Submit</button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default Equipment;
