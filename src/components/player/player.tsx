import useSound from 'use-sound';
import { memo, useEffect, useRef, useState } from 'react';
import s from './player.module.scss';
import PlayDirectionIcon from '../../assets/play-direction.svg';
import PauseIcon from '../../assets/pause.svg';
import PlayIcon from '../../assets/play.svg';
import { Slider } from '../slider/slider';
import Image from 'next/image';

type PlayerProps = {
  initialPlaying: boolean;
};

const Player = (props: PlayerProps) => {
  const { initialPlaying } = props;
  const [isPlaying, setIsPlaying] = useState(initialPlaying);
  const [play, { pause, duration, sound }] = useSound('/compress.mp3', { loop: true });
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
    if (initialPlaying) {
      play();
      setIsPlaying(true);
    } else {
      pause();
      setIsPlaying(false);
    }
  }, [initialPlaying, play, pause]);

  useEffect(() => {
    if (!isPlaying || !sound || isDraggingRef.current) return;
    const interval = setInterval(() => {
      if (isDraggingRef.current) return;
      setCurrTime(sound.seek([]));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isPlaying, sound, isDraggingRef.current]);

  const setStartSong = () => {
    sound.seek([0]);
    setCurrTime(0);
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
          <Image
            src={'/song-cover.webp'}
            alt='Обложка песни'
            fill
            sizes='(max-width: 567px) 53px, 32px'
          />
        </div>
        <div className={'fullWidthCentered ' + s.playerWithoutCover}>
          <div className={s.songInfo}>
            <span className={s.songTitle}>Coming home from mercury</span>
            <span className={s.author}>Petite Météorite</span>
          </div>
          <div className={s.controlPanel}>
            <button onClick={setStartSong} aria-label={'Предыдущий трек'}>
              <PlayDirectionIcon />
            </button>
            <button
              onClick={handlePlayingButtonClick}
              className={s.btnPlay}
              aria-label={isPlaying ? 'Пауза' : 'Слушать'}
            >
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>
            <button className={s.btnNext} onClick={setStartSong} aria-label={'Следующий трек'}>
              <PlayDirectionIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Player);
