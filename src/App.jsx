import React from "react";
import './App.css'
import Aplicacao from "./views/aplicacao/Aplicacao";
import {isAuthenticated} from "./service/auth/auth";
import Login from "./views/login/Login";

function App(props) {

    return (
        <div className="App">
            {isAuthenticated() ? <Aplicacao/> : <Login/>}
        </div>
    )
}

export default App;
