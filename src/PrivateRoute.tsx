import * as React from "react";

import { Route } from "react-router-dom";
import AuthContext from "./AuthContext";
import Auth from "./Auth/Auth";

interface Props {
  path: string;
  component: typeof React.Component;
  scopes: string[];
}


export default class PrivateRoute extends React.Component<Props, {}> {

  render() {
    const { component: Component, scopes, ...rest } = this.props;
    return (
      <AuthContext.Consumer>
        {(auth: Auth) => (
          <Route
            {...rest}
            render={props => {
              // 1. Redirect to login if not logged in.
              if (!auth.isAuthenticated()) return auth.login() as any;

              // 2. Display message if user lacks required scope(s).
              if (scopes.length > 0 && !auth.userHasScopes(scopes)) {
                return (
                  <h1>
                    Unauthorized - You need the following scope(s) to view this
                    page: {scopes.join(",")}.
                  </h1>
                );
              }

              // 3. Render component
              return <Component auth={auth} {...props} />;
            }}
          />
        )}
      </AuthContext.Consumer>
    );
  }
}


