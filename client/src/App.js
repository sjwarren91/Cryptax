import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import API from "./utils/API";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const getSession = () => {
    setLoading(false);
    API.getUser().then(response => {
      console.log(response.data.user);
      if (response.data.user) {
        setIsLoggedIn(true);
      }
      setLoading(true)
    });
  };

  useEffect(() => getSession(), []);

  if (isLoading) {
    return (
      <Router>
        <div>
          <Switch>
            <Route
              exact
              path="/"
              render={props =>
                isLoggedIn ? (
                  <Dashboard />
                ) : (
                  <Login {...props} getSession={getSession} />
                )
              }
            />
          </Switch>
        </div>
      </Router>
    );
  } else {
    return (
      <div></div>
    )
  }
}

export default App;
