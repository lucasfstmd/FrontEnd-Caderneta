import React from "react";
import "./Footer.css";

const Footer = () => (
    <footer className="Footer">
        <div className="FooterContent">
            <strong>Caderneta de Saúde da Pessoa Idosa </strong>
            {new Date().getFullYear()}
        </div>
    </footer>
);

export default Footer;
