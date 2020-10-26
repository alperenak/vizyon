import React, { Component } from "react";
import { Text } from "office-ui-fabric-react";
import { GraphFileBrowser } from "@microsoft/file-browser";
import { UserAgentApplication } from "msal";
import { GetUserId } from "../../utils/utils";

const CLIENT_ID = "45385ff8-daba-4f16-bcf5-ec8e125da3ae";
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
    this._getMsalToken();
  }

  render() {
    const { token } = this.state;

    return (
      <div className="App">
        {token ? (
          <GraphFileBrowser
            getAuthenticationToken={() => Promise.resolve(token)}
            onSuccess={alert}
            onRenderCancelButton={() => null}
            onRenderSuccessButton={() => null}
          />
        ) : (
          <div>yükleniyor...</div>
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
