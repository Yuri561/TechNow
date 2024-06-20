import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import './styles/WorkRequest.css';

const WorkRequest: React.FC = () => {
  const username = localStorage.getItem('username');
  const [workEntries, setWorkEntries] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchWorkOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/workorders');
      setWorkEntries(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching work orders:', error);
    }
    setLoading(false);
  };

  const deleteWorkOrder = async (id: string) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:5000/api/workorders/${id}`);
      fetchWorkOrders(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting work order:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWorkOrders();
  }, []);

  return (
    <motion.div
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
      className="work-request p-10 w-full h-full bg-gray-900 text-white flex flex-col items-center"
    >
      <header className="page-header w-full max-w-5xl mb-6 bg-gray-800 p-4 rounded-lg flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Work Request</h2>
        <div className="user-info text-lg">Welcome, {username}</div>
      </header>
      <div className="work-entry-form w-full max-w-5xl bg-gray-800 p-6 rounded-lg flex flex-col items-center">
        <h3 className="text-xl font-semibold mb-6">Manage Work Entries</h3>
        <div className="work-table-container w-full overflow-x-auto mb-6">
          {loading ? (
            <div className="w-full bg-gray-700 rounded-full h-4 mb-4">
              <div className="bg-blue-500 h-4 rounded-full animate-progress-bar"></div>
            </div>
          ) : (
            <table className="work-table w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-700">
                  <th className="p-3">ID</th>
                  <th className="p-3">Description</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">NTE</th>
                  <th className="p-3">Request Date</th>
                  <th className="p-3">Assigned To</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Priority</th>
                  <th className="p-3">Location</th>
                  <th className="p-3">Notes</th>
                  <th className="p-3">PO</th>
                  <th className="p-3">Edit</th>
                  <th className="p-3">Delete</th>
                </tr>
              </thead>
              <tbody>
                {workEntries.map((entry, index) => (
                  <tr key={index} className="odd:bg-gray-800 even:bg-gray-700">
                    <td className="p-3">{entry.Id}</td>
                    <td className="p-3">{entry.Description}</td>
                    <td className="p-3">{entry.Type}</td>
                    <td className="p-3">{entry.NTE}</td>
                    <td className="p-3">{new Date(entry.Date).toLocaleDateString()}</td>
                    <td className="p-3">{entry.AssignedTo}</td>
                    <td className="p-3">{entry.Status}</td>
                    <td className="p-3">{entry.Priority}</td>
                    <td className="p-3">{entry.Location}</td>
                    <td className="p-3">{entry.Notes}</td>
                    <td className="p-3">{entry.PO}</td>
                    <td className="p-3">
                      <button className="button bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700">Edit</button>
                    </td>
                    <td className="p-3">
                      <button className="button bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700" onClick={() => deleteWorkOrder(entry._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="button-group flex justify-center space-x-4">
          <button className="button bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700" onClick={fetchWorkOrders}>Refresh</button>
          <button className="button bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">Add Work Entry</button>
          <button className="button bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">Submit Work</button>
        </div>
      </div>
    </motion.div>
  );
};

export default WorkRequest;
