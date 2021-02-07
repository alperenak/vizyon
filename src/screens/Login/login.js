import React, { useEffect, useState } from "react";
import styles from "./login.module.scss";
import LoginImages from "../../assets/images/loginBackground.jpg";
import LoginLogoSmall from "../../assets/icons/loginLogo.svg";
import Input from "../../components/Input/input";
import { IconLock, IconUser, LoginLogo } from "../../icons";
import Button from "../../components/Button/button";
import CheckBox from "../../components/CheckBox/checkbox";
import { Link } from "react-router-dom";
import IsAdmin, { GetAuthentication, GetUser } from "../../actions/action";
import { useCookies } from "react-cookie";
import Loading from "../../components/Loading/loading";
import { useLocation, useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import ChromeIcon from "../../assets/icons/chrome-brands.svg";
export default function Login() {
  const [rememberUser, setRememberUser] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [cookies, setCookies] = useCookies(["token"]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  // Chrome 1 - 71

  // Blink engine detection
  const { pathname } = useLocation();
  useEffect(() => {
    localStorage.setItem("rememberMe", rememberUser);
    if (cookies.token || (token !== "" && token)) {
      if (cookies.admin) {
        window.location.replace("/admin/announcements");
      } else if (!cookies.admin) window.location.replace("/home");
    }
  });

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className={styles.loginContainer}>
          <LoginLogo id="loginWhenScreenHight" className={styles.logoCircle} />
          <div className={styles.loginImages}>
            <img
              height="250"
              src={LoginLogoSmall}
              id="loginWhenScreenSmall"
              className={styles.responsiveLogoCircle}
            />
            {/* <LoginLogo className={styles.responsiveLogoCircle} /> */}
            <img
              className={styles.loginBacgroundImage}
              src={pathname === "/login/teacher" ? LoginImages : LoginImages}
            />
          </div>
          <div className={styles.loginForm}>
            <img
              height="250"
              src={LoginLogoSmall}
              className={styles.responsiveLogoWhenMedium}
            />
            <RenderLoginMethod
              username={username}
              setUsername={setUsername}
              rememberUser={rememberUser}
              setRememberUser={setRememberUser}
              password={password}
              setPassword={setPassword}
              token={token}
              setToken={setToken}
              cookies={cookies}
              setCookies={setCookies}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
              loading={loading}
              setLoading={setLoading}
            />
          </div>
        </div>
      )}
    </>
  );
}

function RenderLoginMethod({
  username,
  setUsername,
  password,
  setPassword,
  rememberUser,
  setRememberUser,
  setLoading,
  setCookies,
  errorMessage,
  setErrorMessage,
  setToken,
}) {
  const { pathname } = useLocation();
  const history = useHistory();
  const isChrome =
    !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
  if (
    pathname === "/login/student" ||
    pathname === "/login/teacher" ||
    pathname === "/admin"
  ) {
    return (
      <>
        <div className={styles.formTitle}>Hoşgeldin, Giriş Yap!</div>
        <Input
          method={"login"}
          type={"text"}
          inputStyle={"primary"}
          onChange={(e) => setUsername(e.target.value)}
          placeholder={"E-posta veya Telefon"}
          value={username}
        >
          <IconUser className={styles.icon} />
        </Input>
        <Input
          onChange={(e) => setPassword(e.target.value)}
          method={"login"}
          type={"password"}
          placeholder={"Şifre"}
          inputStyle={"primary"}
          value={password}
        >
          <IconLock className={styles.icon} />
        </Input>
        {errorMessage ? (
          <div className={styles.errorMessage}>{errorMessage}</div>
        ) : (
          ""
        )}
        <div className={styles.subFormSection}>
          <CheckBox
            title={"Beni Hatırla"}
            onClick={() => {
              setRememberUser(!rememberUser);
            }}
            isActive={rememberUser}
          />
          <Link className={styles.forgotPass}>Şifreni mi Unuttun?</Link>
        </div>
        <Button
          title={"Giriş Yap"}
          type={"primary"}
          onClick={() => {
            setLoading(true);
            GetAuthentication(username, password)
              .then((data) => {
                if (data.success) {
                  setLoading(false);
                  setErrorMessage(false);
                  const tokenData = jwt_decode(data.data.token);
                  if (tokenData.role === "admin" && pathname !== "/admin") {
                    setErrorMessage("E-posta,telefon veya şifre yanlış");
                  } else {
                    GetUser(data.data.token).then((uData) => {
                      let tomorrow = new Date();
                      tomorrow.setDate(tomorrow.getDate() + 1);
                      setToken(data.data.token);
                      setCookies("token", data.data.token, {
                        expires: tomorrow,
                      });

                      setTimeout(() => IsAdmin(uData, setCookies), 100);

                      if (
                        uData.data.data &&
                        uData.data.data.role &&
                        uData.data.role !== "admin"
                      ) {
                        setTimeout(() => window.location.replace("/home"), 100);
                      }
                    });
                  }
                } else {
                  setLoading(false);
                  setErrorMessage("E-posta,telefon veya şifre yanlış");
                }
              })

              .catch(() => {
                setLoading(false);
                setErrorMessage("E-posta,telefon veya şifre yanlış");
              });
          }}
        />
        {isChrome ? (
          <>
            <div className={styles.extentionTitle}>
              Uygulamayı düzgün bir şekilde kullanabilmen için eklentiyi
              indirmen gerekiyor:
            </div>
            <div className={styles.chromeExtentionsButton}>
              <img src={ChromeIcon} />
              <div className={styles.extention}>Eklentiyi indir</div>
            </div>
          </>
        ) : (
          ""
        )}
      </>
    );
  } else {
    return (
      <>
        <div className={styles.loginMethods}>
          <Button
            title={"Öğretmen Girişi"}
            type={"primary"}
            onClick={() => history.push("/login/teacher")}
          />
          <Button
            title={"Öğrenci Girişi"}
            type={"primary"}
            onClick={() => history.push("/login/student")}
          />
        </div>
        {isChrome ? (
          <>
            <div className={styles.extentionTitle}>
              Uygulamayı düzgün bir şekilde kullanabilmen için eklentiyi
              indirmen gerekiyor:
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
          </>
        ) : (
          ""
        )}
      </>
    );
  }
}
