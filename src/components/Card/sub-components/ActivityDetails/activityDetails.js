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
import { getAppsLog, GetToken } from "../../../../actions/action";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import Card from "../../card";
export default function ActivityDetails({ tabsType }) {
  const [LogData, setLogData] = useState([]);
  const location = useLocation();
  const token = GetToken();
  const { id } = useParams();
  useEffect(() => {
    getAppsLog(token, 0, "2020-08-08", "2020-10-10", 1000, id).then((data) => {
      setLogData(data);
    });
  }, []);
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
          {LogData.length !== 0 &&
          LogData.data &&
          LogData.data.data &&
          LogData.data.data !== null &&
          tabsType === "Genel" ? (
            LogData.data.data.logs.map((item) => {
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
                    <td>{item.app}</td>
                  </div>
                  <td>{LogData.data.data?.count}</td>
                  <td className={styles.space}>
                    {/* <PlusCircleSolid className={styles.addExamIcon} /> */}
                  </td>
                  <td className={styles.space}></td>
                </tr>
              );
            })
          ) : LogData.length !== 0 &&
            LogData.data &&
            LogData.data.data &&
            LogData.data.data !== null &&
            tabsType === "Genel" ? (
            LogData.data.data.logs.map((item) => {
              return (
                <tr>
                  <div className={styles.scheduleTeacher}>
                    <div className={styles.avatar}>
                      <img src={Office} />
                    </div>
                    <td>{item.app}</td>
                  </div>
                  <td>{ConvertDate(item.timestamp)}</td>
                  <td className={styles.space}></td>
                  <td className={styles.space}></td>
                </tr>
              );
            })
          ) : (
            <div>data yok</div>
          )}
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
