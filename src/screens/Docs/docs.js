import React, { Component } from "react";
import { Text } from "office-ui-fabric-react";
import { GraphFileBrowser } from "@microsoft/file-browser";
import { UserAgentApplication } from "msal";

const CLIENT_ID = "651eda9b-1822-424d-b1b7-269b1e476f7b";
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
      <div className="App">
        <Text variant="xxLarge">File Browser Demo</Text>
        {token ? (
          <GraphFileBrowser
            getAuthenticationToken={() => Promise.resolve(token)}
            onSuccess={alert}
            onRenderCancelButton={() => null}
            onRenderSuccessButton={() => null}
          />
        ) : (
          <Text block onClick={this._getMsalToken}>
            [log in]
          </Text>
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
