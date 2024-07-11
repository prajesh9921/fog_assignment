import React, { useState, useEffect, useRef } from "react";
import { IoPause } from "react-icons/io5";
import { LuRepeat, LuRepeat1 } from "react-icons/lu";
import { FaStepBackward, FaStepForward, FaPlay } from "react-icons/fa";
import { FaShuffle } from "react-icons/fa6";
import styles from "./player.module.css";

export default function MusicPlayer({
  sound,
  isPlaying,
  setIsPlaying,
  songid,
  selectedSong,
  PlayNextSong,
  PlayPreviousSong,
  ShuffleSong,
  seconds,
  setSeconds
}) {
  const [repeat, setRepeat] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(
    () => {
      let interval = null;

      if (isPlaying) {
        interval = setInterval(() => {
          if (seconds < parseInt(selectedSong.data.seconds)) {
            setSeconds(prevSeconds => prevSeconds + 1);
          } else {
            clearInterval(interval);
          }
        }, 1000);
      }

      return () => {
        // setSeconds(0);
        clearInterval(interval);
      };
    },
    [isPlaying, seconds]
  );

  const Play = () => {
    if (sound) {
      sound.play(songid);
      setIsPlaying(true);
    }
  };

  const Pause = () => {
    if (sound) {
      sound.pause(songid);
      setIsPlaying(false);
    }
  };

  const LoopSong = () => {
    if (repeat) {
      setRepeat(false);
      sound.loop([false], [songid]);
    } else {
      setRepeat(true);
      sound.loop([true], [songid]);
    }
  };

  const handleSliderChange = e => {
    let seektime = 0;
    seektime = parseFloat(e.target.value);
    setSeconds(seektime);
    sound.seek(seektime, songid);
  };

  // const getTime = () => {
  //   let totalSeconds = sound.duration(songid);
  //   let minutes = Math.floor(totalSeconds / 60);
  //   let seconds = totalSeconds % 60;
  //   return `${minutes}:${seconds.toFixed(0)}`;
  // };

  const formatTime = totalSeconds => {
    const minutes = Math.floor(totalSeconds / 60)
      .toFixed(0)
      .toString()
      .padStart(2, "0");
    const seconds = (totalSeconds % 60).toFixed(0).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className={styles.component}>
      <h4 className={styles.playingnow}>Playing Now</h4>
      <img className={styles.musicCover} src="https://picsum.photos/200/200" />
      <div>
        <h3 className={styles.title}>
          {selectedSong.data.name || "Title"}
        </h3>
        <p className={styles.subTitle}>
          {selectedSong.data.album || "Album"}
        </p>
      </div>

      <div className={styles.indicator}>
        <p>
          {formatTime(seconds)}
        </p>
        <input
          type="range"
          min="0"
          max={sound ? sound.duration() : selectedSong.data.seconds}
          step="0.1"
          className={styles.range}
          value={seconds}
          onChange={handleSliderChange}
        />
        <p>
          {selectedSong.data.duration}
        </p>
      </div>

      <div className={styles.controlbuttons}>
        {repeat
          ? <LuRepeat1
              onClick={LoopSong}
              size={24}
              color="#fff"
              className={styles.btns}
            />
          : <LuRepeat
              onClick={LoopSong}
              size={24}
              color="#fff"
              className={styles.btns}
            />}
        <FaStepBackward
          onClick={PlayPreviousSong}
          size={24}
          color="#fff"
          className={styles.btns}
        />
        <div className={styles.playbtn}>
          {isPlaying
            ? <IoPause
                onClick={Pause}
                size={24}
                color="#fff"
                className={styles.btns}
              />
            : <FaPlay
                onClick={Play}
                size={24}
                color="#fff"
                className={styles.btns}
              />}
        </div>
        <FaStepForward
          onClick={PlayNextSong}
          size={24}
          color="#fff"
          className={styles.btns}
        />
        <FaShuffle
          onClick={ShuffleSong}
          size={24}
          color="#fff"
          className={styles.btns}
        />
      </div>
    </div>
  );
}
