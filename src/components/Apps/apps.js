import React, { useState } from "react";
import styles from "./apps.module.scss";
import Office from "../../assets/images/office.png";
import Actively from "../../assets/images/actively.png";
import BrainPop from "../../assets/images/brainpop.png";
import KhanAcademy from "../../assets/images/khan.png";
import Morpa from "../../assets/images/morpa.png";
import RazPlus from "../../assets/images/razPlus.svg";
import Okuvaryum from "../../assets/images/okvaryum.png";
import BrainModify from "../../assets/images/brainModify.png";
import HiglightsLibrary from "../../assets/images/higlightsLibrary.png";
import Compass from "../../assets/images/compass.png";
import Raunt from "../../assets/images/raunt.png";
import sebitVCloud from "../../assets/images/sebitVCloud.png";
import MyOn from "../../assets/images/myOn.jpg";
import MyEduClass from "../../assets/images/myEduClass.png";
import LinguAttack from "../../assets/images/linguaAttack.svg";
import MicrosoftTeams from "../../assets/images/microsoftTeams.png";
import Pearson from "../../assets/images/pearson.svg";
import Rockalingua from "../../assets/images/rockalingualogo.png";
import ScienceAz from "../../assets/images/ScienceAz.svg";
import WritingAz from "../../assets/images/writingAz.svg";
import VocabularyAz from "../../assets/images/vocabulary.png";
import Eba from "../../assets/images/eba.png";
import Cambridge from "../../assets/images/cambridge.png";
import Meb from "../../assets/images/meb.jpg";
import RazKids from "../../assets/images/razkids.png";
import { CheckSolid } from "../../icons";
import Udemy from "../../assets/images/udemy.png";
import Zoom from "../../assets/images/zoom.png";
export default function Apps({
  iconName,
  appName,
  onClick,
  isSelected = false,
}) {
  const [isActive, setIsActive] = useState(isSelected);
  return (
    <div
      onClick={
        (onClick({ appname: appName, isSelected: isActive }),
        () => {
          setIsActive(!isActive);
        })
      }
      className={`${styles.renderApps} ${isActive ? styles.selected : ""}`}
    >
      {isActive ? (
        <div className={styles.checkSolid}>
          <CheckSolid className={styles.checkSolidIcon} />
        </div>
      ) : (
        ""
      )}
      <div className={styles.appAvatar}>
        <RenderIcon iconName={iconName} className={styles.icon} />
      </div>
      <div className={styles.appName}>{appName}</div>
    </div>
  );
}

export function RenderIcon(props) {
  let { iconName } = props;

  console.log(iconName);

  if (iconName === "office365" || iconName.includes("Office")) {
    return <img src={Office} {...props} className={styles.office} />;
  } else if (iconName === "khanAcademy" || iconName.includes("Khan")) {
    return <img src={KhanAcademy} {...props} />;
  } else if (iconName === "udemy" || iconName.includes("Udemy")) {
    return <img src={Udemy} {...props} />;
  } else if (iconName === "razkids" || iconName.includes("Raz Kids")) {
    return <img src={RazKids} {...props} />;
  } else if (iconName === "morpa" || iconName.includes("Morpa")) {
    return <img src={Morpa} {...props} className={styles.morpa} />;
  } else if (
    iconName === "okuvaryumstudent" ||
    iconName.includes("Okuvaryum")
  ) {
    return <img src={Okuvaryum} {...props} />;
  } else if (
    iconName === "okuvaryumteacher" ||
    iconName.includes("Okuvaryum Öğretmen")
  ) {
    return <img src={Okuvaryum} {...props} />;
  } else if (iconName === "brainpop" || iconName.includes("Brain Pop")) {
    return <img src={BrainPop} {...props} className={styles.brain} />;
  } else if (iconName === "activelylearn" || iconName.includes("Actively")) {
    return <img src={Actively} {...props} className={styles.actively} />;
  } else if (iconName === "vocabularyaz" || iconName.includes("Vocabulary")) {
    return <img src={VocabularyAz} {...props} className={styles.actively} />;
  } else if (iconName === "scienceaz" || iconName.includes("Science")) {
    return <img src={ScienceAz} {...props} className={styles.actively} />;
  } else if (iconName === "writingaz" || iconName.includes("Writing")) {
    return <img src={WritingAz} {...props} className={styles.actively} />;
  } else if (iconName === "razplus" || iconName.includes("Raz Plus")) {
    return <img src={RazPlus} {...props} className={styles.actively} />;
  } else if (iconName === "eba" || iconName.includes("Eba")) {
    return <img src={Eba} {...props} className={styles.actively} />;
  } else if (iconName === "k12" || iconName.includes("K12")) {
    return <img src={Meb} {...props} className={styles.actively} />;
  } else if (iconName === "unlocklearning" || iconName.includes("Cambridge")) {
    return <img src={Cambridge} {...props} className={styles.actively} />;
  } else if (iconName === "zoom" || iconName.includes("Zoom")) {
    return <img src={Zoom} {...props} className={styles.actively} />;
  } else if (iconName === "brainmodify" || iconName.includes("Brain Modify")) {
    return <img src={BrainModify} {...props} className={styles.actively} />;
  } else if (iconName === "rockalingua" || iconName.includes("Rock")) {
    return <img src={Rockalingua} {...props} className={styles.actively} />;
  } else if (
    iconName === "pearsonenglishportal" ||
    iconName.includes("Pearson")
  ) {
    return <img src={Pearson} {...props} className={styles.actively} />;
  } else if (iconName === "microsoftteams" || iconName.includes("Microsoft")) {
    return <img src={MicrosoftTeams} {...props} className={styles.actively} />;
  } else if (iconName === "linguaattack" || iconName.includes("Lingua")) {
    return <img src={LinguAttack} {...props} className={styles.actively} />;
  } else if (iconName === "myeduclass" || iconName.includes("MyEdu")) {
    return <img src={MyEduClass} {...props} className={styles.actively} />;
  } else if (iconName === "myon" || iconName.includes("MyOn")) {
    return <img src={MyOn} {...props} className={styles.actively} />;
  } else if (iconName === "myeduclass" || iconName.includes("MyEdu")) {
    return <img src={MyEduClass} {...props} className={styles.actively} />;
  } else if (iconName === "vcloud" || iconName.includes("Vcloud")) {
    return <img src={sebitVCloud} {...props} className={styles.actively} />;
  } else if (iconName === "raunt" || iconName.includes("Raunt")) {
    return <img src={Raunt} {...props} className={styles.actively} />;
  } else if (iconName === "compass" || iconName.includes("Compass")) {
    return <img src={Compass} {...props} className={styles.actively} />;
  } else if (
    iconName === "highlightslibrary" ||
    iconName.includes("Higlight")
  ) {
    return (
      <img src={HiglightsLibrary} {...props} className={styles.actively} />
    );
  } else if (iconName === "zoom" || iconName.includes("Zoom")) {
    return <img src={Zoom} {...props} className={styles.actively} />;
  } else return "none";
}
