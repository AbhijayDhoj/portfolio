import React, { useEffect, useRef, useState } from "react";
import Lenis from "@studio-freight/lenis";
import "./App.css";

// Extracted Data & Components
import { ASSETS, YOUTUBE_VIDEOS } from "./data/constants.js";
import MusicSection from "./components/MusicSection";
import GalleryBlock from "./components/GalleryBlock";
import GearSection from "./components/GearSection";
import ContactSection from "./components/ContactSection";
import Preloader from "./components/Preloader";

// --- MAIN APP COMPONENT ---
const App = () => {
  const cursorRef = useRef(null);
  const [isHoveringBlock, setIsHoveringBlock] = useState(false);
  const heroBgRef = useRef(null);
  const heroTextRef = useRef(null);

  useEffect(() => {
    const handleCursorMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener("mousemove", handleCursorMove);
    return () => window.removeEventListener("mousemove", handleCursorMove);
  }, []);

  // --- SMOOTH SCROLLING ENGINE (LENIS) ---
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
    });

    let animationFrameId;
    function raf(time) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }
    animationFrameId = requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // --- HERO PARALLAX ANIMATION ---
  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    const handleMouseMove = (e) => {
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const animate = () => {
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;
      const scrollY = window.scrollY;
      if (heroBgRef.current)
        heroBgRef.current.style.transform = `translate3d(${-mouseX * 8}px, calc(${scrollY * 0.2}px + ${-mouseY * 8}px), 0)`;
      if (heroTextRef.current)
        heroTextRef.current.style.transform = `translate3d(calc(-50% + ${mouseX * 15}px), calc(-50% + ${scrollY * 0.1}px + ${mouseY * 15}px), 0)`;
      requestAnimationFrame(animate);
    };
    window.addEventListener("mousemove", handleMouseMove);
    const animId = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  // --- SCROLL REVEAL ANIMATION (INTERSECTION OBSERVER) ---
  useEffect(() => {
    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          // Optional: Stop observing once revealed so it doesn't replay backwards
          observer.unobserve(entry.target);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.15, // Trigger when 15% of the element is visible
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const revealElements = document.querySelectorAll(".reveal");
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  return (
    <div className="app-container">
      <Preloader />
      <div
        ref={cursorRef}
        className={`cursor-dot ${isHoveringBlock ? "active" : ""}`}
      />

      <nav>
        <div className="nav-logo">ABJ.</div>
        <div className="nav-links">
          <a href="#work">WORK</a>
          <a href="#about">ABOUT</a>
          <a href="mailto:abhijayadh@gmail.com">CONTACT</a>
        </div>
      </nav>

      <header className="hero-container">
        <div className="hero-image-wrapper" ref={heroBgRef}>
          <img
            src={ASSETS.heroimg}
            className="hero-image"
            alt="Hero Background"
          />
        </div>
        <div className="hero-text-wrapper" ref={heroTextRef}>
          <h1 className="hero-title">Abhijay</h1>
        </div>
      </header>

      <section
        className="content-layer"
        id="work"
        style={{ borderTop: "none", padding: 0 }}
      >
        {/* --- BLOCK 1: THE STICKY BIO --- */}
        <div className="sticky-bio-wrapper">
          <div className="grid-container reveal" style={{ width: "100%" }}>
                <section
                className="about-section"
                id="about"
              >
                <div className="about-meta">
                  <div className="meta-group">
                    <span className="meta-label">Based In</span>Kathmandu,
                    Nepal
                    <br />
                    Bagmati Province
                  </div>
                  <div className="meta-group">
                    <span className="meta-label">Expertise</span>Music
                    Production
                    <br />
                    Live Performance
                    <br />
                    Photography
                  </div>
                  <div className="meta-group">
                    <span className="meta-label">Connect</span>
                    <a href="https://www.instagram.com/abhijay.adh/" target="_blank" rel="noopener noreferrer" style={{textDecoration: "underline", color: "inherit"}}>Instagram</a>
                    <br />
                    <a href="https://www.youtube.com/@Abhijayy" target="_blank" rel="noopener noreferrer" style={{textDecoration: "underline", color: "inherit"}}>YouTube</a>
                    <br />
                    <a href="https://open.spotify.com/user/317td3ye3grz7d2xrotk4stxyo4m?si=edb60fdab1a84ff2" target="_blank" rel="noopener noreferrer" style={{textDecoration: "underline", color: "inherit"}}>Spotify</a>
                  </div>
                </div>
                <div className="about-bio">
                  <p>
                    Musician, singer-songwriter, and producer exploring the
                    intersection of sound and visual art.
                    <br />
                    <br />
                    My work is rooted in the stories I see and rawness of live
                    performance. From the chaotic streets of Kathmandu to the
                    silence of the Mustang mountains, I document what I see and
                    translate what I hear.
                  </p>
                </div>
              </section>
            </div>
          </div>

        {/* --- BLOCK 2: THE MAIN CONTENT CARD --- */}
        <div
          className="main-content-card"
          style={{
            position: "relative",
            zIndex: 10,
            backgroundColor: "#ffffff",
            paddingTop: "2rem",
          }}
        >
          <div className="grid-container reveal">
            <div className="original-work-container">
              <h1
                style={{
                  fontSize: "2.5rem",
                  marginBottom: "1.5rem",
                }}
              >
                ORIGINAL WORK
              </h1>
              <div className="magazine-layout">
                <div
                  className="magazine-item magazine-hero"
                  onMouseEnter={() => setIsHoveringBlock(true)}
                  onMouseLeave={() => setIsHoveringBlock(false)}
                  onClick={() =>
                    window.open(
                      `https://youtube.com/watch?v=${YOUTUBE_VIDEOS.hero.id}`,
                      "_blank",
                    )
                  }
                >
                  <div className="image-mask">
                    <img
                      src={`https://img.youtube.com/vi/${YOUTUBE_VIDEOS.hero.id}/maxresdefault.jpg`}
                      alt={YOUTUBE_VIDEOS.hero.title}
                      className="magazine-img"
                    />
                  </div>
                  <div className="project-meta">
                    <span className="project-title">
                      {YOUTUBE_VIDEOS.hero.title}
                    </span>
                    <span className="project-date">
                      {YOUTUBE_VIDEOS.hero.year}
                    </span>
                  </div>
                </div>
                <div className="magazine-stack">
                  <div
                    className="magazine-item magazine-small"
                    onMouseEnter={() => setIsHoveringBlock(true)}
                    onMouseLeave={() => setIsHoveringBlock(false)}
                    onClick={() =>
                      window.open(
                        `https://youtube.com/watch?v=${YOUTUBE_VIDEOS.small1.id}`,
                        "_blank",
                      )
                    }
                  >
                    <div className="image-mask">
                      <img
                        src={`https://img.youtube.com/vi/${YOUTUBE_VIDEOS.small1.id}/maxresdefault.jpg`}
                        alt={YOUTUBE_VIDEOS.small1.title}
                        className="magazine-img"
                      />
                    </div>
                    <div className="project-meta">
                      <span className="project-title">
                        {YOUTUBE_VIDEOS.small1.title}
                      </span>
                      <span className="project-date">
                        {YOUTUBE_VIDEOS.small1.year}
                      </span>
                    </div>
                  </div>
                  <div
                    className="magazine-item magazine-small"
                    onMouseEnter={() => setIsHoveringBlock(true)}
                    onMouseLeave={() => setIsHoveringBlock(false)}
                    onClick={() =>
                      window.open(
                        `https://youtube.com/watch?v=${YOUTUBE_VIDEOS.small2.id}`,
                        "_blank",
                      )
                    }
                  >
                    <div className="image-mask">
                      <img
                        src={`https://img.youtube.com/vi/${YOUTUBE_VIDEOS.small2.id}/maxresdefault.jpg`}
                        alt={YOUTUBE_VIDEOS.small2.title}
                        className="magazine-img"
                      />
                    </div>
                    <div className="project-meta">
                      <span className="project-title">
                        {YOUTUBE_VIDEOS.small2.title}
                      </span>
                      <span className="project-date">
                        {YOUTUBE_VIDEOS.small2.year}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="reveal music-section-wrapper">
            <MusicSection onCursorHover={setIsHoveringBlock} />
          </div>

          <div className="reveal gallery-section-container">
            <h1 className="gallery-main-header">
              GALLERIES
            </h1>
            <GalleryBlock
              title="MUSTANG"
              year="2025"
              images={[
                ASSETS.must1,
                ASSETS.must2,
                ASSETS.must3,
                ASSETS.must4,
              ]}
              onCursorHover={setIsHoveringBlock}
            />
            <GalleryBlock
              title="THAILAND"
              year="2024"
              images={[
                ASSETS.thai1,
                ASSETS.thai2,
                ASSETS.thai3,
                ASSETS.thai4,
              ]}
              onCursorHover={setIsHoveringBlock}
            />
            <GalleryBlock
              title="POONHILL"
              year="2024"
              images={[
                ASSETS.poon1,
                ASSETS.poon2,
                ASSETS.poon3,
                ASSETS.poon4,
                ASSETS.poon5,
                ASSETS.poon6,
              ]}
              onCursorHover={setIsHoveringBlock}
            />
            <GalleryBlock
              title="KULEKHANI"
              year="2024"
              images={[ASSETS.kul1]}
              onCursorHover={setIsHoveringBlock}
            />
          </div>

          <div className="reveal">
            {/* --- THE NEW GEAR SECTION (Currently Commented Out) --- */}
            {/* <GearSection onCursorHover={setIsHoveringBlock} /> */}
          </div>

          <div className="reveal">
            <ContactSection onCursorHover={setIsHoveringBlock} />
          </div>

          <footer
            style={{
              paddingTop: "5rem",
              paddingBottom: "3rem",
              backgroundColor: "#fff",
              textAlign: "center"
            }}
          >
            &copy; 2026 ABHIJAY DHOJ ADHIKARI. ALL RIGHTS RESERVED.
          </footer>
        </div>
      </section>
    </div>
  );
};

export default App;
