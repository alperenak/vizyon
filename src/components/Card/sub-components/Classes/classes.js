import React, { useEffect, useState } from "react";
import styles from "./classes.module.scss";
import Background from "../../../../assets/images/classroom.jpg";
import { Edit, MessageCheck, Exam } from "../../../../icons";
import AlertBox from "../../../Alert/alert";
import { months } from "../../../../utils/utils";
export default function Classes({
  name,
  classroomName,
  avatar,
  scheduleDate,
  newMessagesCount,
}) {
  const [firstExamDate, setFirstExamDate] = useState(false);
  useEffect(() => {
    const data = scheduleDate.map((item) => {
      const d = new Date(item);
      const getDateCount = d.getDate();
      const getMonthCount = d.getMonth();
      const getYearCount = d.getFullYear();
      return {
        dayCount: getDateCount,
        monthCount: getMonthCount,
        yearCount: getYearCount,
      };
    });
    setFirstExamDate(
      data
        .sort((a, b) => a.yearCount - b.yearCount)
        .sort((a, b) => a.monthCount - b.monthCount)
        .sort((a, b) => a.dayCount - b.dayCount)
    );
  }, []);

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
          title={`${
            newMessagesCount && newMessagesCount !== 0
              ? `Okunmamış **${newMessagesCount}** mesajınız var`
              : newMessagesCount && newMessagesCount === 0
              ? "Okunmamış mesajınız bulunmamaktadır"
              : "Mesaj bilgisi bulunamadı"
          }`}
          type={"tertiary"}
          size={"small"}
        >
          <MessageCheck className={styles.MessageCheckIcon} />
        </AlertBox>
        <AlertBox
          title={`${
            firstExamDate &&
            firstExamDate?.dayCount &&
            firstExamDate?.monthCount &&
            firstExamDate?.yearCount
              ? `Sonraki sınavın **${
                  firstExamDate && firstExamDate[0]?.dayCount
                    ? firstExamDate[0]?.dayCount
                    : ""
                } ${
                  firstExamDate && firstExamDate[0]?.monthCount
                    ? months[firstExamDate[0]?.monthCount]
                    : ""
                }  ${
                  firstExamDate && firstExamDate[0]?.yearCount
                    ? firstExamDate[0]?.yearCount
                    : ""
                }**’de.`
              : "Sınav bilgisi bulunamamaktadır"
          }`}
          type={"primary"}
          size={"small"}
        >
          <Exam className={styles.ExamIcon} />
        </AlertBox>
      </div>
    </div>
  );
}
