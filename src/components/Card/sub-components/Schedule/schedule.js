import React, { useState } from "react";
import styles from "./schedule.module.scss";
import {
  Ders,
  Download,
  User,
  DateIcon,
  Clock,
  PdfDownload,
  GreenTip,
  ChevronRightSolid,
  ChevronLeftSolid,
} from "../../../../icons";
import AlertBox from "../../../Alert/alert";
import { ConvertDate, ConvertTime } from "../../../../utils/utils";
import teacherAvatar from "../../../../assets/images/teacherAvatar.png";
import {
  GetSchedulesDownloadLink,
  GetSchedulesPdfDownloadLink,
  GetToken,
} from "../../../../actions/action";

export default function Schedule({ scheduleData, teachersData, classInfo }) {
  const token = GetToken();
  const d = new Date();
  const [tablePagination] = useState([
    { start: 0, end: 2 },
    { start: 2, end: 4 },
    { start: 4, end: 5 },
  ]);
  const [schedulePageNum, setSchedulePageNum] = useState(1);
  const staticTitleData = [
    {
      title: "Öğretmen",
      titleStyle: styles.ogretmen,
      icon: <User className={`${styles.scheduleTitlesIcon} ${styles.user}`} />,
    },
    {
      title: "Dersin Adı",
      titleStyle: "",
      icon: <Ders className={styles.scheduleTitlesIcon} />,
    },
    {
      title: "Tarih",
      titleStyle: styles.tarih,
      icon: (
        <DateIcon className={`${styles.scheduleTitlesIcon} ${styles.date}`} />
      ),
    },
    {
      title: "Saat",
      titleStyle: "",
      icon: <Clock className={styles.scheduleTitlesIcon} />,
    },
  ];
  return (
    <div className={styles.schedule}>
      <div className={styles.topSide}>
        <div className={styles.title}>Sınav Takvimi</div>
        <div
          className={styles.downloadSyllabusPdf}
          onClick={() =>
            GetSchedulesPdfDownloadLink(token, classInfo._id).then((item) =>
              window.open(item.data.data[0])
            )
          }
        >
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
      </div>
      <div className={styles.scheduleTitlesSection}>
        <RenderResponsiveTitles
          titleData={staticTitleData}
          schedulePageNum={schedulePageNum}
          tablePagination={tablePagination}
        />
        <table className={styles.scheduleTitlesTable}>
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
              <DateIcon
                className={`${styles.scheduleTitlesIcon} ${styles.date}`}
              />
              <td className={styles.tarih}>Tarih</td>
            </div>
            <div className={styles.scheduleTitles}>
              <Clock className={styles.scheduleTitlesIcon} />
              <td>Saat</td>
            </div>
          </tr>
        </table>
      </div>
      <RenderArrow
        type={"left"}
        onClick={() => {
          if (schedulePageNum > 1) setSchedulePageNum(schedulePageNum - 1);
        }}
      />
      <RenderArrow
        type={"right"}
        onClick={() => {
          if (schedulePageNum < 2) setSchedulePageNum(schedulePageNum + 1);
        }}
      />
      <div className={styles.scheduleSection}>
        <table>
          {scheduleData && scheduleData !== null ? (
            scheduleData.map((item, index) => {
              return (
                <tr key={index}>
                  <div className={styles.scheduleTeacher}>
                    <div className={styles.avatar}>
                      <img
                        src={String(
                          getTeacherAvatar(teachersData, item.course.code)
                        ).replace(/,/gi, "")}
                      />
                    </div>
                    <td>{getTeacherName(teachersData, item.course.code)}</td>
                  </div>
                  <td>
                    {item.course.name
                      ? `${item.course.name} Öğretmeni`
                      : "none"}
                  </td>
                  <td>{ConvertDate(item.date)}</td>
                  <td>{ConvertTime(item.date, item.duration)}</td>
                </tr>
              );
            })
          ) : (
            <div>data yok</div>
          )}
        </table>
      </div>
      <AlertBox
        title={`Yukarıdaki sınav takvimi **${d.getFullYear()} / ${
          d.getFullYear() + 1
        } Eğitim - Öğretim Yılı**’nın ilk yarısına kadar geçerlidir.`}
        type={"primary"}
      >
        <GreenTip className={styles.greenTip} />
      </AlertBox>
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
function RenderResponsiveTitles({
  titleData = [],
  schedulePageNum,
  tablePagination,
}) {
  return (
    <table className={styles.responsiveTitles}>
      <tr className={styles.scheduleTitlesRow}>
        {titleData
          .slice(
            tablePagination[schedulePageNum - 1].start,
            tablePagination[schedulePageNum - 1].end
          )
          .map((item, index) => {
            return (
              <div className={styles.scheduleTitles} key={index}>
                {item.icon}
                <td className={item.titleStyle}>{item.title}</td>
              </div>
            );
          })}
      </tr>
    </table>
  );
}
export function RenderArrow({ type, onClick }) {
  return (
    <div className={`${styles.responsiveArrowWrapper} ${styles[type]}`}>
      <div onClick={onClick} className={styles.responsiveArrow}>
        {type === "left" ? (
          <ChevronLeftSolid className={styles.arrowIcon} />
        ) : type === "right" ? (
          <ChevronRightSolid className={styles.arrowIcon} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
