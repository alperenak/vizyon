import React, { useState } from "react";
import styles from "./apps.module.scss";
import Office from "../../assets/images/office.png";
import Actively from "../../assets/images/actively.png";
import BrainPop from "../../assets/images/brainpop.png";
import KhanAcademy from "../../assets/images/khan.png";
import Morpa from "../../assets/images/morpa.png";
import Okuvaryum from "../../assets/images/okvaryum.png";
import RazPlus from "../../assets/images/razPlus.svg";
import ScienceAz from "../../assets/images/ScienceAz.svg";
import WritingAz from "../../assets/images/writingAz.svg";
import VocabularyAz from "../../assets/images/vocabulary.png";
import Eba from "../../assets/images/eba.png";
import Cambridge from "../../assets/images/cambridge.png";
import Meb from "../../assets/images/meb.jpg";
import RazKids from "../../assets/images/razkids.png";
import { CheckSolid } from "../../icons";
import Udemy from "../../assets/images/udemy.png";
import BrainModify from "../../assets/images/brainModify.png";
import Compass from "../../assets/images/compass.png";
import HiglightsLibrary from "../../assets/images/higlightsLibrary.png";
import LinguAttack from "../../assets/images/linguaAttack.svg";
import MicrosoftTeams from "../../assets/images/microsoftTeams.png";
import MyEduClass from "../../assets/images/myEduClass.png";
import MyOn from "../../assets/images/myOn.jpg";
import Pearson from "../../assets/images/pearson.svg";
import sebitVCloud from "../../assets/images/sebitVCloud.png";
import Rockalingua from "../../assets/images/rockalingualogo.png";
import Raunt from "../../assets/images/raunt.png";

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
  } else if (iconName === "vocabularyaz") {
    return <img src={VocabularyAz} {...props} className={styles.actively} />;
  } else if (iconName === "scienceaz") {
    return <img src={ScienceAz} {...props} className={styles.actively} />;
  } else if (iconName === "writingaz") {
    return <img src={WritingAz} {...props} className={styles.actively} />;
  } else if (iconName === "razplus") {
    return <img src={RazPlus} {...props} className={styles.actively} />;
  } else if (iconName === "eba") {
    return <img src={Eba} {...props} className={styles.actively} />;
  } else if (iconName === "k12") {
    return <img src={Meb} {...props} className={styles.actively} />;
  } else if (iconName === "unlocklearning") {
    return <img src={Cambridge} {...props} className={styles.actively} />;
  } else if (iconName === "brainmodify") {
    return <img src={BrainModify} {...props} className={styles.actively} />;
  } else if (iconName === "rockalingua") {
    return <img src={Rockalingua} {...props} className={styles.actively} />;
  } else if (iconName === "pearsonenglishportal") {
    return <img src={Pearson} {...props} className={styles.actively} />;
  } else if (iconName === "microsoftteams") {
    return <img src={MicrosoftTeams} {...props} className={styles.actively} />;
  } else if (iconName === "linguaattack") {
    return <img src={LinguAttack} {...props} className={styles.actively} />;
  } else if (iconName === "myeduclass") {
    return <img src={MyEduClass} {...props} className={styles.actively} />;
  } else if (iconName === "myon") {
    return <img src={MyOn} {...props} className={styles.actively} />;
  } else if (iconName === "myeduclass") {
    return <img src={MyEduClass} {...props} className={styles.actively} />;
  } else if (iconName === "vcloud") {
    return <img src={sebitVCloud} {...props} className={styles.actively} />;
  } else if (iconName === "raunt") {
    return <img src={Raunt} {...props} className={styles.actively} />;
  } else if (iconName === "compass") {
    return <img src={Compass} {...props} className={styles.actively} />;
  } else if (iconName === "highlightslibrary") {
    return (
      <img src={HiglightsLibrary} {...props} className={styles.actively} />
    );
  } else return "none";
}
