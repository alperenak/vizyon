import React, { useEffect, useState } from "react";
import styles from "./userManagement.module.scss";
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
  CreateUser,
  deleteClass,
  getAllClass,
  getAllUser,
  deleteUser,
  getSpesificRoleUsers,
  GetToken,
  updateClass,
  updateUser,
} from "../../../../actions/action";
import Pagination from "../../../Pagination/pagination";
import { useHistory } from "react-router-dom";
// import teacherAvatar from "../../../../assets/images/teacherAvatar.png";
export default function UserManagement({
  tabsType,
  studentsData,
  teachersData,
}) {
  const [classData, setClassData] = useState([
    { name: "5 A", teacher: "Alperen Karaguzel" },
    { name: "5 B", teacher: "Alperen Karaguzel" },
    { name: "5 C", teacher: "Alperen Karaguzel" },
    { name: "5 D", teacher: "Alperen Karaguzel" },
    { name: "5 E", teacher: "Alperen Karaguzel" },
  ]);
  const [isActive, setIsActive] = useState(false);
  const [modalType, setModalType] = useState(false);
  const [classId, setClassId] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const history = useHistory();
  const [generalData, setGeneralData] = useState(
    tabsType === "student" ? studentsData : teachersData
  );
  const token = GetToken();
  console.log("general", studentsData);

  return (
    <div className={styles.schedule}>
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
              <User className={`${styles.scheduleTitlesIcon} ${styles.user}`} />
              <td className={styles.ogretmen}>Ad Soyad</td>
            </div>
            {/* <div className={styles.scheduleTitles}>
              <Ders className={`${styles.scheduleTitlesIcon}`} />
              <td>Sınıf</td>
            </div> */}
            <div className={styles.scheduleTitles}>
              <Ders
                className={`${styles.scheduleTitlesIcon} ${styles.editAndDelete}`}
              />
              <td>Düzenle ve Sil</td>
            </div>
          </tr>
        </table>
      </div>
      <div className={styles.scheduleSection}>
        <table>
          {studentsData && studentsData !== null && tabsType === "student"
            ? studentsData.map((item) => {
                return (
                  <tr
                    onClick={() => {
                      setClassId(item._id);
                      history.push(
                        `/admin/user/${tabsType}/${
                          item.id ? item.id : item._id
                        }`
                      );
                    }}
                  >
                    <div className={styles.scheduleTeacher}>
                      <div className={styles.avatar}>
                        <img
                          // src={String(
                          //   getTeacherAvatar(teachersData, item.course.code)
                          // ).replace(/,/gi, "")}\
                          src={item.profile_photo}
                        />
                      </div>
                      <td>{`${item.first_name} ${item.last_name}`}</td>
                    </div>
                    <td>
                      {item.studentInfo
                        ? item.studentInfo.class?.name
                        : "sınıf bilgisi yok"}
                    </td>
                    <td className={styles.space}>
                      {/* <PlusCircleSolid className={styles.addExamIcon} /> */}
                    </td>
                    <td className={styles.space}>
                      {/* <EditSolid
                        onClick={() => {
                          setClassId(item._id);
                          setModalType("edit");
                          setIsActive(true);
                        }}
                        className={styles.editIcon}
                      /> */}
                      <TrashSolid
                        onClick={() => {
                          deleteUser(token, item._id);
                        }}
                        className={styles.deleteIcon}
                      />
                    </td>
                  </tr>
                );
              })
            : teachersData.map((item) => {
                return (
                  <tr
                    onClick={() => {
                      setClassId(item._id);
                      history.push(
                        `/admin/user/${tabsType}/${
                          item.id ? item.id : item._id
                        }`
                      );
                    }}
                  >
                    <div className={styles.scheduleTeacher}>
                      <div className={styles.avatar}>
                        <img
                          // src={String(
                          //   getTeacherAvatar(teachersData, item.course.code)
                          // ).replace(/,/gi, "")}\
                          src={item.profile_photo}
                        />
                      </div>
                      <td>{`${item.first_name} ${item.last_name}`}</td>
                    </div>
                    {/* <td>{item. ? item.teacher : "Eyüp Saruhan"}</td> */}
                    <td className={styles.space}></td>
                    <td className={styles.space}>
                      {/* <EditSolid
                        onClick={() => {
                          setClassId(item._id);
                          setModalType("edit");
                          setIsActive(true);
                        }}
                        className={styles.editIcon}
                      /> */}
                      <TrashSolid
                        onClick={() => {
                          deleteUser(token, item._id);
                        }}
                        className={styles.deleteIcon}
                      />
                    </td>
                  </tr>
                );
              })}
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
          tabsType={tabsType}
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
  tabsType,
}) {
  console.log(classId);
  const [updatingClassName, setUpdatingClassName] = useState("");
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [gender, setGender] = useState("");
  const [dropdownActive, setDropdownActive] = useState();
  const [dropdownName, setDropdownName] = useState("Cinsiyeti Seçiniz");
  const [instructorId, setInstructorId] = useState("");

  const token = GetToken();

  useEffect(() => {
    if (tabsType === "student") setRole("student");
    else setRole("instructor");
  }, [tabsType]);
  if (type === "edit")
    return (
      <>
        <Input
          // value={addAnnouncementsTitle}
          placeholder="Adını Giriniz"
          onChange={(e) => setFirstname(e.target.value)}
          inputStyle={"modal"}
        />
        <Input
          placeholder="Soyadını giriniz"
          onChange={(e) => setLastname(e.target.value)}
          inputStyle={"modal"}
        />
        <Input
          placeholder="Numarasını giriniz"
          onChange={(e) => setPhone(e.target.value)}
          inputStyle={"modal"}
        />
        <Input
          placeholder="E-postasını giriniz"
          onChange={(e) => setUsername(e.target.value)}
          inputStyle={"modal"}
        />
        <Button
          type={"modal"}
          title={"Ekle"}
          onClick={() => {
            setIsActive(false);
            updateUser(
              token,
              firstname,
              lastname,
              username,
              phone,
              classId
            ).then(() =>
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
            CreateUser(
              token,
              firstname,
              lastname,
              username,
              phone,
              role,
              gender
            ).then(() => {
              window.location.reload();
            });
          }}
        />
      </>
    );
  } else return <></>;
}
