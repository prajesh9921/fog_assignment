import React, { useState } from "react";
import styles from "./musicCard.module.css";
import Album1 from "../../../../Assets/Images/album.png";
import { IoMusicalNotesSharp } from "react-icons/io5";
import { Droppable, Draggable } from "react-beautiful-dnd";

export default function MusicCard({
  playSong,
  setIsPlaying,
  isPlaying,
  setSelectedSong,
  selectedCard,
  setSelectedCard,
  setSeconds,
  songs
}) {
  const handleSelectedCard = (idx, item) => {
    setSelectedCard(idx);
    setIsPlaying(true);
    playSong(item?.path, idx);
    setSelectedSong({ data: item, curridx: idx, totalsongs: songs.length });
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

          <Droppable droppableId="musictable">
            {(provided, snapshot) => (
              <tbody
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={styles.tablebody}
              >
                {songs.map((item, index) => (
                  <Draggable
                    key={index}
                    draggableId={index.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <tr
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className={styles.tablerow}
                        style={{
                          backgroundColor: snapshot.isDragging
                            ? "yellow"  // Change this to the color you want when dragging
                            : selectedCard === index
                            ? "#520000"
                            : "transparent",    // Color when not selected or dragging
                          ...provided.draggableProps.style, // Keep the original dragging style
                        }}
                        onClick={() => handleSelectedCard(index, item)}
                      >
                        {selectedCard === index ? (
                          <div className={styles.selected} />
                        ) : null}
                        <td
                          className={styles.tablerowsr}
                          style={{
                            paddingLeft: selectedCard === index && "3rem",
                          }}
                        >
                          {selectedCard === index && isPlaying ? (
                            <IoMusicalNotesSharp size={24} color="#fff" />
                          ) : (
                            index + 1
                          )}
                          <img
                            src={Album1}
                            alt="album"
                            className={styles.albumimg}
                          />
                        </td>
                        <td
                          className={styles.title}
                          style={{
                            paddingLeft: selectedCard === index && "3rem",
                          }}
                        >
                          {item.name}
                        </td>
                        <td className={styles.playing}>
                          {selectedCard === index && isPlaying ? "Yes" : "No"}
                        </td>
                        <td className={styles.time}>{item.duration}</td>
                        <td className={styles.album}>{item.album}</td>
                      </tr>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </tbody>
            )}
          </Droppable>
        </table>
      </div>
    </div>
  );
}
