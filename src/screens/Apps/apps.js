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

export default function Apps() {
  const [count, setCount] = useState(fakeAppsData.length);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useContext(UserContext);
  const token = GetToken();
  useEffect(() => {
    if (IsAuth(token)) {
      if (!userData) {
        setLoading(true);
        GetUser(token)
          .then((data) => {
            setUserData(data);
            IsAdmin(data);
          })
          .then(() => setLoading(false))
          .catch((e) => window.location.reload());
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
              {userData &&
              userData !== null &&
              userData.data.data.platforms !== null &&
              userData.data.data.platforms.length !== 0 ? (
                userData.data.data.platforms.map((item) => {
                  return (
                    <div
                      onClick={() => {
                        GetSSO(token, item.name).then((data) => {
                          window.open(data.data.data);
                        });
                      }}
                      className={styles.renderApps}
                    >
                      <div className={styles.appAvatar}>
                        <RenderIcon
                          iconName={geIconName(item)}
                          className={styles.icon}
                        />
                      </div>
                      <div className={styles.appName}>{getAppName(item)}</div>
                    </div>
                  );
                })
              ) : (
                <div>data yok</div>
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
const fakeAppsData = [
  { appName: "Office 365", icon: "microsoft" },
  { appName: "Teams", icon: "teams" },
  { appName: "Inbox", icon: "inbox" },
  { appName: "Statistics", icon: "pieChart" },
  { appName: "Messenger", icon: "Messenger" },
  { appName: "Quizs", icon: "Quiz" },
  { appName: "Awards", icon: "Medal" },
];
