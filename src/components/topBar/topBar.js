import React, { useEffect, useState } from "react";
import styles from "./topBar.module.scss";
import Logo from "../../assets/images/logo.png";
import ChromeIcon from "../../assets/icons/chrome-brands-purple.svg";
import {
  CogSolid,
  Down,
  EnvelopeSolid,
  Menu,
  PowerOffSolid,
} from "../../icons";
import SubBar from "./subBar/subBar";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import { GetToken, GetUser } from "../../actions/action";
export default function TopBar() {
  const [userData, setUserData] = useState(false);
  const [subBarActive, setSubBarctive] = useState(false);
  const [dropdownActive, setDropdownActive] = useState(false);
  const [userRole, setUserRole] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [coookies, setCookies, removeCookies] = useCookies(["token"]);
  const history = useHistory();
  window.document.body.addEventListener("click", () => {
    setDropdownActive(false);
  });
  const token = GetToken();
  useEffect(() => {
    if (!userData) {
      GetUser(token).then((item) => {
        setUserData(item);
        setUserRole(item.data.data.role);
      });
    }
  }, [userData]);
  function setSubBar() {
    setSubBarctive(!subBarActive);
    const subBar = document.getElementById("subBar");
    if (subBar.style.height === "" || subBar.style.height === "0px")
      document.getElementById("subBar").className = styles.responsiveSubBar;
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
              >
                <div
                  onClick={() => {
                    history.push("/settings");
                  }}
                  className={styles.dropdownItem}
                >
                  <CogSolid className={styles.dropdownIcon} />
                  <div className={styles.dropdownItemName}>Ayarlar</div>
                </div>

                <div
                  onClick={() => {
                    removeCookies("token");
                    window.location.replace("/");
                  }}
                  className={styles.dropdownItem}
                >
                  <PowerOffSolid className={styles.dropdownIcon} />
                  <div className={styles.dropdownItemName}>Çıkış Yap</div>
                </div>
              </div>
            </div>
            <Down
              className={styles.downIcon}
              onClick={() => setDropdownActive(!dropdownActive)}
            />
          </div>
          <div
            onClick={() => {
              window.open(
                "https://chrome.google.com/webstore/detail/gfkelnilbjflkdjhhfeojhpbjogakifh"
              );
            }}
            className={styles.chromeExtentionsButton}
          >
            <img src={ChromeIcon} />
            <div className={styles.extention}>Eklentiyi indir</div>
          </div>
        </div>
      </div>
      <SubBar userRole={userRole} isActive={subBarActive} />
    </>
  );
}
