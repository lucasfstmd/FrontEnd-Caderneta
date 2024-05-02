import React, {useState} from "react";
import PainelFicha from "../../../../../../components/painelFicha/PainelFicha";
import TabelaReacoes from "./tabela/TabelaReacoes";
import EditarReacoes from "./editar/EditarReacoes";
import AdicionarReacoes from "./adicionar/AdicionarReacoes";
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '../../ContentFicha'

function Reacoes() {
    const [itemsPerPage] = useState(20);
    const [currentPage] = useState(1);
    const navigate = useNavigate()
    const query = useQuery()
    const params = useParams()
    const { id } = params

    const handleEditarClick = (reacoesId) => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=editar&infoId=${reacoesId}`);

    }

    const handleAdicionarClick = () => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=adicionar`);
    }

    return (
        <div className="Reacoes">
            <PainelFicha titulo="2.4 Reações Adversas ou Alergias a Medicamentos" botaoNew={true} onAdicionarClick={handleAdicionarClick}>
                <div className="ConteudoDiagnosticos">
                    {query.get('view') === 'tabela' && (
                        <TabelaReacoes
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onEditarClick={handleEditarClick}
                        />
                    )}
                    {query.get('view') === 'editar' && (
                        <EditarReacoes/>
                    )}
                    {query.get('view') === 'adicionar' && (
                        <AdicionarReacoes/>
                    )}
                </div>
            </PainelFicha>
        </div>
    );
}

export default Reacoes;
