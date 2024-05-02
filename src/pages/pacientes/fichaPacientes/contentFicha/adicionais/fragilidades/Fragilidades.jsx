import React, {useEffect, useState} from "react";
import PainelFicha from "../../../../../../components/painelFicha/PainelFicha";
import api from "../../../../../../service/api";
import TabelaFragilidades from "./tabela/TabelaFragilidades";
import EditarFragilidades from "./editar/EditarFragilidades";
import AdicionarFragilidades from "./adicionar/AdicionarFragilidades";
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '../../ContentFicha'

function Fragilidades() {
    const [itemsPerPage] = useState(5);
    const [currentPage] = useState(1);
    const [fragilidades, setFragilidades] = useState([]);
    const navigate = useNavigate()
    const query = useQuery()
    const params = useParams()
    const { id } = params
    const [loading, setLoading] = useState(true)

    const handleEditarClick = (diagnosticosId) => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=editar&infoId=${diagnosticosId}`);
    }

    const handleAdicionarClick = () => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=adicionar`);
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
            <PainelFicha titulo="4.9 Fragilidades" botaoNew={true} onAdicionarClick={handleAdicionarClick}>
                <div className="Conteudo">
                    {query.get('view') === "tabela" && (
                        <>
                            <TabelaFragilidades
                                itemsPerPage={itemsPerPage}
                                currentPage={currentPage}
                                onEditarClick={handleEditarClick}
                                data={fragilidades}
                                loading={loading}
                            />
                        </>
                    )}
                    {query.get('view') === "editar" && (
                        <EditarFragilidades/>
                    )}
                    {query.get('view') === "adicionar" && (
                        <AdicionarFragilidades/>
                    )}
                </div>
            </PainelFicha>
        </div>
    )
}

export default Fragilidades;
