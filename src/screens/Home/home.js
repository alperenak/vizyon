import React, { useContext, useEffect, useState } from "react";
import styles from "./home.module.scss";
import TopBar from "../../components/topBar/topBar";
import Card from "../../components/Card/card";
import Avatar from "../../assets/images/teacherAvatar.png";
import AnnouncementImage from "../../assets/images/announcements.png";
import { UserContext } from "../../context/userContext";
import IsAdmin, {
  GetAnnouncements,
  GetAnnouncementsStudent,
  GetToken,
  GetUser,
  IsAuth,
} from "../../actions/action";
import Loading from "../../components/Loading/loading";
export default function Home() {
  const [userData, setUserData] = useContext(UserContext);
  const [announcementsData, setAnnouncementsData] = useState(false);
  const [loading, setLoading] = useState(false);
  const token = GetToken();

  console.log("userdata: ", userData);
  useEffect(() => {
    if (IsAuth(token)) {
      if (!userData) {
        setLoading(true);
        GetUser(token)
          .then((data) => {
            setLoading(false);
            IsAdmin(data);
            setUserData(data);
            if (!announcementsData && data.data.data.role === "student") {
              GetAnnouncementsStudent(
                token,
                data.data.data.studentInfo?.class._id
              )
                .then((data) => setAnnouncementsData(data))
                .catch((e) => console.error(e));
            } else if (
              !announcementsData &&
              data.data.data.role === "instructor"
            ) {
              GetAnnouncements(token, data.data.data.studentInfo?.class._id)
                .then((data) => setAnnouncementsData(data))
                .catch((e) => console.error(e));
            }
          })
          .then(() => {})
          .catch((e) => console.error(e));
      }
    } else window.location.replace("/");
  }, []);
  return (
    <>
      {announcementsData && userData ? (
        <div className={styles.homeWrapper}>
          <div className={styles.homeContainer}>
            <div className={styles.homeMain}>
              <div className={styles.announcements}>
                <Card
                  type={"announcements"}
                  announcementsData={
                    announcementsData ? announcementsData.data.data : ""
                  }
                  isRoleTeacher={userData.data?.data.role === "intructor"}
                />
                <Card
                  type={"syllabus"}
                  syllabusData={getSyllabusData(userData.data.data)}
                  classInfo={userData.data.data?.studentInfo.class}
                />
                <Card
                  type={"schedule"}
                  scheduleData={
                    userData.data.data.studentInfo &&
                    userData.data.data.studentInfo.class
                      ? userData.data.data.studentInfo.class.exams
                      : []
                  }
                  teachersData={
                    userData.data.data.studentInfo &&
                    userData.data.data.studentInfo.class
                      ? userData.data.data.studentInfo.class.courses
                      : []
                  }
                  classInfo={userData.data.data?.studentInfo.class}
                />
              </div>
            </div>
            <div className={styles.rightSide}>
              <Card
                type={"classes"}
                name={
                  userData.data.data.first_name +
                  " " +
                  userData.data.data.last_name
                }
                classroomName={`${getClassName(
                  userData.data.data.studentInfo &&
                    userData.data.data.studentInfo.class
                    ? userData.data.data.studentInfo.class.name
                    : null
                )}`}
                avatar={userData.data.data.profile_photo}
              />
              <Card
                type={"teachers"}
                teachersData={
                  userData.data.data.studentInfo &&
                  userData.data.data.studentInfo.class
                    ? userData.data.data.studentInfo.class.courses
                    : []
                }
              />
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
function getClassName(name) {
  if (name && name !== null) {
    return `${name.slice(0, name.length - 1)} / ${name.slice(
      name.length - 1,
      name.length
    )} Sınıfı`;
  } else return "";
}

function getSyllabusData(data) {
  if (data.studentInfo && data.studentInfo.class) {
    console.log("ogrenci datasi var");
    return data.studentInfo.class.schedule;
  } else if (data.instructorInfo && data.instructorInfo.classes) {
    console.log("ogretmen datasi var");
    return data.instructorInfo.schedule;
  } else return [];
}
// const announcementsData = [
//   {
//     announcementsTitle: "Gelişim okulları 2020-2021 eğitim yılına hazır!",
//     image: AnnouncementImage,
//     date: "31 Ağustos 2020",
//   },
//   {
//     announcementsTitle: "Gelişim okulları 2020-2021 eğitim yılına hazır!",
//     image: AnnouncementImage,
//     date: "31 Ağustos 2020",
//   },
//   {
//     announcementsTitle: "Gelişim okulları 2020-2021 eğitim yılına hazır!",
//     image: AnnouncementImage,
//     date: "31 Ağustos 2020",
//   },
//   {
//     announcementsTitle: "Gelişim okulları 2020-2021 eğitim yılına hazır!",
//     image: AnnouncementImage,
//     date: "31 Ağustos 2020",
//   },
//   {
//     announcementsTitle: "Gelişim okulları 2020-2021 eğitim yılına hazır!",
//     image: AnnouncementImage,
//     date: "31 Ağustos 2020",
//   },
// ];
const teachersData = [
  {
    teacherName: "Alperen Karagüzel",
    avatar: Avatar,
    branch: "Sosyal Bilgiler Öğretmeni",
  },
  {
    teacherName: "Kerem Kara",
    avatar: Avatar,
    branch: "Beden Eğitimi Öğretmeni",
  },
  {
    teacherName: "Ali Harun",
    avatar: Avatar,
    branch: "Fen Bilimleri Öğretmeni",
  },
  {
    teacherName: "Mustafa Ulusoy",
    avatar: Avatar,
    branch: "Türkçe Öğretmeni",
  },
];
