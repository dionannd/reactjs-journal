import React from "react";
import routeList from "./route-list";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import { AuthLayout } from "components";

const PrivateRoute = withRouter(() => {
  const AuthPage = routeList.map((route, index) => (
    <Route
      key={index}
      path={route.path}
      exact={true}
      render={(props) => <route.component {...props} />}
    />
  ));

  return (
    <AuthLayout>
      <Switch>
        {localStorage.getItem("token") ? AuthPage : <Redirect to="/" />}
      </Switch>
    </AuthLayout>
  );
});

export default PrivateRoute;
