import { forwardRef } from 'react';
import videoSrc from '../assets/output.mp4';

const BackgroundVideo = forwardRef(function BackgroundVideo(props, ref) {
  return (
    <video id="bg-video" ref={ref} muted playsInline preload="auto">
      <source src={videoSrc} type="video/mp4" />
    </video>
  );
});

export default BackgroundVideo;
