import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./ListaPacientes.css"

import { AiOutlineUserAdd } from "react-icons/ai";

import TabelaPacientes from "./tabela/TabelaPacientes";
import api from "../../../../service/api";

function ListaPacientes(props) {
    const [itemsPerPage] = useState(20);
    const [currentPage, setCurrentPage] = useState(1);
    const [pacientes, setPacientes] = useState([]);

    useEffect(() => {
        async function carregarPacientes() {
            let response;

            if (props.nomePesquisado && props.ubsSelecionada) {
                response = await api.get("v1/pacientes/nome-ubs", {
                    params: {
                        nome: props.nomePesquisado,
                        ubs: props.ubsSelecionada,
                    },
                });
            } else if (props.nomePesquisado) {
                response = await api.get("v1/pacientes/nome/" + props.nomePesquisado);
            } else if (props.ubsSelecionada) {
                response = await api.get("v1/pacientes/ubs/" + props.ubsSelecionada);
            } else {
                response = await api.get("v1/pacientes");
            }

            setPacientes(response.data);
        }

        carregarPacientes();
    }, [props.nomePesquisado, props.ubsSelecionada]);

    const totalPages = Math.ceil((pacientes?.length || 0) / itemsPerPage);
    const pagesPerGroup = 10;
    const currentPageGroup = Math.ceil(currentPage / pagesPerGroup);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const getPacientesPaginaAtual = () => {
        const inicio = (currentPage - 1) * itemsPerPage;
        const fim = inicio + itemsPerPage;
        return pacientes?.slice(inicio, fim) || [];
    };

    const renderGroups = () => {
        const groups = [];

        // Primeira página
        groups.push(
            <button
                key={1000}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Anterior
            </button>
        );

        const startGroup = (currentPageGroup - 1) * pagesPerGroup + 1;
        const endGroup = Math.min(startGroup + pagesPerGroup - 1, totalPages);

        for (let i = startGroup; i <= endGroup; i++) {
            groups.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={currentPage === i ? "PaginaAtiva" : "PaginaInativa"}
                >
                    {i}
                </button>
            );
        }

        groups.push(
            <button
                key={1001}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Próxima
            </button>
        );

        return groups;
    };

    return (
        <div className="ContainerLista">
            <div className="Lista">
                <div className="Titulo">
                    <h1>Pacientes</h1>
                    <button>
                        <Link
                            style={{ textDecoration: "none", color: "white" }}
                            to={"/caderneta/pacientes/cadastro"}
                        >
                            <AiOutlineUserAdd/> Cadastrar Novo Paciente
                        </Link>
                    </button>
                </div>
                <div className="Paginas">
                    <p>Página {currentPage} de {totalPages}, Total de registros: {pacientes.length}.</p>
                </div>
                <div className="Tabela">
                    <TabelaPacientes
                        itemsPerPage={itemsPerPage}
                        currentPage={currentPage}
                        data={getPacientesPaginaAtual()}
                    />
                </div>
                <div className="Paginacao">
                    <button
                        key="primeira"
                        onClick={() => handlePageChange(1)}
                        disabled={currentPage === 1}
                    >
                        Primeira
                    </button>
                    {renderGroups()}
                    <button
                        key="ultima"
                        onClick={() => handlePageChange(totalPages)}
                        disabled={currentPage === totalPages}
                    >
                        Última
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ListaPacientes;
