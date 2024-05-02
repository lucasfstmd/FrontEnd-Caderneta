import React, {useState} from "react";
import PainelFicha from "../../../../../../components/painelFicha/PainelFicha";
import TabelaForcaPreensao from "./tebela/TabelaForcaPreensao";
import EditarForcaPreensao from "./editar/EditarForcaPreensao";
import AdicionarForcaPreensao from "./adicionar/AdicionarForcaPreensao";
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '../../ContentFicha'

function ForcaPreensao() {
    const [itemsPerPage] = useState(20);
    const [currentPage] = useState(1);
    const navigate = useNavigate()
    const query = useQuery()
    const params = useParams()
    const { id } = params


    const handleEditarClick = (forcaPressaoId) => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=editar&infoId=${forcaPressaoId}`);

    }

    const handleAdicionarClick = () => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=adicionar`);
    }

    return (
        <div className="ForcaPressao">
            <PainelFicha titulo="4.3 Força de Preensão" botaoNew={true} onAdicionarClick={handleAdicionarClick}>
                <div className="Conteudo">
                    {query.get('view') === 'tabela' && (
                        <TabelaForcaPreensao
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onEditarClick={handleEditarClick}
                        />
                    )}

                    {query.get('view') === 'editar' && (
                        <EditarForcaPreensao/>
                    )}
                    {query.get('view') === 'adicionar' && (
                        <AdicionarForcaPreensao/>
                    )}
                </div>
            </PainelFicha>
        </div>
    );
}

export default ForcaPreensao;
