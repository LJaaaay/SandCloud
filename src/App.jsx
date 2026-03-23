import { Routes, Route } from 'react-router-dom';
import LanguageSelector from './components/LanguageSelector';
import BackgroundVideo from './components/BackgroundVideo';
import Home from './pages/Home';
import Booking from './pages/Booking';
import useLenis from './hooks/useLenis';
import useVideoScrub from './hooks/useVideoScrub';

export default function App() {
  const { lenisRef, addFrameCallback } = useLenis();
  const videoRef = useVideoScrub(lenisRef, addFrameCallback);

  return (
    <>
      <BackgroundVideo ref={videoRef} />
      <LanguageSelector />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<Booking />} />
      </Routes>
    </>
  );
}
