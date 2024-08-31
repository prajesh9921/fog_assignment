import React, { useState } from "react";
import styles from "./maincomponent.module.css";
import TopBar from "./Components/Topbar/topbar";
import Artist from "../../Assets/Images/artist.png";
import MusicPlayer from "./Components/Player/player";
import MusicCard from "./Components/MusicCard/musicCard";
import { Howl } from "howler";
import songs from "../../data";
import { DragDropContext } from "react-beautiful-dnd";

export default function MainContent() {
  const [songsList, setSongsList] = useState(songs)
  const [selectedSong, setSelectedSong] = useState({
    data: songsList[0],
    curridx: 0,
    totalsongs: songsList.length,
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
      onend: function () {
        setIsPlaying(false);
        setSeconds(0);
        console.log("Finished!");
      },
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
        data: songsList[nextidx],
        curridx: nextidx,
      });
      setSeconds(0);
      playSong(songsList[nextidx].path);
    }
  };

  const PlayPreviousSong = () => {
    if (selectedSong.curridx > 0) {
      const previousidx = selectedSong.curridx - 1;
      setSelectedCard(previousidx);
      setSelectedSong({
        ...selectedSong,
        data: songsList[previousidx],
        curridx: previousidx,
      });
      setSeconds(0);
      playSong(songsList[previousidx].path);
    }
  };

  const ShuffleSong = () => {
    let randomNumber = Math.floor(Math.random() * 10);
    setSelectedCard(randomNumber);
    setSelectedSong({
      ...selectedSong,
      data: songsList[randomNumber],
      curridx: randomNumber,
    });
    playSong(songsList[randomNumber].path);
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const temp = JSON.parse(JSON.stringify(songsList));
    const item = temp.splice(result.source.index, 1);
    temp.splice(result.destination.index, 0, item[0]);
    setSongsList(temp);
  }

  return (
    <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
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
            songs={songsList}
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
    </DragDropContext>
  );
}
