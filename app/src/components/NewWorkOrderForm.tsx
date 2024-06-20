import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import './styles/AddWork.css';
import { useNavigate } from 'react-router-dom';

const NewWorkOrderForm: React.FC = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    Id: '',
    Description: '',
    Type: '',
    NTE: '',
    Date: '',
    AssignedTo: '',
    Status: 'Pending',
    Priority: '',
    Location: '',
    Notes: '',
    PO: ''
  });

  const [currentSection, setCurrentSection] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const newOrder = {
      ...formState,
      NTE: parseFloat(formState.NTE),
      Priority: parseInt(formState.Priority),
      Date: new Date(formState.Date)
    };

    try {
      const response = await axios.post('http://localhost:3001/api/workorders', newOrder);
      console.log('work order has been created', response.data);
      navigate('/work-request');
    } catch (error) {
      console.error('Error creating work order:', error);
      setError(error.response?.data?.details || 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    setCurrentSection((prev) => (prev + 1) % sections.length);
  };

  const handlePrev = () => {
    setCurrentSection((prev) => (prev - 1 + sections.length) % sections.length);
  };

  const sections = [
    {
      title: "Work Order Details",
      content: (
        <>
          <label className="flex flex-col space-y-2">
            <span>Work Order Number:</span>
            <input type="text" name="Id" value={formState.Id} onChange={handleChange} required className="p-2 bg-gray-700 rounded-lg"/>
          </label>
          <label className="flex flex-col space-y-2">
            <span>Description:</span>
            <textarea name="Description" value={formState.Description} onChange={handleChange} required className="p-2 bg-gray-700 rounded-lg"/>
          </label>
          <label className="flex flex-col space-y-2">
            <span>Type:</span>
            <input type="text" name="Type" value={formState.Type} onChange={handleChange} required className="p-2 bg-gray-700 rounded-lg"/>
          </label>
          <label className="flex flex-col space-y-2">
            <span>NTE:</span>
            <input type="number" name="NTE" value={formState.NTE} onChange={handleChange} required className="p-2 bg-gray-700 rounded-lg"/>
          </label>
        </>
      )
    },
    {
      title: "Assignment Details",
      content: (
        <>
          <label className="flex flex-col space-y-2">
            <span>Request Date:</span>
            <input type="date" name="Date" value={formState.Date} onChange={handleChange} required className="p-2 bg-gray-700 rounded-lg"/>
          </label>
          <label className="flex flex-col space-y-2">
            <span>Assigned To:</span>
            <input type="text" name="AssignedTo" value={formState.AssignedTo} onChange={handleChange} required className="p-2 bg-gray-700 rounded-lg"/>
          </label>
          <label className="flex flex-col space-y-2">
            <span>Status:</span>
            <select name="Status" value={formState.Status} onChange={handleChange} className="p-2 bg-gray-700 rounded-lg">
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </label>
        </>
      )
    },
    {
      title: "Priority and Location",
      content: (
        <>
          <label className="flex flex-col space-y-2">
            <span>Priority:</span>
            <select name="Priority" value={formState.Priority} onChange={handleChange} required className="p-2 bg-gray-700 rounded-lg">
              <option value="1">High</option>
              <option value="2">Medium</option>
              <option value="3">Low</option>
            </select>
          </label>
          <label className="flex flex-col space-y-2">
            <span>Location:</span>
            <input type="text" name="Location" value={formState.Location} onChange={handleChange} required className="p-2 bg-gray-700 rounded-lg"/>
          </label>
        </>
      )
    },
    {
      title: "Comments",
      content: (
        <>
          <label className="flex flex-col space-y-2">
            <span>Comments (comma-separated):</span>
            <input type="text" name="Notes" value={formState.Notes} onChange={handleChange} className="p-2 bg-gray-700 rounded-lg"/>
          </label>
          <label className="flex flex-col space-y-2">
            <span>PO:</span>
            <input type="text" name="PO" value={formState.PO} onChange={handleChange} className="p-2 bg-gray-700 rounded-lg"/>
          </label>
        </>
      )
    }
  ];

  const username = localStorage.getItem('username');

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="new-work-order-form-container p-8 w-screen h-screen bg-gray-900 text-white flex flex-col items-center"
    >
      <header className="page-header w-full max-w-5xl mb-6 bg-gray-800 p-4 rounded-2xl flex justify-between items-center shadow-md" data-aos="fade-down">
        <h2 className="text-2xl font-semibold">Add New Work Order</h2>
        <div className="user-info text-lg">Welcome, {username}</div>
      </header>
      <div className="form-wrapper w-full max-w-5xl bg-gray-800 p-6 rounded-2xl shadow-md" data-aos="fade-up">
        <form className="new-work-order-form flex flex-col space-y-4" onSubmit={handleSubmit} method="post">
          <h3 className="text-xl font-semibold mb-4">{sections[currentSection].title}</h3>
          {sections[currentSection].content}
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex justify-between w-full mt-4" data-aos="fade-up" data-aos-delay="200">
            <button type="button" onClick={handlePrev} className="bg-gray-500 text-white py-2 px-4 rounded-2xl hover:bg-gray-700 transition duration-300 shadow">
              &larr;
            </button>
            <button type="button" onClick={handleNext} className="bg-gray-500 text-white py-2 px-4 rounded-2xl hover:bg-gray-700 transition duration-300 shadow">
              &rarr;
            </button>
          </div>
          {currentSection === sections.length - 1 && (
            <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-2xl hover:bg-blue-700 transition duration-300 shadow">
              {loading ? (
                <div className="w-full bg-gray-700 rounded-full h-4 mb-4">
                  <div className="bg-blue-500 h-4 rounded-full animate-progress-bar"></div>
                </div>
              ) : (
                'Submit'
              )}
            </button>
          )}
        </form>
      </div>
    </motion.div>
  );
};

export default NewWorkOrderForm;