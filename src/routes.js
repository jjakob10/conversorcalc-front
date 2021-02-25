import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom"

// import Menu from "./pages/Menu"
import Calculate from "./pages/Calculate"
import Inductor from "./pages/Inductor"
// import Simulation from "./pages/Simulation"


export default function Routes(){
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Calculate}/>
        <Route path="/inductor" exact component={Inductor}/>
        {/* <Route path="/register" component={Calculate}/>
        <Route path="/profile" component={Simulation}/> */}
      </Switch>
    </BrowserRouter>
  );
}