import React from "react";
import styles from "./sidebar.module.scss";
import Logo from "../../assets/images/logo.png";
import Clock from "../../icons/Clock";
import { useLocation, useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
export default function SideBar() {
  const { pathname } = useLocation();
  const history = useHistory();
  const [cookies, setCookies, removeCookies] = useCookies(["token"]);
  const pt = "/admin/";
  const buttons = [
    { title: "Anasayfa", icon: <Clock />, path: "/admin" },
    { title: "Duyurular", icon: <Clock />, path: getPath("announcements") },
    { title: "Sınıf Yönetimi", icon: <Clock />, path: getPath("class") },
    { title: "Kullanıcı Yönetimi", icon: <Clock />, path: getPath("user") },
    { title: "Ders Prgoramı", icon: <Clock />, path: getPath("syllabus") },
    { title: "Aktivite Yönetimi", icon: <Clock />, path: getPath("activity") },
  ];
  return (
    <div className={styles.sidebarContainer}>
      <div className={styles.sidebarCard}>
        <div className={styles.logo}>
          <img src={Logo} alt="sidebar-logo" width="133" />
        </div>
        <div className={styles.sidebarButtons}>
          {buttons.map((item) => {
            return (
              <div
                onClick={() => history.push(item.path)}
                className={`${styles.sidebarButton} ${
                  pathname === item.path ? styles.buttonActive : ""
                }`}
              >
                {item.icon}
                <div className={styles.buttonTitle}>{item.title}</div>
              </div>
            );
          })}
          <div
            onClick={() => {
              removeCookies("token", { path: "/" });
              removeCookies("admin", { path: "/" });
            }}
            className={`${styles.sidebarButton}`}
          >
            <Clock />
            <div className={styles.buttonTitle}>Çıkış Yap</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getPath(path) {
  return `/admin/${path}`;
}
