import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faLightbulb, faTemperatureHigh, faCar, faComments, faTint } from '@fortawesome/free-solid-svg-icons';
import Chart from 'react-apexcharts';
import axios from 'axios';
import 'flowbite';
import ChatModal from './ChatModal';
import Ivr from './Ivr';
import './styles/Home.css';


interface Member {
  name: string;
  email: string;
  phone: string;
  image: string;
  bgColor: string;
}

interface Employee {
  _id: string;
  username: string;
  role: string;
}

const members: Member[] = [
  { name: 'Dispatcher', email: 'dispatcher@example.com', phone: '123-456-7890', image: './images/dispatch.jpeg', bgColor: 'bg-red-500' },
  { name: 'Purchasing Department', email: 'purchasing@example.com', phone: '123-456-7891', image: './images/purchasing.png', bgColor: 'bg-green-500' },
  { name: 'Area Manager', email: 'areamanager@example.com', phone: '123-456-7892', image: './images/area.jpg', bgColor: 'bg-blue-500' },
  { name: 'Team Supervisor', email: 'teamsupervisor@example.com', phone: '123-456-7893', image: 'https://via.placeholder.com/150?text=Team+Supervisor', bgColor: 'bg-yellow-500' },
  { name: 'Vendor Relations', email: 'vendorrelations@example.com', phone: '123-456-7894', image: 'https://via.placeholder.com/150?text=Vendor+Relations', bgColor: 'bg-purple-500' },
  { name: 'Team Chat', email: 'teams@example.com', phone: '123-456-7894', image: 'https://via.placeholder.com/150?text=Team+Chat', bgColor: 'bg-pink-500' },
  { name: 'Human Resources', email: 'hr@example.com', phone: '123-456-7894', image: 'https://via.placeholder.com/150?text=Human+Resources', bgColor: 'bg-teal-500' },
  { name: 'IT Support', email: 'itsupport@example.com', phone: '123-456-7895', image: 'https://via.placeholder.com/150?text=IT+Support', bgColor: 'bg-orange-500' },
  { name: 'Operations Manager', email: 'operations@example.com', phone: '123-456-7896', image: 'https://via.placeholder.com/150?text=Operations+Manager', bgColor: 'bg-indigo-500' },
];

const chartOptions: ApexCharts.ApexOptions = {
  chart: {
    type: 'bar',
    height: 350,
    toolbar: {
      show: true,
      tools: {
        download: true,
        selection: true,
        zoom: true,
        zoomin: true,
        zoomout: true,
        pan: true,
        reset: true
      },
    },
    foreColor: '#000'
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '55%',
      colors: {
        backgroundBarOpacity: 1,
      }
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent']
  },
  xaxis: {
    categories: ['Completed', 'Pending', 'Needs Attention', 'In Progress', 'Delayed', 'Cancelled', 'On Hold'],
    labels: {
      style: {
        colors: '#ffffff'
      }
    }
  },
  yaxis: {
    title: {
      text: 'Tasks',
      style: {
        color: '#ffffff'
      }
    },
    labels: {
      style: {
        colors: '#ffffff'
      }
    }
  },
  fill: {
    opacity: 1,
    colors: ['#FFC1CC', '#C1FFC1', '#C1D9FF', '#FFF1C1', '#D1C1FF', '#FFC1F1', '#C1FFF1']
  },
  tooltip: {
    theme: 'dark',
    y: {
      formatter: function (val) {
        return val.toString();
      }
    }
  },
  legend: {
    position: 'top',
    horizontalAlign: 'center',
    labels: {
      colors: '#ffffff'
    }
  }
};

const chartSeries: ApexCharts.ApexOptions['series'] = [
  {
    name: 'Tasks',
    data: [44, 55, 41, 37, 22, 43, 26]
  }
];

const Home: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isClockedIn, setIsClockedIn] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [newRole, setNewRole] = useState<string>('');
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


  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('/api/employees');
        console.log('Fetched employees:', response.data); // Debug log
        setEmployees(response.data.main);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleRoleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedEmployee && newRole) {
      try {
        await axios.put(`/api/employees/${selectedEmployee._id}`, { role: newRole });
        setEmployees(prevEmployees =>
          prevEmployees.map(emp =>
            emp._id === selectedEmployee._id ? { ...emp, role: newRole } : emp
          )
        );
        setSelectedEmployee(null);
        setNewRole('');
      } catch (error) {
        console.error('Error updating role:', error);
      }
    }
  };

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
      {/* Main Content */}
      <main className="flex-grow p-2 md:p-6 overflow-auto rounded">
        {/* Welcome Section */}
        <section className="mb-6 rounded">
          <div className="bg-gray-800 p-4 md:p-6 rounded">
            <div className="flex justify-between items-center">
              <h1 className="text-xl md:text-3xl text-white">Hi, {username}!</h1>
              <span className={`text-xl md:text-2xl ${isClockedIn ? 'text-red-500' : 'text-white'}`}>
                {isClockedIn ? formatElapsedTime(elapsedTime) : new Date().toLocaleTimeString()}
              </span>
            </div>
            {weather && weather.main && (
              <p className="text-sm md:text-lg text-white">
                Welcome Home! The air quality is good & fresh. You can go out today.
                <span className="block mt-2 text-xs md:text-sm text-white">
                  {weather.main.temp}°F - Fuzzy cloudy weather
                </span>
              </p>
            )}
          </div>
        </section>

        {/* Control Panels */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 rounded">
          {role === 'admin' ? (
            <div className="bg-gray-800 p-4 rounded">
              <h2 className="text-lg md:text-xl mb-2 flex items-center text-white"><FontAwesomeIcon icon={faUsers} className="mr-2" />Manage Roles</h2>
              <div className="flex flex-col">
                <select
                  onChange={(e) => setSelectedEmployee(employees.find(emp => emp._id === e.target.value) || null)}
                  className="bg-gray-700 text-white p-2 rounded mb-4"
                  value={selectedEmployee ? selectedEmployee._id : ''}
                >
                  <option value="">Select Employee</option>
                  {employees.map(emp => (
                    <option key={emp._id} value={emp._id}>
                      {emp.username} - {emp.role}
                    </option>
                  ))}
                </select>
                {selectedEmployee && (
                  <form onSubmit={handleRoleUpdate} className="flex flex-col">
                    <label className="text-white mb-2">New Role:</label>
                    <input
                      type="text"
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value)}
                      className="mb-4 p-2 rounded bg-gray-700 text-white"
                    />
                    <button type="submit" className="bg-blue-500 p-2 rounded text-white">Update Role</button>
                  </form>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-gray-800 p-4 rounded">
              <h2 className="text-lg md:text-xl mb-2 flex items-center text-white"><FontAwesomeIcon icon={faCar} className="mr-2" />Travel</h2>
              <div className="flex items-center justify-between">
                <span className="text-white">{isClockedIn ? 'Travel' : 'Home'}</span>
                <button className="bg-blue-500 p-2 rounded text-white" onClick={toggleClockedIn}>Toggle</button>
              </div>
            </div>
          )}
          <div className="bg-gray-800 p-4 rounded">
            <h2 className="text-lg md:text-xl mb-2 flex items-center text-white"><FontAwesomeIcon icon={faTemperatureHigh} className="mr-2" />Temperature</h2>
            <div className="flex flex-col items-start rounded">
              <div className="flex items-center mb-2">
                <FontAwesomeIcon icon={faTemperatureHigh} className="mr-2 text-white" />
                <span className="text-white">{weather ? `${weather.main.temp}°F` : 'Loading...'}</span>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faTint} className="mr-2 text-white" />
                <span className="text-white">{weather ? `${weather.main.humidity}% Humidity` : 'Loading...'}</span>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded">
            <h2 className="text-lg md:text-xl mb-2 flex items-center text-white"><FontAwesomeIcon icon={faComments} className="mr-2" />Tech Support</h2>
            <div className="flex items-center justify-between">
              <span className="text-white">OFF</span>
              <button className="bg-blue-500 p-2 rounded text-white" onClick={() => setIsChatModalOpen(true)}>Chat</button>
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded">
            <h2 className="text-lg md:text-xl mb-2 flex items-center text-white"><FontAwesomeIcon icon={faLightbulb} className="mr-2" />Service Channel</h2>
            <div className="flex items-center justify-between">
              <button
                data-modal-target="crud-modal"
                data-modal-toggle="crud-modal"
                className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
                onClick={() => setIsIvrModalOpen(true)}
              >
                Check In
              </button>
            </div>
          </div>
        </section>

        {/* Members Section */}
        <section className="bg-gray-800 p-4 md:p-6 rounded mb-4" data-aos="zoom-in">
          <h2 className="text-xl md:text-2xl mb-4 text-white"><FontAwesomeIcon icon={faUsers} className="mr-2" />Members</h2>
          <div className="flex flex-wrap gap-2 md:gap-4">
            {members.map((member) => (
              <button key={member.name} className={`${member.bgColor} p-2 md:p-4 rounded text-left`} onClick={() => setSelectedMember(member)}>
                <span className="text-white">{member.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Work Orders Chart */}
        <section className="bg-gray-800 p-4 md:p-2 md:h-80 rounded" data-aos="zoom-in">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl md:text-2xl text-white">TechTrack</h2>
            <div className="text-lg md:text-xl text-white">
              <span>Track: {username}</span>
            </div>
          </div>
          <div className="p-5 rounded h-80 w-full">
            <Chart options={chartOptions} series={chartSeries} type="bar" width="100%" height="100%" className='w-full h-full'/>
          </div>
        </section>
      </main>

      {/* Member Modal */}
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

      {/* Chat Modal */}
      <ChatModal isOpen={isChatModalOpen} onClose={() => setIsChatModalOpen(false)} />

      {/* IVR Modal */}
      <Ivr isOpen={isIvrModalOpen} onClose={() => setIsIvrModalOpen(false)} />
    </div>
  );
};

export default Home;
