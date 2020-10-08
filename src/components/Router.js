import React from "react";
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import Home from "../routes/Home";
import Auth from "../routes/Auth";
import Profile from "routes/Profile";
import Navigation from "./Navigation";

function Router({ isLoggned, userObj }) {
  return (
    <HashRouter>
      {isLoggned && <Navigation userObj={userObj} />}
      <Switch>
        {isLoggned ? (
          <>
            <Route path="/" exact>
              <Home userObj={userObj} />
            </Route>
            <Route path="/profile" exact>
              <Profile userObj={userObj} />
            </Route>
          </>
        ) : (
          <>
            <Route path="/" component={Auth} exact />
          </>
        )}
      </Switch>
    </HashRouter>
  );
}

export default Router;
