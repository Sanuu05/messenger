import React, { useEffect } from 'react'
import Navbar from './components/pages/Navbar'
import { Switch, Route, useHistory } from 'react-router-dom'
import Home from './components/pages/Home'
import Login from './components/Authentication/Login'
import SIgnup from './components/Authentication/SIgnup'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

function App() {
  const token = localStorage.getItem('tokenmain')
  const history = useHistory()
  useEffect(() => {
    if (!token) {
      history.push('/')

    } else {
      // dispatch(online())
      history.push('/home/l')
    }
  }, [token, history])

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
