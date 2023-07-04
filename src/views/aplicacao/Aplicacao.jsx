import React from "react"
import Header from "./menu/Header";
import Content from "./content/Content";
import Footer from "./footer/Footer";
import RequestAuth from "../../service/auth/RequestAuth";

const Aplicacao = props => (
    <div className="Aplicacao">
        <RequestAuth>
            <Header user={props.user} sub={props.sub} type={props.type}/>
            <Content/>
            <Footer/>
        </RequestAuth>
    </div>
)

export default Aplicacao;