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
  getAllUser,
  getAllClass,
  IsRoleAdmin,
  GetAllExams,
  GetSpecifiApps,
} from "../../actions/action";
import Modal from "../../components/Modal/modal";
import Input from "../../components/Input/input";
import Button from "../../components/Button/button";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { Down, SearchSolid } from "../../icons";
import { useCookies } from "react-cookie";
import Login from "../../screens/Login/login";
import Loading from "../../components/Loading/loading";
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
              setAnnouncementsData(data.data.data);
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
          userData={userData}
          setUserData={setUserData}
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
  userData,
  setUserData,
  newAnnouncementsData,
  setNewAnnouncementsData,
}) {
  const [tabsType, setTabsType] = useState("student");
  const { id } = useParams();
  const [dropdownActive, setDropdownActive] = useState();
  const [dropdownName, setDropdownName] = useState(
    id && id !== "" ? `${id}.Sınıflar` : "Sınıf Seçiniz"
  );
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [display, setDisplay] = useState("");
  const [displayTeacher, setDisplayTeacher] = useState("");
  const [displayStudent, setDisplayStudent] = useState("");
  const [displayClass, setDisplayClass] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const dropdownNames = document.getElementById("dropdownName");
  const dropdownIcon = document.getElementById("dropdownIcon");
  const [studentsData, setStudentsData] = useState([]);
  const token = GetToken();
  const [teachersData, setTeachersData] = useState([]);
  const [classData, setClassData] = useState([]);
  const [allExams, setAllExams] = useState([]);
  const [filteredClass, setFilteredClass] = useState(false);
  const [appData, setAppData] = useState([]);
  const history = useHistory();
  console.log("umarim degismiyor", announcementsData);
  window.onclick = function (e) {
    if (e.target !== dropdownNames && e.target !== dropdownIcon) {
      setDropdownActive(false);
    }
  };
  function onChangeText(e) {
    const res = announcementsData.filter((state) =>
      e.target.value
        ? state.title.toLowerCase().includes(e.target.value.toLowerCase())
        : ""
    );
    if (e.target.value === "") setDisplay("");
    else setDisplay(res);
  }
  function onChangeUserManagementSearch(e) {
    if (tabsType === "teacher") {
      const res = teachersData.filter((state) => {
        const name = `${state.first_name} ${state.last_name}`;
        return e.target.value
          ? name.toLowerCase().includes(e.target.value.toLowerCase())
          : "";
      });
      if (e.target.value === "") setDisplayTeacher("");
      else setDisplayTeacher(res);
    } else if (tabsType === "student") {
      const res = studentsData.filter((state) => {
        const name = `${state.first_name} ${state.last_name}`;
        return e.target.value
          ? name.toLowerCase().includes(e.target.value.toLowerCase())
          : "";
      });
      if (e.target.value === "") setDisplayStudent("");
      else setDisplayStudent(res);
    }
  }

  function onChangeClassSearch(e) {
    const res = classData.filter((state) =>
      e.target.value
        ? state.name.toLowerCase().includes(e.target.value.toLowerCase())
        : ""
    );
    if (e.target.value === "") setDisplayClass("");
    else setDisplayClass(res);
  }

  console.log(display);
  useEffect(() => {
    setLoading(true);
    getAllUser(token)
      .then((data) => {
        setTeachersData(
          data.data.data.filter((item) => item.role === "instructor")
        );
        setStudentsData(
          data.data.data.filter((item) => item.role === "student")
        );
      })
      .then(() => setLoading(false))
      .catch((e) => {
        setLoading(false);
        alert("Kullanıcılar Getirilemedi");
      });

    getAllClass(token)
      .then((data) => {
        setClassData(data.data.data);
      })
      .then(() => setLoading(false))
      .catch((e) => {
        setLoading(false);
        alert("Sınıflar Getirilemedi");
      });
    GetAllExams(token)
      .then((data) => {
        setAllExams(data);
      })
      .then(() => setLoading(false))
      .catch(() => alert("Sınavlar getirilemedi"));
    GetSpecifiApps(token, id ? id : "1")
      .then((item) => {
        setAppData(item);
      })
      .then(() => setLoading(false))
      .catch(() => alert("Uygulamalar getirilemedi"));
  }, []);
  if (!loading) {
    if (pathname === "/admin/announcements")
      return (
        <>
          <h1>Duyurular Yönetimi</h1>
          <Input
            placeholder="Ara"
            inputStyle={"search"}
            onChange={onChangeText}
          >
            <SearchSolid className={styles.searchIcon} />
          </Input>
          <Card
            type={"announcements"}
            announcementsData={
              display === ""
                ? announcementsData
                  ? announcementsData
                  : []
                : display
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
            <Input
              placeholder="Ara"
              inputStyle={"search"}
              onChange={onChangeClassSearch}
            >
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
                        const res = classData.filter((item1) => {
                          return item1.name.slice(0, 2).includes(item.name[0]);
                        });
                        setFilteredClass(res);
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
          <Card
            classData={
              filteredClass
                ? filteredClass
                : displayClass === ""
                ? classData
                : displayClass
            }
            filterClass={selectedClass[0]}
            type={"classManagement"}
          />
        </>
      );
    } else if (pathname === "/admin/user") {
      return (
        <>
          <h1>Kullanıcı Yönetimi</h1>
          <div className={styles.topSide}>
            <Input
              placeholder="Ara"
              inputStyle={"search"}
              onChange={onChangeUserManagementSearch}
            >
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
          <Card
            teachersData={displayTeacher === "" ? teachersData : displayTeacher}
            studentsData={displayStudent === "" ? studentsData : displayStudent}
            type={"userManagement"}
            tabsType={tabsType}
          />
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
          <h1>Raporlar</h1>
          <div className={styles.topSide}>
            <Input
              placeholder="Ara"
              inputStyle={"search"}
              onChange={onChangeUserManagementSearch}
            >
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
          <Card
            teachersData={displayTeacher === "" ? teachersData : displayTeacher}
            studentsData={displayStudent === "" ? studentsData : displayStudent}
            type={"activity"}
            tabsType={tabsType}
          />
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
                      history.push(
                        `/admin/apps/${item.name.slice(
                          0,
                          item.name.indexOf(".")
                        )}`
                      );
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
            appData={appData}
            setAppData={setAppData}
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
          <Card type={"exams"} allExams={allExams} />
        </>
      );
    } else return <></>;
  } else {
    return <Loading noBackground={true} />;
  }
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
  {
    name: "9. Sınıflar",
  },
  {
    name: "10. Sınıflar",
  },
  {
    name: "11. Sınıflar",
  },
  {
    name: "12. Sınıflar",
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
