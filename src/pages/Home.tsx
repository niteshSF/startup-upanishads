import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp, faVolumeMute } from '@fortawesome/free-solid-svg-icons';  // Import FontAwesome icons
import EnterButton from '../assets/button_texture.png';
import VidAud from '../assets/background/bg.mp4'; 
import Audio from '../assets/bg_audio.mp3';
import FallbackImage from "../assets/bg_static_image.png"

const Home = () => {

  const [videoEnded, setVideoEnded] = useState(false)

  useEffect(() => {
    const isVideoAlreadyEnded = sessionStorage.getItem("videoEnded")
    if (isVideoAlreadyEnded === "true") {
      setVideoEnded(true)
    }
  }, [])

  const [fadingOut, setFadingOut] = useState(false)

  const handleVideoEnd = () => {
    setFadingOut(true)
    sessionStorage.setItem("videoEnded", "true") // Persist the video end state
    setTimeout(() => {
      setVideoEnded(true)
    }, 1000)
  }


  // State to control whether the audio is playing or not
  const [isAudioPlaying, setIsAudioPlaying] = useState(true); 
  // Ref to access the audio element directly
  const audioRef = useRef<HTMLAudioElement | null>(null); 

  const handleNavigateIsha = () => {
    window.location.href = 'https://test1.samskritifoundation.org/isha/';
  };
  const handleNavigateKena = () => {
    window.location.href = 'https://test1.samskritifoundation.org/kena/';
  };
  const handleNavigateKatha = () => {
    window.location.href = 'https://test1.samskritifoundation.org/katha/';
  };

  // Function to toggle audio on and off
  const toggleAudio = () => {
    if (audioRef.current) {
      if (isAudioPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsAudioPlaying(!isAudioPlaying);  // Toggle the state
    }
  };

  return (
    <div className="relative w-screen h-screen ">

      {/* merged the video and static page */}
      <div className="relative w-full h-full">
        {!videoEnded ? (
          <>
            <video
              id="bgVideo"
              className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
                fadingOut ? "opacity-0" : "opacity-100"
              }`}
              autoPlay
              muted
              playsInline
              preload="auto"
              onEnded={handleVideoEnd}
            >
              <source src={VidAud} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Skip Button */}
            <button
              onClick={handleVideoEnd}
              className="absolute bottom-24 right-6 z-10 bg-black bg-opacity-50 text-white px-5 py-3 rounded hover:bg-opacity-75 transition"
            >
              Skip
            </button>
          </>
        ) : (
          <img
            src={FallbackImage}
            alt="Fallback"
            className={`absolute w-full h-full object-cover transition-opacity duration-1000 opacity-100`}
          />
        )}
      </div>

      {/* Audio Element */}
      <audio
        ref={audioRef}
        className="hidden"  
        autoPlay
        loop
        muted={false}  // Unmute audio
      >
        <source src={Audio} type="audio/mp3" />
        Your browser does not support the audio tag.
      </audio>

      {/* Audio Toggle Button (Speaker Icon) */}
      <div className="fixed top-4 right-4 p-2 cursor-pointer z-50">
        <button
          onClick={toggleAudio}
          className="bg-white p-1 rounded-full focus:outline-none"
        >
          <FontAwesomeIcon 
            icon={isAudioPlaying ? faVolumeUp : faVolumeMute} 
            size="lg"  // Smaller icon size
            className="text-black"  // Set the icon color to white
          />
        </button>
      </div>

      {/* 1st Enter Button */}
      <div className="fixed bottom-[-1%] right-[47%] h-[24vh] opacity-0">
        <img
          src={EnterButton}
          alt="Enter Button Ishopanishad"
          className="h-[80%] w-[80%] object-contain cursor-pointer opacity-0"
          onClick={handleNavigateIsha}
        />
      </div>

      {/* 2nd Enter Button */}
      <div className="fixed bottom-[-7%] right-[24%] h-[24vh] opacity-0">
        <img
          src={EnterButton}
          alt="Enter Button Kenopanishad"
          className="h-[80%] w-[80%] object-contain cursor-pointer opacity-0"
          onClick={handleNavigateKena}
        />
      </div>

      {/* 3rd Enter Button */}
      <div className="fixed bottom-[-7%] right-[1%] h-[24vh] opacity-0">
        <img
          src={EnterButton} 
          alt="Enter Button Kathopanishad" 
          className="h-[80%] w-[80%] object-contain cursor-pointer opacity-0"
          onClick={handleNavigateKatha}
        />
      </div>

    </div>
  );
};

export default Home;



