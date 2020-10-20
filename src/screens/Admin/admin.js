import React, { useState, useContext, useEffect, useRef } from "react";
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
import { useHistory, useLocation } from "react-router-dom";
import { Down, SearchSolid } from "../../icons";
import { useCookies } from "react-cookie";
import Login from "../../screens/Login/login";
export default function Admin() {
  const [announcementsData, setAnnouncementsData] = useState(false);
  const [newAnnouncementsData, setNewAnnouncementsData] = useState([]);
  const [userData, setUserData] = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [cookies, setCookies] = useCookies(false);
  const [active, setActive] = useState(false);
  const token = GetToken();
  const { pathname } = useLocation();
  useEffect(() => {
    if (token || cookies.admin) {
      if (IsAuth(token)) {
        if (!userData) {
          setLoading(true);
          GetUser(token)
            .then((data) => {
              setUserData(data);
            })
            .then(() => setLoading(false))
            .catch((e) => console.error(e));
        }
        if (!announcementsData) {
          GetAnnouncements(100, 1, token)
            .then((data) => {
              setAnnouncementsData(data);
            })
            .catch((e) => console.error(e));
        }
      }
    } else window.location.replace("/");
  }, [token]);
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
        <RenderCard
          pathname={pathname}
          announcementsData={announcementsData}
          setAnnouncementsData={setAnnouncementsData}
          newAnnouncementsData={newAnnouncementsData}
          setNewAnnouncementsData={setNewAnnouncementsData}
        />
      </div>
    </div>
  );
}

function RenderCard({
  pathname,
  announcementsData,
  setAnnouncementsData,
  newAnnouncementsData,
  setNewAnnouncementsData,
}) {
  const [tabsType, setTabsType] = useState("student");
  const [dropdownActive, setDropdownActive] = useState();
  const [dropdownName, setDropdownName] = useState("Sınıf Seçiniz");
  const [selectedClass, setSelectedClass] = useState("");
  const dropdownNames = document.getElementById("dropdownName");
  const dropdownIcon = document.getElementById("dropdownIcon");
  const history = useHistory();
  console.log("umarim degismiyor", announcementsData);
  window.onclick = function (e) {
    if (e.target !== dropdownNames && e.target !== dropdownIcon) {
      setDropdownActive(false);
    }
  };
  function onChangeText(evt) {
    const value = evt.target.value;
    let arr = announcementsData;
    let b = announcementsData.data.data;
    if (evt.target.value) {
      arr.data.data = b.filter((item) => {
        return item.title.includes(evt.target.value);
      });
      console.log(arr);
      setNewAnnouncementsData(arr);
    }
    document.addEventListener("keydown", (e) => {
      if (e.keyCode === 8) {
        setNewAnnouncementsData(announcementsData);
      }
    });
  }
  if (pathname === "/admin/announcements")
    return (
      <>
        <h1>Duyurular Yönetimi</h1>
        <Input placeholder="Ara" inputStyle={"search"} onChange={onChangeText}>
          <SearchSolid className={styles.searchIcon} />
        </Input>
        <Card
          type={"announcements"}
          announcementsData={
            newAnnouncementsData.length !== 0
              ? newAnnouncementsData.data?.data
              : announcementsData
              ? announcementsData.data?.data
              : []
          }
          isAdmin={true}
        />
      </>
    );
  else if (pathname === "/admin/class") {
    return (
      <>
        <h1>Sınıf Yönetimi</h1>
        <div className={styles.topSide}>
          <Input placeholder="Ara" inputStyle={"search"}>
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
                    onClick={() => {
                      setSelectedClass(item.name);
                      setDropdownName(item.name);
                    }}
                    className={styles.dropdownItems}
                  >
                    {item.name}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <Card filterClass={selectedClass[0]} type={"classManagement"} />
      </>
    );
  } else if (pathname === "/admin/user") {
    return (
      <>
        <h1>Kullanıcı Yönetimi</h1>
        <div className={styles.topSide}>
          <Input placeholder="Ara" inputStyle={"search"}>
            <SearchSolid className={styles.searchIcon} />
          </Input>
          <div className={styles.tabs}>
            <div
              className={`${styles.tabsButton} ${
                tabsType === "student" ? styles.tabsButtonActive : ""
              }`}
              onClick={() => setTabsType("student")}
            >
              Öğrenci
            </div>
            <div
              className={`${styles.tabsButton} ${
                tabsType === "teacher" ? styles.tabsButtonActive : ""
              }`}
              onClick={() => setTabsType("teacher")}
            >
              Öğretmen
            </div>
          </div>
        </div>
        <Card type={"userManagement"} tabsType={tabsType} />
      </>
    );
  } else if (pathname === "/admin/syllabus") {
    return (
      <>
        <h1>Ders Programı Yönetimi</h1>
        <Card type={"syllabusManagement"} tabsType={tabsType} />
      </>
    );
  } else if (pathname === "/admin/activity") {
    return (
      <>
        <h1>Aktivite Yönetimi</h1>
        <div className={styles.topSide}>
          <Input placeholder="Ara" inputStyle={"search"}>
            <SearchSolid className={styles.searchIcon} />
          </Input>
          <div className={styles.tabs}>
            <div
              className={`${styles.tabsButton} ${
                tabsType === "student" ? styles.tabsButtonActive : ""
              }`}
              onClick={() => setTabsType("student")}
            >
              Öğrenci
            </div>
            <div
              className={`${styles.tabsButton} ${
                tabsType === "teacher" ? styles.tabsButtonActive : ""
              }`}
              onClick={() => setTabsType("teacher")}
            >
              Öğretmen
            </div>
          </div>
        </div>
        <Card type={"activity"} tabsType={tabsType} />
      </>
    );
  } else if (pathname === "/admin/apps" || pathname.includes("/admin/apps")) {
    return (
      <>
        <h1>Uygulamalar Yönetimi</h1>
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
                  onClick={() => {
                    history.push(`/admin/apps/${item.name[0]}`);
                    setTimeout(() => {
                      window.location.reload();
                    }, 500);
                    setDropdownName(item.name);
                  }}
                  className={styles.dropdownItems}
                >
                  {item.name}
                </div>
              );
            })}
          </div>
        </div>
        <Card
          dropdownValue={dropdownName}
          type={"appManagement"}
          tabsType={tabsType}
        />
      </>
    );
  } else if (pathname === "/admin") {
    return (
      <>
        <Login />
      </>
    );
  } else if (pathname === "/admin/exams") {
    return (
      <>
        <h1>Sınav Yönetimi</h1>
        <Card type={"exams"} />
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
  {
    name: "6. Sınıflar",
  },
  {
    name: "7. Sınıflar",
  },
  {
    name: "8. Sınıflar",
  },
];
// function onSearchTextChange(value) {
//   this.setState((state) => {
//     if (value) {
//       state.filteredStaticData = staticData.filter((el) =>
//         `${el.name} ${el.title}`.includes(value)
//       );
//     } else {
//       if (state.searchText) {
//         state.filteredStaticData = staticData;
//       }
//     }

//     state.searchText = value;
//     return state;
//   });
// }
