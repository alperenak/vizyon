import React, { useEffect, useState } from "react";
import styles from "./homework.module.scss";
import duyurular from "../../assets/images/announcements.png";
import { ConvertDate } from "../../utils/utils";
import { EditSolid, TrashSolid, PlusCircleSolid, LinkSolid } from "../../icons";
import {
  AddAnnouncements,
  DeleteAnnouncements,
  GetAnnouncements,
  GetMicrosoftAssigments,
  GetToken,
  IsRoleAdmin,
  UpdateAnnouncements,
} from "../../actions/action";

export default function Homework({ title = "Duyurular", isAdmin }) {
  const [active, setActive] = useState(false);
  const [mapCount, setMapCount] = useState(5);
  const [seeAll, setSeeAll] = useState(false);
  const [modalType, setModalType] = useState("updateAnnouncements");
  const [id, setId] = useState(false);
  const [homeworkData, setHomeworkData] = useState([]);
  const token = GetToken();
  const isRoledAdmin = IsRoleAdmin();
  console.log("anon", homeworkData);
  console.log("is", isRoledAdmin);
  useEffect(() => {
    GetMicrosoftAssigments(token).then((data) => {
      setHomeworkData(data.data.data);
    });
  }, []);
  return (
    <div className={styles.homeworkContainer}>
      <div
        className={`${styles.announcementsCard} ${
          seeAll ? styles.activeSee : ""
        }`}
      >
        <div className={styles.topSide}>
          <div className={styles.title}>Ödevlerim</div>
          {isAdmin ? (
            <div
              onClick={() => {
                setModalType("addAnnouncements");
                setActive(true);
              }}
              className={styles.addAnnouncements}
            >
              <PlusCircleSolid className={styles.addAnnouncementsIcon} />
              <div className={styles.addAnnouncementsTitle}>Duyuru Ekle</div>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className={styles.announcementsSection}>
          <div className={styles.homeworkTitles}>
            <div className={styles.homeworkTitleHomework}>Ödev Adı</div>
            <div className={styles.homeworkTitle}>Geç Teslim</div>
            <div className={styles.homeworkTitle}>Durum</div>
            <div className={styles.homeworkTitle}>Teslim tarihi aralığı</div>
          </div>
          {homeworkData.slice(0, mapCount).map((item) => {
            return (
              <div className={styles.announcements}>
                <div className={styles.imageCircle}>
                  <img
                    src={item.icon?.includes("http") ? item.icon : duyurular}
                  />
                </div>
                <div className={styles.announcementsTitle}>
                  {item.displayName}
                </div>
                <div className={styles.announcementsTitleTeacher}>
                  {item.allowLateSubmissions ? "edilebilir" : "edilemez"}
                </div>
                <div
                  className={`${
                    item.isCompleted
                      ? styles.announcementsTitleComplete
                      : styles.announcementsTitleNotComplete
                  }`}
                >
                  {item.status === "assigned" ? "Tamamlandı" : "Tamamlanmadı"}
                </div>
                <LinkSolid
                  onClick={() =>
                    window.open(
                      "http://microsoft.com/en-us/microsoft-365/microsoft-teams/log-in"
                    )
                  }
                  className={styles.linkSolid}
                />
                {isAdmin ? (
                  <div className={styles.announcementsAdminIcon}>
                    <EditSolid
                      className={styles.editIcon}
                      onClick={() => {
                        setActive(true);
                        setId(item._id);
                        setModalType("updateAnnouncements");
                      }}
                    />
                    <TrashSolid
                      className={styles.trashIcon}
                      onClick={() => {
                        DeleteAnnouncements(item._id, token).then(() => {
                          window.location.reload();
                        });
                      }}
                    />
                  </div>
                ) : (
                  ""
                )}
                <div className={styles.announcementsDate}>
                  {`${ConvertDate(item.assignedDateTime)} - ${ConvertDate(
                    item.dueDateTime
                  )}`}
                </div>
              </div>
            );
          })}
        </div>
        <div
          onClick={() => {
            setSeeAll(!seeAll);
            if (!seeAll) setMapCount(homeworkData.length);
            else setMapCount(5);
          }}
          className={`${styles.seeAll} `}
        >
          {seeAll ? "Küçült" : "Tümünü Gör"}
        </div>
      </div>
    </div>
  );
}
const homeworkDatas = [
  {
    name: "Asal sayıların Tarihsel Gelişimi",
    teacher: "Muhammet Karaca",
    isCompleted: false,
    startingDate: "20 Ekim 2020",
    endingDate: "27 Ekim 2020",
  },
  {
    name: "Asal sayıların Tarihsel Gelişimi",
    teacher: "Muhammet Karaca",
    isCompleted: false,
    startingDate: "20 Ekim 2020",
    endingDate: "27 Ekim 2020",
  },
  {
    name: "Asal sayıların Tarihsel Gelişimi",
    teacher: "Muhammet Karaca",
    isCompleted: true,
    startingDate: "20 Ekim 2020",
    endingDate: "27 Ekim 2020",
  },
  {
    name: "Asal sayıların Tarihsel Gelişimi",
    teacher: "Muhammet Karaca",
    isCompleted: false,
    startingDate: "20 Ekim 2020",
    endingDate: "27 Ekim 2020",
  },
  {
    name: "Asal sayıların Tarihsel Gelişimi",
    teacher: "Muhammet Karaca",
    isCompleted: false,
    startingDate: "20 Ekim 2020",
    endingDate: "27 Ekim 2020",
  },
  {
    name: "Asal sayıların Tarihsel Gelişimi",
    teacher: "Muhammet Karaca",
    isCompleted: false,
    startingDate: "20 Ekim 2020",
    endingDate: "27 Ekim 2020",
  },
  {
    name: "Asal sayıların Tarihsel Gelişimi",
    teacher: "Muhammet Karaca",
    isCompleted: false,
    startingDate: "20 Ekim 2020",
    endingDate: "27 Ekim 2020",
  },
  {
    name: "Asal sayıların Tarihsel Gelişimi",
    teacher: "Muhammet Karaca",
    isCompleted: false,
    startingDate: "20 Ekim 2020",
    endingDate: "27 Ekim 2020",
  },
  {
    name: "Asal sayıların Tarihsel Gelişimi",
    teacher: "Muhammet Karaca",
    isCompleted: false,
    startingDate: "20 Ekim 2020",
    endingDate: "27 Ekim 2020",
  },
  {
    name: "Asal sayıların Tarihsel Gelişimi",
    teacher: "Muhammet Karaca",
    isCompleted: false,
    startingDate: "20 Ekim 2020",
    endingDate: "27 Ekim 2020",
  },
  {
    name: "Asal sayıların Tarihsel Gelişimi",
    teacher: "Muhammet Karaca",
    isCompleted: false,
    startingDate: "20 Ekim 2020",
    endingDate: "27 Ekim 2020",
  },
  {
    name: "Asal sayıların Tarihsel Gelişimi",
    teacher: "Muhammet Karaca",
    isCompleted: false,
    startingDate: "20 Ekim 2020",
    endingDate: "27 Ekim 2020",
  },
  {
    name: "Asal sayıların Tarihsel Gelişimi",
    teacher: "Muhammet Karaca",
    isCompleted: false,
    startingDate: "20 Ekim 2020",
    endingDate: "27 Ekim 2020",
  },
  {
    name: "Asal sayıların Tarihsel Gelişimi",
    teacher: "Muhammet Karaca",
    isCompleted: false,
    startingDate: "20 Ekim 2020",
    endingDate: "27 Ekim 2020",
  },
];
