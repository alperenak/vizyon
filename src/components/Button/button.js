import React from "react";
import styles from "./button.module.scss";

export default function Button({ title, type, onClick }) {
  return (
    <div className={`${styles.button} ${styles[type]}`} onClick={onClick}>
      {title}
    </div>
  );
}
