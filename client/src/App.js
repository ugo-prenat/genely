import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import About from './components/pages/About';
import Profil from "./components/pages/Profil";
import Settings from "./components/pages/Settings"
import Component from "./components/pages/Component";
import PageNotFound from "./components/pages/PageNotFound";
import ResetPassword from "./components/pages/ResetPassword";
import CreateComponent from "./components/pages/CreateComponent";

import Header from "./components/Header";

function App() {
  const token = localStorage.getItem('token')
  const [isAuth] = useState(token ? true : false)
  
  return (
    <div className="App">
      <Header isAuth={isAuth} />
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/new-component' element={<CreateComponent isAuth={isAuth} />} />
        <Route path='/about' element={<About />} />
        <Route path='/:username' element={<Profil />} />
        <Route path='/:username/:component' element={<Component />} />
        <Route path='/reset/password/:token' element={<ResetPassword />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
