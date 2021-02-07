import React, { useState } from "react";
import styles from "./syllabus.module.scss";
import {
  ChevronLeftSolid,
  ChevronRightSolid,
  Download,
  PdfDownload,
  YellowTip,
} from "../../../../icons";
import Dropdown from "../../../Dropdown/dropdown";
import TeacherAvatar from "../../../../assets/images/teacherAvatar.png";
import AlertBox from "../../../Alert/alert";
import {
  GetSyllabusDownloadLink,
  GetSyllabusPdfDownloadLink,
  GetToken,
} from "../../../../actions/action";
export default function Syllabus({ syllabusData, classInfo }) {
  const [tablePagination] = useState([
    { start: 0, end: 2 },
    { start: 2, end: 4 },
    { start: 4, end: 5 },
  ]);
  const [syllabusPageNum, setSyllabusPageNum] = useState(1);
  const token = GetToken();
  return (
    <div className={styles.SyllabusCard}>
      <div className={styles.topSide}>
        <div className={styles.title}>Ders Programı</div>
        <div
          className={styles.downloadSyllabusPdf}
          onClick={() => {
            GetSyllabusPdfDownloadLink(token, classInfo._id).then((item) =>
              window.open(item.data.data[0])
            );
          }}
        >
          <div className={styles.formatXLS}>
            <PdfDownload className={styles.formatIcon} />
            <div className={styles.formatName}>PDF</div>
          </div>
          <div className={styles.downloadTitle}>Ders Programını İndir</div>
        </div>
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
          getDayData().map((item, index) => {
            return (
              <div className={styles.dayLabel} key={index}>
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
      <ResponsiveWeekDaysData
        syllabusData={syllabusData}
        syllabusPageNum={syllabusPageNum}
        tablePagination={tablePagination}
      />
      <RenderArrow
        type={"left"}
        onClick={() => {
          if (syllabusPageNum > 1) setSyllabusPageNum(syllabusPageNum - 1);
        }}
      />
      <RenderArrow
        type={"right"}
        onClick={() => {
          if (syllabusPageNum < 3) setSyllabusPageNum(syllabusPageNum + 1);
        }}
      />
      <div className={styles.Lessons}>
        {syllabusData && syllabusData !== null ? (
          syllabusData.slice(0, 5).map((item, index) => {
            return (
              <table key={index}>
                {item.periods.length !== 0
                  ? item.periods.map((item, index) => {
                      return (
                        <tr key={index}>
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
                                  {getLessonName(item.course).length > 12
                                    ? `${getLessonName(item.course).slice(
                                        0,
                                        12
                                      )}...`
                                    : getLessonName(item.course)}
                                </td>
                                <span>{getTeacherName(item)}</span>
                              </div>
                            </Dropdown>
                          </div>
                        </tr>
                      );
                    })
                  : ["", "", "", "", "", ""].map((item, index) => {
                      return (
                        <tr key={index}>
                          <div className={styles.lessonLabelWrapper}>
                            <Dropdown
                              teacher={"Bilgi bulunamadı"}
                              lessonName={""}
                              startingTime={""}
                              avatar={getTeacherAvatar(item.instructor)}
                              endTime={""}
                            >
                              <div
                                className={`${styles.lessonLabel} ${
                                  styles[`lbl${getColor(item.course)}`]
                                }`}
                              >
                                <td className={styles[getColor(item.course)]}>
                                  {getLessonName(item.course).length > 12
                                    ? `${getLessonName(item.course).slice(
                                        0,
                                        12
                                      )}...`
                                    : getLessonName(item.course)}
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
      <ResponsiveLessons
        syllabusData={syllabusData}
        syllabusPageNum={syllabusPageNum}
        tablePagination={tablePagination}
      />
      <AlertBox
        title={`Yukarıdaki ders programı **${d.getFullYear()} / ${
          d.getFullYear() + 1
        } Eğitim - Öğretim Yılı**’nın ilk yarısına kadar geçerlidir.`}
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
  } else return "Ders Boş";
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
    } else if (course.name.includes("MATEMATİK")) {
      return color[1];
    } else if (course.name.includes("İNGİLİZCE")) {
      return color[3];
    } else if (course.name.includes("COĞRAFYA")) {
      return color[4];
    } else if (course.name.includes("BİYOLOJİ")) {
      return color[0];
    } else if (course.name.includes("FİZİK")) {
      return color[2];
    } else if (course.name.includes("TÜRKÇE")) {
      return color[1];
    } else if (course.name.includes("DİLİ")) {
      return color[4];
    } else if (course.name.includes("KİMYA")) {
      return color[2];
    } else return color[Math.floor(Math.random() * 4)];
  } else return "Ders Bilgisi Bulunamadı";
}
const color = ["green", "red", "blue", "yellow", "purple"];

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
  if (spaceDayNonAbs > 0) {
    return subtractNowDay(spaceDayNonAbs);
  } else if (spaceDayNonAbs === 0) return dayCount;
  else if (spaceDayNonAbs < 0) {
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
  if (result > getMonthNumber(nowMonthName)) {
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

function ResponsiveWeekDaysData({
  syllabusData,
  tablePagination,
  syllabusPageNum,
}) {
  return (
    <div className={styles.responsiveWeekDaysContainer}>
      {syllabusData && syllabusData !== null ? (
        getDayData()
          .slice(
            tablePagination[syllabusPageNum - 1].start,
            tablePagination[syllabusPageNum - 1].end
          )
          .map((item, index) => {
            return (
              <div className={styles.dayLabel} key={index}>
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
  );
}
function ResponsiveLessons({ syllabusData, tablePagination, syllabusPageNum }) {
  return (
    <div className={styles.responsiveLessons}>
      {syllabusData && syllabusData !== null ? (
        syllabusData
          .slice(
            tablePagination[syllabusPageNum - 1].start,
            tablePagination[syllabusPageNum - 1].end
          )
          .map((item, index) => {
            return (
              <table key={index}>
                {item.periods.length !== 0
                  ? item.periods.map((item, index) => {
                      return (
                        <tr key={index}>
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
                                  {getLessonName(item.course).length > 12
                                    ? `${getLessonName(item.course).slice(
                                        0,
                                        12
                                      )}...`
                                    : getLessonName(item.course)}
                                </td>
                                <span>{getTeacherName(item)}</span>
                              </div>
                            </Dropdown>
                          </div>
                        </tr>
                      );
                    })
                  : ["", "", "", "", "", ""].map((item, index) => {
                      return (
                        <tr key={index}>
                          <div className={styles.lessonLabelWrapper}>
                            <Dropdown
                              teacher={"Bilgi bulunamadı"}
                              lessonName={""}
                              startingTime={""}
                              avatar={getTeacherAvatar(item.instructor)}
                              endTime={""}
                            >
                              <div
                                className={`${styles.lessonLabel} ${
                                  styles[`lbl${getColor(item.course)}`]
                                }`}
                              >
                                <td className={styles[getColor(item.course)]}>
                                  {getLessonName(item.course).length > 12
                                    ? `${getLessonName(item.course).slice(
                                        0,
                                        12
                                      )}...`
                                    : getLessonName(item.course)}
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
