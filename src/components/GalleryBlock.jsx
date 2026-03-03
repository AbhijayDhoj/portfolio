import React, { useEffect, useRef, useState } from "react";

const GalleryBlock = ({ title, year, images, onCursorHover }) => {
  const [isOpen, setIsOpen] = useState(false);
  const scrollContainerRef = useRef(null);
  const imageRefs = useRef([]);
  const scrollSpeed = useRef(2);
  const infiniteImages = [...images, ...images, ...images, ...images];

  useEffect(() => {
    if (!isOpen) return;
    const container = scrollContainerRef.current;
    if (!container) return;

    let animationFrameId;
    const loop = () => {
      container.scrollLeft += scrollSpeed.current;
      const singleSetWidth = container.scrollWidth / 4;
      if (singleSetWidth > 0) {
        if (container.scrollLeft >= singleSetWidth * 3) {
          container.scrollLeft -= singleSetWidth;
        } else if (container.scrollLeft <= 0) {
          container.scrollLeft += singleSetWidth;
        }
      }
      imageRefs.current.forEach((img) => {
        if (!img) return;
        const rect = img.parentElement.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const normalizePos =
          (rect.left + rect.width / 2 - viewportWidth / 2) /
          (viewportWidth / 2);
        img.style.transform = `translateX(${normalizePos * 40}px) scale(1.1)`;
      });
      animationFrameId = requestAnimationFrame(loop);
    };
    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isOpen]);

  const holdLeft = () => {
    scrollSpeed.current = -15;
  };
  const holdRight = () => {
    scrollSpeed.current = 15;
  };
  const release = () => {
    scrollSpeed.current = 2;
  };

  return (
    <div
      className="gallery-block-wrapper"
      style={{ marginBottom: "2px" }}
      onMouseEnter={() => onCursorHover(true)}
      onMouseLeave={() => onCursorHover(false)}
    >
      <div className="gallery-block-header" onClick={() => setIsOpen(!isOpen)}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <h2 className="gallery-block-title">{title}</h2>
          <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
            {isOpen ? "CLOSE" : year}
          </span>
        </div>
      </div>
      <div
        className={`gallery-content-wrapper ${isOpen ? "open" : ""}`}
        style={{ position: "relative" }}
      >
        <div
          style={{
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? "translateY(0)" : "translateY(40px)",
            transition:
              "opacity 0.5s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            transitionDelay: isOpen ? "0.1s" : "0s",
            height: "100%",
            pointerEvents: isOpen ? "auto" : "none",
          }}
        >
          <button
            className="gallery-arrow-btn arrow-left"
            onMouseDown={holdLeft}
            onMouseUp={release}
            onMouseLeave={release}
            onTouchStart={holdLeft}
            onTouchEnd={release}
          >
            &larr;
          </button>
          <button
            className="gallery-arrow-btn arrow-right"
            onMouseDown={holdRight}
            onMouseUp={release}
            onMouseLeave={release}
            onTouchStart={holdRight}
            onTouchEnd={release}
          >
            &rarr;
          </button>
          <div
            className="horizontal-scroll-container"
            ref={scrollContainerRef}
            style={{ height: "100%", alignItems: "center" }}
          >
            {infiniteImages.map((src, i) => (
              <div
                key={i}
                className="gallery-item-wrapper"
                style={{
                  flex: "0 0 auto",
                  width: "auto",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <img
                  ref={(el) => (imageRefs.current[i] = el)}
                  src={src}
                  alt={`${title} ${i}`}
                  style={{
                    height: "100%",
                    width: "auto",
                    objectFit: "cover",
                    transform: "scale(1.1)",
                    willChange: "transform",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryBlock;
