import React, { useState } from "react";
import styles from "./maincomponent.module.css";
import TopBar from "./Components/Topbar/topbar";
import Artist from "../../Assets/Images/artist.png";
import MusicPlayer from "./Components/Player/player";
import MusicCard from "./Components/MusicCard/musicCard";
import { Howl } from "howler";
import songs from "../../data";

export default function MainContent() {
  const [selectedSong, setSelectedSong] = useState({
    data: songs[0],
    curridx: 0,
    totalsongs: songs.length
  });
  const [currentSound, setCurrentSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songid, setSongId] = useState(null);
  const [selectedCard, setSelectedCard] = useState();
  const [seconds, setSeconds] = useState(0);

  const playSong = (song, idx) => {
    if (currentSound) {
      currentSound.stop(songid);
    }
    const sound = new Howl({
      src: [song],
      html5: true,
      onend: function() {
        setIsPlaying(false);
        setSeconds(0);
        console.log("Finished!");
      }
    });
    const id = sound.play();
    setCurrentSound(sound);
    setIsPlaying(true);
    setSongId(id);
  };

  const PlayNextSong = () => {
    if (selectedSong.curridx < selectedSong.totalsongs - 1) {
      const nextidx = selectedSong.curridx + 1;
      setSelectedCard(nextidx);
      setSelectedSong({
        ...selectedSong,
        data: songs[nextidx],
        curridx: nextidx
      });
      setSeconds(0);
      playSong(songs[nextidx].path);
    }
  };

  const PlayPreviousSong = () => {
    if (selectedSong.curridx > 0) {
      const previousidx = selectedSong.curridx - 1;
      setSelectedCard(previousidx);
      setSelectedSong({
        ...selectedSong,
        data: songs[previousidx],
        curridx: previousidx
      });
      setSeconds(0);
      playSong(songs[previousidx].path);
    }
  };

  const ShuffleSong = () => {
    let randomNumber = Math.floor(Math.random() * 10);
    setSelectedCard(randomNumber);
    setSelectedSong({
      ...selectedSong,
      data: songs[randomNumber],
      curridx: randomNumber
    });
    playSong(songs[randomNumber].path);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <TopBar />
        <img src={Artist} alt="artist" className={styles.artist} />
        <MusicCard
          setIsPlaying={setIsPlaying}
          playSong={playSong}
          isPlaying={isPlaying}
          setSelectedSong={setSelectedSong}
          selectedCard={selectedCard}
          setSelectedCard={setSelectedCard}
          setSeconds={setSeconds}
        />
      </div>

      <MusicPlayer
        sound={currentSound}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        songid={songid}
        selectedSong={selectedSong}
        PlayNextSong={PlayNextSong}
        PlayPreviousSong={PlayPreviousSong}
        ShuffleSong={ShuffleSong}
        seconds={seconds}
        setSeconds={setSeconds}
      />
    </div>
  );
}
