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
import { getAppsLog, GetToken, GetAllApps } from "../../../../actions/action";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import Card from "../../card";
import { SingleUserContext } from "../../../../context/singleUserContext";
import Apps from "../../../Apps/apps";
export default function ActivityDetails({ tabsType, dropdownValue }) {
  const [LogData, setLogData] = useState([]);
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
  console.log(dropdownValue);
  useEffect(() => {
    getAppsLog(token, 0, "2020-08-08", "2020-10-10", 1000, id, dropdownValue)
      .then((data) => {
        setLogData(data);
        setAppCountData(
          [
            {
              name: "udemy",
              count: getOccurrence(data.data.data.logs, "udemy"),
            },
            {
              name: "khanAcademy",
              count: getOccurrence(data.data.data.logs, "khanAcademy"),
            },
            {
              name: "razkids",
              count: getOccurrence(data.data.data.logs, "razkids"),
            },
            {
              name: "okuvaryumstudent",
              count: getOccurrence(data.data.data.logs, "okuvaryumstudent"),
            },
            {
              name: "okuvaryumteacher",
              count: getOccurrence(data.data.data.logs, "okuvaryumteacher"),
            },
            {
              name: "brainpop",
              count: getOccurrence(data.data.data.logs, "brainpop"),
            },
            {
              name: "activelylearn",
              count: getOccurrence(data.data.data.logs, "activelylearn"),
            },
            {
              name: "morpa",
              count: getOccurrence(data.data.data.logs, "morpa"),
            },
            {
              name: "writingaz",
              count: getOccurrence(data.data.data.logs, "writingaz"),
            },
            {
              name: "scienceaz",
              count: getOccurrence(data.data.data.logs, "scienceaz"),
            },
            {
              name: "razplus",
              count: getOccurrence(data.data.data.logs, "razplus"),
            },
            {
              name: "office365",
              count: getOccurrence(data.data.data.logs, "office365"),
            },
          ].filter((item) => {
            return item.count !== 0;
          })
        );
      })
      .then(() => {});
    GetAllApps(token).then((item) => {
      console.log(item);
    });
  }, [dropdownValue]);
  return (
    <div className={styles.schedule}>
      <div className={styles.topSide}>
        <div className={styles.title}>
          <div className={styles.avatar}>
            <img src={singleUser.profile} />
          </div>
          <div className={styles.name}>{singleUser.name}</div>
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
            appCountData.map((item, index) => {
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
                    <td>{item.name}</td>
                  </div>
                  <td>{item.count}</td>
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
            tabsType === "Detaylar" ? (
            LogData.data.data.logs.map((item) => {
              return (
                <tr>
                  <div className={styles.scheduleTeacher}>
                    <div className={styles.avatar}>
                      <img src={Office} />
                    </div>
                    <td>{item.app}</td>
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
function getOccurrence(array, value) {
  var count = 0;
  array.forEach((v) => v.app === value && count++);
  return count;
}
