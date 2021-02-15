import React, { useEffect, useState } from "react";
import styles from "./apps.module.scss";

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
import Zoom from "../../assets/images/zoom.png";

export default function Apps() {
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
                ? 9
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
              {AppsData && AppsData.data && AppsData.data.data.length !== 0 ? (
                AppsData.data?.data[0].Apps.length !== 0 ? (
                  AppsData.data?.data[0].Apps.filter((item) => {
                    return item.isSet === true;
                  }).map((item, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => {
                          GetSSO(token, item.app._id)
                            .then((data) => {
                              window.open(data.data.data);
                            })
                            .catch(() => window.open(item.app.url));
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
                )
              ) : (
                <div style={{ marginLeft: 25 }}>
                  Uygulama bilgisi bulunamadı
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function RenderIcon(props) {
  let { iconName } = props;
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
  } else if (iconName === "zoom") {
    return <img src={Zoom} {...props} className={styles.actively} />;
  } else return "none";
}
