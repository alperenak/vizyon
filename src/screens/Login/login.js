import React, { useContext, useEffect, useState } from "react";
import styles from "./login.module.scss";
import LoginImages from "../../assets/images/loginBackground.jpg";
import Logo from "../../assets/images/logologin.jpg";
import AdminLoginImages from "../../assets/images/admin.jpg";
import Input from "../../components/Input/input";
import { IconLock, IconUser, LoginLogo } from "../../icons";
import Button from "../../components/Button/button";
import CheckBox from "../../components/CheckBox/checkbox";
import { Link } from "react-router-dom";
import IsAdmin, { GetAuthentication, GetUser } from "../../actions/action";
import { TokenContext } from "../../context/tokenContext";
import { useCookies } from "react-cookie";
import { UserContext } from "../../context/userContext";
import Loading from "../../components/Loading/loading";
import { useLocation, useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";

export default function Login({}) {
  const [rememberUser, setRememberUser] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useContext(UserContext);
  const [token, setToken] = useContext(TokenContext);
  const [cookies, setCookies] = useCookies(["token"]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    if (cookies.token || (token !== "" && token)) {
      if (cookies.admin) {
        window.location.replace("/admin/announcements");
      } else if (!cookies.admin) window.location.replace("/home");
    }
  });
  console.log(token);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className={styles.loginContainer}>
          <img src={Logo} className={styles.logoCircle} />
          <div className={styles.loginImages}>
            <img
              src={pathname === "/login/teacher" ? LoginImages : LoginImages}
            />
          </div>
          <div className={styles.loginForm}>
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
  cookies,
  loading,
  setLoading,
  setCookies,
  errorMessage,
  setErrorMessage,
  token,
  setToken,
  children,
}) {
  const { pathname } = useLocation();
  const history = useHistory();
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
            onClick={() => setRememberUser(!rememberUser)}
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
                  console.log(data.data.token);
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

              .catch((e) => {
                setLoading(false);
                setErrorMessage("E-posta,telefon veya şifre yanlış");
              });
          }}
        />
      </>
    );
  } else {
    return (
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
    );
  }
}
