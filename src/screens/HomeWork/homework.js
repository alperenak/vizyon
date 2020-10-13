import React, { useState } from "react";
import styles from "./homework.module.scss";
import duyurular from "../../assets/images/announcements.png";
import { ConvertDate } from "../../utils/utils";
import { EditSolid, TrashSolid, PlusCircleSolid } from "../../icons";
import {
  AddAnnouncements,
  DeleteAnnouncements,
  GetAnnouncements,
  GetToken,
  IsRoleAdmin,
  UpdateAnnouncements,
} from "../../actions/action";

export default function Homework({ title = "Duyurular", isAdmin }) {
  const [active, setActive] = useState(false);
  const [modalType, setModalType] = useState("updateAnnouncements");
  const [id, setId] = useState(false);
  const token = GetToken();
  const isRoledAdmin = IsRoleAdmin();
  console.log("anon", homeworkData);
  console.log("is", isRoledAdmin);

  return (
    <div className={styles.homeworkContainer}>
      <div className={styles.announcementsCard}>
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
            <div className={styles.homeworkTitle}>Öğretmen</div>
            <div className={styles.homeworkTitle}>Durum</div>
            <div className={styles.homeworkTitle}>Teslim tarihi aralığı</div>
          </div>
          {homeworkData.slice(0, 5).map((item) => {
            return (
              <div className={styles.announcements}>
                <div className={styles.imageCircle}>
                  <img
                    src={item.icon?.includes("http") ? item.icon : duyurular}
                  />
                </div>
                <div className={styles.announcementsTitle}>{item.name}</div>
                <div className={styles.announcementsTitleTeacher}>
                  {item.teacher}
                </div>
                <div className={styles.announcementsTitleComplete}>
                  {item.isCompleted ? "Tamamlandı" : "Tamamlanmadı"}
                </div>
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
                  {`${item.startingDate} - ${item.endingDate}`}
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.seeAll}>Tümünü Gör</div>
      </div>
    </div>
  );
}
const homeworkData = [
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
