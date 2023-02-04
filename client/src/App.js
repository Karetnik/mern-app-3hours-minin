import React from "react";
import {BrowserRouter as Router} from 'react-router-dom'
import {useRoute} from "./routes";
import {AuthContext} from "./context/AuthContext";
import {useAuth} from "./hooks/auth.hook";
import {Navbar} from "./components/Navbar";
import 'materialize-css'
import {Loader} from "./components/Loader";

const App = () => {
  const {token, userId, login, logout, ready} = useAuth()
  const isAuthenticated = !!token

  if (!ready) {
    return (
      <Loader />
    )
  }

  return (
    <AuthContext.Provider value={{token, userId, login, logout, isAuthenticated}}>
      <Router>
        {isAuthenticated && <Navbar />}
        <div className="container">
          {/*{useRoute(isAuthenticated)}*/}
        </div>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
