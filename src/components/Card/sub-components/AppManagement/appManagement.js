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
import RazPlus from "../../../../assets/images/razPlus.svg";
import ScienceAz from "../../../../assets/images/ScienceAz.svg";
import WritingAz from "../../../../assets/images/writingAz.svg";

import VocabularyAz from "../../../../assets/images/vocabulary.png";
import { CheckSolid } from "../../../../icons";
import Button from "../../../Button/button";
import AppsRender from "../../../Apps/apps";
import {
  GetSpecifiApps,
  GetToken,
  SaveSpecificApps,
} from "../../../../actions/action";
import { useLocation, useParams } from "react-router-dom";

export default function AppManagement({ dropdownValue, appData, setAppData }) {
  const [changeValue, setChangeValue] = useState([]);

  const { id } = useParams();
  const [fakeAppsData, setFakeAppsData] = useState([
    { isSelected: true, appName: "Office 365", icon: "office365" },
    { isSelected: false, appName: "Khan Academy", icon: "khanAcademy" },
    // { isSelected: true, appName: "Udemy", icon: "udemy" },
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
  const token = GetToken();

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
            {appData.data?.data[0].Apps.map((item, index) => {
              return (
                <div
                  onClick={() => {
                    let arr = appData;
                    arr.data.data[0].Apps[index].isSet = !item.isSet;
                    setAppData(arr);
                  }}
                >
                  <AppsRender
                    iconName={item.app.name}
                    appName={item.app.title}
                    isSelected={item.isSet}
                    onClick={(e) => {
                      if (sArray.length > 1) {
                        if (sArray[sArray.length - 2] !== e) sArray.push(e);
                      } else {
                        sArray.push(e);
                      }
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <Button
          onClick={() => {
            SaveSpecificApps(token, appData.data.data).then((item) => {
              window.location.reload();
            });
          }}
          type={"primary"}
          title={"Kaydet"}
        />
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

// function RenderIcon(props) {
//   let { iconName } = props;
//   console.log(iconName);
//   if (iconName === "office365") {
//     return <img src={Office} {...props} className={styles.office} />;
//   } else if (iconName === "khanAcademy") {
//     return <img src={KhanAcademy} {...props} />;
//   } else if (iconName === "udemy") {
//     return <img src={Udemy} {...props} />;
//   } else if (iconName === "razkids") {
//     return <img src={RazKids} {...props} />;
//   } else if (iconName === "morpa") {
//     return <img src={Morpa} {...props} className={styles.morpa} />;
//   } else if (iconName === "okuvaryumstudent") {
//     return <img src={Okuvaryum} {...props} />;
//   } else if (iconName === "okuvaryumteacher") {
//     return <img src={Okuvaryum} {...props} />;
//   } else if (iconName === "brainpop") {
//     return <img src={BrainPop} {...props} className={styles.brain} />;
//   } else if (iconName === "activelylearn") {
//     return <img src={Actively} {...props} className={styles.actively} />;
//   } else if (iconName === "eba") {
//     return <img src={Eba} {...props} className={styles.actively} />;
//   } else if (iconName === "k12") {
//     return <img src={Meb} {...props} className={styles.actively} />;
//   } else if (iconName === "cambridge") {
//     return <img src={Cambridge} {...props} className={styles.actively} />;
//   } else return "none";
// }

const sArray = [];
