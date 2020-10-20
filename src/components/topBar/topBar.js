import React, { useContext, useEffect, useState } from "react";
import styles from "./topBar.module.scss";
import Logo from "../../assets/images/logo.png";
import { Down, EnvelopeSolid, Menu, Notification } from "../../icons";
import Avatar from "../../assets/images/avatar.png";
import SubBar from "./subBar/subBar";
import { UserContext } from "../../context/userContext";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import { GetToken, GetUser } from "../../actions/action";
export default function TopBar() {
  const [userData, setUserData] = useContext(UserContext);
  const subBar = document.getElementById("subBar");
  const [subBarActive, setSubBarctive] = useState(false);
  const [dropdownActive, setDropdownActive] = useState(false);
  const [coookies, setCookies, removeCookies] = useCookies(["token"]);
  const history = useHistory();
  window.document.body.addEventListener("click", () => {
    setDropdownActive(false);
  });
  const token = GetToken();
  useEffect(() => {
    GetUser(token).then((item) => {
      setUserData(item);
    });
    console.log("data", userData);
  }, [userData]);
  function setSubBar() {
    setSubBarctive(!subBarActive);
    const subBar = document.getElementById("subBar");
    if (subBar.style.height === "" || subBar.style.height === "0px")
      document.getElementById("subBar").style.height = "80px";
    else {
      document.getElementById("subBar").style.height = "0px";
    }
  }
  return (
    <>
      <div className={styles.TopBar}>
        <div className={styles.space}></div>
        <img src={Logo} className={styles.logo} />
        <Menu
          onClick={() => {
            setSubBar();
          }}
          className={styles.Menu}
        />
        <div className={styles.profileSection}>
          <EnvelopeSolid
            onClick={() => {
              history.push("/messages");
            }}
            className={styles.Notification}
          />
          {/* <Notification className={styles.Notification} /> */}
          <div className={styles.profile}>
            <div className={styles.avatar}>
              <img
                src={
                  userData && userData !== null
                    ? userData.data.data.profile_photo
                    : null
                }
              />
            </div>
            <div
              onClick={() => setDropdownActive(!dropdownActive)}
              className={styles.dropdown}
            >
              <div className={styles.profileName}>
                {userData
                  ? userData.data.data.first_name +
                    " " +
                    userData.data.data.last_name
                  : ""}
              </div>
              <div
                className={`${styles.dropdownContent}  ${
                  dropdownActive ? styles.active : ""
                }`}
                onClick={() => {
                  removeCookies("token");
                  window.location.replace("/");
                }}
              >
                Çıkış Yap
              </div>
            </div>
            <Down
              className={styles.downIcon}
              onClick={() => setDropdownActive(!dropdownActive)}
            />
          </div>
        </div>
      </div>
      <SubBar isActive={subBarActive} />
    </>
  );
}
