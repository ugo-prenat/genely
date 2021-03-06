import { useState, useEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import About from './components/pages/About';
import Signup from "./components/pages/Signup";
import Profile from "./components/pages/Profile";
import EditProfile from "./components/pages/EditProfile";
import Component from "./components/pages/Component";
import PageNotFound from "./components/pages/PageNotFound";
import ResetPassword from "./components/pages/ResetPassword";
import CreateComponent from "./components/pages/CreateComponent";

import Header from "./components/Header";
import { request as fetch } from './controller/request'


function App() {
  const token = localStorage.getItem('token')
  
  const [isLoading, setIsLoading] = useState(true)
  const [isAuth, setIsAuth] = useState()
  const [user, setUser] = useState()
  
  const renderHeader = useRef(null)
  
  useEffect(() => {
    const getUser = async() => {
      if (token) {
        const res = await fetch.get('/auth')
        if (res.status !== 200) setIsAuth(false)
        else {
          setUser(res.user)
          setIsAuth(true)
        }
      }
      else setIsAuth(false)
      setIsLoading(false)
    }
    getUser()
    
  }, [token])
  
  const updateUser = user => {
    setUser(user)
    // Update the profile picture in the header
    renderHeader.current(user.avatarUrl)
  }
  
  if (isLoading) return( <div className="App loading">Genely se réveille...</div> )
  
  return (
    <div className="App">
      <Header isAuth={isAuth} user={user} render={renderHeader} />
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/new-component' element={<CreateComponent isAuth={isAuth} user={user} />} />
        <Route path='/about' element={<About />} />
        <Route path='/:username' element={<Profile isAuth={isAuth} myUsername={user?.username} />} />
        <Route path='/:username/settings' element={<EditProfile isAuth={isAuth} user={user} updateUser={user => updateUser(user)} />} />
        <Route path='/:username/404' element={<PageNotFound />} />
        <Route path='/:username/:componentShortname' element={<Component isAuth={isAuth} myUsername={user?.username} />} />
        <Route path='/reset/password/:token' element={<ResetPassword />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
