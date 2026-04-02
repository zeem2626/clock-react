import React, { useEffect, useState } from 'react';
import './Settings.css';
import { defaultTextSettings, type TextSettings } from './Clock.meta-data';

type Props = {
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  textSettings: TextSettings;
  setTextSettings: React.Dispatch<React.SetStateAction<TextSettings>>;
};

export default function Settings({ images, setImages, textSettings, setTextSettings }: Props) {
  const [input, setInput] = useState('');
  const [interval, setIntervalValue] = useState<number>(5);
  const [toast, setToast] = useState<string | null>(null);

  // ===== LOAD =====
  useEffect(() => {
    const storedImages = JSON.parse(localStorage.getItem('clockImages') || '[]');
    const storedInterval = parseInt(localStorage.getItem('intervalMinutes') || '5');

    setImages(storedImages);
    setIntervalValue(storedInterval);
  }, []);

  // ===== SAVE IMAGES =====
  const saveImages = (imgs: string[]) => {
    localStorage.setItem('clockImages', JSON.stringify(imgs));
    setImages(imgs);
  };

  const saveTextSettings = () => {
    localStorage.setItem('clockTextSettings', JSON.stringify(textSettings));
  };

  const resetTextSettings = () => {
    localStorage.setItem('clockTextSettings', JSON.stringify(defaultTextSettings));
    saveInterval(true);

    showToast('Clock settings reset!');
  };

  const showToast = (message: string) => {
    setToast(message);

    setTimeout(() => {
      setToast(null);
    }, 2000);
  };

  const addImage = () => {
    if (!input.trim()) return;

    // split by space (handles multiple URLs)
    const urls = input
      .trim()
      .split(/\s+/) // split by one or more spaces
      .filter((url) => url.length > 0 && url.startsWith('http'));

    const updated = [...new Set([...images, ...urls])];

    saveImages(updated);
    setInput('');
  };

  const deleteImage = (index: number) => {
    const updated = images.filter((_, i) => i !== index);
    saveImages(updated);
  };

  // ===== SAVE INTERVAL =====
  const saveInterval = (reset: boolean = false) => {
    if (reset === true) {
      localStorage.setItem('intervalMinutes', String(5));
      return;
    }

    if (interval < 1 || interval > 60) {
      showToast('Enter value between 1–60');
      return;
    }

    localStorage.setItem('intervalMinutes', String(interval));
  };

  return (
    <div className="settings">
      <h1>⚙️ Settings</h1>

      {/* Time Settings */}
      <div className="settings-section">
        <div className="h3">Time</div>

        <div className="input-item">
          <label htmlFor="timefontsize">Time Size: </label>
          <input
            className="input-box"
            id="timefontsize"
            type="number"
            value={textSettings.timeFontSize}
            onChange={(e) =>
              setTextSettings({ ...textSettings, timeFontSize: parseInt(e.target.value) })
            }
            placeholder="Time font size"
          />
        </div>

        <div className="input-item">
          <label htmlFor="timeColor">Time Color: </label>
          <input
            className="input-box"
            id="timeColor"
            type="color"
            value={textSettings.timeColor}
            onChange={(e) => setTextSettings({ ...textSettings, timeColor: e.target.value })}
          />
        </div>

        <div className="input-item">
          <label htmlFor="timeX">Time X: </label>
          <input
            className="input-box"
            id="timeX"
            type="number"
            value={textSettings.timeX}
            onChange={(e) => setTextSettings({ ...textSettings, timeX: parseInt(e.target.value) })}
            placeholder="Time X"
          />
        </div>

        <div className="input-item">
          <label htmlFor="timeY">Time Y: </label>
          <input
            className="input-box"
            id="timeY"
            type="number"
            value={textSettings.timeY}
            onChange={(e) => setTextSettings({ ...textSettings, timeY: parseInt(e.target.value) })}
            placeholder="Time Y"
          />
        </div>
      </div>

      {/* Date settings */}
      <div className="settings-section">
        <div className="h3">Date</div>

        <div className="input-item">
          <label htmlFor="datefontsize">Date Size: </label>
          <input
            className="input-box"
            id="datefontsize"
            type="number"
            value={textSettings.dateFontSize}
            onChange={(e) =>
              setTextSettings({ ...textSettings, dateFontSize: parseInt(e.target.value) })
            }
            placeholder="Date font size"
          />
        </div>

        <div className="input-item">
          <label htmlFor="dateColor">Date Color: </label>
          <input
            className="input-box"
            id="dateColor"
            type="color"
            value={textSettings.dateColor}
            onChange={(e) => setTextSettings({ ...textSettings, dateColor: e.target.value })}
          />
        </div>

        <div className="input-item">
          <label htmlFor="dateX">Date X: </label>
          <input
            className="input-box"
            id="dateX"
            type="number"
            value={textSettings.dateX}
            onChange={(e) => setTextSettings({ ...textSettings, dateX: parseInt(e.target.value) })}
            placeholder="Date X"
          />
        </div>

        <div className="input-item">
          <label htmlFor="dateY">Date Y: </label>
          <input
            className="input-box"
            id="dateY"
            type="number"
            value={textSettings.dateY}
            onChange={(e) => setTextSettings({ ...textSettings, dateY: parseInt(e.target.value) })}
            placeholder="Date Y"
          />
        </div>
      </div>

      {/* Image settings */}
      <div className="settings-section">
        <div className="h3">Image</div>

        <div className="input-item">
          <label htmlFor="datefontsize">Interval: </label>
          <input
            className="input-box"
            type="number"
            min={1}
            max={60}
            value={interval}
            onChange={(e) => setIntervalValue(parseInt(e.target.value))}
          />
        </div>
      </div>

      {/* Apply buttons */}
      <div className="text-settings-btns">
        <button
          className="setting-btn "
          onClick={() => {
            saveTextSettings();
            saveInterval();
            showToast('Clock settings saved');
          }}
        >
          Apply Text Settings
        </button>

        <button className="setting-btn " onClick={resetTextSettings}>
          Reset Settings
        </button>
      </div>

      {/* IMAGE URLs */}
      <h3>Image URLs</h3>
      <div className="image-urls-input">
        <textarea
          className="url-text-area"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Multiple URLs seprated by space are allowed"
        ></textarea>

        <button className="setting-btn " onClick={addImage}>
          Add Urls
        </button>
      </div>

      <div className="image-urls-section">
        {images.map((url, index) => (
          <div key={index} className="image-item">
            <img
              src={url}
              className="preview-img"
              onClick={() => window.open(url, '_blank')}
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://via.placeholder.com/50x35?text=No+Img';
              }}
            />

            {/* <button className="setting-btn" onClick={() => deleteImage(index)}> */}
            <button className="delete-btn" onClick={() => deleteImage(index)}>
              ❌
            </button>

            {/* <span className="image-url">{url.length > 30 ? url.slice(0, 30) + '...' : url}</span> */}
          </div>
        ))}
      </div>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
