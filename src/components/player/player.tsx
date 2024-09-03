import useSound from 'use-sound';
import { useEffect, useRef, useState } from 'react';
import Sound from '../../assets/compress.mp3';
import s from './player.module.scss';
import PlayDirectionIcon from '../../assets/play-direction.svg';
import PauseIcon from '../../assets/pause.svg';
import PlayIcon from '../../assets/play.svg';
import { Slider } from '../slider/slider';
import Image from 'next/image';

export const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [play, { pause, duration, sound }] = useSound(Sound);
  const [currTime, setCurrTime] = useState(0);

  const isDraggingRef = useRef(false);

  const handlePlayingButtonClick = () => {
    if (isPlaying) {
      pause();
      setIsPlaying(false);
    } else {
      play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (!isPlaying || !sound || isDraggingRef.current) return;

    const interval = setInterval(() => {
      setCurrTime(sound.seek([]));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isPlaying, sound, isDraggingRef.current]);

  const tempSetStartSong = () => {
    sound.seek([0]);
  };

  return (
    <div className={s.player}>
      <div className={s.slider}>
        <Slider
          key={!isDraggingRef.current ? currTime : 'slider'}
          rootProps={{
            max: duration ? duration / 1000 : undefined,
            defaultValue: [currTime],
            onValueCommit: (value) => {
              sound.seek([value[0]]);
              setCurrTime(value[0]);
              isDraggingRef.current = false;
            },
            onValueChange: () => {
              isDraggingRef.current = true;
            },
          }}
        />
      </div>
      <div className={s.playerWithoutSlider}>
        <div className={s.cover}>
        <Image src={"/song-cover.png"} alt='Обложка песни' fill/>
      </div>
        <div className={s.playerWithoutCover}>
          <div className={s.songInfo}>
            <span className={s.songTitle}>Chaff & Dust</span>
            <span className={s.author}>HYONNA</span>
          </div>
          <div className={s.controlPanel}>
            <button onClick={tempSetStartSong} aria-label={'Предыдущий трек'}>
              <PlayDirectionIcon />
            </button>
            <button
              onClick={handlePlayingButtonClick}
              className={s.btnPlay}
              aria-label={isPlaying ? 'Пауза' : 'Слушать'}
            >
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>
            <button className={s.btnNext} onClick={tempSetStartSong} aria-label={'Следующий трек'}>
              <PlayDirectionIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
