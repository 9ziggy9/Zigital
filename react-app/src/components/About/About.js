import React from 'react';
import './About.css';

const About = () => {
  return (
    <>
      <div className="shadow-grid">
        <div className='about-me-here'>
          <p>
            Welcome to my about me.
          </p>
        </div>
        <div className="pro-image">
        </div>
        <div className="close">
            <button id="close-btn">
                close
            </button>
        </div>
      </div>
    </>
  )
}

export default About;
