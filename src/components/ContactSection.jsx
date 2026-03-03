import React, { useState } from "react";

const ContactSection = ({ onCursorHover }) => {
  const [status, setStatus] = useState(""); // "" | "submitting" | "success" | "error"

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");

    const form = e.target;
    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };
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
          onSubmit={handleSubmit}
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
            disabled={status === "submitting" || status === "success"}
            onMouseEnter={() => onCursorHover(true)}
            onMouseLeave={() => onCursorHover(false)}
            style={{
              backgroundColor: status === "success" ? "#4BB543" : "",
              color: status === "success" ? "#fff" : "",
              cursor: (status === "submitting" || status === "success") ? "default" : "pointer"
            }}
          >
            {status === "submitting" ? "SENDING..." : status === "success" ? "MESSAGE SENT!" : "SEND MESSAGE"}
          </button>
          {status === "error" && <p style={{ color: "red", marginTop: "1rem" }}>Oops! There was a problem submitting your form.</p>}
        </form>
      </div>
    </div>
  );
};

export default ContactSection;
