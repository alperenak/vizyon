import React, { useState, useContext, useEffect } from "react";
import SideBar from "../../components/Sidebar/sidebar";
import styles from "./admin.module.scss";
import Card from "../../components/Card/card";
import { UserContext } from "../../context/userContext";
import IsAdmin, {
  GetToken,
  IsAuth,
  GetUser,
  GetAnnouncements,
} from "../../actions/action";
import Modal from "../../components/Modal/modal";
import Input from "../../components/Input/input";
import Button from "../../components/Button/button";
import { useLocation } from "react-router-dom";
import { Down, SearchSolid } from "../../icons";
export default function Admin() {
  const [announcementsData, setAnnouncementsData] = useState(false);
  const [userData, setUserData] = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(false);
  const token = GetToken();
  const { pathname } = useLocation();
  useEffect(() => {
    console.log(announcementsData);
    if (IsAuth(token)) {
      if (!userData) {
        setLoading(true);
        GetUser(token)
          .then((data) => {
            setUserData(data);
            console.log(data);
          })
          .then(() => setLoading(false))
          .catch((e) => console.error(e));
      }
      if (!announcementsData) {
        GetAnnouncements(5, 1, token)
          .then((data) => {
            setAnnouncementsData(data);
            console.log(data);
          })
          .catch((e) => console.error(e));
      }
    }
  });
  return (
    <div className={styles.adminContainer}>
      <SideBar />
      <div className={styles.adminMain}>
        {/* <Card
          type={"announcements"}
          announcementsData={
            announcementsData ? announcementsData.data.data : []
          }
          isAdmin={true}
        /> */}
        <RenderCard pathname={pathname} announcementsData={announcementsData} />
      </div>
    </div>
  );
}

function RenderCard({ pathname, announcementsData }) {
  const [dropdownActive, setDropdownActive] = useState();
  const [dropdownName, setDropdownName] = useState("Sınıf Seçiniz");
  const dropdownNames = document.getElementById("dropdownName");
  const dropdownIcon = document.getElementById("dropdownIcon");
  window.onclick = function (e) {
    console.log(e.target);
    if (e.target !== dropdownNames && e.target !== dropdownIcon) {
      console.log(e.target !== dropdownNames);
      setDropdownActive(false);
    }
  };
  if (pathname === "/admin/announcements")
    return (
      <Card
        type={"announcements"}
        announcementsData={announcementsData ? announcementsData.data.data : []}
        isAdmin={true}
      />
    );
  else if (pathname === "/admin/class") {
    return (
      <>
        <div className={styles.topSide}>
          <Input inputStyle={"search"}>
            <SearchSolid className={styles.searchIcon} />
          </Input>
          <div
            id={"classDropdown"}
            onClick={() => setDropdownActive(!dropdownActive)}
            className={styles.dropdown}
          >
            <div id={"dropdownName"} className={styles.dropdownName}>
              <Down id={"dropdownIcon"} className={styles.downIcon} />
              {dropdownName}
            </div>
            <div
              className={`${styles.dropdownContent}  ${
                dropdownActive ? styles.active : ""
              }`}
              onClick={() => {}}
            >
              {ClassesNameData.map((item) => {
                return (
                  <div
                    onClick={() => setDropdownName(item.name)}
                    className={styles.dropdownItems}
                  >
                    {item.name}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <Card type={"classManagement"} />
      </>
    );
  } else return <></>;
}

const ClassesNameData = [
  {
    name: "1. Sınıflar",
  },
  {
    name: "2. Sınıflar",
  },
  {
    name: "3. Sınıflar",
  },
  {
    name: "4. Sınıflar",
  },
  {
    name: "5. Sınıflar",
  },
];
