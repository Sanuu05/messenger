import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { Switch, Route, useHistory } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import SIgnup from './components/SIgnup'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { useDispatch } from 'react-redux'
import { offline, online } from './action/user'
import { getAuth, signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail, sendEmailVerification, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

function App() {
  const token = localStorage.getItem('tokenmain')
  const history = useHistory()
  const dispatch = useDispatch()
  useEffect(() => {
    if (!token) {
      history.push('/')

    } else {
      // dispatch(online())
      history.push('/home/l')
    }
  }, [token, history])
  // const auth= getAuth()
  // useEffect(() => {
  //   window.addEventListener("beforeunload", (ev) => {
  //     ev.preventDefault();
  //     return ev.returnValue = 'Are you sure you want to close?';
  //   });


  // }, [])
  return (
    <div className="App">
      <Switch>

        {/* <Home/> */}
        <Route path="/home/:userid">
          {/* <Navbar />  */}
          <Home />
        </Route>
        <Route exact path="/"  >
          <Navbar />
          <Login />
        </Route>
        <Route exact path="/signup" >
          <Navbar />
          <SIgnup />
        </Route>

      </Switch>


    </div>
  );
}

export default App;
