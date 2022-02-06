import { Routes, Route } from "react-router-dom";

import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Profil from "./components/pages/Profil";
import Settings from "./components/pages/Settings"
import Component from "./components/pages/Component";
import PageNotFound from "./components/pages/PageNotFound";
import CreateComponent from "./components/pages/CreateComponent";

import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />
      
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/new-component' element={<CreateComponent />} />
        <Route path='/:username' element={<Profil />} />
        <Route path='/:username/:component' element={<Component />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
