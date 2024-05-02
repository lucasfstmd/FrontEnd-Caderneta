import React, {useState} from "react";
import PainelFicha from "../../../../../../components/painelFicha/PainelFicha";
import TabelaAtualizacao from "./tabela/TabelaAtualizacao";
import EditarAtualizacao from "./editar/EditarAtualizacao";
import AdicionarAtualizacao from "./adicionar/AdicionarAtualizacao";
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '../../ContentFicha'

function Atualizacoes() {
    const [itemsPerPage] = useState(20);
    const [currentPage] = useState(1);
    const navigate = useNavigate()
    const query = useQuery()
    const params = useParams()
    const { id } = params

    const handleEditarClick = (atualizacaoId) => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=editar&infoId=${atualizacaoId}`);

    }

    const handleAdicionarClick = () => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=adicionar`);
    }

    return (
        <div className="Atualizacoes">
            <PainelFicha titulo="3.6 Atualizações da Caderneta" botaoNew={true} onAdicionarClick={handleAdicionarClick}>
                <div className="Conteudo">
                    {query.get('view') === 'tabela' && (
                        <TabelaAtualizacao
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onEditarClick={handleEditarClick}
                        />
                    )}

                    {query.get('view') === 'editar' && (
                        <EditarAtualizacao/>
                    )}
                    {query.get('view') === 'adicionar' && (
                        <AdicionarAtualizacao/>
                    )}
                </div>
            </PainelFicha>
        </div>
    );
}

export default Atualizacoes;
