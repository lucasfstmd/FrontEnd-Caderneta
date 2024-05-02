import React, {useState} from "react";
import "./InformacoesObitos.css"

import PainelFicha from "../../../../../../components/painelFicha/PainelFicha";
import TabelaObitos from "./tabela/TabelaObitos";
import EditarObitos from "./editar/EditarObitos";
import AdicionarObitos from "./adicionar/AdicionarObitos";
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '../../ContentFicha'

function InformacoesObitos() {
    const [itemsPerPage] = useState(20);
    const [currentPage] = useState(1);
    const navigate = useNavigate()
    const query = useQuery()
    const params = useParams()
    const { id } = params

    const handleEditarClick = (obitosId) => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=editar&infoId=${obitosId}`);
    }

    const handleAdicionarClick = () => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=adicionar`);
    }

    return (
        <div className="Obitos">
            <PainelFicha titulo="1.4 Informações Obitos" botaoNew={true} onAdicionarClick={handleAdicionarClick}>
                <div className="ConteudoObitos">
                    {query.get('view') === 'tabela' && (
                        <TabelaObitos
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onEditarClick={handleEditarClick}
                        />
                    )}

                    {query.get('view') === 'editar' && (
                        <EditarObitos/>
                    )}
                    {query.get('view') === 'adicionar' && (
                        <AdicionarObitos/>
                    )}
                </div>
            </PainelFicha>
        </div>
    );
}

export default InformacoesObitos;
