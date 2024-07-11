import React from "react";
import styles from "./topbar.module.css";
import { LiaSearchSolid } from "react-icons/lia";

export default function TopBar() {
  return (
    <div className={styles.container}>
      <a href="." className={styles.topbaritems}>Music</a>
      <a href="." className={styles.topbaritems}>Podcast</a>
      <a href="." className={styles.topbaritems}>Live</a>
      <a href="." className={styles.topbaritems}>Radio</a>
      <div className={styles.inputBox}>
        <input type="text" className={styles.input} placeholder="Michael Jackson"/>
        <LiaSearchSolid color="#fff" size={24}/>
      </div>
    </div>
  );
}
