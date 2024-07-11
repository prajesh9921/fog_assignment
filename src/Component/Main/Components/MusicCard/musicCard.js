import React, { useState } from "react";
import styles from "./musicCard.module.css";
import Album1 from "../../../../Assets/Images/album.png";
import songs from "../../../../data";
import { IoMusicalNotesSharp } from "react-icons/io5";

export default function MusicCard({
  playSong,
  setIsPlaying,
  isPlaying,
  setSelectedSong,
  selectedCard,
  setSelectedCard,
  setSeconds
}) {
  const handleSelectedCard = (idx, item) => {
    setSelectedCard(idx);
    setIsPlaying(true);
    playSong(item?.path, idx);
    setSelectedSong({data: item, curridx: idx, totalsongs: songs.length});
    setSeconds(0);
  };

  return (
    <div>
      <div className={styles.topheading}>
        <p>Popular</p>
        <p>See All</p>
      </div>
      <div className={styles.tablewrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.hash}>#</th>
              <th className={styles.title}>Title</th>
              <th className={styles.playing}>Playing</th>
              <th className={styles.time}>Time</th>
              <th className={styles.album}>Album</th>
            </tr>
          </thead>
          <tbody className={styles.tablebody}>
            {songs.map((item, index) =>
              <tr
                key={index}
                className={styles.tablerow}
                style={{
                  backgroundColor:
                    selectedCard === index ? "#520000" : "transparent"
                }}
                onClick={() => handleSelectedCard(index, item)}
              >
                {selectedCard === index
                  ? <div className={styles.selected} />
                  : null}
                <td
                  className={styles.tablerowsr}
                  style={{ paddingLeft: selectedCard === index && "3rem" }}
                >
                  {selectedCard === index && isPlaying ? <IoMusicalNotesSharp size={24} color="#fff"/> : (index + 1)}
                  <img src={Album1} alt="album" className={styles.albumimg} />
                </td>
                <td
                  className={styles.title}
                  style={{ paddingLeft: selectedCard === index && "3rem" }}
                >
                  {item.name}
                </td>
                <td className={styles.playing}>
                  {selectedCard === index && isPlaying ? "Yes" : "No"}
                </td>
                <td className={styles.time}>
                  {item.duration}
                </td>
                <td className={styles.album}>
                  {item.album}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
