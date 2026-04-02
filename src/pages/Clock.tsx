import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Clock.css';
import { type TextSettings } from './Clock.meta-data';

type Props = {
  textSettings: TextSettings;
};

export default function Clock({ textSettings }: Props) {
  const [ampm, setAmpm] = useState('');
  const [date, setDate] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [second, setSecond] = useState('');

  const pad = (n: number) => String(n).padStart(2, '0');

  useEffect(() => {
    let lastSecond = -1;
    let lastMinute = -1;
    let lastHour = -1;
    let lastDate = '';

    const updateClock = () => {
      const d = new Date();

      const sec = d.getSeconds();
      const min = d.getMinutes();
      const rawHour = d.getHours();
      const displayHour = rawHour % 12 || 12;
      const displayAmpm = rawHour >= 12 ? 'PM' : 'AM';

      if (rawHour !== lastHour) {
        lastHour = rawHour;
        setHour(pad(displayHour));
        setAmpm(displayAmpm);
      }

      if (min !== lastMinute) {
        lastMinute = min;
        setMinute(pad(min));
      }

      if (sec !== lastSecond) {
        lastSecond = sec;
        setSecond(pad(sec));
      }

      const todayKey = d.toDateString();
      if (todayKey !== lastDate) {
        lastDate = todayKey;
        const formattedDate = d.toLocaleDateString('en-GB', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
        });
        setDate(formattedDate);
      }
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval);
  }, []);

  // ===== STORAGE =====
  const getImages = (): string[] => {
    return JSON.parse(localStorage.getItem('clockImages') || '[]');
  };

  const getIntervalMinutes = (): number => {
    return parseInt(localStorage.getItem('intervalMinutes') || '5');
  };

  // ===== BACKGROUND =====
  const setRandomBackground = () => {
    let images = getImages();
    if (images.length === 0) {
      images = [
        'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?q=80&w=4170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      ];
      localStorage.setItem('clockImages', JSON.stringify(images));
    }

    const randomIndex = Math.floor(Math.random() * images.length);
    const url = images[randomIndex];

    const clockElem = document.querySelector('.clock-page') as HTMLElement;
    if (clockElem) {
      clockElem.style.backgroundImage = `url("${url}")`;
    }
  };

  useEffect(() => {
    setRandomBackground();

    const interval = setInterval(
      () => {
        setRandomBackground();
      },
      getIntervalMinutes() * 60 * 1000,
    );

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="clock-page">
      <Link to="/settings" className="settings-btn">
        ⚙️
      </Link>

      <div
        className="clock"
        style={{
          position: 'absolute',
          left: `${textSettings.timeX}px`,
          top: `${textSettings.timeY}px`,
          fontSize: `${textSettings.timeFontSize}px`,
          color: textSettings.timeColor,
          margin: 0,
        }}
      >
        <div className="time-row">
          {/* <span>{time}</span> */}

          <div className="time">
            {hour}

            <span
              style={{
                fontSize: `${textSettings.timeFontSize / 2}px`,
              }}
            >
              :
            </span>

            {minute}

            <span
              style={{
                fontSize: `${textSettings.timeFontSize / 2}px`,
              }}
            >
              :
            </span>

            {second}
          </div>

          <span
            style={{
              fontSize: `${textSettings.timeFontSize / 4}px`,
            }}
          >
            {ampm}
          </span>
        </div>
      </div>

      <div
        className="date"
        style={{
          position: 'absolute',
          left: `${textSettings.dateX}px`,
          top: `${textSettings.dateY}px`,
          fontSize: `${textSettings.dateFontSize}px`,
          color: textSettings.dateColor,
          margin: 0,
        }}
      >
        {date}
      </div>
    </div>
  );
}
