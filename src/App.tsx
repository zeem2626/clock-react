import { useEffect, useState } from 'react';
import Clock from './pages/Clock';
import Settings from './pages/Settings';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { defaultTextSettings, type TextSettings } from './pages/Clock.meta-data';

export default function App() {
  const [images, setImages] = useState<string[]>([]);

  // Text settings
  const [textSettings, setTextSettings] = useState<TextSettings>(defaultTextSettings);

  useEffect(() => {
    const storedTextSettings = JSON.parse(localStorage.getItem('clockTextSettings') || 'null');

    if (storedTextSettings) {
      setTextSettings({
        ...defaultTextSettings,
        ...storedTextSettings,
      });
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Clock textSettings={textSettings} />} />

      <Route
        path="/settings"
        element={
          <Settings
            images={images}
            setImages={setImages}
            textSettings={textSettings}
            setTextSettings={setTextSettings}
          />
        }
      />
    </Routes>
  );
}
