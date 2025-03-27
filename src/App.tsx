import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatTimestamp } from './utils';
import {
  AppDispatch,
  Event,
  fetchEvents,
  selectEvents,
  selectIsLoading,
  selectIsError,
} from './store';

import styles from './assets/app.module.scss';
import { VIDEO_URL } from './config';

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const events = useSelector(selectEvents);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current?.currentTime || 0);
  };

  const handleClickVideo = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  const goToEvent = (timestamp: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = timestamp;
    }
  };

  if (isLoading) {
    return <span className={styles.loader} />;
  }

  if (isError) {
    return <p className={styles.errorText}>Loading error</p>;
  }

  return (
    <div className={styles.video}>
      <video
        ref={videoRef}
        src={VIDEO_URL}
        onTimeUpdate={handleTimeUpdate}
        onClick={handleClickVideo}
        autoPlay
        muted
      />
      <ul className={styles.video_eventsList}>
        {events.map((event: Event) => (
          <li
            className={styles.video_eventsItem}
            key={event.timestamp}
            onClick={goToEvent.bind(null, event.timestamp)}
          >
            {formatTimestamp(event.timestamp)}
          </li>
        ))}
      </ul>
      {events.map(({ timestamp, duration, zone }: Event) => {
        const { top, left, width, height } = zone;
        const isShowRectangle = currentTime >= timestamp && currentTime <= timestamp + duration;

        return (
          isShowRectangle && (
            <div
              key={timestamp}
              className={styles.video_rectangle}
              style={{ top, left, width, height }}
            />
          )
        );
      })}
    </div>
  );
};

export default App;
