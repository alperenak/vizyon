import React, { useContext, useEffect, useState } from "react";
import styles from "./exams.module.scss";
import {
  Ders,
  Download,
  Info,
  User,
  Date,
  Clock,
  PdfDownload,
  GreenTip,
} from "../../../../icons";
import AlertBox from "../../../Alert/alert";
import { ConvertDate, ConvertTime } from "../../../../utils/utils";
import teacherAvatar from "../../../../assets/images/teacherAvatar.png";
import {
  GetSchedulesDownloadLink,
  GetToken,
  GetAllExams,
} from "../../../../actions/action";
export default function Schedule({ scheduleData, teachersData, classInfo }) {
  const token = GetToken();
  const [allExams, setAllExams] = useState([]);
  useEffect(() => {
    GetAllExams(token).then((data) => {
      setAllExams(data);
    });
  });
  return (
    <div className={styles.schedule}>
      <div className={styles.topSide}>
        <div className={styles.title}>Sınav Takvimi</div>
        <div className={styles.downloadSyllabusPdf}>
          <div className={styles.formatXLS}>
            <PdfDownload className={styles.formatIcon} />
            <div className={styles.formatName}>PDF</div>
          </div>
          <div className={styles.downloadTitle}>Ders Programını İndir</div>
        </div>
        <div
          className={styles.downloadSyllabus}
          onClick={() =>
            GetSchedulesDownloadLink(token, classInfo._id).then((item) =>
              window.open(item.data.data[0])
            )
          }
        >
          <div className={styles.formatXLS}>
            <Download className={styles.formatIcon} />
            <div className={styles.formatName}>XLS</div>
          </div>
          <div className={styles.downloadTitle}>Sınav Takvimini İndir</div>
        </div>
        <div className={styles.feedback}>
          <Info className={styles.feedbackIcon} />
          <div className={styles.feedbackTitle}>Sorun Bildir</div>
        </div>
      </div>
      <div className={styles.scheduleTitlesSection}>
        <table>
          <tr className={styles.scheduleTitlesRow}>
            <div className={styles.scheduleTitles}>
              <User className={`${styles.scheduleTitlesIcon} ${styles.user}`} />
              <td className={styles.ogretmen}>Öğretmen</td>
            </div>
            <div className={styles.scheduleTitles}>
              <Ders className={styles.scheduleTitlesIcon} />
              <td>Dersin Adı</td>
            </div>
            <div className={styles.scheduleTitles}>
              <Date className={`${styles.scheduleTitlesIcon} ${styles.date}`} />
              <td className={styles.tarih}>Tarih</td>
            </div>
            <div className={styles.scheduleTitles}>
              <Clock className={styles.scheduleTitlesIcon} />
              <td>Saat</td>
            </div>
          </tr>
        </table>
      </div>
      <div className={styles.scheduleSection}>
        <table>
          {allExams.data?.data && allExams.data.data !== null ? (
            allExams.data.data.map((item) => {
              return (
                <tr>
                  <div className={styles.scheduleTeacher}>
                    <div className={styles.avatar}>
                      <img src={teacherAvatar} />
                    </div>
                    <td>{item.class.name}</td>
                  </div>
                  <td>{item.course.name}</td>
                  <td>
                    {/* {item.course.name
                      ? `${item.course.name} Öğretmeni`
                      : "none"} */}
                  </td>
                  <td>{ConvertDate(item.date)}</td>
                  <td>{ConvertTime(item.date)}</td>
                </tr>
              );
            })
          ) : (
            <div>data yok</div>
          )}
        </table>
      </div>
    </div>
  );
}

function getTeacherName(teachersData, code) {
  let teacherName = "sadas";

  if (teachersData && teachersData !== null) {
    teacherName = teachersData.map((item) => {
      if (item.course.code === code && item.instructor !== null) {
        return `${item.instructor.first_name} ${item.instructor.last_name}`;
      }
    });
    return teacherName;
  } else return "Mustafa Karahan";
}
function getTeacherAvatar(teachersData, code) {
  let teacherProfile = "";

  if (teachersData && teachersData !== null) {
    teacherProfile = teachersData.map((item) => {
      if (item.course.code === code && item.instructor !== null) {
        return item.instructor.profile_photo;
      }
    });
    return teacherProfile;
  } else return teacherAvatar;
}
