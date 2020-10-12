import React, { useEffect, useState } from "react";
import styles from "./appManagement.module.scss";
import Loading from "../../../../components/Loading/loading";
import Office from "../../../../assets/images/office.png";
import Actively from "../../../../assets/images/actively.png";
import BrainPop from "../../../../assets/images/brainpop.png";
import KhanAcademy from "../../../../assets/images/khan.png";
import Morpa from "../../../../assets/images/morpa.png";
import Okuvaryum from "../../../../assets/images/okvaryum.png";
import RazKids from "../../../../assets/images/razkids.png";
import Udemy from "../../../../assets/images/udemy.png";
import { CheckSolid } from "../../../../icons";

export default function AppManagement({ dropdownValue }) {
  const [changeValue, setChangeValue] = useState({});
  const [fakeAppsData, setFakeAppsData] = useState([
    { isSelected: true, appName: "Office 365", icon: "office365" },
    { isSelected: false, appName: "Khan Academy", icon: "khanAcademy" },
    { isSelected: true, appName: "Udemy", icon: "udemy" },
    { isSelected: false, appName: "Raz Kids", icon: "razkids" },
    { isSelected: false, appName: "Messenger", icon: "morpa" },
    {
      isSelected: false,
      appName: "Okuvaryum Öğretmen",
      icon: "okuvaryumstudent",
    },
    {
      isSelected: true,
      appName: "Okuvaryum Öğrenci",
      icon: "okuvaryumteacher",
    },
    { isSelected: false, appName: "Brain Pop", icon: "brainpop" },
    { isSelected: false, appName: "Activelulearn", icon: "activelylearn" },
  ]);
  useEffect(() => {
    if (changeValue.index)
      fakeAppsData[changeValue.index].isSelected = !fakeAppsData[
        changeValue.index
      ].isSelected;
  });
  return (
    <>
      <div className={styles.apps}>
        <div className={styles.appsContainer}>
          <div className={styles.title}>
            {dropdownValue === "Sınıf Seçiniz"
              ? "Tüm Uygulamalar"
              : `${dropdownValue}ın Uygulamalar Listesi`}{" "}
            <span></span>
          </div>
          <div className={styles.appsGrid}>
            {fakeAppsData.map((item, index) => {
              return (
                <div
                  onClick={() => {}}
                  className={`${styles.renderApps} ${
                    item.isSelected ? styles.selected : ""
                  }`}
                >
                  {item.isSelected ? (
                    <div className={styles.checkSolid}>
                      <CheckSolid className={styles.checkSolidIcon} />
                    </div>
                  ) : (
                    ""
                  )}
                  <div className={styles.appAvatar}>
                    <RenderIcon iconName={item.icon} className={styles.icon} />
                  </div>
                  <div className={styles.appName}>{item.appName}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
let fakeAppsData = [
  { isSelected: true, appName: "Office 365", icon: "office365" },
  { isSelected: false, appName: "Khan Academy", icon: "khanAcademy" },
  { isSelected: true, appName: "Udemy", icon: "udemy" },
  { isSelected: false, appName: "Raz Kids", icon: "razkids" },
  { isSelected: false, appName: "Messenger", icon: "morpa" },
  {
    isSelected: false,
    appName: "Okuvaryum Öğretmen",
    icon: "okuvaryumstudent",
  },
  {
    isSelected: true,
    appName: "Okuvaryum Öğrenci",
    icon: "okuvaryumteacher",
  },
  { isSelected: false, appName: "Brain Pop", icon: "brainpop" },
  { isSelected: false, appName: "Activelulearn", icon: "activelylearn" },
];

function RenderIcon(props) {
  let { iconName } = props;
  console.log(iconName);
  if (iconName === "office365") {
    return <img src={Office} {...props} className={styles.office} />;
  } else if (iconName === "khanAcademy") {
    return <img src={KhanAcademy} {...props} />;
  } else if (iconName === "udemy") {
    return <img src={Udemy} {...props} />;
  } else if (iconName === "razkids") {
    return <img src={RazKids} {...props} />;
  } else if (iconName === "morpa") {
    return <img src={Morpa} {...props} className={styles.morpa} />;
  } else if (iconName === "okuvaryumstudent") {
    return <img src={Okuvaryum} {...props} />;
  } else if (iconName === "okuvaryumteacher") {
    return <img src={Okuvaryum} {...props} />;
  } else if (iconName === "brainpop") {
    return <img src={BrainPop} {...props} className={styles.brain} />;
  } else if (iconName === "activelylearn") {
    return <img src={Actively} {...props} className={styles.actively} />;
  } else return "none";
}
