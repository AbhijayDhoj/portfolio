import React, { useState } from "react";
import { TRACKS } from "../data/constants.js";

const MusicSection = ({ onCursorHover }) => {
  const [playingTrack, setPlayingTrack] = useState(null);

  return (
    <div className="music-section">
      <h2 className="music-header" style={{ marginTop: "8rem" }}>SELECTED SOUNDS</h2>
      <div className="track-list">
        {TRACKS.map((track, index) => (
          <div
            key={track.id}
            className={`track-row ${playingTrack === track.url ? "active" : ""}`}
            onClick={() =>
              setPlayingTrack(playingTrack === track.url ? null : track.url)
            }
            onMouseEnter={() => onCursorHover(true)}
            onMouseLeave={() => onCursorHover(false)}
          >
            <span className="track-num">{`0${index + 1}`}</span>
            <span className="track-title">{track.title}</span>
            <span className="track-control">
              {playingTrack === track.url ? "STOP" : "PLAY"}
            </span>
            <span className="track-time">{track.time}</span>
          </div>
        ))}
      </div>
      {playingTrack && (
        <iframe
          className="hidden-player"
          width="100%"
          height="166"
          scrolling="no"
          frameBorder="no"
          allow="autoplay"
          src={playingTrack}
          title="SoundCloud Player"
        ></iframe>
      )}
    </div>
  );
};

export default MusicSection;
