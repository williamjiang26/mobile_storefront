import React, { useRef } from "react";
import { motion } from "framer-motion";
import YouTube from "react-youtube";

export default function ContinuousVideoBackground() {
  const playerRef = useRef<any>(null);

  // Set your timestamps (in seconds)
  const YOUTUBE_VIDEO_ID = "2wpxz1SLwYc"; // Replace with your YouTube Video ID
  const START_TIME = 478; // Start at 10 seconds
  const END_TIME = 483;
  // 1. Setup Player Options
  const opts = {
    playerVars: {
      autoplay: 1,
      mute: 1,
      controls: 0,
      showinfo: 0,
      rel: 0,
      iv_load_policy: 3,
      start: START_TIME,
      end: END_TIME,
    },
  };

  // 2. Capture the player instance when it is ready
  const onReady = (event: any) => {
    playerRef.current = event.target;
    playerRef.current?.mute(); // Extra insurance for browser autoplay policies
    playerRef.current.playVideo();
  };

  // 3. Monitor state changes (The Loop Engine)
  const onStateChange = (event: any) => {
    // YouTube state '0' means the video ended or hit its specified 'end' parameter
    if (event.data === 0) {
      if (playerRef.current) {
        // Force the video back to your specific start time and play
        playerRef.current.seekTo(START_TIME);
        playerRef.current.playVideo();
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-between space-y-0 font-sans">
      <motion.div className="relative w-full overflow-hidden group h-screen bg-black">
        {/* React YouTube Wrapper tailored to act like a background video container */}
        <div className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <YouTube
            videoId={YOUTUBE_VIDEO_ID}
            opts={opts}
            onReady={onReady}
            onStateChange={onStateChange}
            iframeClassName="w-full h-full object-cover"
            className="w-full h-full"
          />
        </div>

        {/* Optional Overlay to protect text readability over bright videos */}
        <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none" />
      </motion.div>
    </div>
  );
}
