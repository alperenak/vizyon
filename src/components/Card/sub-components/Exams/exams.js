import React, { useEffect, useState } from "react";
import styles from "./exams.module.scss";
import {
  Ders,
  User,
  DateIcon,
  Clock,
  PlusCircleSolid,
  EditSolid,
  TrashSolid,
  Down,
} from "../../../../icons";
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
  GetToken,
  GetAllCourses,
  CreateExam,
  UpdateExam,
  getAllClass,
  DeleteExam,
  GetAllExams,
} from "../../../../actions/action";
import Modal from "../../../Modal/modal";
import Input from "../../../Input/input";
import Button from "../../../Button/button";
export default function Schedule({
  teachersData,
  allExams,
  setAllExams,
  setLoading,
  setAlertData,
  setAlertboxActive,
}) {
  const token = GetToken();
  const [modalType, setModalType] = useState("");
  const [isActive, setIsActive] = useState("");
  const [classId, setClassId] = useState("");
  const [examId, setExamId] = useState("");

  function updateExamsFunction() {
    setLoading(true);
    GetAllExams(token)
      .then((data) => {
        setAllExams(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setAlertboxActive(true);
        setAlertData({ type: "error", title: "Sınavlar getirilemedi" });
      });
  }

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
          <div className={styles.feedbackTitle}>Sınav Oluştur</div>
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
            allExams.data.data.map((item, index) => {
              return (
                <tr key={index}>
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
                        setLoading(true);
                        DeleteExam(token, item.class._id, item._id)
                          .then(() => {
                            updateExamsFunction();
                            setAlertboxActive(true);
                            setAlertData({
                              type: "success",
                              title: "Sınav başarıyla silindi",
                            });
                          })
                          .catch(() => {
                            setLoading(false);
                            setAlertboxActive(true);
                            setAlertData({
                              type: "error",
                              title: "Sınav silinemedi",
                            });
                          });
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
          updateExamsFunction={updateExamsFunction}
          setAlertData={setAlertData}
          setAlertboxActive={setAlertboxActive}
          setLoading={setLoading}
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
function RenderModalContent({
  type,
  examId,
  setClassId,
  setIsActive,
  classId,
  setAlertData,
  updateExamsFunction,
  setLoading,
  setAlertboxActive,
}) {
  const [lastname, setLastname] = useState("");
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
  const [year, setYear] = useState("");
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
    getAllClass(token, 100, 1, "name").then((data) => {
      setClassesData(data);
    });
  }, []);
  if (type === "edit" || type === "add")
    return (
      <div
        style={{
          padding: 25,
          display: "flex",
          alignItems: "flex-start",
          flexDirection: "column",
          paddingBottom: 0,
        }}
      >
        <h3>Sınav zamanı</h3>
        <div>
          <div
            id={"classDropdown"}
            onClick={() => {
              setDropdownActive2(!dropdownActive2);
              setDropdownActive1(false);
              setDropdownActive3(false);
              setMinDropdownActive(false);
              setCourseDropdownActive(false);
              setClassesDropdonActive(false);
              setHourDropdownActive(false);
            }}
            className={`${styles.dropdown} ${styles.dayzz}`}
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
              {months.map((item, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      setDropdownName1(item);
                      setMonthName(item);
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
            onClick={() => {
              setDropdownActive2(false);
              setDropdownActive3(false);
              setMinDropdownActive(false);
              setHourDropdownActive(false);
              setCourseDropdownActive(false);
              setClassesDropdonActive(false);
              setDropdownActive1(!dropdownActive1);
            }}
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
              {daysArray.map((item, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      setDropdownName(item);
                      setDayName(item);
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
            onClick={() => {
              setDropdownActive2(false);
              setDropdownActive1(false);
              setCourseDropdownActive(false);
              setClassesDropdonActive(false);
              setMinDropdownActive(false);
              setHourDropdownActive(false);
              setDropdownActive3(!dropdownActive3);
            }}
            className={`${styles.dropdown} ${styles.dayzz}`}
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
              {getYears.map((item, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      setDropdownName2(item);
                      setYear(item);
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
        <h3>Sınav süresi (dk)</h3>
        <Input
          placeholder="Sınav süresini giriniz"
          value={lastname}
          onChange={(e) => {
            setLastname();
            setExamDuration(e.target.value);
          }}
          inputStyle={"detail"}
        />
        <h3>Sınav saati</h3>
        <div>
          <div
            id={"classDropdown"}
            onClick={() => {
              setDropdownActive2(false);
              setCourseDropdownActive(false);
              setClassesDropdonActive(false);
              setDropdownActive1(false);
              setMinDropdownActive(false);
              setDropdownActive3(false);
              setHourDropdownActive(!hourDropdownActive);
            }}
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
              {getHours.map((item, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      setHourDropdown(item);
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
            onClick={() => {
              setDropdownActive2(false);
              setDropdownActive1(false);
              setHourDropdownActive(false);
              setCourseDropdownActive(false);
              setClassesDropdonActive(false);
              setDropdownActive3(false);
              setMinDropdownActive(!minDropdownActive);
            }}
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
              {getMin.map((item, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      setMinDropdown(item);
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
        <h3>Dersler</h3>
        <div
          id={"classDropdown"}
          onClick={() => {
            setDropdownActive2(false);
            setDropdownActive1(false);
            setHourDropdownActive(false);
            setMinDropdownActive(false);
            setClassesDropdonActive(false);
            setDropdownActive3(false);
            setCourseDropdownActive(!courseDropdownActive);
          }}
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
            {courseData.data?.data.map((item, index) => {
              return (
                <div
                  key={index}
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
          <>
            <h3>Sınıflar</h3>
            <div
              id={"classDropdown"}
              onClick={() => {
                setDropdownActive2(false);
                setDropdownActive1(false);
                setHourDropdownActive(false);
                setMinDropdownActive(false);
                setCourseDropdownActive(false);
                setDropdownActive3(false);
                setClassesDropdonActive(!classesDropdownIsActive);
              }}
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
                {classesData.data?.data.map((item, index) => {
                  return (
                    <div
                      key={index}
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
          </>
        ) : (
          ""
        )}

        <Button
          type={"modal"}
          title={type === "add" ? "Sınav oluştur" : "Güncelle"}
          onClick={() => {
            const d = new Date(
              year,
              months.indexOf(monthName),
              dayName,
              hourDropdown,
              minDropdown
            );
            if (type === "add") {
              setLoading(true);
              CreateExam(token, classId, d, examDuration, courseId)
                .then(() => {
                  updateExamsFunction();
                  setAlertboxActive(true);
                  setAlertData({
                    type: "success",
                    title: "Sınav başarıyla eklendi",
                  });
                })
                .catch(() => {
                  setLoading(false);
                  setAlertboxActive(true);
                  setAlertData({
                    type: "error",
                    title: "Sınav eklenemedi",
                  });
                });
            } else {
              setLoading(true);
              UpdateExam(token, classId, examId, d, examDuration, courseId)
                .then(() => {
                  updateExamsFunction();
                  setAlertboxActive(true);
                  setAlertData({
                    type: "success",
                    title: "Sınav başarıyla güncellendi",
                  });
                })
                .catch(() => {
                  setLoading(false);
                  setAlertboxActive(true);
                  setAlertData({
                    type: "error",
                    title: "Sınav eklenemedi",
                  });
                });
            }
            setIsActive(false);
          }}
        />
      </div>
    );
  else return "";
}
