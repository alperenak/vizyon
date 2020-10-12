import React, { useEffect, useState } from "react";
import { getAppsLog, GetToken } from "../../../actions/action";
import { Down } from "../../../icons";
import styles from "./activityDetail.module.scss";
import Card from "../../../components/Card/card";

export default function ActivityDetail({ match }) {
  const [dropdownActive, setDropdownActive] = useState();
  const [tabsType, setTabsType] = useState("Genel");
  const [dropdownName, setDropdownName] = useState("Tarih seçiniz");
  const d = new Date();
  const months = [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ];
  const nowMonth = d.getMonth() + 1;
  const pastMonth = d.getMonth();
  const nowDate = d.getDate();
  const pastDateSevenday = d.getDate() - 7;
  const pastDateWithYear = `${2020}-0${pastMonth}-0${pastDateSevenday}`;
  const nowDateWithYear = `${2020}-${nowMonth}-${nowDate}`;
  return (
    <div className={styles.activityDetailContainer}>
      <div className={styles.topSide}>
        <div
          id={"classDropdown"}
          onClick={() => setDropdownActive(!dropdownActive)}
          className={styles.dropdown}
        >
          <div id={"dropdownName"} className={styles.dropdownName}>
            <Down id={"dropdownIcon"} className={styles.downIcon} />
            {dropdownName}
          </div>
          <div
            className={`${styles.dropdownContent}  ${
              dropdownActive ? styles.active : ""
            }`}
            onClick={() => {}}
          >
            {[
              { name: "Son 7 gün" },
              { name: "Bu ay" },
              { name: "Geçen ay" },
            ].map((item) => {
              return (
                <div
                  onClick={() => setDropdownName(item.name)}
                  className={styles.dropdownItems}
                >
                  {item.name}
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.tabs}>
          <div
            className={`${styles.tabsButton} ${
              tabsType === "Genel" ? styles.tabsButtonActive : ""
            }`}
            onClick={() => setTabsType("Genel")}
          >
            Genel
          </div>
          <div
            className={`${styles.tabsButton} ${
              tabsType === "Detaylar" ? styles.tabsButtonActive : ""
            }`}
            onClick={() => setTabsType("Detaylar")}
          >
            Detaylar
          </div>
        </div>
      </div>
      <Card type={"activityDetails"} tabsType={tabsType} />
    </div>
  );
}
