import React, { useState, useRef, useEffect } from "react";
import bibingkaCover from "../assets/bibingka.jpg";

// Import the audio file
import song from "../audio/Bibingka.mp3";

import { FaPlay } from "react-icons/fa";
import { FaRegCirclePause } from "react-icons/fa6";

import Gcash from "./Gcash";

const Card = () => {
  const [viewMessagePopupTrigger, setViewMessagePopupTrigger] = useState(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      // Play the audio once the component is mounted
      const playAudio = async () => {
        try {
          await audioRef.current.play();
          setIsPlaying(true); // Update the state to reflect that audio is playing
        } catch (error) {
          console.error("Autoplay failed: ", error);
          setIsPlaying(false);
        }
      };

      playAudio();
    }
  }, []);

  const handleViewMessageModal = () => {
    setViewMessagePopupTrigger(true);
  };

  const handlePlay = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const handlePause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  // Update current time and duration when the audio metadata is loaded
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onloadedmetadata = () => {
        setDuration(audioRef.current.duration);
      };

      audioRef.current.ontimeupdate = () => {
        setCurrentTime(audioRef.current.currentTime);
      };
    }
  }, []);

  // Handle the audio seek bar
  const handleSeek = (e) => {
    const newTime = e.target.value;
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
  };

  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    const formattedSeconds = seconds.toString().padStart(2, "0");
    return `${minutes}:${formattedSeconds}`;
  };

  return (
    <div
      className="bg-primary my-1 rounded shadow mx-auto"
      style={{ maxWidth: "500px" }}
    >
      <div>
        <div className="d-flex flex-column justify-content-center align-items-center text-center">
          <div className="bg-white mt-4 mx-3 rounded shadow">
            <img
              src={bibingkaCover}
              className="rounded mt-5"
              alt="cover"
              style={{ width: "15rem" }}
            />
            <input
              className="form-range w-75"
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={handleSeek}
            />
            {/* Pass the imported audio file path */}
            <audio ref={audioRef} src={song} />
            <h4>Bibingka</h4>
            <div className="d-flex justify-content-between mx-5 text-secondary">
              <small>{formatDuration(currentTime)}</small>
              <small>{formatDuration(duration)}</small>
            </div>
            <button onClick={handlePlayPause} className="btn mb-5">
              <span>
                {isPlaying ? <FaRegCirclePause className="fs-4" /> : <FaPlay />}
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-3 mx-4 p-3 bg-light-subtle rounded shadow">
        <small className="text-start">
          This Christmas, let’s pause to reflect on the magic that fills this
          season—the warmth of shared laughter, the comfort of familiar faces,
          and the beauty of simple moments spent together. It’s a time when
          hearts are full, and memories of past celebrations remind us of how
          love truly binds us.
        </small>
        <br />
        <small className="d-flex justify-content-center text-center pt-2">
          Care to share some bibingka?
        </small>
      </div>

      <div className="text-center">
        <button
          className="btn btn-dark text-white mt-3 py-2 mb-3 mx-auto"
          onClick={handleViewMessageModal}
        >
          Pindutin mo ako
        </button>
      </div>

      <Gcash
        trigger={viewMessagePopupTrigger}
        setTrigger={setViewMessagePopupTrigger}
      />
    </div>
  );
};

export default Card;
