import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'aos/dist/aos.css';
import AOS from 'aos';
import './styles/AddWork.css';

// Get the current work order count from local storage
const getCurrentWorkOrderCount = () => {
  const count = localStorage.getItem('workOrderCount');
  return count ? parseInt(count, 10) : 0;
};

// Generate the next work order ID
const generateWorkOrderId = () => {
  const currentCount = getCurrentWorkOrderCount();
  const nextCount = currentCount + 1;
  localStorage.setItem('workOrderCount', nextCount.toString());
  return `W${String(nextCount).padStart(3, '0')}`;
};

const NewWorkOrderForm: React.FC = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    Id: generateWorkOrderId(),
    Description: '',
    Type: '',
    NTE: '',
    Date: '',
    AssignedTo: '',
    Status: '',
    Priority: '',
    Location: '',
    Notes: '',
    PO: ''
  });

  const [currentSection, setCurrentSection] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS animations with a duration of 1000ms
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const newOrder = {
      Id: formState.Id,
      Description: formState.Description,
      Type: formState.Type,
      NTE: parseFloat(formState.NTE),
      AssignedTo: formState.AssignedTo,
      Status: formState.Status,
      Priority: parseInt(formState.Priority),
      Location: formState.Location,
      Notes: formState.Notes,
      PO: parseInt(formState.PO),
      Date: new Date(formState.Date),
    };

    try {
      const response = await axios.post('http://localhost:5000/workorders', newOrder);
      console.log('Work order has been created', response.data);
      navigate('/work-request');
    } catch (e) {
      console.error('Error creating work order:', e);
      setError('Error creating work order: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentSection > 0) {
      setCurrentSection(prev => prev - 1);
    }
  };

  const sections = [
    {
      title: "Work Order Details",
      content: (
        <>
          <label className="flex flex-col space-y-1 text-sm">
            <span>Work Order Number:</span>
            <input type="text" name="Id" value={formState.Id} onChange={handleChange} readOnly className="p-1 bg-gray-700 rounded-lg"/>
          </label>
          <label className="flex flex-col space-y-1 text-sm">
            <span>Description:</span>
            <textarea name="Description" value={formState.Description} onChange={handleChange} required className="p-1 bg-gray-700 rounded-lg"/>
          </label>
          <label className="flex flex-col space-y-1 text-sm">
            <span>Type:</span>
            <select name="Type" value={formState.Type} onChange={handleChange} className="p-1 bg-gray-700 rounded-lg">
              <option value="default">Select type...</option>
              <option value="HVAC">HVAC</option>
              <option value="REF">Refrigeration</option>
              <option value="GM">General Maintenance</option>
            </select>
          </label>
          <label className="flex flex-col space-y-1 text-sm">
            <span>NTE:</span>
            <input type="number" name="NTE" value={formState.NTE} onChange={handleChange} required className="p-1 bg-gray-700 rounded-lg"/>
          </label>
        </>
      )
    },
    {
      title: "Assignment Details",
      content: (
        <>
          <label className="flex flex-col space-y-1 text-sm">
            <span>Request Date:</span>
            <input type="date" name="Date" value={formState.Date} onChange={handleChange} required className="p-1 bg-gray-700 rounded-lg"/>
          </label>
          <label className="flex flex-col space-y-1 text-sm">
            <span>Assigned To:</span>
            <input type="text" name="AssignedTo" value={formState.AssignedTo} onChange={handleChange} required className="p-1 bg-gray-700 rounded-lg"/>
          </label>
          <label className="flex flex-col space-y-1 text-sm">
            <span>Status:</span>
            <select name="Status" value={formState.Status} onChange={handleChange} className="p-1 bg-gray-700 rounded-lg">
              <option value="default">Select status</option>
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
          <label className="flex flex-col space-y-1 text-sm">
            <span>Priority:</span>
            <select name="Priority" value={formState.Priority} onChange={handleChange} required className="p-1 bg-gray-700 rounded-lg">
              <option value="default">Select priority</option>
              <option value="1">High</option>
              <option value="2">Medium</option>
              <option value="3">Low</option>
            </select>
          </label>
          <label className="flex flex-col space-y-1 text-sm">
            <span>Location:</span>
            <input type="text" name="Location" value={formState.Location} onChange={handleChange} required className="p-1 bg-gray-700 rounded-lg"/>
          </label>
        </>
      )
    },
    {
      title: "Comments",
      content: (
        <>
          <label className="flex flex-col space-y-1 text-sm">
            <span>Comments (comma-separated):</span>
            <input type="text" name="Notes" value={formState.Notes} onChange={handleChange} className="p-1 bg-gray-700 rounded-lg"/>
          </label>
          <label className="flex flex-col space-y-1 text-sm">
            <span>PO:</span>
            <input type="text" name="PO" value={formState.PO} onChange={handleChange} className="p-1 bg-gray-700 rounded-lg"/>
          </label>
        </>
      )
    }
  ];

  const username = localStorage.getItem('username');

  return (
    <div
      data-aos="fade-in"
      className="new-work-order-form-container p-2 w-full h-full bg-gray-900 text-white flex flex-col items-center overflow-auto"
    >
      <header className="page-header w-full max-w-7xl mb-2 bg-gray-800 p-4 rounded-2xl flex justify-between items-center shadow-md">
        <h2 className="font-semibold sm:text-sm">New Work Order</h2>
        <div className="user-info text-lg">Welcome, {username}</div>
      </header>
      <div className="form-wrapper w-full max-w-7xl bg-gray-800 p-3 rounded-2xl shadow-md flex-1">
        <form className="new-work-order-form flex flex-col space-y-4 h-full relative z-10" onSubmit={handleSubmit} method="post">
          <h3 className="text-xl font-semibold mb-4">{sections[currentSection].title}</h3>
          <div className="flex flex-col space-y-2 flex-1">
            {sections[currentSection].content}
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex justify-between w-full mt-4 z-20">
            <button type="button" onClick={handlePrev} className="bg-gray-500 text-white py-2 px-4 rounded-2xl hover:bg-gray-700 transition duration-300 shadow">
              &larr;
            </button>
            <button type="button" onClick={handleNext} className="bg-gray-500 text-white py-2 px-4 rounded-2xl hover:bg-gray-700 transition duration-300 shadow">
              &rarr;
            </button>
          </div>
          {currentSection === sections.length - 1 && (
            <button type="submit" className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-2xl hover:bg-blue-700 transition duration-300 shadow z-20">
              {loading ? (
                <div className="w-full bg-gray-800 rounded-full h-4 mb-4">
                  <div className="bg-blue-500 h-4 rounded-full animate-progress-bar"></div>
                </div>
              ) : (
                'Submit'
              )}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default NewWorkOrderForm;
