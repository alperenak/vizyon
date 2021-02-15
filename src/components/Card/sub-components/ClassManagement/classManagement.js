import React, { useEffect, useState } from "react";
import styles from "./classManagement.module.scss";
import {
  Ders,
  User,
  PlusCircleSolid,
  EditSolid,
  TrashSolid,
  Down,
} from "../../../../icons";
import Modal from "../../../Modal/modal";
import Input from "../../../Input/input";
import Button from "../../../Button/button";
import {
  addClass,
  deleteClass,
  getAllClass,
  getAllTeachersV2,
  GetToken,
  updateClass,
} from "../../../../actions/action";
import teacherAvatar from "../../../../assets/images/teacherAvatar.png";
export default function ClassManagement({
  filterClass,
  classData,
  setClassData,
  setLoading,
  setAlertData,
  setAlertboxActive,
  setDisplayClass,
}) {
  const [isActive, setIsActive] = useState(false);
  const [modalType, setModalType] = useState(false);
  const [classId, setClassId] = useState(false);
  const [teachersData, setTeachersData] = useState([]);
  const token = GetToken();

  function updateClassFunction() {
    setLoading(true);
    setDisplayClass("");
    getAllClass(token, 100, 1, "name,grade")
      .then((data) => {
        setClassData(data.data.data);
      })
      .then(() => setLoading(false))
      .catch(() => {
        setLoading(false);
        setAlertboxActive(true);
        setAlertData({ type: "error", title: "Sınıflar getirilemedi" });
      });
  }

  useEffect(() => {
    getAllTeachersV2(token).then((data) => {
      setTeachersData(data.data.data);
    });
  }, [filterClass]);
  return (
    <div className={styles.schedule}>
      <div className={styles.topSide}>
        <div className={styles.title}>Sınıf Yönetimi</div>
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
              <Ders className={`${styles.scheduleTitlesIcon} ${styles.user}`} />
              <td className={styles.ogretmen}>Sınıf Adı</td>
            </div>

            <div className={styles.scheduleTitles}>
              <User className={`${styles.scheduleTitlesIcon}`} />
              <td>Düzenle</td>
            </div>
            <div className={styles.scheduleTitles}>
              <User className={`${styles.scheduleTitlesIcon}`} />
              <td>Sil</td>
            </div>
          </tr>
        </table>
      </div>

      <div className={styles.scheduleSection}>
        <table>
          {classData && classData !== null ? (
            classData.map((item, index) => {
              return (
                <tr
                  key={index}
                  onClick={() => {
                    setClassId(item._id);
                  }}
                >
                  <div className={styles.scheduleTeacher}>
                    <div className={styles.avatar}>
                      <img src={teacherAvatar} />
                    </div>
                    <td>{item.name}</td>
                  </div>

                  <td className={styles.space}>
                    <EditSolid
                      onClick={() => {
                        setClassId(item._id);
                        setModalType("edit");
                        setIsActive(true);
                      }}
                      className={styles.editIcon}
                    />
                  </td>
                  <td className={styles.space}>
                    <TrashSolid
                      onClick={() => {
                        setLoading(true);
                        deleteClass(token, item._id)
                          .then(() => {
                            setLoading(false);
                            updateClassFunction();
                            setAlertboxActive(true);
                            setAlertData({
                              type: "success",
                              title: "Sınıf başarıyla silindi",
                            });
                          })
                          .catch(() => {
                            setLoading(false);
                            setAlertboxActive(true);
                            setAlertData({
                              type: "error",
                              title: "Sınıf silinemedi",
                            });
                          });
                      }}
                      className={styles.deleteIcon}
                      style={{ marginLeft: 50 }}
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
          setLoading={setLoading}
          teachersData={teachersData}
          setAlertboxActive={setAlertboxActive}
          setAlertData={setAlertData}
          updateClassFunction={updateClassFunction}
        />
      </Modal>
    </div>
  );
}

function RenderModalContent({
  type,
  setIsActive,
  classId,
  teachersData,
  updateClassFunction,
  setAlertboxActive,
  setAlertData,
  setLoading,
}) {
  const [updatingClassName, setUpdatingClassName] = useState("");
  const [dropdownActive, setDropdownActive] = useState("");
  const [dropdownName, setDropdownName] = useState("Öğretmen Seçiniz");
  const [instructorId, setInstructorId] = useState("");
  const token = GetToken();
  if (type === "edit")
    return (
      <div
        style={{
          padding: 25,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h3>Sınıf Adı</h3>
        <Input
          placeholder="Sınıfın adını giriniz"
          onChange={(e) => setUpdatingClassName(e.target.value)}
          inputStyle={"detail"}
        />

        <Button
          type={"modal"}
          title={"Güncelle"}
          onClick={() => {
            setIsActive(false);
            setLoading(true);
            updateClass(token, classId, updatingClassName)
              .then(() => {
                updateClassFunction();
                setAlertboxActive(true);
                setAlertData({
                  type: "success",
                  title: "Sınıf başarıyla güncellendi",
                });
              })
              .catch(() => {
                setLoading(false);
                setAlertboxActive(true);
                setAlertData({ type: "error", title: "Sınıf güncellenemedi" });
              });
          }}
        />
      </div>
    );
  else if (type === "add") {
    return (
      <div
        style={{
          padding: 25,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h3>Sınıf Öğretmeni</h3>
        <div
          id={"teacherDropdown"}
          onClick={() => setDropdownActive(!dropdownActive)}
          className={styles.dropdown}
        >
          <div id={"dropdownName"} className={styles.dropdownName}>
            <Down id={"dropdownIcon"} className={styles.downIcon} />
            {dropdownName}
          </div>
          <div
            className={`${styles.dropdownContent}  ${
              dropdownActive ? styles.active : ""
            }`}
            onClick={() => {}}
          >
            {teachersData.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    setDropdownName(`${item.first_name} ${item.last_name}`);
                    setInstructorId(item.id);
                  }}
                  className={styles.dropdownItems}
                >
                  {`${item.first_name} ${item.last_name}`}
                </div>
              );
            })}
          </div>
        </div>
        <h3>Sınıf adı</h3>
        <Input
          placeholder="Sınıfın adını giriniz"
          onChange={(e) => setUpdatingClassName(e.target.value)}
          inputStyle={"detail"}
        />
        <Button
          type={"modal"}
          title={"Oluştur"}
          onClick={() => {
            setLoading(true);
            setIsActive(false);
            addClass(token, instructorId, updatingClassName)
              .then(() => {
                updateClassFunction();
                setAlertboxActive(true);
                setAlertData({
                  type: "success",
                  title: "Sınıf başarıyla eklendi",
                });
              })
              .catch(() => {
                setLoading(false);
                setAlertboxActive(true);
                setAlertData({ type: "error", title: "Sınıf eklenemedi" });
              });
          }}
        />
      </div>
    );
  } else return <></>;
}
