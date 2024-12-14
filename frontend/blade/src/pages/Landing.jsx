import { Link } from "react-router-dom";
import './Stan.css'
import animation from '/src/assets/animation.mp4';
import React from 'react';
import { Navbar } from '../components/Navbar'

function Landing({ onNext }) {
  return (
    <main>
      <Navbar/>
  <div className="landing-page">
    <div className="hero-wrapper">
      <div className="icloud-animated-hero">
        <video
          src={animation}
          width={430}
          height={388}
          autoPlay
          playsInline
          loop
          muted
          x-webkit-airplay="deny"
          title="Animation showing different users' Memojis surrounded by the icons of the apps the user personally uses most"
        />
      </div>
      <div className="landing-page-icloud-hero">
        <div className="clouds">
        </div>
        <h1>iCloud</h1>
      </div>
    </div>
    <div className="landing-page-content">
      <ui-button
        class="push primary sign-in-button icloud-mouse"
        tabIndex={0}
        ontouchstart="void(0)"
        role="button"
        aria-haspopup="false"
        onClick={onNext}
      >

        Sign In

      </ui-button>
      <h2 className="description">
        The best place for all your photos, files, notes, mail, and more.
      </h2>
      <div className="tiles">
        <div className="landing-page-tile">
          <div className="tile-icon">
            <img
              src="/src/assets/appgrid.png"
              alt="Collection of icons for apps available on iCloud.com, including Mail, Find My, and Reminders"
            />
          </div>
          <h2 className="tile-title">
            Easily access apps and data from your iPhone on the web
          </h2>
          <p className="tile-description">
            iCloud is essential for keeping personal information from your
            devices safe, up to date, and available wherever you are. At
            iCloud.com, you can access your photos, files, and more from any web
            browser. Changes you make will sync to your iPhone and other
            devices, so you’re always up to date.
          </p>
        </div>
        <div className="landing-page-tile">
          <div className="tile-icon">
            <img
              src="/src/assets/storagead.png"
              alt="Graphic depicting the icons for various iCloud+ benefits, including up to 12TB of storage"
            />
          </div>
          <h2 className="tile-title">
            More storage plus additional features to protect your privacy
          </h2>
          <p className="tile-description">
            Upgrade to iCloud+ to get more storage and additional features like
            iCloud Private Relay, Hide My Email, and HomeKit Secure Video. You
            can even share your subscription with your family. Learn more at{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://apple.com/icloud"
              className="unstyled-link"
              aria-label="apple.com/icloud (opens in a new tab)"
            >
              apple.com/icloud
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  </div>
  <footer>
  <div className="legal-footer">
    <div className="application-content">
      <div className="legal-footer-content">
        <div className="inner-row" role="presentation">
          <div className="with-separator">
            <a
              className="systemStatus"
              target="_blank"
              rel="noreferrer"
              href="https://www.apple.com/support/systemstatus/"
              aria-label="System Status (opens in a new tab)"
            >
              System Status
            </a>
            <div aria-hidden="true" className="separator" />
          </div>
          <div className="with-separator">
            <a
              className="privacy"
              target="_blank"
              rel="noreferrer"
              href="https://www.apple.com/legal/privacy/"
              aria-label="Privacy Policy (opens in a new tab)"
            >
              Privacy Policy
            </a>
            <div aria-hidden="true" className="separator" />
          </div>
          <a
            className="terms"
            target="_blank"
            rel="noreferrer"
            href="https://www.apple.com/legal/internet-services/icloud/"
            aria-label="Terms & Conditions (opens in a new tab)"
          >
            Terms &amp; Conditions
          </a>
        </div>
        <div className="inner-row" role="presentation">
          <span className="copyright">
            Copyright © 2024 Apple Inc. All rights reserved.
          </span>
        </div>
      </div>
    </div>
  </div>
</footer>

</main>


  );
}

export default Landing;
