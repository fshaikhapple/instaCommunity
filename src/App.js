import React from 'react';
import logo from './logo.svg';
import './App.css';
import PrivateRoute from "./UI/Components/PrivateRoute";
import Todos from "./UI/Routes/Todos";
import SignIn from "./UI/Routes/SignIn";
import { Switch, Route } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useFirebase } from "react-redux-firebase";
import { useHistory } from "react-router-dom";

function App() {
  const firebase = useFirebase();
  const history = useHistory();
  const doLogout = () => {
    console.log("firebase logout >", firebase.logout);
    firebase.logout();
    history.push('/signin')
  }
  return (
    <div style={{
      textAlign: "center"
    }}>
      <nav class="navbar navbar-expand-lg primary">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <a class="navbar-brand" href="/dashboard"> </a>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <p className='logo'>Insta Promoter</p>
            </li>
          </ul>
          <form class="form-inline">
            <button onClick={() => { doLogout() }} class="btn btn-outline-success my-2 my-sm-0" >Logout</button>
          </form>
        </div>
      </nav>
      <div className='mt-5'>

      </div>
      <Switch>
        <Route exact path="/dashboard">
          <Todos />
        </Route>
        <Route path="/">
          <SignIn />
        </Route>
        <Route exact path="/signin">
          <SignIn />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
