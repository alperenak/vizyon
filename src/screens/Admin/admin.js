import React, { useState, useEffect } from "react";
import SideBar from "../../components/Sidebar/sidebar";
import styles from "./admin.module.scss";
import Card from "../../components/Card/card";
import {
  GetToken,
  IsAuth,
  GetUser,
  GetAnnouncements,
  getAllUser,
  getAllStudents,
  getAllTeachers,
  getAllClass,
  GetAllExams,
  GetSpecifiApps,
  getAllUserByClass,
} from "../../actions/action";
import Input from "../../components/Input/input";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { Down, SearchSolid } from "../../icons";
import { useCookies } from "react-cookie";
import Login from "../../screens/Login/login";
import Loading from "../../components/Loading/loading";
import Pagination from "../../components/Pagination/pagination";
import Dropdown from "../../components/Dropdown/dropdown";
import AlertBox from "../../components/Alertbox/alertbox";
export default function Admin() {
  const [announcementsData, setAnnouncementsData] = useState(false);
  const [newAnnouncementsData, setNewAnnouncementsData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [alertboxActive, setAlertboxActive] = useState(false);
  const [alerData, setAlertData] = useState({});
  const [cookies] = useCookies(false);
  const token = GetToken();
  const { pathname } = useLocation();

  useEffect(() => {
    if (token || cookies.admin) {
      if (IsAuth(token)) {
        if (!userData) {
          GetUser(token)
            .then((data) => {
              setUserData(data);
            })
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
      <AlertBox
        alertData={alerData}
        isActive={alertboxActive}
        setIsActive={setAlertboxActive}
      />
      <SideBar />
      <div className={styles.adminMain}>
        <RenderCard
          pathname={pathname}
          userData={userData}
          setUserData={setUserData}
          setAlertData={setAlertData}
          setAlertboxActive={setAlertboxActive}
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
  setAlertData,
  setAlertboxActive,
}) {
  const [tabsType, setTabsType] = useState("student");
  const { id } = useParams();
  const [dropdownActive, setDropdownActive] = useState();
  const [dropdownName, setDropdownName] = useState(
    id && id !== "" ? `${id}.Sınıflar` : "Sınıf Seçiniz"
  );
  const [loading, setLoading] = useState(false);
  const [display, setDisplay] = useState("");
  const [displayTeacher, setDisplayTeacher] = useState("");
  const [displayStudent, setDisplayStudent] = useState("");
  const [displayClass, setDisplayClass] = useState("");
  const [selectedClass] = useState("");
  const dropdownNames = document.getElementById("dropdownName");
  const dropdownIcon = document.getElementById("dropdownIcon");
  const [studentsData, setStudentsData] = useState([]);
  const [totalTeacher, setTotalTeacher] = useState(0);
  const [targetValue, setTargetValue] = useState("");
  const [totalStudent, setTotalStudent] = useState(0);
  const token = GetToken();
  const [userPageNum, setUserPageNum] = useState(1);
  const [teachersData, setTeachersData] = useState([]);
  const [classData, setClassData] = useState([]);
  const [allExams, setAllExams] = useState([]);
  const [filteredClass, setFilteredClass] = useState(false);
  const [appData, setAppData] = useState([]);
  const history = useHistory();

  window.onclick = function (e) {
    if (e.target !== dropdownNames && e.target !== dropdownIcon) {
      setDropdownActive(false);
    }
  };

  function updateStudentData() {
    getAllStudents(token)
      .then((data) => {
        setStudentsData(data.data.data);
        setTotalStudent(data.data.total);
      })
      .then(() => setLoading(false))
      .catch(() => {
        setLoading(false);
        setAlertboxActive(true);
        setAlertData({ type: "error", title: "Öğrenciler getirilemedi" });
      });
  }

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
    let targetValue = e.target.value;
    setTargetValue(e.target.value);
    if (tabsType === "student") {
      if (targetValue.length < 2) {
        setDisplayStudent("");
      } else if (targetValue.length >= 2) {
        getAllUser(token, targetValue, "student").then((data) => {
          if (targetValue.length >= 2) setDisplayStudent(data.data.data);
          else setDisplayStudent("");
        });
      }
    } else if (tabsType === "teacher") {
      if (targetValue.length < 2) {
        setDisplayTeacher("");
      } else if (targetValue.length >= 2) {
        getAllUser(token, targetValue, "instructor").then((data) => {
          if (targetValue.length >= 2) setDisplayTeacher(data.data.data);
          else setDisplayTeacher("");
        });
      }
    } else if (tabsType === "class") {
      const res = classData.filter((state) => {
        const name = state.name;
        return targetValue
          ? name.toLowerCase().includes(targetValue.toLowerCase())
          : "";
      });
      if (targetValue === "") setDisplayClass("");
      else setDisplayClass(res);
    }
    // const targetVal = e.target.value;
    // if (!targetVal) {
    //   setDisplayStudent(studentsData);
    //   setDisplayTeacher(teachersData);
    // }
    // if (
    //   e.target.value.length >= 2 &&
    //   (tabsType === "student" || tabsType === "teacher")
    // ) {
    //   getAllUser(token, targetVal, tabsType).then((data) => {
    //     if (targetVal) {
    //       if (tabsType === "student") setDisplayStudent(data.data.data);
    //       else if (tabsType === "teacher") setDisplayTeacher(data.data.data);
    //     } else if (tabsType === "teacher") setDisplayTeacher(teachersData);
    //     else if (tabsType === "student") setDisplayStudent(studentsData);
    //   });
    // } else if (
    //   (targetVal.length <= 2 || !targetVal || targetVal === "") &&
    //   (tabsType === "student" || tabsType === "teacher")
    // ) {
    //   if (tabsType === "student") setDisplayStudent(studentsData);
    //   else if (tabsType === "teacher") setDisplayTeacher(teachersData);
    //   else {
    //     setDisplayStudent(studentsData);
    //     setDisplayTeacher(teachersData);
    //   }
    // } else if (tabsType === "class") {
    //   const res = classData.filter((state) => {
    //     const name = state.name;
    //     return e.target.value
    //       ? name.toLowerCase().includes(e.target.value.toLowerCase())
    //       : "";
    //   });
    //   if (e.target.value === "") setDisplayClass("");
    //   else setDisplayClass(res);
    // } else {
    //   setDisplayTeacher(teachersData);
    //   setDisplayStudent(studentsData);
    // }
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
  useEffect(() => {
    if (filteredClass === classData) {
      setDropdownName("Tüm Sınıflar");
    }
  });
  useEffect(() => {
    if (targetValue.length < 2) {
      if (tabsType === "student") setDisplayStudent("");
      else if (tabsType === "teacher") setDisplayTeacher("");
    }
  }, [targetValue, displayStudent, displayTeacher]);

  useEffect(() => {
    setLoading(true);
    getAllStudents(token)
      .then((data) => {
        setStudentsData(data.data.data);
        setTotalStudent(data.data.total);
      })
      .then(() => setLoading(false))
      .catch(() => {
        setLoading(false);
        setAlertboxActive(true);
        setAlertData({ type: "error", title: "Öğrenciler getirilemedi" });
      });
    getAllTeachers(token)
      .then((data) => {
        setTeachersData(data.data.data);
        setTotalTeacher(data.data.total);
      })
      .then(() => setLoading(false))
      .catch(() => {
        setLoading(false);
        setAlertboxActive(true);
        setAlertData({ type: "error", title: "Öğretmenler getirilemedi" });
      });

    getAllClass(token, 100, 1, "name,grade")
      .then((data) => {
        setClassData(data.data.data);
      })
      .then(() => setLoading(false))
      .catch(() => {
        setLoading(false);
        setAlertboxActive(true);
        setAlertData({ type: "error", title: "Sınıflar getirilemedi" });
      });
    GetAllExams(token)
      .then((data) => {
        setAllExams(data);
      })
      .then(() => setLoading(false))
      .catch(() => {
        setAlertboxActive(true);
        setAlertData({ type: "error", title: "Sınavlar getirilemedi" });
      });
    GetSpecifiApps(token, id ? id : 9)
      .then((item) => {
        setAppData(item);
      })
      .then(() => setLoading(false))
      .catch(() => {
        setAlertboxActive(true);
        setAlertData({ type: "error", title: "Uygulamalar getirilemedi" });
      });
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
            setAnnouncementsData={setAnnouncementsData}
            setLoading={setLoading}
            setAlertData={setAlertData}
            setAlertboxActive={setAlertboxActive}
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
                {ClassesNameData.map((item, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        if (item.name.includes("Tüm")) {
                          setFilteredClass("");
                          setDropdownName(item.name);
                        } else {
                          const res = classData.filter((item1) => {
                            return item1.name
                              .slice(0, 2)
                              .includes(
                                item.name.slice(0, item.name.indexOf("."))
                              );
                          });
                          setFilteredClass(res);
                          setDropdownName(item.name);
                        }
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
            setClassData={setClassData}
            setDisplayClass={setDisplayClass}
            type={"classManagement"}
            setLoading={setLoading}
            setAlertData={setAlertData}
            setAlertboxActive={setAlertboxActive}
          />
        </>
      );
    } else if (pathname === "/admin/user") {
      return (
        <div>
          <h1>Kullanıcı Yönetimi</h1>
          <div className={styles.topSide}>
            <Input
              placeholder="Ara"
              inputStyle={"search"}
              onChange={onChangeUserManagementSearch}
            >
              <SearchSolid className={styles.searchIcon} />
            </Input>
            <Dropdown
              zIndex
              type={"selectable"}
              dropdownData={[
                { value: "Tüm Sınıflar", id: "asdasd" },
                ...classData.map((item) => {
                  return {
                    value: item.name,
                    id: item.id ? item.id : item._id,
                  };
                }),
              ]}
              value={"Tüm Sınıflar"}
              onClick={(event) => {
                if (event.value !== "Tüm Sınıflar")
                  getAllUserByClass(token, event.id).then((data) =>
                    setStudentsData(data.data.data)
                  );
                else
                  getAllStudents(token, 1, 100).then((data) =>
                    setStudentsData(data.data.data)
                  );
              }}
            />
            <div className={styles.tabs}>
              <div
                className={`${styles.tabsButton} ${
                  tabsType === "student" ? styles.tabsButtonActive : ""
                }`}
                onClick={() => {
                  setTabsType("student");
                  updateStudentData();
                }}
              >
                Öğrenci
              </div>
              <div
                className={`${styles.tabsButton} ${
                  tabsType === "teacher" ? styles.tabsButtonActive : ""
                }`}
                onClick={() => {
                  setTabsType("teacher");
                  setUserPageNum(1);
                }}
              >
                Öğretmen
              </div>
            </div>
          </div>

          <Card
            teachersData={displayTeacher === "" ? teachersData : displayTeacher}
            studentsData={displayStudent === "" ? studentsData : displayStudent}
            setTeachersData={setTeachersData}
            loading={loading}
            setUserPageNum={setUserPageNum}
            userPageNum={userPageNum}
            setLoading={setLoading}
            setAlertData={setAlertData}
            setAlertboxActive={setAlertboxActive}
            setStudentsData={setStudentsData}
            type={"userManagement"}
            setDisplayStudent={setDisplayStudent}
            setDisplayTeacher={setDisplayTeacher}
            tabsType={tabsType}
          />
          {!(
            pathname.includes("user/student") ||
            pathname.includes("user/teacher")
          ) &&
            (totalStudent !== 0 || totalTeacher !== 0 ? (
              <Pagination
                totalCount={
                  tabsType === "student"
                    ? Number((totalStudent / 100).toFixed())
                    : tabsType === "teacher"
                    ? Number((totalTeacher / 100).toFixed())
                    : ""
                }
                selectedPage={userPageNum}
                onClick={(pageNum) => {
                  if (tabsType === "student") {
                    setLoading(true);
                    getAllStudents(token, pageNum)
                      .then((data) => {
                        setStudentsData(data.data.data);
                        setUserPageNum(
                          data.data.pagination.next !== null
                            ? data.data.pagination.next.page - 1
                            : data.data.pagination.previous.page + 1
                        );
                      })
                      .then(() => setLoading(false))
                      .catch((e) => {
                        setLoading(false);
                        if (!String(e).includes("previous")) {
                          setAlertboxActive(true);
                          setAlertData({
                            type: "error",
                            title: "Öğrenciler getirilemedi",
                          });
                        }
                      });
                  } else if (tabsType === "teacher") {
                    setLoading(true);
                    getAllTeachers(token, pageNum)
                      .then((data) => {
                        setLoading(false);
                        setTeachersData(data.data.data);
                        setUserPageNum(
                          data.data.pagination.next !== null
                            ? data.data.pagination.next.page - 1
                            : data.data.pagination.previous.page + 1
                        );
                      })
                      .then(() => setLoading(false))
                      .catch((e) => {
                        if (!String(e).includes("page")) {
                          setAlertboxActive(true);
                          setAlertData({
                            type: "error",
                            title: "Öğretmenler getirilemedi",
                          });
                        }
                      });
                  }
                }}
              />
            ) : (
              "data"
            ))}
        </div>
      );
    } else if (pathname === "/admin/syllabus") {
      return (
        <>
          <h1>Ders Programı Yönetimi</h1>
          <Card type={"syllabusManagement"} tabsType={tabsType} />
        </>
      );
    } else if (
      pathname.includes("/admin/user/student") ||
      pathname.includes("/admin/user/teacher")
    ) {
      return (
        <>
          <h1>Kullanıcı Detayları</h1>
          <div className={`${styles.topSide} ${styles.centeredTabs}`}>
            <div className={styles.tabs}>
              <div
                className={`${styles.tabsButton} ${
                  tabsType === "student" ? styles.tabsButtonActive : ""
                }`}
                onClick={() => setTabsType("student")}
              >
                Genel
              </div>
              <div
                className={`${styles.tabsButton} ${
                  tabsType === "teacher" ? styles.tabsButtonActive : ""
                }`}
                onClick={() => setTabsType("teacher")}
              >
                Uygulamalar
              </div>
            </div>
          </div>
          <Card
            type={"userDetails"}
            tabsType={tabsType}
            loading={loading}
            setLoading={setLoading}
            setAlertboxActive={setAlertboxActive}
            setAlertData={setAlertData}
          />
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
              <div
                className={`${styles.tabsButton} ${
                  tabsType === "class" ? styles.tabsButtonActive : ""
                }`}
                onClick={() => {
                  setUserPageNum(1);
                  setTabsType("class");
                }}
              >
                Sınıf
              </div>
            </div>
          </div>
          <Card
            teachersData={displayTeacher === "" ? teachersData : displayTeacher}
            studentsData={displayStudent === "" ? studentsData : displayStudent}
            classData={displayClass === "" ? classData : displayClass}
            type={"activity"}
            tabsType={tabsType}
          />
          <Pagination
            totalCount={
              tabsType === "student"
                ? Number((totalStudent / 100).toFixed())
                : tabsType === "teacher"
                ? Number((totalTeacher / 100).toFixed())
                : tabsType === "class"
                ? 1
                : ""
            }
            selectedPage={userPageNum}
            onClick={(pageNum) => {
              if (tabsType === "student") {
                setLoading(true);
                getAllStudents(token, pageNum)
                  .then((data) => {
                    setStudentsData(data.data.data);
                    setUserPageNum(
                      data.data.pagination.next !== null
                        ? data.data.pagination.next.page - 1
                        : data.data.pagination.previous.page + 1
                    );
                  })
                  .then(() => setLoading(false))
                  .catch(() => {
                    setLoading(false);
                    alert("Kullanıcılar Getirilemedi");
                  });
              } else if (tabsType === "teacher") {
                setLoading(true);
                getAllTeachers(token, pageNum)
                  .then((data) => {
                    setTeachersData(data.data.data);
                    setUserPageNum(
                      data.data.pagination.next !== null
                        ? data.data.pagination.next.page - 1
                        : data.data.pagination.previous.page + 1
                    );
                  })
                  .then(() => setLoading(false))
                  .catch(() => {
                    setLoading(false);
                    alert("Kullanıcılar Getirilemedi");
                  });
              }
            }}
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
              {ClassesNameData.map((item, index) => {
                return (
                  <div
                    key={index}
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
            setLoading={setLoading}
            setAlertData={setAlertData}
            setAlertboxActive={setAlertboxActive}
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
          <Card
            type={"exams"}
            allExams={allExams}
            setAllExams={setAllExams}
            setLoading={setLoading}
            setAlertData={setAlertData}
            setAlertboxActive={setAlertboxActive}
          />
        </>
      );
    } else return <></>;
  } else {
    return <Loading noBackground={true} />;
  }
}

const ClassesNameData = [
  {
    name: "Tüm Sınıflar",
  },
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
