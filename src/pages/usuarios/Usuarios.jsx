import React, {useEffect, useState} from "react";
import "./Usuarios.css"
import api from "../../service/api";
import TabelaUsuarios from "./tabela/TabelaUsuarios";
import RequestAuth from "../../service/auth/RequestAuth";
import {AiOutlineUserAdd} from "react-icons/ai";
import {Link} from "react-router-dom";

function Usuarios() {
    const [itemsPerPage] = useState(20);
    const [currentPage] = useState(1);
    const [usuarios, setUsuarios] = useState([])

    async function carregarUsuarios() {
        try {
            const response = await api.get('v1/usuarios');
            setUsuarios(response.data);
        } catch (error) {
            console.log(undefined)
        }
    }

    useEffect(() => {
        carregarUsuarios();
    }, [])

    const totalPages = Math.ceil((usuarios?.length || 0) / itemsPerPage);

    const getUsuariosPaginaAtual = () => {
        const inicio = (currentPage - 1) * itemsPerPage;
        const fim = inicio + itemsPerPage;
        return usuarios?.slice(inicio, fim) || [];
    }


    return (
        <RequestAuth>
            <div className="Usuarios">
                <div className="TituloUsuario">
                    <h1>Usuarios</h1>
                    <button>
                        <Link
                            style={{ textDecoration: "none", color: "white" }}
                            to={"/caderneta/usuarios/adicionar"}
                        >
                            <AiOutlineUserAdd/> Cadastrar Novo Usuario
                        </Link>
                    </button>
                </div>
                <hr/>
                <div className="ComponentsUsuario">
                    <div className="Paginas">
                        Pagina {currentPage} de {totalPages}, Total registros: {usuarios.length}.
                    </div>
                    <div className="Tabela">
                        <TabelaUsuarios itemsPerPage={itemsPerPage} currentPage={currentPage} data={getUsuariosPaginaAtual()} />
                    </div>
                </div>
            </div>
        </RequestAuth>
    )
}
export default Usuarios;