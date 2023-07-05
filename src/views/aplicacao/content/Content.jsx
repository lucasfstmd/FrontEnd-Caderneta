import React from "react";
import { Route, Routes } from "react-router-dom";

import './Content.css'

import Pacientes from "../../pacientes/telaInicial/Pacientes";
import Usuarios from "../../usuarios/Usuarios";
import Export from "../../export/Export";
import Ficha from "../../pacientes/fichaPacientes/Ficha";
import Cadastro from "../../pacientes/cadastro/Cadastro";
import Sistema from "../../sistema/Sistema";
import EditarUsuario from "../../usuarios/editar/EditarUsuario";
import AdicionarUsuarios from "../../usuarios/adicionar/AdicionarUsuarios";
import EditarUbs from "../../sistema/editar/EditarUbs";
import AdicionarUbs from "../../sistema/adicionar/AdicionarUbs";
import NotFound from "../../notFound/NotFound";

const Content = (props) => (
    <div className="Content">
        <Routes>
            <Route path={'/'} element={<Pacientes/>}/>
            <Route path={'/caderneta'} element={<Pacientes />}/>
            <Route path={'/caderneta/pacientes'} element={<Pacientes />}/>
            <Route path={'/caderneta/usuarios'} element={<Usuarios />}/>
            <Route path={'/caderneta/pacientes/ficha/:id'} element={<Ficha />} />
            <Route path={'/caderneta/pacientes/cadastro'} element={<Cadastro/>}/>
            <Route path={'/caderneta/export'} element={<Export />}/>
            <Route path={'/caderneta/sistema'} element={<Sistema/>}/>
            <Route path={'/caderneta/sistema/editar/:id'} element={<EditarUbs/>}/>
            <Route path={'/caderneta/sistema/adicionar'} element={<AdicionarUbs/>}/>
            <Route path={'/caderneta/usuarios/editar/:user'} element={<EditarUsuario type={props.type}/>}/>
            <Route path={'/caderneta/usuarios/adicionar'} element={<AdicionarUsuarios/>}/>
            <Route path={'*'} element={<NotFound/>}/>
        </Routes>
    </div>
)

export default Content;