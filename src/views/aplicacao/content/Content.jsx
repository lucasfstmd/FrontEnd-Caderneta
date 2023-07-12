import React from "react";
import { Route, Routes } from "react-router-dom";

import './Content.css'

import Pacientes from "../../pacientes/telaInicial/Pacientes";
import Usuarios from "../../usuarios/Usuarios";
import Export from "../../export/Export";
import Ficha from "../../pacientes/fichaPacientes/Ficha";
import Cadastro from "../../pacientes/cadastro/Cadastro";
import Ubs from "../../ubs/Ubs";
import EditarUsuario from "../../usuarios/editar/EditarUsuario";
import AdicionarUsuarios from "../../usuarios/adicionar/AdicionarUsuarios";
import EditarUbs from "../../ubs/editar/EditarUbs";
import AdicionarUbs from "../../ubs/adicionar/AdicionarUbs";
import NotFound from "../../notFound/NotFound";

const Content = (props) => (
    <div className="Content">
        <Routes>
            <Route path={'/'} element={<Pacientes/>}/>
            <Route path={'/caderneta'} element={<Pacientes />}/>
            <Route path={'/caderneta/pacientes'} element={<Pacientes />}/>
            <Route path={'/caderneta/pacientes/ficha/:id'} element={<Ficha />} />
            <Route path={'/caderneta/pacientes/cadastro'} element={<Cadastro/>}/>
            <Route path={'/caderneta/export'} element={<Export />}/>
            <Route path={'/caderneta/ubs'} element={<Ubs/>}/>
            <Route path={'/caderneta/ubs/editar/:id'} element={<EditarUbs/>}/>
            <Route path={'/caderneta/ubs/adicionar'} element={<AdicionarUbs/>}/>
            <Route path={'/caderneta/usuarios'} element={ props.type === "admin" ? <Usuarios /> : <NotFound/>}/>
            <Route path={'/caderneta/usuarios/editar/:user'} element={<EditarUsuario type={props.type}/>}/>
            <Route path={'/caderneta/usuarios/adicionar'} element={ props.type === "admin" ? <AdicionarUsuarios/> : <NotFound/>}/>
            <Route path={'*'} element={<NotFound/>}/>
        </Routes>
    </div>
)

export default Content;