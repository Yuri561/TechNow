import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import WorkRequest from './components/WorkRequest';
import TimeReview from './components/TimeReview';
import ToolBox from './components/ToolBox';
import NewWorkOrderForm from './components/NewWorkOrderForm';
import DocsUpload from './components/DocsUpload';
import Equipment from './components/Equipment';
import Notes from './components/Notes';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './components/Home';
import Loading from './components/Loading';
import GenerateReceipt from './components/GenerateReceipt';
import { ThemeModifier } from './components/ThemeModifier'; // Ensure this path is correct

import './App.css';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 3000); // Simulate loading time
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const username = localStorage.getItem('username');
    setIsAuthenticated(!!username);
  }, []);

  return (
    <ThemeModifier defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <div className="app-container">
          <Header />
          <Sidebar isAuthenticated={isAuthenticated} />
          <div className="main-content h-full w-full bg-gray-900">
            {loading ? (
              <Loading />
            ) : (
              <Routes>
                <Route
                  path="/"
                  element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <Home />
                    </ProtectedRoute>
                  }
                />
                <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/work-request"
                  element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <WorkRequest />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/time-review"
                  element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <TimeReview />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/tool-box"
                  element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <ToolBox />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/new-work-order-form"
                  element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <NewWorkOrderForm />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/docs-upload"
                  element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <DocsUpload />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/work-requests"
                  element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <div>Work Request Info</div>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/equipment"
                  element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <Equipment />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/generate-receipt"
                  element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <GenerateReceipt />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/notes"
                  element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <Notes />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            )}
          </div>
        </div>
      </Router>
    </ThemeModifier>
  );
};

export default App;

