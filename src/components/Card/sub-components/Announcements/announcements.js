import React from "react";
import styles from "./announcements.module.scss";
import duyurular from "../../../../assets/images/announcements.png";
import { ConvertDate } from "../../../../utils/utils";
export default function Announcements({
  title = "Duyurular",
  announcementsData,
}) {
  console.log(announcementsData);
  return (
    <div className={styles.announcementsCard}>
      <div className={styles.title}>Duyurular</div>
      <div className={styles.announcementsSection}>
        {announcementsData.map((item) => {
          return (
            <div className={styles.announcements}>
              <div className={styles.imageCircle}>
                <img src={item.icon.includes("http") ? item.icon : duyurular} />
              </div>
              <div className={styles.announcementsTitle}>{item.title}</div>
              <div className={styles.announcementsDate}>
                {ConvertDate(item.createdAt)}
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.seeAll}>Tümünü Gör</div>
    </div>
  );
}
