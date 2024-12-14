import React from "react";
import './Logbar.css'
import './Error.css'
import './Logbar.css'


function Error() {
  return (
    <div className="pop-container error signin-error swp-pop-error">
  <div className="error pop-bottom tk-subbody-headline" >
    <p className="fat" id="errMsg">
      Enter the email or phone number and password for your Apple Account.
    </p>

    <a className="si-link ax-outline thin tk-subbody" href="https://iforgot.apple.com/password/verify/appleid" target="_blank" rel="noopener noreferrer">
      Forgot <span className="no-wrap">password?↗</span>
      <span className="sr-only">Opens in a new window.</span>
    </a>
  </div>
</div>

  );
}

export default Error;
