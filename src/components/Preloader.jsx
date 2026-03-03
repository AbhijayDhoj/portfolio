import React, { useState, useEffect } from "react";

const Preloader = () => {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    // Prevent scrolling and force top while loading
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);

    let currentProgress = 0;
    const interval = setInterval(() => {
      // Simulate erratic, fast chunk loading from 0 to 100
      currentProgress += Math.floor(Math.random() * 25) + 10;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setTimeout(() => {
          setIsLoaded(true);
          document.body.style.overflow = "";
          setTimeout(() => setIsHidden(true), 800); // Allow CSS transform to finish
        }, 400); // Brief pause at 100% before hoisting curtain
      }
      setProgress(currentProgress);
    }, 120);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, []);

  if (isHidden) return null;

  return (
    <div
      className="preloader-container"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%", /* changed from 100vh to 100% to handle mobile nav bars better */
        backgroundColor: "#000",
        color: "#fff",
        zIndex: 9000, // Important: placed perfectly between the page and the custom cursor
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "transform 0.9s cubic-bezier(0.76, 0, 0.24, 1)",
        transform: isLoaded ? "translateY(-100%)" : "translateY(0)",
        willChange: "transform",
      }}
    >
      <div style={{ alignSelf: "flex-start" }}>
        <span style={{ fontSize: "1.5rem", fontWeight: 800 }}>ABJ.</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <span className="preloader-text">
          Loading Portfolio
        </span>
        <span className="preloader-number">
          {progress}%
        </span>
      </div>
    </div>
  );
};

export default Preloader;
