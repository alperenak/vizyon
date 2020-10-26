import React from "react";
import styles from "./dropdown.module.scss";
export default function Dropdown({
  children,
  teacher,
  lessonName,
  startingTime,
  endTime,
  avatar,
}) {
  return (
    <div className={styles.dropdown}>
      {children}
      <div className={styles.dropdownContent}>
        <div className={styles.avatar}>
          <img src={avatar} />
        </div>
        <div className={styles.lessonInformation}>
          <div className={styles.teacher}>{teacher}</div>
          <div className={styles.lessonName}>{lessonName}</div>
        </div>
        <div className={styles.lessonHours}>
          <div className={styles.first}>{startingTime}</div>
          <div className={styles.second}>{endTime}</div>
        </div>
      </div>
    </div>
  );
}
