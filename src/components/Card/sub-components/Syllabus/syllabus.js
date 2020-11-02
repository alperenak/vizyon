import React from "react";
import styles from "./syllabus.module.scss";
import { Download, Info, PdfDownload, Xls, YellowTip } from "../../../../icons";
import Dropdown from "../../../Dropdown/dropdown";
import TeacherAvatar from "../../../../assets/images/teacherAvatar.png";
import AlertBox from "../../../Alert/alert";
import { sumTimes } from "../../../../utils/utils";
import { GetSyllabusDownloadLink, GetToken } from "../../../../actions/action";
export default function Syllabus({ syllabusData, classInfo }) {
  console.log("syllabu", syllabusData);
  console.log("classInfo", classInfo);
  let date = new Date();
  let weekDays = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma"];
  let daysData = getDayData(weekDays);
  const token = GetToken();
  return (
    <div className={styles.SyllabusCard}>
      <div className={styles.topSide}>
        <div className={styles.title}>Ders Programı</div>
        <div className={styles.downloadSyllabusPdf}>
          <div className={styles.formatXLS}>
            <PdfDownload className={styles.formatIcon} />
            <div className={styles.formatName}>PDF</div>
          </div>
          <div className={styles.downloadTitle}>Ders Programını İndir</div>
        </div>
        <div className={styles.title}>Ders Programı</div>
        <div
          className={styles.downloadSyllabus}
          onClick={() => {
            GetSyllabusDownloadLink(token, classInfo._id).then((item) =>
              window.open(item.data.data[0])
            );
          }}
        >
          <div className={styles.formatXLS}>
            <Download className={styles.formatIcon} />
            <div className={styles.formatName}>XLS</div>
          </div>
          <div className={styles.downloadTitle}>Ders Programını İndir</div>
        </div>
        {/*
        <div className={styles.feedback}>
          <Info className={styles.feedbackIcon} />
          <div className={styles.feedbackTitle}>Sorun Bildir</div>
        </div>
        */}
      </div>
      <div className={styles.weekDaysContainer}>
        {syllabusData && syllabusData !== null ? (
          getDayData().map((item) => {
            return (
              <div className={styles.dayLabel}>
                <div className={`${styles.dayCircle} ${styles[item.color]}`}>
                  {item.day}
                </div>
                <div className={styles.dayName}> {item.dayName}</div>
              </div>
            );
          })
        ) : (
          <div>data yok</div>
        )}
      </div>
      <div className={styles.Lessons}>
        {syllabusData && syllabusData !== null ? (
          syllabusData.slice(0, 5).map((item) => {
            return (
              <table>
                {item.periods.slice(0, 6).map((item, index) => {
                  return (
                    <tr>
                      <div className={styles.lessonLabelWrapper}>
                        <Dropdown
                          teacher={getTeacherName(item)}
                          lessonName={getLessonName(item.course)}
                          startingTime={getLessonTime(item).startingTime}
                          avatar={getTeacherAvatar(item.instructor)}
                          endTime={getLessonTime(item).endingTime}
                        >
                          <div
                            className={`${styles.lessonLabel} ${
                              styles[`lbl${getColor(item.course)}`]
                            }`}
                          >
                            <td className={styles[getColor(item.course)]}>
                              {getLessonName(item.course)}
                            </td>
                            <span>{getTeacherName(item)}</span>
                          </div>
                        </Dropdown>
                      </div>
                    </tr>
                  );
                })}
              </table>
            );
          })
        ) : (
          <div>data yok</div>
        )}
      </div>
      <AlertBox
        title={
          "Yukarıdaki ders programı **2020 / 2021 Eğitim - Öğretim Yılı**’nın ilk yarısına kadar geçerlidir."
        }
        type={"secondary"}
      >
        <YellowTip className={styles.yellowTip} />
      </AlertBox>
    </div>
  );
}

function getLessonName(course) {
  if (course !== null && course && course.name) {
    return course.name;
  } else return "ingilizce";
}
function getTeacherName(item) {
  if (
    item.instructor !== null &&
    item.instructor &&
    item.instructor.first_name &&
    item.instructor.last_name
  ) {
    return `${item.instructor.first_name} ${item.instructor.last_name}`;
  } else if (
    item.class &&
    item.class !== null &&
    item.class.name &&
    item.class.name !== null
  ) {
    return item.class.name;
  } else return "";
}
function getLessonTime(course) {
  if (course !== null && course && course.startsAt && course.endsAt) {
    return { startingTime: course.startsAt, endingTime: course.endsAt };
  } else {
    return { startingTime: "none", endingTime: "none" };
  }
  // const end = sumTimes(`${String(Number(startingTime) * index + 1)}0`, periods);
  // return { start: String(Number(startingTime) * index + 1), end: end };
}

function getTeacherAvatar(instructor) {
  if (instructor !== null && instructor && instructor.profile_photo) {
    return instructor.profile_photo;
  } else return TeacherAvatar;
}

function getColor(course) {
  if (course !== null && course && course.name) {
    if (course.name === "Matematik") {
      return color[4];
    } else if (
      course.name.includes("Fen Bilimleri") ||
      course.name.includes("Fen Bilgisi")
    ) {
      return color[0];
    } else if (course.name.includes("Beden Eğitimi")) {
      return color[1];
    } else if (course.name.includes("İngilizce")) {
      return color[3];
    } else if (course.name.includes("Görsel Sanatlar")) {
      return color[2];
    } else if (course.name.includes("Tarihi")) {
      return color[3];
    } else if (course.name.includes("Türkçe")) {
      return color[1];
    } else if (course.name.includes("Bilgiler")) {
      return color[4];
    } else return color[Math.floor(Math.random() * 4)];
  } else return "none";
}
const color = ["green", "red", "blue", "yellow", "purple"];

const fakeData = [
  {
    day: "Pazartesi",
    lessons: [
      {
        teacher: "Mustafa Ulusoy",
        color: color[4],
        lessonName: "Matematik",
        startingTime: "8.00",
        avatar: TeacherAvatar,
        endTime: "10.00",
      },
      {
        teacher: "Fatih Kalender",
        color: color[0],
        lessonName: "Fen Bilimleri",
        startingTime: "10.00",
        avatar: TeacherAvatar,
        endTime: "12.00",
      },
      {
        teacher: "Alperen Karagüzel",
        color: color[1],
        lessonName: "Beden Eğitimi",
        startingTime: "12.00",
        avatar: TeacherAvatar,
        endTime: "14.00",
      },
      {
        teacher: "Alperen Karagüzel",
        color: color[0],
        lessonName: "Fizik",
        startingTime: "14.00",
        avatar: TeacherAvatar,
        endTime: "16.00",
      },
    ],
  },
  {
    day: "Salı",
    lessons: [
      {
        teacher: "Alperen Karagüzel",
        color: color[1],
        lessonName: "Beden Eğitimi",
        startingTime: "8.00",
        avatar: TeacherAvatar,
        endTime: "10.00",
      },
      {
        teacher: "Alperen Karagüzel",
        color: color[1],
        lessonName: "Beden Eğitimi",
        startingTime: "10.00",
        avatar: TeacherAvatar,
        endTime: "12.00",
      },
      {
        teacher: "Fatih Kalender",
        color: color[0],
        lessonName: "Fen Bilimleri",
        startingTime: "12.00",
        avatar: TeacherAvatar,
        endTime: "14.00",
      },
      {
        teacher: "Fatih Kalender",
        color: color[0],
        lessonName: "Fen Bilimleri",
        startingTime: "14.00",
        avatar: TeacherAvatar,
        endTime: "16.00",
      },
    ],
  },
  {
    day: "Çarşamba",
    lessons: [
      {
        teacher: "Fatih Kalender",
        color: color[0],
        lessonName: "Fen Bilimleri",
        startingTime: "8.00",
        avatar: TeacherAvatar,
        endTime: "10.00",
      },
      {
        teacher: "Fatih Kalender",
        color: color[0],
        lessonName: "Fen Bilimleri",
        startingTime: "10.00",
        avatar: TeacherAvatar,
        endTime: "12.00",
      },
      {
        teacher: "Mustafa Ulusoy",
        color: color[4],
        lessonName: "Matematik",
        startingTime: "12.00",
        avatar: TeacherAvatar,
        endTime: "14.00",
      },
      {
        teacher: "Mustafa Ulusoy",
        color: color[4],
        lessonName: "Matematik",
        startingTime: "14.00",
        avatar: TeacherAvatar,
        endTime: "16.00",
      },
    ],
  },
  {
    day: "Perşembe",
    lessons: [
      {
        teacher: "Alperen Karagüzel",
        color: color[0],
        lessonName: "Fizik",
        startingTime: "8.00",
        avatar: TeacherAvatar,
        endTime: "10.00",
      },
      {
        teacher: "Alperen Karagüzel",
        color: color[0],
        lessonName: "Fizik",
        startingTime: "10.00",
        avatar: TeacherAvatar,
        endTime: "12.00",
      },
      {
        teacher: "Mustafa Ulusoy",
        color: color[4],
        lessonName: "Matematik",
        startingTime: "12.00",
        avatar: TeacherAvatar,
        endTime: "14.00",
      },
      {
        teacher: "Mustafa Ulusoy",
        color: color[4],
        lessonName: "Matematik",
        startingTime: "14.00",
        avatar: TeacherAvatar,
        endTime: "16.00",
      },
    ],
  },
  {
    day: "Cuma",
    lessons: [
      {
        teacher: "Alperen Karagüzel",
        color: color[2],
        lessonName: "Kimya",
        startingTime: "8.00",
        avatar: TeacherAvatar,
        endTime: "10.00",
      },
      {
        teacher: "Alperen Karagüzel",
        color: color[2],
        lessonName: "Kimya",
        startingTime: "10.00",
        avatar: TeacherAvatar,
        endTime: "12.00",
      },
      {
        teacher: "Alperen Karagüzel",
        color: color[0],
        lessonName: "Görsel Sanatlar",
        startingTime: "12.00",
        avatar: TeacherAvatar,
        endTime: "14.00",
      },
      {
        teacher: "Alperen Karagüzel",
        color: color[0],
        lessonName: "Müzik",
        startingTime: "14.00",
        avatar: TeacherAvatar,
        endTime: "16.00",
      },
    ],
  },
];

function getDayData() {
  let arr = [];
  days.slice(1, 6).map((item, index) => {
    arr.push({
      dayName: item,
      day: findDayNumber(item),
      color: color[index],
    });
  });
  return arr;
}

const date = new Date();

function getDay(day, month) {
  let arr = [];
  const d = new Date();
  const todayDayName = days[d.getDay()];
  const todayDay = d.getDay();
  const todayDayCount = d.getDate();
  const todayMonth = d.getMonth() + 1;
  const pastMonth = d.getMonth() !== 0 ? d.getMonth() : 12;
  const futureMonth = d.getMonth() + 2 !== 13 ? d.getMonth() : 1;
  const getDayCount = days.indexOf(day) - todayDay + todayDayCount;
}

const days = [
  "Pazar",
  "Pazartesi",
  "Salı",
  "Çarşamba",
  "Perşembe",
  "Cuma",
  "Cumartesi",
];
const d = new Date();

function findDayNumber(day) {
  const propDayNumber = days.indexOf(day);
  const nowDayNumber = d.getDay();
  const spaceDayNonAbs = nowDayNumber - propDayNumber;
  const dayCount = d.getDate();
  console.log(spaceDayNonAbs);
  if (spaceDayNonAbs > 0) {
    console.log("çıkarma kısmında");
    return subtractNowDay(spaceDayNonAbs);
  } else if (spaceDayNonAbs === 0) return dayCount;
  else if (spaceDayNonAbs < 0) {
    console.log("toplama kisminda");
    return sumNowDay(spaceDayNonAbs);
  }
}

function subtractNowDay(num) {
  const lastMonthName = months[d.getMonth() - 1 >= 0 ? d.getMonth() - 1 : 11];
  const dayCount = d.getDate();
  const result = dayCount - num;
  if (result < 0) {
    return getMonthNumber(lastMonthName) + result;
  } else return result;
}
function sumNowDay(num) {
  const nowMonthName = months[d.getMonth()];
  const dayCount = d.getDate();
  const result = dayCount - num;
  console.log("result", result, getMonthNumber(nowMonthName));
  if (result > getMonthNumber(nowMonthName)) {
    console.log(result, getMonthNumber(nowMonthName));
    return result - getMonthNumber(nowMonthName);
  } else return result;
}
const months = [
  "Ocak",
  "Şubat",
  "Mart",
  "Nisan",
  "Mayıs",
  "Haziran",
  "Temmuz",
  "Ağustos",
  "Eylül",
  "Ekim",
  "Kasım",
  "Aralık",
];

export function getMonthNumber(month = "Nisan") {
  const thirdyOne = [
    "Ocak",
    "Mart",
    "Mayıs",
    "Temmuz",
    "Ağustos",
    "Ekim",
    "Aralık",
  ];
  if (thirdyOne.includes(month)) {
    return 31;
  } else if (month === "Şubat") {
    if (date.getFullYear() % 4 === 0) {
      return 29;
    } else return 28;
  } else return 30;
}

function fakeGetDay(day) {
  if (day === "Pazartesi") return 5;
  else if (day === "Salı") return 6;
  else if (day === "Çarşamba") return 7;
  else if (day === "Perşembe") return 8;
  else if (day === "Cuma") return 9;
}
