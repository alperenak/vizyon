import React, { useContext, useEffect, useState } from "react";
import styles from "./home.module.scss";
import Card from "../../components/Card/card";
import IsAdmin, {
  GetAnnouncements,
  GetAnnouncementsStudent,
  GetNewMessages,
  GetToken,
  GetUser,
  IsAuth,
} from "../../actions/action";
import Loading from "../../components/Loading/loading";
import { useCookies } from "react-cookie";
export default function Home() {
  const [userData, setUserData] = useState(false);
  const [announcementsData, setAnnouncementsData] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [newMessagesData, setNewMessagesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cookies, setCookies, removeCookies] = useCookies();
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
            setUserRole(data.data.data.role);
            if (!announcementsData && data.data.data.role === "student") {
              GetAnnouncementsStudent(
                token,
                data.data.data.studentInfo?.class._id
              )
                .then((data) => {
                  setLoading(false);
                  setAnnouncementsData(data);
                })
                .catch((e) => {
                  setLoading(false);
                  console.error(e);
                });
            } else if (
              !announcementsData &&
              data.data.data.role === "instructor"
            ) {
              GetAnnouncements(100, 1, token)
                .then((data) => {
                  setLoading(false);
                  setAnnouncementsData(data);
                })
                .catch((e) => {
                  setLoading(false);
                  console.error(e);
                });
            }
            GetNewMessages(token).then((data) => {
              setLoading(false);
              setNewMessagesData(data);
            });
          })
          .then(() => {
            setLoading(false);
          })
          .catch((e) => {
            setLoading(false);
            console.error(e);
          });
      }
    } else window.location.replace("/");
  }, [userData]);
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
                  isRoleTeacher={userData.data?.data.role === "instructor"}
                />
                <Card
                  type={"syllabus"}
                  syllabusData={getSyllabusData(userData.data.data)}
                  classInfo={
                    userData.data.data?.studentInfo &&
                    userData.data.data?.studentInfo
                      ? userData.data.data?.studentInfo.class
                      : []
                  }
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
                  classInfo={
                    userData.data.data?.studentInfo &&
                    userData.data.data?.studentInfo
                      ? userData.data.data?.studentInfo.class
                      : []
                  }
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
                scheduleDate={
                  userData.data.data.studentInfo &&
                  userData.data.data.studentInfo.class
                    ? userData.data.data.studentInfo.class.exams.map((item) => {
                        return item.date;
                      })
                    : []
                }
                newMessagesCount={newMessagesData.data?.data.total}
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
                classesData={
                  userData.data?.data.instructorInfo
                    ? userData.data?.data.instructorInfo.classes
                    : false
                }
                userRole={userRole !== "" ? userRole : false}
              />{" "}
              <Card type={"newMessages"} newMessagesData={newMessagesData} />
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
    return name;
  } else return "Sınıf bilgisi bulunamadı";
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
