import React from "react";
import { CheckSolid } from "../../icons";
import styles from "./checkbox.module.scss";

export default function CheckBox({ title, isActive, onClick }) {
  return (
    <div className={styles.checkBoxContainer}>
      <div
        onClick={onClick}
        className={`${styles.checkBox} ${isActive ? "" : styles.disable}`}
      >
        {isActive ? <CheckSolid className={styles.icon} /> : <></>}
      </div>
      <div className={styles.checkBoxTitle}>{title}</div>
    </div>
  );
}
