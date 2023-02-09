import "./App.css";

import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./componentes/Navbar";
import Home from "./componentes/Home";
import About from "./componentes/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./componentes/Alert";
import Signup from "./componentes/Signup";
import Login from "./componentes/Login";




function App() {
  const[alert,setaAlert]=useState(null)
  const showAlert=(message,type)=>{
    setaAlert({
       msg:message,
       type:type
    })
    setTimeout(()=>{
      setaAlert(null)
    },1500);
  }
  return (
    <>
    <NoteState>
      <Router>
        <Navbar />
        <Alert alert={alert} />
        <div className="container" >
        <Switch>
          <Route exact path="/">
            <Home showAlert={showAlert} />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/login">
            <Login showAlert={showAlert}  />
          </Route>
          <Route exact path="/signup">
            <Signup showAlert={showAlert} />
          </Route>
        </Switch>
        </div>
      </Router>
      </NoteState>
    </>
  );
}

export default App;
