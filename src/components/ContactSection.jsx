import React from "react";

const ContactSection = ({ onCursorHover }) => {
  return (
    <div className="contact-section" id="contact">
      <h2 className="contact-header">GET IN TOUCH</h2>
      <div className="contact-container">
        <div className="contact-info">
          <h2>Let's collaborate.</h2>
          <p>
            Interested in music production, live performance bookings, or
            photography inquiries? Leave a message.
          </p>
          <a
            href="mailto:abhijayadh@gmail.com"
            className="contact-email"
            onMouseEnter={() => onCursorHover(true)}
            onMouseLeave={() => onCursorHover(false)}
          >
            abhijayadh@gmail.com
          </a>
        </div>
        <form
          className="contact-form"
          action="https://formspree.io/f/mreaweqn" // Replace "xyz" with your actual Formspree endpoint ID later
          method="POST"
        >
          <div className="form-group">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="YOUR NAME"
              required
              onMouseEnter={() => onCursorHover(true)}
              onMouseLeave={() => onCursorHover(false)}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="EMAIL ADDRESS"
              required
              onMouseEnter={() => onCursorHover(true)}
              onMouseLeave={() => onCursorHover(false)}
            />
          </div>
          <div className="form-group">
            <select
              id="inquiry"
              name="inquiry"
              required
              defaultValue=""
              onMouseEnter={() => onCursorHover(true)}
              onMouseLeave={() => onCursorHover(false)}
            >
              <option value="" disabled>
                INQUIRY TYPE
              </option>
              <option value="music">Music Production</option>
              <option value="live">Live Performance</option>
              <option value="photo">Photography</option>
              <option value="other">General Inquiry</option>
            </select>
          </div>
          <div className="form-group">
            <textarea
              id="message"
              name="message"
              placeholder="MESSAGE"
              rows="4"
              required
              onMouseEnter={() => onCursorHover(true)}
              onMouseLeave={() => onCursorHover(false)}
            ></textarea>
          </div>
          <button
            type="submit"
            className="submit-btn"
            onMouseEnter={() => onCursorHover(true)}
            onMouseLeave={() => onCursorHover(false)}
          >
            SEND MESSAGE
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactSection;
