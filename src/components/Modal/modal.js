import React from "react";
import styles from "./modal.module.scss";

export default function Modal({ children, isActive, setIsActive }) {
  const modal = document.getElementById("modal");
  window.onclick = function (e) {
    if (e.target === modal) {
      setIsActive(false);
      console.log("modal", e.target === modal);
    }
  };
  return (
    <div
      id={"modal"}
      className={`${styles.modalContainer} ${isActive ? styles.active : ""}`}
    >
      <div id={"modalCard"} className={styles.modalCard}>
        {children}
      </div>
    </div>
  );
}
