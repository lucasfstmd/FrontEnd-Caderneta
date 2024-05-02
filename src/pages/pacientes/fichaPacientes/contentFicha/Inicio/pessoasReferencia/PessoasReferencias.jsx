import React, {useState} from "react";
import "./PessoasReferencias.css"

import PainelFicha from "../../../../../../components/painelFicha/PainelFicha";
import TabelaReferencias from "./tabela/TabelaReferencias";
import EditarReferencias from "./editar/EditarReferencias";
import AdicionarReferencias from "./adicionar/AdicionarReferencias";
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '../../ContentFicha'

function PessoasReferencias() {
    const [itemsPerPage] = useState(20);
    const [currentPage] = useState(1);
    const navigate = useNavigate()
    const query = useQuery()
    const params = useParams()
    const { id } = params

    const handleEditarClick = (referenciaId) => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=editar&infoId=${referenciaId}`);
    }

    const handleAdicionarClick = () => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=adicionar`);
    }

    return (
        <div className="PessoasReferencia">
            <PainelFicha titulo="1.3 Pessoas de Refência" botaoNew={true} onAdicionarClick={handleAdicionarClick}>
                <div className="ConteudoReferencia">
                    {query.get('view') === 'tabela' && (
                        <TabelaReferencias
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onEditarClick={handleEditarClick}
                        />
                    )}

                    {query.get('view') === 'editar' && (
                        <EditarReferencias/>
                    )}
                    {query.get('view') === 'adicionar' && (
                        <AdicionarReferencias/>
                    )}
                </div>
            </PainelFicha>
        </div>
    );
}

export default PessoasReferencias;
