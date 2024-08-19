import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

interface DocsUploadProps {
  workOrderId: string;
}

interface WorkOrder {
  rtuInformation: string;
  maintenanceHistory: string[];
  Id: string;
  Description: string;
  Type: string;
  NTE: number;
  Date: string;
  AssignedTo: string;
  Status: string;
  Priority: number;
  Location: string;
  Notes: string;
  PO: number;
}

const DocsUpload: React.FC<DocsUploadProps> = () => {
  const navigate = useNavigate();
  const username: string = localStorage.getItem('username') || 'Guest';
  const [document, setDocument] = useState<File | null>(null);
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);
  const [selectedWorkOrder, setSelectedWorkOrder] = useState<WorkOrder | null>(null);

  useEffect(() => {
    const fetchWorkOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/workorders?assignedTo=${username}`);
        console.log('Fetched work orders:', response.data);
        setWorkOrders(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching work orders:', error);
        setWorkOrders([]);
      }
    };

    fetchWorkOrders();
  }, [username]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setDocument(event.target.files[0]); // Capture the file from the input
    }
  };

  const handleWorkOrderSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    console.log('Selected Work Order ID:', selectedId);
    const selectedOrder = workOrders.find(order => order.Id === selectedId) || null;
    setSelectedWorkOrder(selectedOrder);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!document || !selectedWorkOrder) {
      console.error('Document or work order not selected');
      return;
    }

    console.log('Document submitted:', document);

    const formData = new FormData();
    formData.append('document', document);
    formData.append('workOrderId', selectedWorkOrder.Id); // Add work order ID to the form data

    try {
      const result = await axios.post(`http://localhost:5000/upload/${selectedWorkOrder.Id}`, formData, {
      });
      console.log('Document submitted:', result.data);
    } catch (error) {
  console.error('Error uploading document:', error.response ? error.response.data : error);
}
    navigate('/generate-receipt'); // Redirect to the dashboard after successful upload

  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="documents p-5 w-screen h-full bg-gray-900 text-white flex flex-col items-center overflow-y-hidden "
    >
      <header className="documents-header w-full max-w-7xxl mb-6 bg-gray-800 p-4 rounded-2xl flex justify-between items-center shadow-md">
        <h2 className="text-2xl font-semibold">Document Management</h2>
        <div className="user-info text-lg">Welcome, {username}</div>
      </header>
      <div className="documents-content w-full max-w-7xxl flex flex-col space-y-6">
        <div className="upload-section bg-gray-800 p-6 rounded-2xl shadow-md flex flex-col items-center">
          <p className="text-xl font-semibold mb-4">Upload your documents securely</p>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <label className="flex flex-col space-y-2 mb-4 ">
              <span>Select Work Order to add document:</span>
              <select onChange={handleWorkOrderSelect} className="p-2 bg-gray-700 rounded-lg">
                <option value="">--Select Work Order--</option>
                {workOrders.map((order) => (
                  <option key={order.Id} value={order.Id}>
                    {order.Description} ({order.Id})
                  </option>
                ))}
              </select>
            </label>
            <input type="file" onChange={handleFileChange} className="p-2 bg-gray-700 rounded-lg mb-4" />
            <button
              type="submit"
              className="button bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center space-x-2"
            >
              <FontAwesomeIcon icon={faUpload} />
              <span>Upload Document</span>
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default DocsUpload;
