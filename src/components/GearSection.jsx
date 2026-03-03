import React, { useEffect, useRef } from "react";
import posterImg from "../assets/poster.png";
import { GEAR_ITEMS } from "../data/constants.js";

const GearSection = ({ onCursorHover }) => {
  const gearRefs = useRef([]);

  // Localized Parallax Engine for the floating gear
  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      // Calculate mouse position relative to the center of the screen
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove);

    let animationFrameId;
    const animate = () => {
      // Easing for buttery smooth mouse follow
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      gearRefs.current.forEach((gear) => {
        if (gear) {
          const speed = parseFloat(gear.getAttribute("data-speed")) || 0.05;
          // Calculate movement based on individual item's speed multiplier
          const moveX = mouseX * speed * window.innerWidth;
          const moveY = mouseY * speed * window.innerHeight;
          gear.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
        }
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      className="gear-section-wrapper"
      style={{
        backgroundImage: `url(${posterImg})`,
        willChange: "background-position",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "60vh",
      }}
    >
      {/* Dark overlay to make the floating gear and text pop out */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
        }}
      />

      <h1
        style={{
          position: "absolute",
          top: "2rem",
          left: "2rem",
          color: "#000000",
          zIndex: 2,
          fontSize: "2.5rem",
        }}
      >
        THE GEAR
      </h1>

      {GEAR_ITEMS.map((item, index) => (
        <div
          key={item.id}
          ref={(el) => (gearRefs.current[index] = el)}
          data-speed={item.speed}
          className="gear-item"
          style={{ top: item.top, left: item.left }}
          onMouseEnter={() => onCursorHover(true)}
          onMouseLeave={() => onCursorHover(false)}
        >
          <img
            src={`https://ui-avatars.com/api/?name=${item.name.replace(" ", "+")}&background=random&color=fff&size=150`}
            alt={item.name}
          />
          <div className="gear-tooltip">{item.name}</div>
        </div>
      ))}
    </div>
  );
};

export default GearSection;
