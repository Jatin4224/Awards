import { useState, useRef } from "react";

const Hero = () => {
  // State management
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const totalVideos = 4; // Total number of videos
  const nextVideoRef = useRef(null); // Reference to the next video element

  // Increment loaded videos count when the video is fully loaded
  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
    setIsLoading(false); // Set loading state to false once the video loads
  };

  // Handle click on mini video player
  const handleMiniVideoPlayerClick = () => {
    setHasClicked(true); // Mark that the user has clicked
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalVideos); // Update the current index
  };

  // Generate video source dynamically based on index
  const getVideoSrc = (index) => {
    return `videos/hero-${index}.mp4`;
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-gray-900">
      {/* Video Frame */}
      <div
        id="video-frame"
        className="relative z-10 h-full w-full overflow-hidden rounded-lg bg-blue-75"
      >
        {/* Mini Video Player */}
        <div className="absolute-center mask-clip-path absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
          <div
            onClick={handleMiniVideoPlayerClick}
            className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in-out hover:scale-100 hover:opacity-100"
          >
            <video
              ref={nextVideoRef}
              src={getVideoSrc(currentIndex + 1)} // Load the next video
              loop
              muted
              id="current-video"
              className="size-64 origin-center scale-150 object-cover object-center"
              onLoadedData={handleVideoLoad} // Call when video data loads
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
