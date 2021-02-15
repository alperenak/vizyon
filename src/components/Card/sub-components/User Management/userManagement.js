import React, { useEffect, useState } from "react";
import styles from "./userManagement.module.scss";
import {
  Ders,
  User,
  PlusCircleSolid,
  TrashSolid,
  TimesCircleSolid,
  CheckSolidCircle,
  IconLock,
  IconUser,
} from "../../../../icons";
import Modal from "../../../Modal/modal";
import Input from "../../../Input/input";
import Button from "../../../Button/button";
import {
  CreateUser,
  deleteUser,
  getAllClass,
  getAllStudents,
  getAllTeachers,
  GetToken,
} from "../../../../actions/action";
import { useHistory } from "react-router-dom";
import Dropdown from "../../../Dropdown/dropdown";

// import teacherAvatar from "../../../../assets/images/teacherAvatar.png";
export default function UserManagement({
  tabsType,
  studentsData,
  setStudentsData,
  setTeachersData,
  setLoading,
  setAlertData,
  userPageNum,
  setAlertboxActive,
  setDisplayTeacher,
  setDisplayStudent,
  teachersData,
}) {
  const [isActive, setIsActive] = useState(false);
  const [modalType, setModalType] = useState(false);
  const [classId, setClassId] = useState(false);
  const [allTheClasses, setAllTheClasses] = useState([]);
  const history = useHistory();
  const token = GetToken();
  function updateStudents() {
    setLoading(true);
    setDisplayStudent("");
    getAllStudents(token, userPageNum, 100)
      .then((data) => {
        setStudentsData(data.data.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setAlertboxActive(true);
        setAlertData({ type: "error", title: "Öğrenciler getirilemedi" });
      });
  }

  function updateTeachers() {
    setLoading(true);
    setDisplayTeacher("");
    getAllTeachers(token, userPageNum, 100)
      .then((data) => {
        setTeachersData(data.data.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setAlertboxActive(true);
        setAlertData({ type: "error", title: "Öğretmenler getirilemedi" });
      });
  }
  function updateAllUsers() {
    updateStudents();
    updateTeachers();
  }
  useEffect(() => {
    getAllClass(token, 100, 1, "name,grade")
      .then((data) => {
        setAllTheClasses(data.data.data);
      })
      .catch(() => {
        setAlertboxActive(true);
        setAlertData({ type: "error", title: "Sınıflar getirilemedi" });
      });
  }, []);
  return (
    <div className={styles.schedule}>
      <>
        <div className={styles.topSide}>
          <div className={styles.title}>Kullanıcı Yönetimi</div>
          <div
            onClick={() => {
              setIsActive(true);
              setModalType("add");
            }}
            className={styles.feedback}
          >
            <PlusCircleSolid className={styles.feedbackIcon} />
            <div className={styles.feedbackTitle}>
              {tabsType === "student"
                ? "Yeni Öğrenci Oluştur"
                : "Yeni Öğretmen oluştur"}
            </div>
          </div>
        </div>
        <div className={styles.scheduleTitlesSection}>
          <table>
            <tr className={styles.scheduleTitlesRow}>
              <div className={styles.scheduleTitles}>
                <User
                  className={`${styles.scheduleTitlesIcon} ${styles.user}`}
                />
                <td className={styles.ogretmen}>Ad Soyad</td>
              </div>
              <div className={styles.scheduleTitles}>
                <Ders
                  className={`${styles.scheduleTitlesIcon} ${styles.editAndDelete}`}
                />
                <td>Sil</td>
              </div>
            </tr>
          </table>
        </div>
        <div className={styles.userManagementTableWrapper}>
          <div className={styles.scheduleSection}>
            <table>
              {studentsData && studentsData !== null && tabsType === "student"
                ? studentsData.map((item, index) => {
                    return (
                      <tr key={index}>
                        <div
                          onClick={() => {
                            setClassId(item._id);
                            history.push(
                              `/admin/user/${tabsType}/${
                                item.id ? item.id : item._id
                              }`
                            );
                          }}
                          className={styles.scheduleRowWrapper}
                        >
                          <div className={styles.scheduleTeacher}>
                            <div className={styles.avatar}>
                              <img src={item.profile_photo} />
                            </div>
                            <td>{`${item.first_name} ${item.last_name}`}</td>
                          </div>
                          <td>
                            {item.studentInfo
                              ? ReturnClass(
                                  allTheClasses,
                                  item.studentInfo.class &&
                                    typeof item.studentInfo.class !== "string"
                                    ? item.studentInfo.class._id
                                    : item.studentInfo.class
                                )
                              : ""}
                          </td>
                          <td className={styles.space}></td>
                        </div>
                        <td className={`${styles.space} ${styles.trashCircle}`}>
                          <TrashSolid
                            onClick={() => {
                              deleteUser(token, item._id)
                                .then(() => {
                                  updateStudents();
                                  setAlertboxActive(true);
                                  setAlertData({
                                    type: "success",
                                    title: "Kullanıcı başarıyla silindi",
                                  });
                                })
                                .catch(() => {
                                  setAlertboxActive(true);
                                  setAlertData({
                                    type: "error",
                                    title: "Kullanıcı silinemedi",
                                  });
                                });
                            }}
                            className={styles.deleteIcon}
                          />
                        </td>
                      </tr>
                    );
                  })
                : teachersData.map((item, index) => {
                    return (
                      <tr key={index}>
                        <div
                          onClick={() => {
                            setClassId(item._id);
                            history.push(
                              `/admin/user/${tabsType}/${
                                item.id ? item.id : item._id
                              }`
                            );
                          }}
                          className={styles.scheduleRowWrapper}
                        >
                          <div
                            onClick={() => {
                              setClassId(item._id);
                              history.push(
                                `/admin/user/${tabsType}/${
                                  item.id ? item.id : item._id
                                }`
                              );
                            }}
                            className={styles.scheduleRowWrapper}
                          >
                            <div className={styles.scheduleTeacher}>
                              <div className={styles.avatar}>
                                <img src={item.profile_photo} />
                              </div>
                              <td>{`${item.first_name} ${item.last_name}`}</td>
                            </div>
                            <td className={styles.space}></td>
                          </div>
                        </div>
                        <td className={`${styles.space} ${styles.trashCircle}`}>
                          <TrashSolid
                            onClick={() => {
                              setLoading(true);
                              deleteUser(token, item._id)
                                .then(() => {
                                  updateTeachers();
                                  setAlertboxActive(true);
                                  setAlertData({
                                    type: "success",
                                    title: "Kullanıcı başarıyla silindi",
                                  });
                                })
                                .catch(() => {
                                  setLoading(false);
                                  setAlertboxActive(true);
                                  setAlertData({
                                    type: "error",
                                    title: "Kullanıcı silinemedi",
                                  });
                                });
                            }}
                            className={styles.deleteIcon}
                          />
                        </td>
                      </tr>
                    );
                  })}
            </table>
          </div>
        </div>
        <Modal isActive={isActive} setIsActive={setIsActive}>
          <RenderModalContent
            isActive={isActive}
            setIsActive={setIsActive}
            type={modalType}
            classId={classId}
            tabsType={tabsType}
            setLoading={setLoading}
            updateAllUsers={updateAllUsers}
            setAlertboxActive={setAlertboxActive}
            setAlertData={setAlertData}
            allTheClasses={allTheClasses}
            teachersData={teachersData}
          />
        </Modal>
      </>
    </div>
  );
}
function ReturnClass(classes, id) {
  let classesName = "";
  classes.map((item) => {
    if (item._id === id) {
      classesName = item.name;
    }
  });
  return classesName;
}

function RenderModalContent({
  type,
  setIsActive,
  tabsType,
  allTheClasses,
  setAlertData,
  setAlertboxActive,
  setLoading,
  updateAllUsers,
}) {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [role, setRole] = useState("");
  const [classId, setClassId] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [schoolNumber, setSchoolNumber] = useState("");
  const [newPasswordAgain, setNewPasswordAgain] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [schoolName, setSchoolName] = useState(staticSchoolNames[0].value);
  const token = GetToken();
  useEffect(() => {
    if (tabsType === "student") setRole("student");
    else setRole("instructor");
  }, [tabsType]);

  if (type === "add") {
    return (
      <>
        <div className={styles.inputWrapper}>
          <div className={styles.inputCol}>
            <h3>Adı</h3>
            <Input
              placeholder="Adı giriniz"
              onChange={(e) => setFirstname(e.target.value)}
              inputStyle={"detail"}
            />
            <h3>Soyadı</h3>
            <Input
              placeholder="Soyadı giriniz"
              onChange={(e) => setLastname(e.target.value)}
              inputStyle={"detail"}
            />
            {role !== "instructor" && (
              <>
                <h3>Okul Numarası</h3>
                <Input
                  placeholder="Okul Numurasını giriniz"
                  onChange={(e) => setSchoolNumber(e.target.value)}
                  inputStyle={"detail"}
                />
                <h3>Sınıfı</h3>
                <Dropdown
                  type={"selectable"}
                  dropdownData={allTheClasses.map((item) => {
                    return {
                      value: item.name,
                      id: item.id ? item.id : item._id,
                    };
                  })}
                  value={"Sınıf Seçiniz"}
                  onClick={(e) => setClassId(e.id)}
                  zIndex
                />
              </>
            )}
            {/* <h3>Telefon Numarası</h3>
            <Input
              placeholder="Telefon Numarası giriniz"
              onChange={(e) => setPhone(e.target.value)}
              inputStyle={"detail"}
            />*/}
          </div>
          <div className={styles.inputCol}>
            {role !== "instructor" && (
              <>
                <h3>Okulu</h3>
                <Dropdown
                  type={"selectable"}
                  dropdownData={staticSchoolNames}
                  onClick={(e) => setSchoolName(e.value)}
                  zIndex={true}
                />
              </>
            )}
            <h3>E-postası</h3>
            <Input
              onChange={(e) => setUsername(e.target.value)}
              method={"changePassword"}
              type={"text"}
              placeholder={"E-postasını giriniz"}
              inputStyle={"change"}
            >
              <IconUser className={styles.modalIcon} />
            </Input>
            <h3>Şifre Oluştur</h3>
            <Input
              onChange={(e) => setNewPassword(e.target.value)}
              method={"changePassword"}
              type={"password"}
              placeholder={"Yeni Şifre"}
              inputStyle={"change"}
              value={newPassword}
            >
              <IconLock className={styles.icon} />
              {newPassword &&
              newPasswordAgain &&
              newPassword !== "" &&
              newPasswordAgain !== "" &&
              newPassword !== newPasswordAgain ? (
                <TimesCircleSolid className={styles.timesSolid} />
              ) : newPassword &&
                newPasswordAgain &&
                newPassword !== "" &&
                newPasswordAgain !== "" &&
                newPassword === newPasswordAgain ? (
                <CheckSolidCircle className={styles.checkSolid} />
              ) : (
                ""
              )}
            </Input>
            <Input
              onChange={(e) => setNewPasswordAgain(e.target.value)}
              method={"changePassword"}
              type={"password"}
              placeholder={"Yeni Şifre Tekrar"}
              inputStyle={"change"}
              value={newPasswordAgain}
            >
              <IconLock className={styles.icon} />
              {newPassword &&
              newPasswordAgain &&
              newPassword !== "" &&
              newPasswordAgain !== "" &&
              newPassword !== newPasswordAgain ? (
                <TimesCircleSolid className={styles.timesSolid} />
              ) : newPassword &&
                newPasswordAgain &&
                newPassword !== "" &&
                newPasswordAgain !== "" &&
                newPassword === newPasswordAgain ? (
                <CheckSolidCircle className={styles.checkSolid} />
              ) : (
                ""
              )}
            </Input>
            {errorMessage ? (
              <div className={styles.errorMessage}>{errorMessage}</div>
            ) : (
              ""
            )}

            {/* <h3>Cinsiyeti</h3>
            <Dropdown
              type={"selectable"}
              dropdownData={staticGenderData}
              zIndex={true}
              onClick={(e) => setGender(e)}
            /> */}
          </div>
        </div>
        <Button
          type={"modal"}
          title={
            tabsType === "student" ? "Öğrenci Oluştur" : "Öğretmen Oluştur"
          }
          onClick={() => {
            if (role === "student") {
              if (
                newPassword &&
                newPasswordAgain &&
                newPassword !== "" &&
                newPasswordAgain !== "" &&
                newPassword === newPasswordAgain
              ) {
                setLoading(true);
                let payload = {
                  first_name: firstname,
                  last_name: lastname,
                  fullName: `${firstname} ${lastname}`,
                  role: role,
                  username: username,
                  password: newPassword,
                  studentInfo: {
                    class: classId,

                    school: schoolName,
                    studentNumber: schoolNumber,
                  },
                };
                CreateUser(token, payload)
                  .then(() => {
                    updateAllUsers();
                    setAlertboxActive(true);
                    setAlertData({
                      type: "success",
                      title: "Kullanıcı başarıyla oluşturuldu",
                    });
                  })
                  .catch(() => {
                    setLoading(false);
                    setAlertboxActive(true);
                    setAlertData({
                      type: "error",
                      title: "Kullanıcı oluşturulamadı",
                    });
                  });
              } else setErrorMessage("Şifreler uyuşmuyor");
            } else if (role === "instructor") {
              if (
                newPassword &&
                newPasswordAgain &&
                newPassword !== "" &&
                newPasswordAgain !== "" &&
                newPassword === newPasswordAgain
              ) {
                setLoading(true);
                let payload = {
                  first_name: firstname,
                  last_name: lastname,
                  fullName: `${firstname} ${lastname}`,
                  role: role,
                  username: username,
                  password: newPassword,
                };
                CreateUser(token, payload)
                  .then(() => {
                    updateAllUsers();
                    setAlertboxActive(true);
                    setAlertData({
                      type: "success",
                      title: "Kullanıcı başarıyla oluşturuldu",
                    });
                  })
                  .catch(() => {
                    setLoading(false);
                    setAlertboxActive(true);
                    setAlertData({
                      type: "error",
                      title: "Kullanıcı oluşturulamadı",
                    });
                  });
                setIsActive(false);
              } else setErrorMessage("Şifreler uyuşmuyor");
            }
          }}
        />
      </>
    );
  } else return <></>;
}

const staticSchoolNames = [
  { value: "ANA OKULU", id: "1" },
  { value: "İLK OKUL", id: "2" },
  { value: "ORTA OKUL", id: "3" },
  { value: "FEN LİSESİ", id: "4" },
];
