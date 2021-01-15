import React, { useContext, useEffect, useState } from "react";
import styles from "./activity.module.scss";
import TeacherAvatar from "../../../../assets/images/teacherAvatar.png";
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
import { useHistory } from "react-router-dom";
import { SingleUserContext } from "../../../../context/singleUserContext";
import Loading from "../../../Loading/loading";
// import teacherAvatar from "../../../../assets/images/teacherAvatar.png";
export default function ActivityManagement({
  tabsType,
  teachersData,
  studentsData,
  classData,
}) {
  const [isActive, setIsActive] = useState(false);
  const [modalType, setModalType] = useState(false);
  const [singleUser, setSingleUser] = useContext(SingleUserContext);
  const [classId, setClassId] = useState(false);
  const fakeClasses = ["5A", "6B", "4A", "5B", "5C", "6D", "6C"];
  const history = useHistory();
  const [generalData, setGeneralData] = useState(
    tabsType === "student" ? studentsData : teachersData
  );
  const token = GetToken();
  console.log("classssssssssssss", classData);

  return (
    <>
      <div className={styles.schedule}>
        <div className={styles.topSide}>
          <div className={styles.title}>Raporlar</div>
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
              {tabsType === "student" ? (
                <div className={styles.scheduleTitles}>
                  <Ders className={`${styles.scheduleTitlesIcon}`} />
                  <td>Sınıf</td>
                </div>
              ) : (
                ""
              )}
            </tr>
          </table>
        </div>
        <div className={styles.scheduleSection}>
          <table>
            {studentsData && studentsData !== null && tabsType === "student"
              ? studentsData.map((item, index) => {
                  return (
                    <tr
                      onClick={() => {
                        setClassId(item._id);
                        setSingleUser({
                          name: `${item.first_name} ${item.last_name}`,
                          profile: item.profile_photo,
                        });
                        history.push(`/admin/activity/${item._id}`);
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
                      <td className={styles.space}></td>
                    </tr>
                  );
                })
              : tabsType === "teacher"
              ? teachersData.map((item) => {
                  return (
                    <tr
                      onClick={() => {
                        setClassId(item._id);
                        setSingleUser({
                          name: `${item.first_name} ${item.last_name}`,
                          profile: item.profile_photo,
                        });
                        history.push(`/admin/activity/${item._id}`);
                      }}
                    >
                      <div className={styles.scheduleTeacher}>
                        <div className={styles.avatar}>
                          <img src={item.profile_photo} />
                        </div>
                        <td>{`${item.first_name} ${item.last_name}`}</td>
                      </div>
                      {/* <td>
                      {item.teacher
                        ? item.teacher
                        : fakeClasses[
                            Math.floor(Math.random() * (fakeClasses.length - 1))
                          ]}
                    </td> */}
                      <td className={styles.space}></td>
                      <td className={styles.space}></td>
                    </tr>
                  );
                })
              : classData.map((item) => {
                  return (
                    <tr
                      onClick={() => {
                        setClassId(item._id ? item._id : item.id);
                        setSingleUser({
                          name: item.name,
                          profile: TeacherAvatar,
                        });
                        history.push(`/admin/activity/${item._id}`);
                      }}
                    >
                      <div className={styles.scheduleTeacher}>
                        <div className={styles.avatar}>
                          <img src={TeacherAvatar} />
                        </div>
                        <td>{item.name}</td>
                      </div>
                      {/* <td>
                      {item.teacher
                        ? item.teacher
                        : fakeClasses[
                            Math.floor(Math.random() * (fakeClasses.length - 1))
                          ]}
                    </td> */}
                      <td className={styles.space}></td>
                      <td className={styles.space}></td>
                    </tr>
                  );
                })}
          </table>
        </div>

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
    </>
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
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [gender, setGender] = useState("");
  const [dropdownName, setDropdownName] = useState("Öğretmen Seçiniz");
  const [instructorId, setInstructorId] = useState("");
  const token = GetToken();
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
          onChange={(e) => setLastname(e.target.value)}
          inputStyle={"modal"}
        />
        <Input
          placeholder="Kullanıcı adını giriniz"
          onChange={(e) => setLastname(e.target.value)}
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
          placeholder="Kullanıcı adı giriniz"
          onChange={(e) => setUsername(e.target.value)}
          inputStyle={"modal"}
        />
        <Input
          // value={addAnnouncementsTitle}
          placeholder="Telefon Numarası giriniz"
          onChange={(e) => setPhone(e.target.value)}
          inputStyle={"modal"}
        />
        <Input
          // value={addAnnouncementsTitle}
          placeholder="Cinsiyeti giriniz"
          onChange={(e) => setGender(e.target.value)}
          inputStyle={"modal"}
        />
        <Input
          // value={addAnnouncementsTitle}
          placeholder="Rolünü giriniz (admin, öğrenci, öğretmen)"
          onChange={(e) => setRole(e.target.value)}
          inputStyle={"modal"}
        />
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
            );
          }}
        />
      </>
    );
  } else return <></>;
}
