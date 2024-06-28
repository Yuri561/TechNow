import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ChatModal from './ChatModal';
import Ivr from './Ivr';
import WelcomeSection from './WelcomeSection';
import ControlPanels from './ControlPanels';
import MembersSection from './MembersSection';
import WorkOrdersChart from './WorkOrdersChart';


interface Member {
  name: string;
  email: string;
  phone: string;
  image: string;
  bgColor: string;
}


const Home: React.FC= ()=> {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isClockedIn, setIsClockedIn] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [isChatModalOpen, setIsChatModalOpen] = useState<boolean>(false);
  const [isIvrModalOpen, setIsIvrModalOpen] = useState<boolean>(false);

  const role = localStorage.getItem('role') || 'employee'; // Default to 'employee' if role is undefined

  interface WeatherData {
    main: {
      temp: number;
      humidity: number;
    };
  }

  const [weather, setWeather] = useState<WeatherData>({ main: { temp: 0, humidity: 0 } });

  const toggleClockedIn = () => {
    setIsClockedIn(prevState => !prevState);
    if (!isClockedIn) {
      const id = setInterval(() => {
        setElapsedTime(prevTime => prevTime + 1);
      }, 1000);
      setIntervalId(id);
    } else {
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
    }
  };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = "897cb7af93dc77cc8639d0935e34a4d6";
        console.log(import.meta.env.VITE_OPENWEATHERMAP_API_KEY);
        if (!apiKey) {
          throw new Error('OpenWeatherMap API key is not defined');
        }

        console.log('API Key:', apiKey); // Check if API key is loaded correctly
        const city = 'Fayetteville';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

        const response = await axios.get(apiUrl);
        setWeather(response.data);
        console.log(response.data); // Debug log
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    };

    fetchWeather();
  }, []);

  const formatElapsedTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };

  const username = localStorage.getItem('username') || 'User';

  console.log('Logged in as:', username, 'with role:', role); // Debug log

  return (
    <div className="flex h-screen w-full bg-gray-900 text-white">
      <main className="flex-grow p-2 md:p-6 overflow-auto rounded">
        <WelcomeSection username={username} isClockedIn={isClockedIn} elapsedTime={elapsedTime} formatElapsedTime={formatElapsedTime} weather={weather} />
        <ControlPanels role={role} toggleClockedIn={toggleClockedIn} isClockedIn={isClockedIn} setIsChatModalOpen={setIsChatModalOpen} setIsIvrModalOpen={setIsIvrModalOpen} weather={weather} />
        <MembersSection setSelectedMember={setSelectedMember} />
        <WorkOrdersChart username={username} />
      </main>

      {selectedMember && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50" data-aos="zoom-in">
          <div className="bg-gray-800 p-6 rounded-lg text-white w-80 md:w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg md:text-xl font-semibold text-white">{selectedMember.name}</h2>
              <button className="text-gray-500 hover:text-white" onClick={() => setSelectedMember(null)}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div className="mb-4">
              <img src={selectedMember.image} alt="Profile" className="w-24 h-24 rounded-full mx-auto mb-4" />
              <p className="text-white">Email: {selectedMember.email}</p>
              <p className="text-white">Phone: {selectedMember.phone}</p>
            </div>
            <div>
              <textarea className="w-full p-2 border border-gray-700 bg-gray-700 rounded-lg text-white" rows={3} placeholder="Send a message"></textarea>
              <button className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg">Send</button>
            </div>
          </div>
        </div>
      )}

      <ChatModal isOpen={isChatModalOpen} onClose={() => setIsChatModalOpen(false)} />
      <Ivr isOpen={isIvrModalOpen} onClose={() => setIsIvrModalOpen(false)} />
    </div>
  );
};

export default Home;
