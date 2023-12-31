import React, {useEffect, useState} from "react";
import PainelFicha from "../../../../../../components/painelFicha/PainelFicha";
import api from "../../../../../../service/api";
import TabelaFragilidades from "./tabela/TabelaFragilidades";
import EditarFragilidades from "./editar/EditarFragilidades";
import AdicionarFragilidades from "./adicionar/AdicionarFragilidades";
import {useParams} from "react-router-dom";

function Fragilidades(props) {
    const [itemsPerPage] = useState(5);
    const [currentPage] = useState(1);
    const [fragilidades, setFragilidades] = useState([]);
    const [editarFragilidadesId, setEditarFragilidadesId] = useState(null);
    const [componenteAtivo, setComponenteAtivo] = useState('tabela');
    const [loading, setLoading] = useState(true)
    const { id } = useParams();

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

    async function carregarFragilidades() {
        try {
            const response = await api.get(`/v1/fragilidades/paciente/${id}`);
            setFragilidades(response.data);
            setLoading(false);
        } catch (error) {
            console.log(undefined);
        }
    }

    useEffect(() => {
        carregarFragilidades();
    }, []);


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
                                data={fragilidades}
                                loading={loading}
                            />
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
