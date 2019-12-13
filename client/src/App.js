import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import API from "./utils/API";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const getSession = () => {
    API.getUser().then(response => {
      console.log(response.data.user)
      if (response.data.user) {
        setIsLoggedIn(true);
      }
    })
  }

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" render = { props =>
            isLoggedIn ? (<Dashboard />) : <Redirect to={{pathname: "/login"}} />
          } />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;