import React from "react";
import styles from "./dropdown.module.scss";
import Selectable from "./sub-components/Selectable/selectable";
export default function Dropdown(props) {
  let {
    children,
    type,
    teacher,
    lessonName,
    startingTime,
    endTime,
    avatar,
  } = props;
  return (
    <>
      {type ? (
        <RenderDropdownForTypes {...props} />
      ) : (
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
      )}
    </>
  );
}
function RenderDropdownForTypes(props) {
  let { type } = props;
  if (type === "selectable") return <Selectable {...props} />;
  else return "hata";
}
