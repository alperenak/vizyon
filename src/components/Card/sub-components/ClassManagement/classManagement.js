import React, { useEffect, useState } from "react";
import styles from "./classManagement.module.scss";
import {
  Ders,
  Download,
  Info,
  User,
  Date,
  Clock,
  GreenTip,
  PlusCircleSolid,
  EditSolid,
  TrashSolid,
  Down,
} from "../../../../icons";
import AlertBox from "../../../Alert/alert";
import { ConvertDate, ConvertTime } from "../../../../utils/utils";
import Modal from "../../../Modal/modal";
import Input from "../../../Input/input";
import Button from "../../../Button/button";
import {
  addClass,
  deleteClass,
  getAllClass,
  getAllUser,
  getSpesificRoleUsers,
  GetToken,
  updateClass,
} from "../../../../actions/action";
import teacherAvatar from "../../../../assets/images/teacherAvatar.png";
export default function ClassManagement({ filterClass, classData }) {
  const [isActive, setIsActive] = useState(false);
  const [modalType, setModalType] = useState(false);
  const [classId, setClassId] = useState(false);
  const [teachersData, setTeachersData] = useState([]);
  const token = GetToken();
  console.log(filterClass);
  useEffect(() => {
    // if (filterClass !== "" && classData) {
    //   let arr = [];
    //   arr = classData.filter((item) => {
    //     return item.name.includes(filterClass);
    //   });
    //   setClassData(arr);
    // }
    // getAllClass(token).then((data) => {
    //   setClassData(data.data.data);
    //   console.log(data);
    // });
    getAllUser(token).then((data) => {
      setTeachersData(
        data.data.data.filter((item) => item.role === "instructor")
      );
      console.log(
        "user",
        data.data.data.filter((item) => item.role === "instructor")
      );
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
            classData.map((item) => {
              return (
                <tr
                  onClick={() => {
                    setClassId(item._id);
                  }}
                >
                  <div className={styles.scheduleTeacher}>
                    <div className={styles.avatar}>
                      <img
                        // src={String(
                        //   getTeacherAvatar(teachersData, item.course.code)
                        // ).replace(/,/gi, "")}\
                        src={teacherAvatar}
                      />
                    </div>
                    <td>{item.name}</td>
                  </div>
                  {/* <td>
                    <PlusCircleSolid className={styles.addExamIcon} />
                  </td> */}
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
                        deleteClass(token, item._id).then((item) => {
                          window.location.reload();
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
      {/* <AlertBox
        title={
          "Yukarıdaki ders programı **2020 / 2021 Eğitim - Öğretim Yılı**’nın ilk yarısına kadar geçerlidir."
        }
        type={"primary"}
      >
        <GreenTip className={styles.greenTip} />
      </AlertBox> */}
      <Modal isActive={isActive} setIsActive={setIsActive}>
        <RenderModalContent
          isActive={isActive}
          setIsActive={setIsActive}
          type={modalType}
          classId={classId}
          teachersData={teachersData}
        />
      </Modal>
    </div>
  );
}

function RenderModalContent({
  type,
  isActive,
  setIsActive,
  classId,
  teachersData,
}) {
  console.log(classId);
  const [updatingClassName, setUpdatingClassName] = useState("");
  const [dropdownActive, setDropdownActive] = useState("");
  const [dropdownName, setDropdownName] = useState("Öğretmen Seçiniz");
  const [instructorId, setInstructorId] = useState("");
  const token = GetToken();
  if (type === "edit")
    return (
      <>
        <Input
          // value={addAnnouncementsTitle}
          placeholder="Sınıfın adını giriniz"
          onChange={(e) => setUpdatingClassName(e.target.value)}
          inputStyle={"modal"}
        />
        {/* <Input
          // value={addAnnouncementsDetail}
          placeholder="Duyurunun detaylarını giriniz"
          // onChange={(e) => setAddAnnouncementsDetails(e.target.value)}
          inputStyle={"modal"}
        /> */}
        <Button
          type={"modal"}
          title={"Ekle"}
          onClick={() => {
            setIsActive(false);
            updateClass(token, classId, updatingClassName).then(() =>
              // GetAnnouncements(token)
              window.location.reload()
            );
            setIsActive(false);
          }}
        />
      </>
    );
  else if (type === "add") {
    return (
      <>
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
            {teachersData.map((item) => {
              return (
                <div
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
        <Input
          // value={addAnnouncementsTitle}
          placeholder="Sınıfın adını giriniz"
          onChange={(e) => setUpdatingClassName(e.target.value)}
          inputStyle={"modal"}
        />
        <Button
          type={"modal"}
          title={"Ekle"}
          onClick={() => {
            setIsActive(false);
            addClass(token, instructorId, updatingClassName).then(() =>
              // GetAnnouncements(token)
              window.location.reload()
            );
            setIsActive(false);
          }}
        />
      </>
    );
  } else return <></>;
}
