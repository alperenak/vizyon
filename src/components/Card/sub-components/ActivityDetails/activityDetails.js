import React, { useContext, useEffect, useState } from "react";
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
import {
  ConvertDate,
  convertHourMinute,
  ConvertTime,
} from "../../../../utils/utils";
import Modal from "../../../Modal/modal";
import Input from "../../../Input/input";
import Button from "../../../Button/button";
import Office from "../../../../assets/images/office.png";
import teacherAvatar from "../../../../assets/images/teacherAvatar.png";
import {
  getAppsLog,
  GetToken,
  GetAllApps,
  GetGeneralLogs,
  GetDetailLogs,
  GetUserInformations,
} from "../../../../actions/action";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import Card from "../../card";
import { SingleUserContext } from "../../../../context/singleUserContext";
import Apps from "../../../Apps/apps";
import Loading from "../../../Loading/loading";
export default function ActivityDetails({
  tabsType,
  dropdownValue,
  convertedDropdownValue,
}) {
  const [LogData, setLogData] = useState([]);
  const [loading, setLaoding] = useState(true);
  const [userFullName, setUserFullName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [singleUser, setSingleUser] = useContext(SingleUserContext);
  const location = useLocation();
  const apps = [
    "udemy",
    "khanAcademy",
    "razkids",
    "okuvaryumstudent",
    "okuvaryumteacher",
    "brainpop",
    "activelylearn",
    "morpa",
    "writingaz",
    "scienceaz",
    "razplus",
    "scienceaz",
    "office365",
  ];
  const [appCountData, setAppCountData] = useState([
    { name: "udemy", count: 0 },
    { name: "khanAcademy", count: 0 },
    { name: "razkids", count: 0 },
    { name: "okuvaryumstudent", count: 0 },
    { name: "okuvaryumteacher", count: 0 },
    { name: "brainpop", count: 0 },
    { name: "activelylearn", count: 0 },
    { name: "morpa", count: 0 },
    { name: "writingaz", count: 0 },
    { name: "scienceaz", count: 0 },
    { name: "razplus", count: 0 },
    { name: "scienceaz", count: 0 },
    { name: "office365", count: 0 },
  ]);
  const token = GetToken();
  const { id } = useParams();
  const [mode, setMode] = useState("");
  console.log(convertedDropdownValue);
  useEffect(() => {
    GetUserInformations(token, id).then((data) => {
      if (tabsType === "student") {
        setUserFullName(data.data.data.userInfo.fullName);
        setUserAvatar(data.data.data.userInfo.profile_photo);
      }
    });
    GetGeneralLogs(token, id, convertedDropdownValue)
      .then((data) => {
        setLogData(data.data.data.logs);
        if (data.data.data.logs[0]?.user) setMode("class");
        setLaoding(false);
      })
      .then(() => {});
    GetDetailLogs(token, id, convertedDropdownValue);
    GetAllApps(token).then((item) => {
      console.log(item);
    });
  }, [convertedDropdownValue]);
  return (
    <>
      {loading ? (
        <Loading fullscreen />
      ) : (
        <div className={styles.schedule}>
          <div className={styles.topSide}>
            <div className={styles.title}>
              <div className={styles.avatar}>
                <img src={userAvatar} />
              </div>
              <div className={styles.name}>{userFullName}</div>
            </div>
          </div>
          <div className={styles.scheduleTitlesSection}>
            <table>
              <tr className={styles.scheduleTitlesRow}>
                {mode === "class" && (
                  <div className={styles.scheduleTitles}>
                    <User
                      className={`${styles.scheduleTitlesIcon} ${styles.user}`}
                    />
                    <td className={styles.ogretmen}>Kullanıcı Adı</td>
                  </div>
                )}
                <div className={styles.scheduleTitles}>
                  <User
                    className={`${styles.scheduleTitlesIcon} ${styles.user}`}
                  />
                  <td className={styles.ogretmen}>Uygulama Adı</td>
                </div>
                {mode !== "class" ||
                  (tabsType === "Detaylar" && (
                    <div className={styles.scheduleTitles}>
                      <Ders className={`${styles.scheduleTitlesIcon}`} />
                      <td>{tabsType === "Genel" ? "Giriş Sayısı" : "Tarih"}</td>
                    </div>
                  ))}
              </tr>
            </table>
          </div>
          <div className={styles.scheduleSection}>
            <table>
              {tabsType === "Genel" && LogData.length !== 0 ? (
                LogData?.map((item, index) => {
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
                        <td>{item.user}</td>
                      </div>
                      <td style={{ marginLeft: 100 }}>{item.app}</td>
                      <td>{item.count}</td>

                      <td className={styles.space}></td>
                    </tr>
                  );
                })
              ) : tabsType === "Detaylar" && LogData.length !== 0 ? (
                LogData.map((item) => {
                  return (
                    <tr>
                      <div className={styles.scheduleTeacher}>
                        <div className={styles.avatar}>
                          <img src={Office} />
                        </div>
                        <td>{item.user}</td>
                        <td style={{ width: 300 }}>{item.app}</td>
                      </div>
                      <td>{`${ConvertDate(item.timestamp)} ${convertHourMinute(
                        item.timestamp
                      )}`}</td>
                      <td className={styles.space}></td>
                      <td className={styles.space}></td>
                    </tr>
                  );
                })
              ) : (
                <h3 style={{ margin: 20 }}>
                  Bu kullanıcı için gösterilecek bir rapor yok
                </h3>
              )}
            </table>
          </div>
        </div>
      )}
    </>
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
function getOccurrence(array, value) {
  var count = 0;
  array.forEach((v) => v.app === value && count++);
  return count;
}
