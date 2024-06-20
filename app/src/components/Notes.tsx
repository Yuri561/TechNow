import React, { useState } from 'react';
import {motion} from 'framer-motion';


const Notes: React.FC = () => {
  const username = localStorage.getItem('username');
  const [formState, setFormState] = useState({
    workOrder: '',
    techTitle: '',
    notes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formState);
    setFormState({
      workOrder: '',
      techTitle: '',
      notes: ''
    });
  };

  return (
    <motion.div 
    animate={{ x: 100 }}
    transition={{ type: "spring", stiffness: 100 }} className="notes">
      <header className="page-header">
        <h2>Notes</h2>
        <div className="user-info">Welcome, {username}</div>
      </header>
      <div className="notes-content">
        <h2>Add Notes</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Work Order:
            <select name="workOrder" value={formState.workOrder} onChange={handleChange} required>
              <option value="" disabled>Select Work Order</option>
              <option value="WO001">WO001</option>
              <option value="WO002">WO002</option>
              <option value="WO003">WO003</option>
              {/* Add more work orders as needed */}
            </select>
          </label>
          <label>
            Tech Title:
            <input type="text" name="techTitle" value={formState.techTitle} onChange={handleChange} required />
          </label>
          <label>
            Notes:
            <textarea name="notes" value={formState.notes} onChange={handleChange} required />
          </label>
          <button type="submit" className="button">Submit</button>
        </form>
      </div>
    </motion.div>
  );
};

export default Notes;
