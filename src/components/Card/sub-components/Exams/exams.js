import React, { useContext, useEffect, useState } from "react";
import styles from "./exams.module.scss";
import {
  Ders,
  Download,
  Info,
  User,
  DateIcon,
  Clock,
  PdfDownload,
  GreenTip,
  PlusCircleSolid,
  EditSolid,
  TrashSolid,
  Down,
} from "../../../../icons";
import AlertBox from "../../../Alert/alert";
import {
  ConvertDate,
  ConvertTime,
  getMonthNumber,
  createBySpaceNumberArray,
  createByNumberArray,
  months,
} from "../../../../utils/utils";
import teacherAvatar from "../../../../assets/images/teacherAvatar.png";
import {
  GetSchedulesDownloadLink,
  GetToken,
  GetAllExams,
  GetAllCourses,
  CreateExam,
  UpdateExam,
  getAllClass,
  DeleteExam,
} from "../../../../actions/action";
import Modal from "../../../Modal/modal";
import Input from "../../../Input/input";
import Button from "../../../Button/button";
export default function Schedule({ scheduleData, teachersData, classInfo }) {
  const token = GetToken();
  const [allExams, setAllExams] = useState([]);
  const [modalType, setModalType] = useState("");
  const [isActive, setIsActive] = useState("");
  const [classId, setClassId] = useState("");
  const [examId, setExamId] = useState("");
  useEffect(() => {
    GetAllExams(token).then((data) => {
      setAllExams(data);
    });
  }, []);
  return (
    <div className={styles.schedule}>
      <div className={styles.topSide}>
        <div className={styles.title}>Sınav Takvimi</div>
        <div
          onClick={() => {
            setIsActive(true);
            setModalType("add");
          }}
          className={styles.feedback}
        >
          <PlusCircleSolid className={styles.feedbackIcon} />
          <div className={styles.feedbackTitle}>Yeni Sınıf Oluştur</div>
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
              <DateIcon
                className={`${styles.scheduleTitlesIcon} ${styles.date}`}
              />
              <td className={styles.tarih}>Tarih</td>
            </div>
            <div className={styles.scheduleTitles}>
              <Clock className={styles.scheduleTitlesIcon} />
              <td>Saat</td>
            </div>
            <div className={styles.scheduleTitles}>
              <Clock className={styles.scheduleTitlesIcon} />
              <td>Düzenle ve Sil</td>
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
                  <td>{ConvertDate(item.date)}</td>
                  <td>{ConvertTime(item.date, item.duration)}</td>
                  <td className={styles.space}>
                    <EditSolid
                      onClick={() => {
                        setClassId(item.class._id);
                        setExamId(item._id);
                        setModalType("edit");
                        setIsActive(true);
                      }}
                      className={styles.editIcon}
                    />
                    <TrashSolid
                      onClick={() => {
                        // // deleteUser(token, item._id);
                        DeleteExam(token, item.class._id, item._id).then(
                          (item) => {
                            window.location.reload();
                          }
                        );
                      }}
                      className={styles.deleteIcon}
                    />
                  </td>
                </tr>
              );
            })
          ) : (
            <div>data yok</div>
          )}
        </table>
      </div>
      <Modal isActive={isActive} setIsActive={setIsActive}>
        <RenderModalContent
          isActive={isActive}
          setIsActive={setIsActive}
          type={modalType}
          classId={classId}
          setClassId={setClassId}
          examId={examId}
          teachersData={teachersData}
        />
      </Modal>
    </div>
  );
}
const real = Date;
function RenderModalContent({
  type,
  isActive,
  examId,
  setClassId,
  setIsActive,
  classId,
  teachersData,
}) {
  const [updatingClassName, setUpdatingClassName] = useState("");
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [gender, setGender] = useState("");
  const [classesData, setClassesData] = useState([]);
  const [classesDropdownIsActive, setClassesDropdonActive] = useState();
  const [className, setClassName] = useState("Sınıf Seçiniz");
  const [dropdownActive1, setDropdownActive1] = useState();
  const [dropdownActive2, setDropdownActive2] = useState();
  const [dropdownActive3, setDropdownActive3] = useState();
  const [hourDropdownActive, setHourDropdownActive] = useState();
  const [minDropdownActive, setMinDropdownActive] = useState();
  const [courseDropdownActive, setCourseDropdownActive] = useState();
  const [dropdownName, setDropdownName] = useState("Gün");
  const [dropdownName1, setDropdownName1] = useState("Ay");
  const [dropdownName2, setDropdownName2] = useState("Yıl");
  const [courseDropdown, setCourseDropdown] = useState("Ders Seçiniz");
  const [hourDropdown, setHourDropdown] = useState("Saat");
  const [minDropdown, setMinDropdown] = useState("Dakika");
  const [monthName, setMonthName] = useState("Mayıs");
  const [examDuration, setExamDuration] = useState("");
  const [dayName, setDayName] = useState("");
  const [instructorId, setInstructorId] = useState("");
  const [year, setYear] = useState("");
  // const [year, setYear] = useState("");
  const [courseData, setCourseData] = useState([]);
  const [courseId, setCourseId] = useState("");
  const token = GetToken();
  const d = new Date();
  const daysArray = getMonthNumber(monthName);
  const getYears = createBySpaceNumberArray(
    d.getFullYear(),
    d.getFullYear() + 3
  );
  const getHours = createByNumberArray(24);
  const getMin = createByNumberArray(59);
  useEffect(() => {
    GetAllCourses(token).then((data) => {
      setCourseData(data);
    });
    getAllClass(token, 100, 1).then((data) => {
      setClassesData(data);
    });
  }, []);
  if (type === "edit" || type === "add")
    return (
      <>
        <div>
          <div
            id={"classDropdown"}
            onClick={() => {
              setDropdownActive2(!dropdownActive2);
            }}
            className={styles.dropdown}
          >
            <div id={"dropdownName"} className={styles.dropdownName}>
              <Down id={"dropdownIcon"} className={styles.downIcon} />
              {dropdownName1}
            </div>
            <div
              className={`${styles.dropdownContent}  ${
                dropdownActive2 ? styles.active : ""
              }`}
              onClick={() => {}}
            >
              {months.map((item) => {
                return (
                  <div
                    onClick={() => {
                      setDropdownName1(item);
                      setMonthName(item);
                      // if (item.name === "Erkek") setGender("male");
                      // else if (item.name === "Kız") setGender("female");
                    }}
                    className={styles.dropdownItems}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
          </div>
          <div
            id={"classDropdown"}
            onClick={() => setDropdownActive1(!dropdownActive1)}
            className={`${styles.dropdown} ${styles.dayzz}`}
          >
            <div id={"dropdownName"} className={styles.dropdownName}>
              <Down id={"dropdownIcon"} className={styles.downIcon} />
              {dropdownName}
            </div>
            <div
              className={`${styles.dropdownContent}  ${
                dropdownActive1 ? styles.active : ""
              }`}
              onClick={() => {}}
            >
              {daysArray.map((item) => {
                return (
                  <div
                    onClick={() => {
                      setDropdownName(item);
                      setDayName(item);
                      // if (item.name === "Erkek") setGender("male");
                      // else if (item.name === "Kız") setGender("female");
                    }}
                    className={styles.dropdownItems}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
          </div>
          <div
            id={"classDropdown"}
            onClick={() => setDropdownActive3(!dropdownActive3)}
            className={`${styles.dropdown} ${styles.hour}`}
          >
            <div id={"dropdownName"} className={styles.dropdownName}>
              <Down id={"dropdownIcon"} className={styles.downIcon} />
              {dropdownName2}
            </div>
            <div
              className={`${styles.dropdownContent}  ${
                dropdownActive3 ? styles.active : ""
              }`}
              onClick={() => {}}
            >
              {getYears.map((item) => {
                return (
                  <div
                    onClick={() => {
                      setDropdownName2(item);
                      setYear(item);
                      // if (item.name === "Erkek") setGender("male");
                      // else if (item.name === "Kız") setGender("female");
                    }}
                    className={styles.dropdownItems}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <Input
          placeholder="Sınav süresini giriniz"
          value={lastname}
          onChange={(e) => {
            setLastname();
            setExamDuration(e.target.value);
          }}
          inputStyle={"modal"}
        />
        <div>
          <div
            id={"classDropdown"}
            onClick={() => setHourDropdownActive(!hourDropdownActive)}
            className={`${styles.dropdown} ${styles.hour}`}
          >
            <div id={"dropdownName"} className={styles.dropdownName}>
              <Down id={"dropdownIcon"} className={styles.downIcon} />
              {hourDropdown}
            </div>
            <div
              className={`${styles.dropdownContent}  ${
                hourDropdownActive ? styles.active : ""
              }`}
              onClick={() => {}}
            >
              {getHours.map((item) => {
                return (
                  <div
                    onClick={() => {
                      setHourDropdown(item);
                      // if (item.name === "Erkek") setGender("male");
                      // else if (item.name === "Kız") setGender("female");
                    }}
                    className={styles.dropdownItems}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
          </div>
          :
          <div
            id={"classDropdown"}
            onClick={() => setMinDropdownActive(!minDropdownActive)}
            className={`${styles.dropdown} ${styles.hour}`}
          >
            <div id={"dropdownName"} className={styles.dropdownName}>
              <Down id={"dropdownIcon"} className={styles.downIcon} />
              {minDropdown}
            </div>
            <div
              className={`${styles.dropdownContent}  ${
                minDropdownActive ? styles.active : ""
              }`}
              onClick={() => {}}
            >
              {getMin.map((item) => {
                return (
                  <div
                    onClick={() => {
                      setMinDropdown(item);
                      // if (item.name === "Erkek") setGender("male");
                      // else if (item.name === "Kız") setGender("female");
                    }}
                    className={styles.dropdownItems}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* <Input
          placeholder=""
          onChange={(e) => setUsername(e.target.value)}
          inputStyle={"modal"}
        /> */}
        <div
          id={"classDropdown"}
          onClick={() => setCourseDropdownActive(!courseDropdownActive)}
          className={`${styles.dropdown} ${styles.classes}`}
        >
          <div
            id={"dropdownName"}
            className={`${styles.dropdownName} ${styles.course}`}
          >
            <Down id={"dropdownIcon"} className={styles.downIcon} />
            {courseDropdown}
          </div>
          <div
            className={`${styles.dropdownContent}  ${
              courseDropdownActive ? styles.active : ""
            }
            `}
            onClick={() => {}}
          >
            {courseData.data?.data.map((item) => {
              return (
                <div
                  onClick={() => {
                    setCourseDropdown(item.name);
                    setCourseId(item._id);
                  }}
                  className={styles.dropdownItems}
                >
                  {item.name}
                </div>
              );
            })}
          </div>
        </div>
        {type == "add" ? (
          <div
            id={"classDropdown"}
            onClick={() => setClassesDropdonActive(!classesDropdownIsActive)}
            className={styles.dropdown}
          >
            <div
              id={"dropdownName"}
              className={`${styles.dropdownName} ${styles.course}`}
            >
              <Down id={"dropdownIcon"} className={styles.downIcon} />
              {className}
            </div>
            <div
              className={`${styles.dropdownContent}  ${
                classesDropdownIsActive ? styles.active : ""
              }
            `}
              onClick={() => {}}
            >
              {classesData.data?.data.map((item) => {
                return (
                  <div
                    onClick={() => {
                      setClassName(item.name);
                      setClassId(item._id);
                    }}
                    className={styles.dropdownItems}
                  >
                    {item.name}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          ""
        )}

        <Button
          type={"modal"}
          title={"Ekle"}
          onClick={() => {
            console.log(
              year,
              months[months.indexOf(monthName)],
              dayName,
              hourDropdown,
              minDropdown
            );
            const d = new Date(
              year,
              months.indexOf(monthName),
              dayName,
              hourDropdown,
              minDropdown
            );
            if (type === "add") {
              CreateExam(token, classId, d, examDuration, courseId).then(() => {
                // window.location.reload();
              });
            } else {
              UpdateExam(
                token,
                classId,
                examId,
                d,
                examDuration,
                courseId
              ).then(() => {});
            }
            setIsActive(false);
          }}
        />
      </>
    );
  else if (type === "add") {
    return (
      <>
        <Input
          // value={addAnnouncementsTitle}
          placeholder="Adı giriniz"
          onChange={(e) => setFirstname(e.target.value)}
          inputStyle={"modal"}
        />
        <Input
          // value={addAnnouncementsTitle}
          placeholder="Soyadı giriniz"
          onChange={(e) => setLastname(e.target.value)}
          inputStyle={"modal"}
        />
        <Input
          // value={addAnnouncementsTitle}
          placeholder="E-posta giriniz"
          onChange={(e) => setUsername(e.target.value)}
          inputStyle={"modal"}
        />
        <Input
          // value={addAnnouncementsTitle}
          placeholder="Telefon Numarası giriniz"
          onChange={(e) => setPhone(e.target.value)}
          inputStyle={"modal"}
        />
        {/* <Input
          // value={addAnnouncementsTitle}
          placeholder="Cinsiyeti giriniz"
          onChange={(e) => setGender(e.target.value)}
          inputStyle={"modal"}
        /> */}
        <div
          id={"classDropdown"}
          onClick={() => setDropdownActive1(!dropdownActive1)}
          className={styles.dropdown}
        >
          <div id={"dropdownName"} className={styles.dropdownName}>
            <Down id={"dropdownIcon"} className={styles.downIcon} />
            {dropdownName}
          </div>
          <div
            className={`${styles.dropdownContent}  ${
              dropdownActive1 ? styles.active : ""
            }`}
            onClick={() => {}}
          >
            {[{ name: "Erkek" }, { name: "Kız" }].map((item) => {
              return (
                <div
                  onClick={() => {
                    setDropdownName(item.name);
                    if (item.name === "Erkek") setGender("male");
                    else if (item.name === "Kız") setGender("female");
                  }}
                  className={styles.dropdownItems}
                >
                  {item.name}
                </div>
              );
            })}
          </div>
        </div>
        {/* <Input
          // value={addAnnouncementsTitle}
          placeholder="Rolünü giriniz (admin, öğrenci, öğretmen)"
          onChange={(e) => setRole(e.target.value)}
          inputStyle={"modal"}
        /> */}
        <Button
          type={"modal"}
          title={"Ekle"}
          onClick={() => {
            setIsActive(false);
          }}
        />
      </>
    );
  } else return <></>;
}

// function getTeacherName(teachersData, code) {
//   let teacherName = "sadas";

//   if (teachersData && teachersData !== null) {
//     teacherName = teachersData.map((item) => {
//       if (item.course.code === code && item.instructor !== null) {
//         return `${item.instructor.first_name} ${item.instructor.last_name}`;
//       }
//     });
//     return teacherName;
//   } else return "Mustafa Karahan";
// }
// function getTeacherAvatar(teachersData, code) {
//   let teacherProfile = "";

//   if (teachersData && teachersData !== null) {
//     teacherProfile = teachersData.map((item) => {
//       if (item.course.code === code && item.instructor !== null) {
//         return item.instructor.profile_photo;
//       }
//     });
//     return teacherProfile;
//   } else return teacherAvatar;
// }
