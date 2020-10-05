import React from "react";
import styles from "./classes.module.scss";
import Background from "../../../../assets/images/classroom.jpg";
import ClassroomTeacher from "../../../../assets/images/classroomTeacher.png";
import { CheckSolid, Edit, MessageCheck, Exam } from "../../../../icons";
import AlertBox from "../../../Alert/alert";
export default function Classes({ name, classroomName, avatar, background }) {
  return (
    <div className={styles.classesCard}>
      <div className={styles.classBackground}>
        <img src={Background} />
      </div>
      <div className={styles.teacherAvatarBackground}>
        <div className={styles.teacherAvatar}>
          <img src={avatar} />
          <Edit className={styles.editIcon} />
        </div>
      </div>
      <div className={styles.name}>{name}</div>
      <div className={styles.classroomName}>{classroomName}</div>
      <div className={styles.alertboxes}>
        <AlertBox
          title={"Sonraki sınavın **17 Eylül 2020**’de."}
          type={"tertiary"}
          size={"small"}
        >
          <MessageCheck className={styles.MessageCheckIcon} />
        </AlertBox>
        <AlertBox
          title={"Sonraki sınavın **17 Eylül 2020**’de."}
          type={"primary"}
          size={"small"}
        >
          <Exam className={styles.ExamIcon} />
        </AlertBox>
      </div>
    </div>
  );
}
