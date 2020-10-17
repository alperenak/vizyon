import React, { useEffect, useState } from "react";
import styles from "./syllabusManagement.module.scss";
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
  UploadSolid,
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
  GetSyllabusDownloadLink,
  GetToken,
  updateClass,
} from "../../../../actions/action";
import Card from "../../card";
import teacherAvatar from "../../../../assets/images/teacherAvatar.png";
export default function SyllabusManagement() {
  const [classData, setClassData] = useState([
    {
      name: "5 A",
      teacher: "Alperen Karaguzel",
      activeProgram: "ders programi.xls",
      createdAt: "20 Ekim 2020 19:12",
    },
    {
      name: "5 B",
      teacher: "Alperen Karaguzel",
      activeProgram: "ders programi.xls",
      createdAt: "20 Ekim 2020 19:12",
    },
    {
      name: "5 C",
      teacher: "Alperen Karaguzel",
      activeProgram: "ders programi.xls",
      createdAt: "20 Ekim 2020 19:12",
    },
    {
      name: "5 D",
      teacher: "Alperen Karaguzel",
      activeProgram: "ders programi.xls",
      createdAt: "20 Ekim 2020 19:12",
    },
    {
      name: "5 E",
      teacher: "Alperen Karaguzel",
      activeProgram: "ders programi.xls",
      createdAt: "20 Ekim 2020 19:12",
    },
  ]);
  const [isActive, setIsActive] = useState(false);
  const [modalType, setModalType] = useState(false);
  const [classId, setClassId] = useState(false);
  const [teachersData, setTeachersData] = useState([]);
  const token = GetToken();
  useEffect(() => {
    getAllClass(token).then((data) => {
      setClassData(data.data.data);
      console.log("sinif", data);
    });
    getAllUser(token).then((data) => {
      setTeachersData(
        data.data.data.filter((item) => item.role === "instructor")
      );
      console.log(
        "user",
        data.data.data.filter((item) => item.role === "instructor")
      );
    });
  }, []);
  return (
    <div className={styles.schedule}>
      <div className={styles.topSide}>
        <div className={styles.title}>Ders Programı</div>
      </div>
      <div className={styles.scheduleTitlesSection}>
        <table>
          <tr className={styles.scheduleTitlesRow}>
            <div className={styles.scheduleTitles}>
              <td className={styles.ogretmen}>Sınıf Adı</td>
            </div>
            <div className={styles.scheduleTitles}>
              <td>Öğretmen Adı</td>
            </div>
            <div className={styles.scheduleTitles}>
              <td>Aktif Ders Programı</td>
            </div>
            <div className={styles.scheduleTitles}>
              <td>Oluşturma Tarihi</td>
            </div>
            <div className={styles.scheduleTitles}>
              <td>Yükle</td>
            </div>
            <div className={styles.scheduleTitles}>
              <td>İndir</td>
            </div>
            <div className={styles.scheduleTitles}>
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
                      <img src={teacherAvatar} />
                    </div>
                    <td>{item.name}</td>
                  </div>
                  <td className={styles.instructorName}>
                    {item.instructor
                      ? `${item.instructor.first_name} ${item.instructor.last_name}`
                      : "-"}
                  </td>
                  <div>
                    <td>
                      {item.activeProgram
                        ? item.activeProgram
                        : "ders programi.xls"}
                    </td>
                  </div>
                  <td>
                    {item.createdAt ? item.createdAt : "20 Ekim 2020 19:12"}
                  </td>
                  <td>
                    <UploadSolid
                      onClick={() => {
                        setModalType("edit");
                        setIsActive(true);
                      }}
                      className={styles.addExamIcon}
                    />
                  </td>

                  <td>
                    <div
                      className={styles.downloadSyllabus}
                      onClick={() =>
                        GetSyllabusDownloadLink(token, item._id).then((data) =>
                          window.open(data.data.data[0])
                        )
                      }
                    >
                      <div className={styles.formatXLS}>
                        <Download className={styles.formatIcon} />
                        <div className={styles.formatName}>XLS</div>
                      </div>
                      <div className={styles.downloadTitle}></div>
                    </div>
                  </td>
                  <td>
                    <TrashSolid
                      onClick={() => {
                        deleteClass(token, item._id);
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
        <Card type={"dropzone"} />
        <Button
          type={"primary"}
          title={"Yükle"}
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
  else if (type === "add") {
    return (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: 700,
          }}
        >
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
        </div>
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
