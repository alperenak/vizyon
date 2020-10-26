import React from "react";
import styles from "./teacher.module.scss";
import teacherAvatar from "../../../../assets/images/teacherAvatar.png";
import { More } from "../../../../icons";
export default function Teachers({ teachersData, classesData, userRole }) {
  return (
    <>
      {userRole === "intstructor" || !userRole ? (
        ""
      ) : (
        <div className={styles.teachers}>
          <div className={styles.title}>
            {userRole === "student" ? "Öğretmenler" : "Sınıflar"}
          </div>
          <div className={styles.teachersSection}>
            {userRole === "student" &&
            teachersData.length !== 0 &&
            teachersData &&
            teachersData !== null ? (
              teachersData.slice(0, 4).map((item) => {
                return (
                  <div className={styles.teachersLabel}>
                    <div className={styles.avatar}>
                      <img
                        src={
                          item.instructor !== null && item.instructor
                            ? item.instructor.profile_photo
                              ? item.instructor.profile_photo.includes("http")
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
                    <div className={styles.icon}>
                      <More className={styles.moreIcon} />
                    </div>
                  </div>
                );
              })
            ) : classesData ? (
              classesData.map((item) => {
                return (
                  <div className={styles.teachersLabel}>
                    <div className={styles.avatar}>
                      <img
                        src={
                          item.instructor !== null && item.instructor
                            ? item.instructor.profile_photo
                              ? item.instructor.profile_photo.includes("http")
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
      )}
    </>
  );
}
function getTeacherName(instructor) {
  if (instructor && instructor !== null) {
    return `${instructor.first_name} ${instructor.last_name}`;
  } else return "none";
}
function getBranchName(course) {
  if (course && course !== null && course.name && course.name !== null) {
    return course.name;
  } else return "none";
}
