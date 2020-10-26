import React, { useContext, useEffect, useState } from "react";
import styles from "./apps.module.scss";
import {
  Groups,
  Inbox,
  Microsoft,
  PieChart,
  Comunication,
  Vlog,
  Medal,
} from "../../icons/";
import { UserContext } from "../../context/userContext";
import IsAdmin, {
  GetSpecifiApps,
  GetSSO,
  GetToken,
  GetUser,
  IsAuth,
} from "../../actions/action";
import Loading from "../../components/Loading/loading";
import Office from "../../assets/images/office.png";
import Actively from "../../assets/images/actively.png";
import BrainPop from "../../assets/images/brainpop.png";
import KhanAcademy from "../../assets/images/khan.png";
import Morpa from "../../assets/images/morpa.png";
import Okuvaryum from "../../assets/images/okvaryum.png";
import RazKids from "../../assets/images/razkids.png";
import Udemy from "../../assets/images/udemy.png";
import RazPlus from "../../assets/images/razPlus.svg";
import ScienceAz from "../../assets/images/ScienceAz.svg";
import Eba from "../../assets/images/eba.png";
import Cambridge from "../../assets/images/cambridge.png";
import Meb from "../../assets/images/meb.jpg";
import WritingAz from "../../assets/images/writingAz.svg";
import VocabularyAz from "../../assets/images/vocabulary.png";
export default function Apps() {
  const [count, setCount] = useState(fakeAppsData.length);
  const [loading, setLoading] = useState(false);
  const [AppsData, setAppsData] = useState();
  const [userData, setUserData] = useState(false);
  const token = GetToken();
  useEffect(() => {
    if (IsAuth(token)) {
      if (!userData) {
        setLoading(true);
        GetUser(token)
          .then((data) => {
            setUserData(data);
            IsAdmin(data);
            GetSpecifiApps(
              token,
              data.data.data.role === "instructor"
                ? 2
                : data.data.data.studentInfo.class.grade
            )
              .then((item) => {
                setAppsData(item);
              })
              .then(() => {
                setLoading(false);
              });
          })
          .then(() => setLoading(false))
          .catch((e) => alert(e));
      }
    } else window.location.replace("/");
  }, []);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className={styles.apps}>
          <div className={styles.appsContainer}>
            <div className={styles.title}>Uygulamalar</div>
            <div className={styles.appsGrid}>
              {AppsData &&
              AppsData !== null &&
              AppsData.data.data[0].Apps !== null &&
              AppsData.data.data[0].Apps.length !== 0 ? (
                AppsData.data.data[0].Apps.filter((item) => {
                  return item.isSet === true;
                }).map((item) => {
                  return (
                    <div
                      onClick={() => {
                        GetSSO(token, item.app._id)
                          .then((data) => {
                            window.open(data.data.data);
                          })
                          .catch((e) =>
                            alert("Kullanıcı bu platforma kayıtlı değil")
                          );
                      }}
                      className={styles.renderApps}
                    >
                      <div className={styles.appAvatar}>
                        <RenderIcon
                          iconName={item.app.name}
                          className={styles.icon}
                        />
                      </div>
                      <div className={styles.appName}>{item.app.title}</div>
                    </div>
                  );
                })
              ) : (
                <div>yükleniyor...</div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
function geIconName(item) {
  if (item && item !== null && item.name && item.name !== null) {
    return item.name;
  } else return "none";
}
function getAppName(item) {
  if (item && item !== null && item.name && item.name !== null) {
    if (item.name === "office365") return "Office 365";
    else if (item.name === "udemy") return "Udemy";
    else if (item.name === "khanAcademy") return "Khan Academy";
    else if (item.name === "razkids") return "Raz Kids";
    else if (item.name === "okuvaryumstudent") return "Okuvaryum Öğrenci";
    else if (item.name === "okuvaryumteacher") return "Okuvaryum Öğretmen";
    else if (item.name === "brainpop") return "Brain Pop";
    else if (item.name === "morpa") return "Morpa Kampüs";
    else if (item.name === "activelylearn") return "Actively Learn";
  } else return "none";
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
  } else return "none";
}
const fakeAppsData = [
  { appName: "Office 365", icon: "microsoft" },
  { appName: "Teams", icon: "teams" },
  { appName: "Inbox", icon: "inbox" },
  { appName: "Statistics", icon: "pieChart" },
  { appName: "Messenger", icon: "Messenger" },
  { appName: "Quizs", icon: "Quiz" },
  { appName: "Awards", icon: "Medal" },
];
