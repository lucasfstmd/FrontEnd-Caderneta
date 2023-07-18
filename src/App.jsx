import React from "react";
import './App.css'
import Aplicacao from "./pages/aplicacao/Aplicacao";
import {isAuthenticated} from "./service/auth/auth";
import Login from "./pages/login/Login";

function App() {

    return (
        <div className="App">
            {isAuthenticated() ? <Aplicacao/> : <Login/>}
        </div>
    )
}

export default App;
