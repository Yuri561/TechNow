import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHammer, faScrewdriver, faWrench, faToolbox, faArrowRight, faArrowLeft, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import ReactPlayer from 'react-player';

const ToolBox: React.FC = () => {
  const [showQuizzes, setShowQuizzes] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);

  const username = localStorage.getItem('username');
  const tools = [
    { name: 'Hammer', description: 'Used for driving nails into, or pulling nails from, some other object.', icon: faHammer },
    { name: 'Screwdriver', description: 'A tool for driving screws or bolts with special slots.', icon: faScrewdriver },
    { name: 'Wrench', description: 'Used to provide grip and mechanical advantage in applying torque to turn objects.', icon: faWrench },
    { name: 'Toolbox', description: 'A container to organize and carry tools.', icon: faToolbox },
    { name: 'Clipboard', description: 'Used to hold papers and provide a writing surface.', icon: faClipboardList }
  ];

  const handleVideoEnd = () => {
    setShowQuiz(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="toolbox p-8 w-screen h-screen bg-gray-900 text-white flex flex-col items-center"
    >
      <header className="page-header w-full max-w-5xl mb-6 bg-gray-800 p-4 rounded-2xl flex justify-between items-center shadow-md">
        <h2 className="text-2xl font-semibold">ToolBox</h2>
        <div className="user-info text-lg">Welcome, {username}</div>
      </header>
      <div className="toolbox-content w-full max-w-5xl flex flex-col space-y-6">
        {showQuizzes ? (
          <div className="section bg-gray-800 p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold mb-4">Monthly Safety Quizzes</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="card bg-gray-700 p-4 rounded-2xl shadow hover:bg-gray-600 transition duration-300">
                <strong className="text-lg">June Safety Quiz</strong>
                <p className="text-gray-300">Test your knowledge on safety protocols for June.</p>
                <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300" onClick={() => setShowVideoModal(true)}>Take Quiz</button>
              </div>
              <div className="card bg-gray-700 p-4 rounded-2xl shadow hover:bg-gray-600 transition duration-300">
                <strong className="text-lg">May Safety Quiz</strong>
                <p className="text-gray-300">Review and test your knowledge on May's safety procedures.</p>
                <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300" onClick={() => setShowVideoModal(true)}>Take Quiz</button>
              </div>
            </div>
            <FontAwesomeIcon icon={faArrowLeft} className="cursor-pointer" onClick={() => setShowQuizzes(false)} />
          </div>
        ) : (
          <div className="section bg-gray-800 p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold mb-4 flex justify-between items-center">
              <span>Available Tools</span>
              <FontAwesomeIcon icon={faArrowRight} className="cursor-pointer" onClick={() => setShowQuizzes(true)} />
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {tools.map((tool, index) => (
                <div className="card bg-gray-700 p-4 rounded-2xl shadow hover:bg-gray-600 transition duration-300" key={index}>
                  <FontAwesomeIcon icon={tool.icon} className="text-2xl mb-2" />
                  <strong className="text-lg">{tool.name}</strong>
                  <p className="text-gray-300">{tool.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {!showQuizzes && (
          <div className="flex justify-center space-x-4" data-aos="fade-up" data-aos-delay="200">
            <button className="bg-green-500 text-white py-2 px-4 rounded-2xl hover:bg-green-700 transition duration-300 shadow">Add Tool</button>
            <button className="bg-red-500 text-white py-2 px-4 rounded-2xl hover:bg-red-700 transition duration-300 shadow">Submit Tools</button>
          </div>
        )}
      </div>

      {showVideoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-2xl shadow-md w-full max-w-3xl relative">
            {!showQuiz ? (
              <ReactPlayer
                url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
                controls
                onEnded={handleVideoEnd}
                className="rounded-2xl overflow-hidden"
              />
            ) : (
              <div className="quiz-content">
                <h3 className="text-xl font-semibold mb-4">June Safety Quiz</h3>
                {/* Quiz content goes here */}
                <p>Quiz question 1...</p>
                {/* Add more quiz questions here */}
              </div>
            )}
            <button className="absolute top-4 right-4 text-white" onClick={() => setShowVideoModal(false)}>X</button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ToolBox;
