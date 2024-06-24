import React, { useState, useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import jsPDF from 'jspdf';
import { motion } from 'framer-motion';

const GenerateReceipt: React.FC = () => {
  const username: string = localStorage.getItem('username') || 'Guest';
  const [formState, setFormState] = useState({
    workOrder: '',
    techTitle: '',
    notes: '',
    workCompleted: false,
    notesAdded: false
  });
  const sigCanvas = useRef<SignatureCanvas>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { type, name, checked, value } = e.target as HTMLInputElement;
    setFormState(prevState => ({ ...prevState, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formState.workCompleted || !formState.notesAdded) {
      alert('Please complete all prerequisites before generating the receipt.');
      return;
    }

    const pdf = new jsPDF();
    pdf.text('Work Order Receipt', 10, 10);
    pdf.text(`Work Order: ${formState.workOrder}`, 10, 20);
    pdf.text(`Tech Title: ${formState.techTitle}`, 10, 30);
    pdf.text(`Notes: ${formState.notes}`, 10, 40);

    if (sigCanvas.current) {
      const imgData = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 10, 50, 180, 80);
    }

    pdf.save('receipt.pdf');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="generate-receipt p-6 w-screen h-screen bg-gray-900 text-white flex flex-col items-center"
    >
      <header className="page-header w-full max-w-5xl mb-6 bg-gray-800 p-4 rounded-2xl flex justify-between items-center shadow-md" data-aos="fade-down">
        <h2 className="text-2xl font-semibold">Generate Receipt</h2>
        <div className="user-info text-lg">Welcome, {username}</div>
      </header>
      <div className="generate-receipt-content w-full max-w-5xl flex flex-col space-y-6">
        <div className="bg-gray-800 p-6 rounded-2xl shadow-md" data-aos="fade-up">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <label className="flex flex-col space-y-2">
              <span className="text-lg">Work Order:</span>
              <select name="workOrder" value={formState.workOrder} onChange={handleChange} required className="p-2 bg-gray-700 rounded-lg text-lg">
                <option value="" disabled>Select Work Order</option>
                <option value="WO001">WO001</option>
                <option value="WO002">WO002</option>
                <option value="WO003">WO003</option>
                {/* Add more work orders as needed */}
              </select>
            </label>
            <label className="flex flex-col space-y-2">
              <span className="text-lg">Tech Title:</span>
              <input type="text" name="techTitle" value={formState.techTitle} onChange={handleChange} required className="p-2 bg-gray-700 rounded-lg text-lg"/>
            </label>
            <label className="flex flex-col space-y-2">
              <span className="text-lg">Notes:</span>
              <textarea name="notes" value={formState.notes} onChange={handleChange} required className="p-2 bg-gray-700 rounded-lg text-lg"/>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" name="workCompleted" checked={formState.workCompleted} onChange={handleChange} className="bg-gray-700 rounded-lg"/>
              <span className="text-lg">Work Completed</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" name="notesAdded" checked={formState.notesAdded} onChange={handleChange} className="bg-gray-700 rounded-lg"/>
              <span className="text-lg">Notes Added</span>
            </label>
            <div className="signature-pad">
              <h3 className="text-lg font-semibold mb-2">Signature</h3>
              <SignatureCanvas ref={sigCanvas} canvasProps={{ width: 400, height: 200, className: 'sigCanvas bg-gray-700 rounded-lg' }} />
            </div>
            <div className="flex justify-center mt-4">
              <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-2xl hover:bg-blue-700 mb-7 transition duration-300 shadow text-lg">Generate Receipt</button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default GenerateReceipt;
