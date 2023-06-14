import React from "react";
import { Link } from "react-router-dom";

import './Header.css';

import { FaUsers, FaUser } from 'react-icons/fa';
import { BiExport } from 'react-icons/bi'
import { MdDashboardCustomize } from 'react-icons/md'

import BotaoUsuario from "../../../components/botaoUsuario/BotaoUsuario";

function Header (props) {

    return (
        <aside className="Menu">
            <div className="Header">
                <h1>Caderneta Idosos</h1>
                <nav>
                    <ul>
                        <li key={1}>
                            <Link style={{textDecoration: 'none'}} to={'/caderneta/pacientes'}>
                                <div className="Opcao">
                                    <FaUsers/> Lista Pacientes
                                </div>
                            </Link>
                        </li>
                        <li key={2}>
                            <Link style={{textDecoration: 'none'}} to={'/caderneta/usuarios'}>
                                <div className="Opcao">
                                    <FaUser/> Usuarios
                                </div>
                            </Link>
                        </li>
                        <li key={3}>
                            <Link style={{textDecoration: 'none'}} to={'/caderneta/export'}>
                                <div className="Opcao">
                                    <BiExport/> Exportar Dados
                                </div>
                            </Link>
                        </li>
                        <li key={4}>
                            <Link style={{textDecoration: 'none'}} to={'/caderneta/sistema'}>
                                <div className="Opcao">
                                    <MdDashboardCustomize/> Sistema
                                </div>
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="Usuario">
                    <BotaoUsuario user={props.user} sub={props.sub}/>
                </div>
            </div>
        </aside>
    )
}

export default Header;

