import React from "react";
import styles from "./dropdown.module.scss";
export default function Dropdown({
  children,
  teacher,
  lessonName,
  startingTime,
  endTime,
  avatar,
  type = "syllabus",
}) {
  return <RenderDropdown type={type} />;
}

function RenderDropdown(props) {
  const {
    children,
    teacher,
    lessonName,
    startingTime,
    endTime,
    avatar,
    type = "syllabus",
  } = props;
  if (type === "syllabus") {
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
  } else if (type === "select") {
    return "";
  }
}
