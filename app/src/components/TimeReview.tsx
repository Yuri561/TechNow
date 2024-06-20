import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';

const TimeReview: React.FC = () => {
  const username = localStorage.getItem('username');
  const timeEntries = [
    { date: '2024-06-03', startTime: '09:00', endTime: '17:00', totalHours: 8, taskDescription: 'Project Work' },
    { date: '2024-06-04', startTime: '09:00', endTime: '17:00', totalHours: 8, taskDescription: 'Client Meeting' },
    { date: '2024-06-05', startTime: '09:00', endTime: '17:00', totalHours: 8, taskDescription: 'Development' },
    { date: '2024-06-06', startTime: '09:00', endTime: '17:00', totalHours: 8, taskDescription: 'Code Review' },
    { date: '2024-06-07', startTime: '09:00', endTime: '17:00', totalHours: 8, taskDescription: 'Documentation' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="time-review p-8 w-screen h-screen rounded bg-gray-900 text-white rounded flex flex-col items-center"
    >
      <header className="page-header w-full max-w-5xl mb-6 bg-gray-800 p-4 rounded-lg flex justify-between items-center">
        <h2 className="text-2xl font-semibold">
          <FontAwesomeIcon icon={faClock} className="mr-2" />
          Time Review
        </h2>
        <div className="user-info text-lg">Welcome, {username}</div>
      </header>
      <div className="time-entry-form w-full max-w-5xl bg-gray-800 p-6 rounded-lg flex flex-col items-center">
        <h3 className="text-xl font-semibold mb-6">Enter Your Time</h3>
        <div className="time-table-container w-full overflow-x-auto mb-6">
          <table className="time-table w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-700">
                <th className="p-3">Date</th>
                <th className="p-3">Start Time</th>
                <th className="p-3">End Time</th>
                <th className="p-3">Total Hours</th>
                <th className="p-3">Task Description</th>
                <th className="p-3">Edit</th>
                <th className="p-3">Delete</th>
              </tr>
            </thead>
            <tbody>
              {timeEntries.map((entry, index) => (
                <tr key={index} className="odd:bg-gray-800 even:bg-gray-700">
                  <td className="p-3">{entry.date}</td>
                  <td className="p-3">{entry.startTime}</td>
                  <td className="p-3">{entry.endTime}</td>
                  <td className="p-3">{entry.totalHours}</td>
                  <td className="p-3">{entry.taskDescription}</td>
                  <td className="p-3">
                    <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700">Edit</button>
                  </td>
                  <td className="p-3">
                    <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="button-group flex justify-center space-x-4 mt-4">
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">Add Time Entry</button>
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">Submit Time</button>
        </div>
      </div>
    </motion.div>
  );
};

export default TimeReview;
