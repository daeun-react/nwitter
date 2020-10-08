import React, { useEffect, useState } from "react";
import Router from "components/Router";
import { authService } from "fbase";
import { auth } from "firebase";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj(user);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? (
        <Router isLoggned={Boolean(userObj)} userObj={userObj} />
      ) : (
        "Initializing..."
      )}
    </>
  );
}

export default App;
