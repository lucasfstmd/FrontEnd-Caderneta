import React, {useState} from "react";
import PainelFicha from "../../../../../../components/painelFicha/PainelFicha";
import TabelaVacina from "./tabela/TabelaVacina";
import EditarVacina from "./editar/EditarVacina";
import AdicionarVacina from "./adicionar/AdicionarVacina";
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '../../ContentFicha'

function Vacinacao() {
    const [itemsPerPage] = useState(20);
    const [currentPage] = useState(1);
    const navigate = useNavigate()
    const query = useQuery()
    const params = useParams()
    const { id } = params

    const handleEditarClick = (vacinaId) => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=editar&infoId=${vacinaId}`);
    }

    const handleAdicionarClick = () => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=adicionar`);
    }

    return (
        <div className="Vacinacao">
            <PainelFicha titulo="3.3 Calendário de Vacinação" botaoNew={true} onAdicionarClick={handleAdicionarClick}>
                <div className="Conteudo">
                    {query.get('view') === 'tabela' && (
                        <TabelaVacina
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onEditarClick={handleEditarClick}
                        />
                    )}

                    {query.get('view') === 'editar' && (
                        <EditarVacina/>
                    )}
                    {query.get('view') === 'adicionar' && (
                        <AdicionarVacina/>
                    )}
                </div>
            </PainelFicha>
        </div>
    );
}

export default Vacinacao;
