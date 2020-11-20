import React, { useEffect, useState } from "react";
import { GetToken, GetUser } from "../../../../actions/action";
import { Edit, IconLock, Inbox } from "../../../../icons";
import Background from "../../../../assets/images/classroom.jpg";
import Card from "../../card";
import styles from "./settings.module.scss";
import Input from "../../../Input/input";
import Button from "../../../Button/button";

export default function Settings() {
  const token = GetToken();
  const [userData, setUserData] = useState([]);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [classroomName, setClassroomName] = useState("");
  const [tabsType, setTabsType] = useState("myAccount");
  const [oldPassword, setOldPassword] = useState("");
  useEffect(() => {
    GetUser(token).then((data) => {
      setUserData(data);
      setName(data.data.data.first_name + " " + data.data.data.last_name);
      setAvatar(data.data.data.profile_photo);
      setClassroomName(
        data.data.data.studentInfo && data.data.data.studentInfo.class
          ? data.data.data.studentInfo.class.name
          : null
      );
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
            Uygulamarım
          </div>
        </div>
      </div>

      {/* ****** Profile ****** */}
      {tabsType === "myAccount" ? (
        <div
          style={{ display: "flex" }}
          classroomName={styles.settingsProfileWrapper}
        >
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
            <h3>Yeni şifren</h3>
            <Input
              onChange={(e) => setOldPassword(e.target.value)}
              method={"changePassword"}
              type={"password"}
              placeholder={"Yeni şifren"}
              inputStyle={"change"}
              value={oldPassword}
            >
              <IconLock className={styles.icon} />
            </Input>
            <Input
              onChange={(e) => setOldPassword(e.target.value)}
              method={"changePassword"}
              type={"password"}
              placeholder={"Yeni şifren tekrar"}
              inputStyle={"change"}
              value={oldPassword}
            >
              <IconLock className={styles.icon} />
            </Input>
            <Button type={"change"} title={"Şifremi değiştir"} />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
