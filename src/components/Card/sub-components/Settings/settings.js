import React, { useEffect, useState } from "react";
import {
  GetToken,
  GetUser,
  GetUserAppPassword,
  UpdateUserAppPassword,
  UpdateUserPassword,
} from "../../../../actions/action";
import {
  CheckSolidCircle,
  Edit,
  EditSolid,
  IconLock,
  IconUser,
  TimesCircleSolid,
} from "../../../../icons";
import Background from "../../../../assets/images/classroom.jpg";
import styles from "./settings.module.scss";
import Input from "../../../Input/input";
import Button from "../../../Button/button";
import Office from "../../../../assets/images/office.png";
import Actively from "../../../../assets/images/actively.png";
import BrainPop from "../../../../assets/images/brainpop.png";
import KhanAcademy from "../../../../assets/images/khan.png";
import Morpa from "../../../../assets/images/morpa.png";
import Okuvaryum from "../../../../assets/images/okvaryum.png";
import RazPlus from "../../../../assets/images/razPlus.svg";
import ScienceAz from "../../../../assets/images/ScienceAz.svg";
import WritingAz from "../../../../assets/images/writingAz.svg";
import VocabularyAz from "../../../../assets/images/vocabulary.png";
import Eba from "../../../../assets/images/eba.png";
import Cambridge from "../../../../assets/images/cambridge.png";
import Meb from "../../../../assets/images/meb.jpg";
import RazKids from "../../../../assets/images/razkids.png";
import Udemy from "../../../../assets/images/udemy.png";
import Zoom from "../../../../assets/images/zoom.png";
import Modal from "../../../Modal/modal";
export default function Settings() {
  const token = GetToken();
  const [setUserData] = useState([]);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [classroomName, setClassroomName] = useState("");
  const [tabsType, setTabsType] = useState("myAccount");
  const [oldPassword, setOldPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordAgain, setNewPasswordAgain] = useState("");
  const [appData] = useState([]);
  const [appPasswordData, setAppPasswordData] = useState([]);
  const [isActiveModal, setIsActiveModal] = useState(false);
  const [passwordId] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [payload] = useState([]);
  useEffect(() => {
    GetUser(token).then((data) => {
      setUserData(data);
      setUserId(data.data.data.id);

      setName(data.data.data.first_name + " " + data.data.data.last_name);
      setAvatar(data.data.data.profile_photo);
      setClassroomName(
        data.data.data.studentInfo && data.data.data.studentInfo.class
          ? data.data.data.studentInfo.class.name
          : null
      );
      GetUserAppPassword(token, data.data.data.id).then((data) => {
        setAppPasswordData(data.data.data);
      });
    });
  }, []);
  return (
    <div className={styles.settings}>
      <div className={styles.topSide}>
        <div className={styles.title}>Ayarlar</div>
        <div className={styles.tabs}>
          <div
            className={`${styles.tabsButton} ${
              tabsType === "myAccount" ? styles.tabsButtonActive : ""
            }`}
            onClick={() => setTabsType("myAccount")}
          >
            Hesabım
          </div>
          <div
            className={`${styles.tabsButton} ${
              tabsType === "myApps" ? styles.tabsButtonActive : ""
            }`}
            onClick={() => setTabsType("myApps")}
          >
            Uygulamalarım
          </div>
        </div>
      </div>

      {/* ****** Profile ****** */}
      {tabsType === "myAccount" ? (
        <div className={styles.settingsProfileWrapper}>
          <div className={styles.classesCard}>
            <div className={styles.classBackground}>
              <img src={Background} />
            </div>
            <div className={styles.teacherAvatarBackground}>
              <div className={styles.teacherAvatar}>
                <img src={avatar} />
                <Edit className={styles.editIcon} />
              </div>
            </div>
            <div className={styles.name}>{name}</div>
            <div className={styles.classroomName}>{classroomName}</div>
            <div className={styles.alertboxes}></div>
          </div>

          <div className={styles.changePasswordContainer}>
            <h3>Şifre Değiştirme</h3>
            <Input
              onChange={(e) => setOldPassword(e.target.value)}
              method={"changePassword"}
              type={"password"}
              placeholder={"Eski şifren"}
              inputStyle={"change"}
              value={oldPassword}
            >
              <IconLock className={styles.icon} />
            </Input>
            <h3>Yeni Şifre</h3>
            <Input
              onChange={(e) => setNewPassword(e.target.value)}
              method={"changePassword"}
              type={"password"}
              placeholder={"Yeni Şifre"}
              inputStyle={"change"}
              value={newPassword}
            >
              <IconLock className={styles.icon} />
              {newPassword &&
              newPasswordAgain &&
              newPassword !== "" &&
              newPasswordAgain !== "" &&
              newPassword !== newPasswordAgain ? (
                <TimesCircleSolid className={styles.timesSolid} />
              ) : newPassword &&
                newPasswordAgain &&
                newPassword !== "" &&
                newPasswordAgain !== "" &&
                newPassword === newPasswordAgain ? (
                <CheckSolidCircle className={styles.checkSolid} />
              ) : (
                ""
              )}
            </Input>
            <Input
              onChange={(e) => setNewPasswordAgain(e.target.value)}
              method={"changePassword"}
              type={"password"}
              placeholder={"Yeni Şifre Tekrar"}
              inputStyle={"change"}
              value={newPasswordAgain}
            >
              <IconLock
                className={styles.icon}
                style={{ width: 20, height: 20 }}
              />
              {newPassword &&
              newPasswordAgain &&
              newPassword !== "" &&
              newPasswordAgain !== "" &&
              newPassword !== newPasswordAgain ? (
                <TimesCircleSolid
                  style={{ width: 20, height: 20 }}
                  className={styles.timesSolid}
                />
              ) : newPassword &&
                newPasswordAgain &&
                newPassword !== "" &&
                newPasswordAgain !== "" &&
                newPassword === newPasswordAgain ? (
                <CheckSolidCircle className={styles.checkSolid} />
              ) : (
                ""
              )}
            </Input>
            {errorMessage ? (
              <div className={styles.errorMessage}>{errorMessage}</div>
            ) : (
              ""
            )}
            <Button
              type={"change"}
              title={"Şifremi değiştir"}
              onClick={() => {
                if (
                  newPassword &&
                  newPasswordAgain &&
                  newPassword !== "" &&
                  newPasswordAgain !== "" &&
                  newPassword === newPasswordAgain
                ) {
                  UpdateUserPassword(token, {
                    userId: userId,
                    oldPassword: oldPassword,
                    newPassword: newPassword,
                  })
                    .then(() => {
                      alert("Şifreniz başarıyla değiştildi");
                      window.location.replace("/");
                    })
                    .catch(() => setErrorMessage("Eski şifren yanlış"));
                }
              }}
            />
          </div>
        </div>
      ) : (
        <div className={styles.appsPasswords}>
          <div className={styles.titles}>
            <div className={styles.appNameTitle}>Uygulama Adı</div>
            <div className={styles.usernameTitle}>Kullanıcı Adı</div>
            <div className={styles.passwordTitle}>Şifre</div>
            <div className={styles.edit}>Düzenle</div>
          </div>
          <div className={styles.renderApps}>
            {appPasswordData && appPasswordData.length !== 0
              ? appPasswordData.map((item, index) => {
                  return (
                    <div className={styles.renderAppRow} key={index}>
                      <div className={styles.appAvatarWrapper}>
                        <div className={styles.appAvatar}>
                          <RenderIcon
                            iconName={item.app.name}
                            className={styles.icon}
                          />
                        </div>
                        <div className={styles.appName}>{item.app.title}</div>
                      </div>

                      <div className={styles.appUsername}>
                        {"Veri eklenmedi"}
                      </div>
                      <div className={styles.appPassword}>{"********"}</div>
                      <EditSolid className={styles.editIcon} />
                    </div>
                  );
                })
              : ""}
          </div>
        </div>
      )}
      <Modal isActive={isActiveModal} setIsActive={setIsActiveModal}>
        <RenderModalContent
          setIsActive={setIsActiveModal}
          appData={appData}
          userId={userId}
          passwordId={passwordId}
          payload={payload}
        />
      </Modal>
    </div>
  );
}
export function RenderModalContent({ appData, userId, payload }) {
  const [appUsername, setAppUsername] = useState({ status: true });
  const [appPassword, setAppPassword] = useState({ status: true });
  const token = GetToken();
  return (
    <div>
      <h3>Uygulama Şifresi Değiştirme</h3>
      <Input
        onChange={(e) => setAppUsername(e.target.value)}
        method={"changePassword"}
        value={
          appUsername && appUsername.status ? appData.username : appUsername
        }
        type={"text"}
        placeholder={"Kullanıcı Adın"}
        inputStyle={"change"}
      >
        <IconUser className={styles.modalIcon} />
      </Input>
      <Input
        onChange={(e) => setAppPassword(e.target.value)}
        method={"changePassword"}
        type={"password"}
        placeholder={"Eski şifren"}
        inputStyle={"change"}
        value={
          appPassword && appPassword.status ? appData.password : appPassword
        }
      >
        <IconLock className={styles.modalIcon} />
      </Input>
      <Button
        type={"change"}
        title={"Kaydet"}
        onClick={() => {
          if (appData.username) {
            const credentials = {
              username:
                typeof appUsername === "string"
                  ? appUsername
                  : appData.username,
              password:
                typeof appPassword === "string"
                  ? appPassword
                  : appData.password,
            };
            UpdateUserAppPassword(token, userId, payload._id, {
              credentials: credentials,
              _id: payload._id,
              app: payload.app,
              user: payload.user,
            })
              .then(() => {
                alert("Uygulama şifresi değiştirme başarılı");
                window.location.reload();
              })
              .catch(() => alert("Bir hata oluştu"));
          }
        }}
      />
    </div>
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
