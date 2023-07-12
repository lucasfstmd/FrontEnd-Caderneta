import React, {useEffect, useState} from "react";
import "./Ubs.css"
import RequestAuth from "../../service/auth/RequestAuth";
import {Link} from "react-router-dom";
import {FaHospitalSymbol} from "react-icons/fa";
import api from "../../service/api";
import TabelaUbs from "./tabela/TabelaUbs";

function Ubs() {
    const [itemsPerPage] = useState(20);
    const [currentPage] = useState(1);
    const [ubs, setUbs] = useState([])

    useEffect(() => {
        async function carregarUsuarios() {
            try {
                const response = await api.get('v1/ubs');
                setUbs(response.data);
            } catch (error) {
                console.log(error)
            }

        }

        carregarUsuarios();
    }, [])

    const totalPages = Math.ceil((ubs?.length || 0) / itemsPerPage);

    const getUbsPagAtual = () => {
        const inicio = (currentPage - 1) * itemsPerPage;
        const fim = inicio + itemsPerPage;
        return ubs?.slice(inicio, fim) || [];
    }

    return (
        <RequestAuth>
            <div className="Sistema">
                <div className="TituloSistema">
                    <h1>Unidades Basicas de Saúde</h1>
                    <div className="BotaoAdicinar">
                        <button>
                            <Link
                                style={{textDecoration: "none", color: "white"}}
                                to={"/caderneta/ubs/adicionar"}
                            >
                                <FaHospitalSymbol/> Cadastrar Nova UBS
                            </Link>
                        </button>
                    </div>
                </div>
                <hr/>
                <div className="ComponentesSistema">
                    <div className="Paginas">
                        Pagina {currentPage} de {totalPages}, Total registros: {ubs.length}.
                    </div>
                    <div className="Tabela">
                        <TabelaUbs itemsPerPage={itemsPerPage} currentPage={currentPage} data={getUbsPagAtual()} />
                    </div>
                </div>
            </div>
        </RequestAuth>
    )
}

export default Ubs;