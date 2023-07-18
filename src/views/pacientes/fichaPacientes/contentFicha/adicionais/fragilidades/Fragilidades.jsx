import React, {useEffect, useState} from "react";
import PainelFicha from "../../../../../../components/painelFicha/PainelFicha";
import api from "../../../../../../service/api";
import TabelaFragilidades from "./tabela/TabelaFragilidades";
import EditarFragilidades from "./editar/EditarFragilidades";
import AdicionarFragilidades from "./adicionar/AdicionarFragilidades";

function Fragilidades(props) {
    const [itemsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [fragilidades, setFragilidades] = useState([]);
    const [editarFragilidadesId, setEditarFragilidadesId] = useState(null);
    const [componenteAtivo, setComponenteAtivo] = useState('tabela');

    const handleEditarClick = (fragilidadesId) => {
        setComponenteAtivo('editar');
        setEditarFragilidadesId(fragilidadesId);
    }

    const handleFechar = () => {
        setComponenteAtivo('tabela');
    }

    const handleAcicionarClick = () => {
        setComponenteAtivo('adicionar');
    }

    useEffect(() => {
        async function carregarFragilidades() {
            try {
                const response = await api.get(`/v1/fragilidades/paciente/${props.pacienteId}`);
                setFragilidades(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        carregarFragilidades();
    })

    const totalPages = Math.ceil((fragilidades?.length || 0) / itemsPerPage);
    const pagesPerGrop = 10;
    const currentPageGroup = Math.ceil(currentPage / pagesPerGrop);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const getFragilidadesPaginaAtual = () => {
        const inicio = (currentPage - 1) * itemsPerPage;
        const fim = inicio - itemsPerPage;
        return fragilidades?.slice(inicio, fim) || [];
    }

    const renderGroups = () => {
        const groups = [];

        groups.push(
            <button
                key={1000}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Anterior
            </button>
        );

        const startGroup = (currentPage - 1) * pagesPerGrop + 1;
        const endGroup = Math.min(startGroup + pagesPerGrop -1, totalPages);

        for (let i = startGroup; i < endGroup; i++) {
            groups.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={currentPage === i ? "PaginaAtiva" : "PaginaInativa"}>
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
        )

        return groups;
    }

    return (
        <div className="Fragilidades">
            <PainelFicha titulo="4.9 Fragilidades" botaoNew={true} onAdicionarClick={handleAcicionarClick}>
                <div className="Conteudo">
                    {componenteAtivo === "tabela" && (
                        <>
                            <TabelaFragilidades
                                itemsPerPage={itemsPerPage}
                                currentPage={currentPage}
                                onEditarClick={handleEditarClick}
                                pacienteId={props.pacienteId}
                                data={getFragilidadesPaginaAtual()}
                            />
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
                        </>
                    )}
                    {componenteAtivo === "editar" && (
                        <EditarFragilidades
                            onClose={handleFechar}
                            pacienteId={props.pacienteId}
                            fragilidadesId={editarFragilidadesId}
                        />
                    )}
                    {componenteAtivo === "adicionar" && (
                        <AdicionarFragilidades
                            pacienteId={props.pacienteId}
                            onClose={handleFechar}
                        />
                    )}
                </div>
            </PainelFicha>
        </div>
    )
}

export default Fragilidades;