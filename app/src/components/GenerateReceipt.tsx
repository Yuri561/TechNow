import React, { useState, useRef, useEffect } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import jsPDF from 'jspdf';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';

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

const GenerateReceipt: React.FC = () => {
  const username: string = localStorage.getItem('username') || 'Guest';
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);
  const [selectedWorkOrder, setSelectedWorkOrder] = useState<WorkOrder | null>(null);
  const [formState, setFormState] = useState({
    workOrder: '',
    techTitle: '',
    notes: '',
    workCompleted: false,
    notesAdded: false
  });
  const sigCanvas = useRef<SignatureCanvas>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    AOS.init({ duration: 1000 });

    const fetchWorkOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/workorders', {
          params: { assignedTo: username }
        });
        setWorkOrders(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error('Error fetching work orders:', err);
        setError('Failed to fetch work orders');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkOrders();
  }, [username]);

  const handleWorkOrderSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const selectedId = e.target.value;
  const selectedOrder = workOrders.find(order => order.Id === selectedId) || null;
  setSelectedWorkOrder(selectedOrder);
  if (selectedOrder) {
    setFormState({
      workOrder: selectedId,
      techTitle: selectedOrder.AssignedTo, // Assume 'AssignedTo' is the tech responsible
      notes: selectedOrder.Notes, // This uses the Notes from the selected work order
      workCompleted: false, // Reset or set based on your application logic
      notesAdded: selectedOrder.Notes ? true : false // Check if there are notes
    });
  } else {
    setFormState({ ...formState, workOrder: '', techTitle: '', notes: '' }); // Reset the form if no order is selected
  }
};


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormState(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formState.workCompleted || !formState.notesAdded) {
      alert('Please complete all prerequisites before generating the receipt.');
      return;
    }

    const pdf = new jsPDF();
    pdf.text('Work Order Receipt', 10, 10);
    pdf.text(`Work Order: ${selectedWorkOrder?.Id}`, 10, 20);
    pdf.text(`Tech Title: ${formState.techTitle}`, 10, 30);
    pdf.text(`Notes: ${formState.notes}`, 10, 40);

    if (sigCanvas.current) {
      const imgData = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 10, 50, 180, 80);
    }

    pdf.save('receipt.pdf');
  };

  if (loading) {
    return <div className="text-white">Loading work orders...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="generate-receipt p-8 w-full h-full bg-gray-900 text-white flex flex-col items-center overflow-y-auto">
      <header className="page-header w-full max-w-5xl mb-6 bg-gray-800 p-4 rounded-2xl flex justify-between items-center shadow-md">
        <h2 className="text-2xl font-semibold">Generate Receipt</h2>
        <div className="user-info text-lg">Welcome, {username}</div>
      </header>
      <div className="generate-receipt-content w-full max-w-5xl flex flex-col space-y-6">
        <div className="bg-gray-800 p-6 rounded-2xl shadow-md">
          <label className="flex flex-col space-y-2">
            <span>Select Work Order:</span>
            <select onChange={handleWorkOrderSelect} className="p-2 bg-gray-700 rounded-lg">
              <option value="">--Select Work Order--</option>
              {workOrders.map((order) => (
                <option key={order.Id} value={order.Id}>
                  {order.Description} ({order.Id})
                </option>
              ))}
            </select>
          </label>
        </div>
        {selectedWorkOrder && (
          <div className="bg-gray-800 p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold mb-2">Work Order: {selectedWorkOrder.Id}</h3>
            <p className="text-lg">{selectedWorkOrder.Description}</p>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <input type="text" name="techTitle" value={formState.techTitle} onChange={handleChange} required className="p-2 bg-gray-700 rounded-lg" placeholder="Tech Title" />
              <textarea name="notes" value={formState.notes} onChange={handleChange} required className="p-2 bg-gray-700 rounded-lg" placeholder="Notes" />
              <label className="flex items-center space-x-2">
                <input type="checkbox" name="workCompleted" checked={formState.workCompleted} onChange={handleChange} className="bg-gray-700 rounded-lg" />
                <span>Work Completed</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" name="notesAdded" checked={formState.notesAdded} onChange={handleChange} className="bg-gray-700 rounded-lg" />
                <span>Notes Added</span>
              </label>
              <div className="signature-pad">
                <h3 className="text-lg font-semibold mb-2">Signature</h3>
                <SignatureCanvas ref={sigCanvas} canvasProps={{ width: 400, height: 200, className: 'sigCanvas bg-gray-700 rounded-lg' }} />
              </div>
              <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-2xl hover:bg-blue-700 transition duration-300 shadow text-lg">Generate Receipt</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateReceipt;
