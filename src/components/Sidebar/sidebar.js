import React from "react";
import styles from "./sidebar.module.scss";
import Logo from "../../assets/images/logo.png";
import { useLocation, useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import {
  ActivityIcon,
  AnnouncementsIcon,
  AppsManagementIcon,
  ClassesManagementIcon,
  ExamManagementIcon,
  LogOutIcon,
  SyllabusManagementIcon,
  UserManagementIcon,
} from "../../icons";
export default function SideBar() {
  const { pathname } = useLocation();
  const history = useHistory();
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookies, removeCookies] = useCookies(["token"]);
  const buttons = [
    {
      title: "Kullanıcı Yönetimi",
      icon: <UserManagementIcon className={styles.sidebarIcon} />,
      path: getPath("user"),
    },
    {
      title: "Sınıf Yönetimi",
      icon: <ClassesManagementIcon className={styles.sidebarIcon} />,
      path: getPath("class"),
    },
    {
      title: "Duyurular",
      icon: <AnnouncementsIcon className={styles.sidebarIcon} />,
      path: getPath("announcements"),
    },
    {
      title: "Ders Programı",
      icon: <SyllabusManagementIcon className={styles.sidebarIcon} />,
      path: getPath("syllabus"),
    },
    {
      title: "Sınav Yönetimi",
      icon: <ExamManagementIcon className={styles.sidebarIcon} />,
      path: getPath("exams"),
    },
    {
      title: "Uygulama Yönetimi",
      icon: <AppsManagementIcon className={styles.sidebarIcon} />,
      path: getPath("apps"),
    },
    {
      title: "Raporlar",
      icon: <ActivityIcon className={styles.sidebarIcon} />,
      path: getPath("activity"),
    },
  ];
  return (
    <div className={styles.sidebarContainer}>
      <div className={styles.sidebarCard}>
        <div className={styles.logo}>
          <img src={Logo} alt="sidebar-logo" width="133" />
        </div>
        <div className={styles.sidebarButtons}>
          {buttons.map((item, index) => {
            return (
              <div
                key={index}
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
            className={styles.sidebarButton}
          >
            <LogOutIcon className={styles.sidebarIcon} />
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
