import { useState, useRef, useEffect } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const totalVideos = 4;
  const nextVideoRef = useRef(null);

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
    if (loadedVideos === totalVideos - 1) {
      setIsLoading(false);
    }
  };

  const handleMiniVideoPlayerClick = () => {
    setHasClicked(true);
    const nextIndex = (currentIndex % totalVideos) + 1;
    setCurrentIndex(nextIndex);
  };

  useEffect(() => {
    if (hasClicked) {
      gsap.set("#next-video", { visibility: "visible" });
      gsap.to("#next-video", {
        transformOrigin: "center center",
        scale: 1,
        width: "100%",
        height: "100%",
        duration: 1,
        ease: "power1.inOut",
        onStart: () => nextVideoRef.current?.play(),
      });

      gsap.from("#current-video", {
        transformOrigin: "center center",
        scale: 0,
        duration: 1.5,
        ease: "power1.inOut",
      });
    }
  }, [hasClicked]);

  useEffect(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)",
      borderRadius: "0 0 40% 10%",
    });

    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0 0 0 0",
      ease: "power1.out",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        scrub: true,
      },
    });
  }, []);

  const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-blue-75">
      <div
        id="video-frame"
        className="relative z-10 h-full w-full overflow-hidden rounded-lg bg-blue-75"
      >
        <div
          onClick={handleMiniVideoPlayerClick}
          className="absolute-center mask-clip-path absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg"
        >
          <video
            ref={nextVideoRef}
            src={getVideoSrc((currentIndex % totalVideos) + 1)}
            loop
            muted
            id="next-video"
            className="size-64 origin-center scale-150 object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
        </div>
        <div>
          <video
            src={getVideoSrc(currentIndex)}
            autoPlay
            loop
            muted
            className="absolute left-0 top-0 size-full object-cover object-center"
          />
        </div>
        <h1 className="special-font hero-heading absolute bottom-5 right-5 text-white">
          100<b>x</b>Devs
        </h1>
        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-20">
            <h1 className="special-font hero-heading text-white">
              100<b>X</b>Match
            </h1>
            <p className="mb-5 max-w-64 font-robert-regular text-white">
              Swipe. Connect. Code. <br /> Find Your Perfect Developer Match
              with 100xCollab!
            </p>
            <Button
              id="watch-trailer"
              title="Watch Trailer"
              leftIcon={<TiLocationArrow />}
              containerClass="!bg-yellow-300 flex-center gap-1 rounded-lg w-50"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
