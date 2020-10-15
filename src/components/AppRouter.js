import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../routes/Home";
import Auth from "../routes/Auth";
import Profile from "routes/Profile";
import Navigation from "./Navigation";

function AppRouter({ refreshUser, isLoggned, userObj }) {
  return (
    <Router>
      {isLoggned && <Navigation userObj={userObj} />}
      <Switch>
        {isLoggned ? (
          <div
            style={{
              maxWidth: 890,
              width: "100%",
              margin: "0 auto",
              marginTop: 80,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Route path="/" exact>
              <Home userObj={userObj} />
            </Route>
            <Route path="/profile" exact>
              <Profile userObj={userObj} refreshUser={refreshUser} />
            </Route>
          </div>
        ) : (
          <>
            <Route path="/" component={Auth} exact />
          </>
        )}
      </Switch>
    </Router>
  );
}

export default AppRouter;
