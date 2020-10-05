import React, { useContext, useState } from "react";
import styles from "./login.module.scss";
import LoginImages from "../../assets/images/loginBackground.png";
import Input from "../../components/Input/input";
import { IconLock, IconUser, LoginLogo } from "../../icons";
import Button from "../../components/Button/button";
import CheckBox from "../../components/CheckBox/checkbox";
import { Link } from "react-router-dom";
import { GetAuthentication, GetUser } from "../../actions/action";
import { TokenContext } from "../../context/tokenContext";
import { useCookies } from "react-cookie";
import { UserContext } from "../../context/userContext";
import Loading from "../../components/Loading/loading";
export default function Login() {
  const [RememberUser, setRememberUser] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useContext(UserContext);
  const [token, setToken] = useContext(TokenContext);
  const [cookies, setCookies] = useCookies(["token"]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  console.log(token);
  if (cookies.token || (token !== "" && token)) {
    window.location.replace("/home");
  }
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className={styles.loginContainer}>
          <LoginLogo className={styles.logoCircle} />
          <div className={styles.loginImages}>
            <img src={LoginImages} />
          </div>
          <div className={styles.loginForm}>
            <div className={styles.formTitle}>Hoşgeldin, Giriş Yap!</div>
            <Input
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
                onClick={() => setRememberUser(!RememberUser)}
                isActive={RememberUser}
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
                      setErrorMessage(false);
                      console.log(data.data.token);
                      GetUser(data.data.token).then(() => {
                        window.location.replace("/home");
                        setToken(data.data.token);
                        setCookies("token", data.data.token);
                      });
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
          </div>
        </div>
      )}
    </>
  );
}
