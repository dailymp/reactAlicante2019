import * as auth0 from "auth0-js";
import { createHashHistory } from 'history';
export const history = createHashHistory();

const createAuthOptions = () : auth0.AuthOptions => (
  {
    domain: "" ,
    clientID: "",
    responseType: "",
    responseMode: "",
    redirectUri: "",
    scope: "",
    audience: "",
    leeway: 0,
    plugins: [],
    _disableDeprecationWarnings: false,
    _sendTelemetry: false,
    _telemetryInfo: null,
    __tryLocalStorageFirst: false,
  }
);

class Auth {
  private readonly REDIRECT_ON_LOGIN :string = "redirect_on_login";
  
  private _idToken = null;
  private _accessToken = null;
  private _scopes = null;
  private _expiresAt = null;
  private userProfile = null;
  private requestedScopes:string;
  private auth0:auth0.WebAuth;
  private history:object;

  constructor(history:object) {
    this.history = history;
    //this.history = history;
    this.userProfile = null;
    this.requestedScopes = "openid profile email read:courses";
    let options: auth0.AuthOptions = createAuthOptions();

    options.domain = process.env.REACT_APP_AUTH0_DOMAIN ? process.env.REACT_APP_AUTH0_DOMAIN : "";
    options.clientID = process.env.REACT_APP_AUTH0_CLIENT_ID ? process.env.REACT_APP_AUTH0_CLIENT_ID : "";
    options.redirectUri = process.env.REACT_APP_AUTH0_CALLBACK_URL;
    options.audience = process.env.REACT_APP_AUTH0_AUDIENCE ? process.env.REACT_APP_AUTH0_AUDIENCE : "";
    options.responseType ="token id_token";
    options.scope =this.requestedScopes;

    this.auth0 = new auth0.WebAuth(options);
  }

  public login = () => {
    localStorage.setItem(
      REDIRECT_ON_LOGIN,
      JSON.stringify(this.history.location)
    );
    this.auth0.authorize();
  }

}

const REDIRECT_ON_LOGIN = "redirect_on_login";


export default class Auth2 {


  login = () => {
    localStorage.setItem(
      REDIRECT_ON_LOGIN,
      JSON.stringify(this.history.location)
    );
    this.auth0.authorize();
  };

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        const redirectLocation =
          localStorage.getItem(REDIRECT_ON_LOGIN) === "undefined"
            ? "/"
            : JSON.parse(localStorage.getItem(REDIRECT_ON_LOGIN));
        this.history.push(redirectLocation);
      } else if (err) {
        this.history.push("/");
        alert(`Error: ${err.error}. Check the console for further details.`);
        console.log(err);
      }
      localStorage.removeItem(REDIRECT_ON_LOGIN);
    });
  };

  setSession = authResult => {
    console.log(authResult);
    // set the time that the access token will expire
    _expiresAt = authResult.expiresIn * 1000 + new Date().getTime();

    // If there is a value on the `scope` param from the authResult,
    // use it to set scopes in the session for the user. Otherwise
    // use the scopes as requested. If no scopes were requested,
    // set it to nothing
    _scopes = authResult.scope || this.requestedScopes || "";

    _accessToken = authResult.accessToken;
    _idToken = authResult.idToken;
    this.scheduleTokenRenewal();
  };

  isAuthenticated() {
    return new Date().getTime() < _expiresAt;
  }

  logout = () => {
    this.auth0.logout({
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
      returnTo: "http://localhost:3000"
    });
  };

  getAccessToken = () => {
    if (!_accessToken) {
      throw new Error("No access token found.");
    }
    return _accessToken;
  };

  getProfile = cb => {
    if (this.userProfile) return cb(this.userProfile);
    this.auth0.client.userInfo(this.getAccessToken(), (err, profile) => {
      if (profile) this.userProfile = profile;
      cb(profile, err);
    });
  };

  userHasScopes(scopes) {
    const grantedScopes = (_scopes || "").split(" ");
    return scopes.every(scope => grantedScopes.includes(scope));
  }

  renewToken(cb) {
    this.auth0.checkSession({}, (err, result) => {
      if (err) {
        console.log(`Error: ${err.error} - ${err.error_description}.`);
      } else {
        this.setSession(result);
      }
      if (cb) cb(err, result);
    });
  }

  scheduleTokenRenewal() {
    const delay = _expiresAt - Date.now();
    if (delay > 0) setTimeout(() => this.renewToken(), delay);
  }
}
