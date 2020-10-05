import React from "react";
import styles from "./card.module.scss";
import Announcements from "./sub-components/Announcements/announcements";
import Classes from "./sub-components/Classes/classes";
import Schedule from "./sub-components/Schedule/schedule";
import Syllabus from "./sub-components/Syllabus/syllabus";
import Teachers from "./sub-components/Teachers/teacher";
export default function Card(props) {
  return (
    <div className={styles.cardContainer}>
      <RenderByTypes {...props} />
    </div>
  );
}

function RenderByTypes(props) {
  let { type } = props;
  if (type === "announcements") {
    return <Announcements {...props} />;
  } else if (type === "syllabus") {
    return <Syllabus {...props} />;
  } else if (type === "classes") {
    return <Classes {...props} />;
  } else if (type === "teachers") {
    return <Teachers {...props} />;
  } else if (type === "schedule") {
    return <Schedule {...props} />;
  } else {
    return <div>hata</div>;
  }
}
