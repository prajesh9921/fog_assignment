import React from "react";
import styles from "./navbar.module.css";
import Logo from "../../Assets/Images/Logo.png";
import Home from "../../Assets/Images/Home.png";
import Music from "../../Assets/Images/Music.png";
import Discover from "../../Assets/Images/Discover.png";
import Trend from "../../Assets/Images/Trend.png";
import Setting from "../../Assets/Images/Settings.png";
import Logout from "../../Assets/Images/Logout.png";

export default function Navbar() {
  return (
    <div className={styles.container}>
      {/* Logo and Menu */}
      <div>
        <img src={Logo} alt="logo" className={styles.logo} />

        <div className={styles.menu}>
          <p className={styles.menulabel}>MENU</p>
          <p className={styles.menutext}>
            <img className={styles.icon} src={Home} alt="home" />
            Home
          </p>

          <p className={styles.menutext}>
            <img className={styles.icon} src={Trend} alt="music" />
            Trends
          </p>

          <p className={styles.menutext}>
            <img className={styles.icon} src={Music} alt="home" />
            Library
          </p>

          <p className={styles.menutext}>
            <img className={styles.icon} src={Discover} alt="home" />
            Discover
          </p>
        </div>
      </div>

      {/* General Settings */}
      <div>
        <p className={styles.menulabel}>GENERAL</p>
        <p className={styles.menutext}>
          <img className={styles.icon} src={Setting} alt="home" />
          Settings
        </p>
        <p className={styles.menutext}>
          <img className={styles.icon} src={Logout} alt="home" />
          Logout
        </p>
      </div>
    </div>
  );
}
