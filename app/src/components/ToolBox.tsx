import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHammer, faScrewdriver, faWrench, faToolbox, faArrowRight,
  faArrowLeft, faClipboardList, faThermometer, faFaucet, faFireExtinguisher,
  faSnowflake, faFan, faLightbulb, faPlug, faTape, faRuler, faHardHat,
  faBolt, faBroom, faBrush, faFirstAid, faGasPump, faGlasses, faPencilRuler
} from '@fortawesome/free-solid-svg-icons';
import MultipleChoiceQuiz from './MultipleChoiceQuiz';
import SafetyVideo from './SafetyVids/SafetyVideos';

interface Tool {
  name: string;
  description: string;
  icon: any; // Replace with appropriate type for FontAwesomeIcon
}

const ToolBox: React.FC = () => {
  const [showQuizzes, setShowQuizzes] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<any | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);

  const username = localStorage.getItem('username') || 'Guest';

  const tools: Tool[] = [
    { name: 'Hammer', description: 'Used for driving nails into, or pulling nails from, some other object.', icon: faHammer },
    { name: 'Screwdriver', description: 'A tool for driving screws or bolts with special slots.', icon: faScrewdriver },
    { name: 'Wrench', description: 'Used to provide grip and mechanical advantage in applying torque to turn objects.', icon: faWrench },
    { name: 'Toolbox', description: 'A container to organize and carry tools.', icon: faToolbox },
    { name: 'Clipboard', description: 'Used to hold papers and provide a writing surface.', icon: faClipboardList },
    { name: 'Thermometer', description: 'Used to measure temperature.', icon: faThermometer },
    { name: 'Pipe Wrench', description: 'A wrench used for turning soft iron pipes and fittings.', icon: faFaucet },
    { name: 'Fire Extinguisher', description: 'A device for extinguishing fires.', icon: faFireExtinguisher },
    { name: 'Air Conditioner', description: 'Device used for cooling.', icon: faSnowflake },
    { name: 'Fan', description: 'A device that creates a current of air.', icon: faFan },
    { name: 'Lightbulb', description: 'An electric light.', icon: faLightbulb },
    { name: 'Plug', description: 'A device for making an electrical connection.', icon: faPlug },
    { name: 'Tape Measure', description: 'A flexible ruler used to measure distance.', icon: faTape },
    { name: 'Ruler', description: 'A tool used to measure lengths.', icon: faRuler },
    { name: 'Hard Hat', description: 'A helmet worn to protect the head from injuries.', icon: faHardHat },
    { name: 'Multimeter', description: 'An instrument used to measure electrical properties.', icon: faBolt },
    { name: 'Broom', description: 'A tool for sweeping.', icon: faBroom },
    { name: 'Paint Brush', description: 'A tool used for painting.', icon: faBrush },
    { name: 'First Aid Kit', description: 'A collection of supplies and equipment for medical treatment.', icon: faFirstAid },
    { name: 'Gas Can', description: 'A container for storing gasoline.', icon: faGasPump },
    { name: 'Safety Glasses', description: 'Protective eyewear.', icon: faGlasses },
    { name: 'Pencil and Ruler', description: 'Tools for drawing and measuring.', icon: faPencilRuler }
    // Add more tools as needed
  ];

  const handleVideoEnd = () => {
    setShowQuiz(true);
  };

  const safetyVideos = [
    { title: 'Workplace Safety - Protect Your Hands', url: 'https://www.youtube.com/watch?v=gUIOJcKaOVA' },
    { title: 'Fire Safety Tips', url: 'https://www.youtube.com/watch?v=Hz6r_v3pq1s' },
    { title: 'Office Ergonomics: Positioning Your Monitor', url: 'https://www.youtube.com/watch?v=riD8Xt8r1MQ' },
    { title: 'Ladder Safety Basics', url: 'https://www.youtube.com/watch?v=XbEL_447oHg' },
    { title: 'Hearing Protection at Work', url: 'https://www.youtube.com/watch?v=ehV9d7gabfc' },
    { title: 'Electrical Safety in the Workplace', url: 'https://www.youtube.com/watch?v=RYYqEEBpggs' },
    { title: 'Slips, Trips, and Falls Prevention', url: 'https://www.youtube.com/watch?v=uS1EDn708mQ' },
    { title: 'Personal Protective Equipment (PPE)', url: 'https://www.youtube.com/watch?v=bE6pySftAJc' },
    { title: 'Back Safety and Proper Lifting Techniques', url: 'https://www.youtube.com/watch?v=k1n5ECgByxY' },
    { title: 'Emergency Evacuation Procedures', url: 'https://www.youtube.com/watch?v=3aLWlDY_G9w' }
  ];

  const openVideoModal = (video: any) => {
    setCurrentVideo(video);
    setShowVideoModal(true);
    setShowQuiz(false); // Reset the quiz state
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="toolbox p-8 w-screen h-screen bg-gray-900 text-white flex flex-col items-center"
    >
      <header className="page-header w-full max-w-7xl mb-6 bg-gray-800 p-4 rounded-2xl flex justify-between items-center shadow-md">
        <h2 className="text-2xl font-semibold">ToolBox</h2>
        <div className="user-info text-lg">Welcome, {username}</div>
      </header>
      <div className="toolbox-content w-full max-w-7xl flex flex-col space-y-6">
        {showQuizzes ? (
          <div className="section bg-gray-800 p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-white">Monthly Safety Quizzes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {safetyVideos.map((video, index) => (
                <div className="card bg-gray-700 p-4 rounded-2xl shadow hover:bg-gray-600 transition duration-300" key={index}>
                  <strong className="text-lg text-white">{video.title}</strong>
                  <p className="text-gray-300">Watch the video and take the quiz.</p>
                  <button
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                    onClick={() => openVideoModal(video)}
                  >
                    Watch Video
                  </button>
                </div>
              ))}
            </div>
            <FontAwesomeIcon icon={faArrowLeft} className="cursor-pointer mt-6" onClick={() => setShowQuizzes(false)} />
          </div>
        ) : (
          <div className="section bg-gray-800 p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold mb-4 flex justify-between items-center">
              <span>Available Tools</span>
              <FontAwesomeIcon icon={faArrowRight} className="cursor-pointer" onClick={() => setShowQuizzes(true)} />
            </h3>
            <table className="min-w-full bg-gray-700 rounded-2xl overflow-hidden shadow-md">
              <thead>
                <tr>
                  <th className="p-4 bg-gray-800 text-left">Tool</th>
                  <th className="p-4 bg-gray-800 text-left">Description</th>
                  <th className="p-4 bg-gray-800 text-left">Icon</th>
                </tr>
              </thead>
              <tbody>
                {tools.map((tool, index) => (
                  <tr key={index} className="border-b border-gray-600 hover:bg-gray-600 transition duration-300">
                    <td className="p-4">{tool.name}</td>
                    <td className="p-4">{tool.description}</td>
                    <td className="p-4"><FontAwesomeIcon icon={tool.icon} className="text-2xl" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-center space-x-4 my-4">
              <button className="bg-green-500 text-white py-2 px-4 rounded-xl hover:bg-green-700 transition duration-300 shadow">Add Tool</button>
              <button className="bg-red-500 text-white py-2 px-4 rounded-xl hover:bg-red-700 transition duration-300 shadow">Submit Tools</button>
            </div>
          </div>
        )}
      </div>

      {showVideoModal && currentVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-2xl shadow-md w-full max-w-3xl relative">
            {!showQuiz ? (
              <SafetyVideo url={currentVideo.url} title={currentVideo.title} onEnd={handleVideoEnd} />
            ) : (
              <div className="quiz-content">
                <MultipleChoiceQuiz />
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
