import React from "react";
import styles from "./teacher.module.scss";
import teacherAvatar from "../../../../assets/images/teacherAvatar.png";
import { EnvelopeSolid, More } from "../../../../icons";
import { useHistory } from "react-router-dom";
export default function Teachers({ teachersData, classesData, userRole }) {
  const history = useHistory();
  return (
    <>
      {userRole === "intstructor" || !userRole ? (
        ""
      ) : (
        <div className={styles.teachers}>
          <div className={styles.title}>
            {userRole === "student" ? "Öğretmenler" : "Sınıflar"}
          </div>
          <div className={styles.teachersSectionWrapper}>
            <div className={styles.teachersSection}>
              {userRole === "student" &&
              teachersData.length !== 0 &&
              teachersData &&
              teachersData !== null ? (
                teachersData.map((item, index) => {
                  return (
                    <div key={index} className={styles.teachersLabel}>
                      <div className={styles.profileSection}>
                        <div className={styles.avatar}>
                          <img
                            src={
                              item.instructor !== null && item.instructor
                                ? item.instructor.profile_photo
                                  ? item.instructor.profile_photo.includes(
                                      "http"
                                    )
                                    ? item.instructor.profile_photo
                                    : teacherAvatar
                                  : teacherAvatar
                                : teacherAvatar
                            }
                          />
                        </div>
                        <div className={styles.teacherInfo}>
                          <div className={styles.name}>
                            {getTeacherName(item.instructor)}
                          </div>
                          <div className={styles.branch}>
                            {getBranchName(item.course)}
                          </div>
                        </div>
                      </div>
                      <div className={styles.icon}>
                        <EnvelopeSolid
                          onClick={() => {
                            history.push(
                              `/messages/new/${item.instructor?._id}`
                            );
                          }}
                          className={styles.moreIcon}
                        />
                      </div>
                    </div>
                  );
                })
              ) : classesData ? (
                classesData.map((item, index) => {
                  return (
                    <div key={index} className={styles.teachersLabel}>
                      <div className={styles.profileSection}>
                        <div className={styles.avatar}>
                          <img
                            src={
                              item.instructor !== null && item.instructor
                                ? item.instructor.profile_photo
                                  ? item.instructor.profile_photo.includes(
                                      "http"
                                    )
                                    ? item.instructor.profile_photo
                                    : teacherAvatar
                                  : teacherAvatar
                                : teacherAvatar
                            }
                          />
                        </div>
                        <div className={styles.teacherInfo}>
                          <div className={styles.name}>{item.name}</div>
                        </div>
                      </div>

                      <div className={styles.icon}>
                        <More className={styles.moreIcon} />
                      </div>
                    </div>
                  );
                })
              ) : (
                <div>data yok</div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
function getTeacherName(instructor) {
  if (instructor && instructor !== null) {
    return `${instructor.first_name} ${instructor.last_name}`;
  } else return "Öğretmen bilgisi yok";
}
function getBranchName(course) {
  if (course && course !== null && course.name && course.name !== null) {
    return course.name;
  } else return "Branş bilgisi yok";
}
