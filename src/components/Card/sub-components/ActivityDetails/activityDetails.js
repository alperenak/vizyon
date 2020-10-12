import React, { useEffect, useState } from "react";
import styles from "./activityDetails.module.scss";
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
import Office from "../../../../assets/images/office.png";
import teacherAvatar from "../../../../assets/images/teacherAvatar.png";
export default function ActivityManagement({ tabsType }) {
  return (
    <div className={styles.schedule}>
      <div className={styles.topSide}>
        <div className={styles.title}>
          <div className={styles.avatar}>
            <img src={teacherAvatar} />
          </div>
          <div className={styles.name}>Orhan Karabıyık</div>
        </div>
      </div>
      <div className={styles.scheduleTitlesSection}>
        <table>
          <tr className={styles.scheduleTitlesRow}>
            <div className={styles.scheduleTitles}>
              <User className={`${styles.scheduleTitlesIcon} ${styles.user}`} />
              <td className={styles.ogretmen}>Uygulama Adı</td>
            </div>
            <div className={styles.scheduleTitles}>
              <Ders className={`${styles.scheduleTitlesIcon}`} />
              <td>{tabsType === "Genel" ? "Giriş Sayısı" : "Tarih"}</td>
            </div>
          </tr>
        </table>
      </div>
      <div className={styles.scheduleSection}>
        <table>
          {studentsData && studentsData !== null && tabsType === "Genel"
            ? studentsData.map((item) => {
                return (
                  <tr onClick={() => {}}>
                    <div className={styles.scheduleTeacher}>
                      <div className={styles.avatar}>
                        <img
                          // src={String(
                          //   getTeacherAvatar(teachersData, item.course.code)
                          // ).replace(/,/gi, "")}\
                          src={Office}
                        />
                      </div>
                      <td>{item.appName}</td>
                    </div>
                    <td>{item.count}</td>
                    <td className={styles.space}>
                      {/* <PlusCircleSolid className={styles.addExamIcon} /> */}
                    </td>
                    <td className={styles.space}></td>
                  </tr>
                );
              })
            : teachersData.map((item) => {
                return (
                  <tr>
                    <div className={styles.scheduleTeacher}>
                      <div className={styles.avatar}>
                        <img src={Office} />
                      </div>
                      <td>{item.appName}</td>
                    </div>
                    <td>{item.date}</td>
                    <td className={styles.space}></td>
                    <td className={styles.space}></td>
                  </tr>
                );
              })}
        </table>
      </div>
    </div>
  );
}
const studentsData = [
  { appName: "Microsoft", count: 8 },
  { appName: "Microsoft", count: 8 },
  { appName: "Microsoft", count: 8 },
  { appName: "Microsoft", count: 8 },
  { appName: "Microsoft", count: 8 },
  { appName: "Microsoft", count: 8 },
  { appName: "Microsoft", count: 8 },
  { appName: "Microsoft", count: 8 },
  { appName: "Microsoft", count: 8 },
];
const teachersData = [
  { appName: "Microsoft", date: "27 Ekim 10:02" },
  { appName: "Microsoft", date: "27 Ekim 10:02" },
  { appName: "Microsoft", date: "27 Ekim 10:02" },
  { appName: "Microsoft", date: "27 Ekim 10:02" },
  { appName: "Microsoft", date: "27 Ekim 10:02" },
  { appName: "Microsoft", date: "27 Ekim 10:02" },
];
