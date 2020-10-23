import React, { Component } from "react";
import styles from "./docs.module.scss";
import { Text } from "office-ui-fabric-react";
import { GraphFileBrowser } from "@microsoft/file-browser";
import { UserAgentApplication } from "msal";
import Button from "../../components/Button/button";

const CLIENT_ID = "f054b515-d62a-44dd-b760-ea4ec9c24c65";
const SCOPES = ["files.readwrite.all", "user.read"];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: null,
    };

    this.msal = new UserAgentApplication(CLIENT_ID);
  }

  componentDidMount() {
    this._tryGetMsalToken();
  }

  render() {
    const { token } = this.state;

    return (
      <div className={styles.docs}>
        <div className={styles.title}>Dosyalar</div>
        {token ? (
          <GraphFileBrowser
            getAuthenticationToken={() => Promise.resolve(token)}
            onSuccess={alert}
            onRenderCancelButton={() => null}
            onRenderSuccessButton={() => null}
          />
        ) : (
          <Button
            title={"Microsoft hesabına giriş yap"}
            onClick={this._getMsalToken}
            type={"primary"}
          />
        )}
      </div>
    );
  }

  _acquireAccessToken = () => {
    this.msal.acquireTokenSilent(SCOPES).then(
      (token) => {
        this.setState({ token });
      },
      (err) => {
        this.msal.acquireTokenRedirect(SCOPES);
      }
    );
  };

  _loginPromptAndAuthenticate = () => {
    this.msal.loginPopup(SCOPES).then((idToken) => {
      this._acquireAccessToken();
    });
  };

  _tryGetMsalToken = () => {
    const user = this.msal.getUser();

    if (user) {
      this._acquireAccessToken();
    }
  };

  _getMsalToken = () => {
    const user = this.msal.getUser();

    if (user) {
      this._acquireAccessToken();
    } else {
      this._loginPromptAndAuthenticate();
    }
  };
}

export default App;
