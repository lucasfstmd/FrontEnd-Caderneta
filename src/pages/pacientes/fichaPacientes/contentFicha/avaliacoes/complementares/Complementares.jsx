import React, {useState} from "react";
import PainelFicha from "../../../../../../components/painelFicha/PainelFicha";
import TabelaComplementares from "./tabela/TabelaComplementares";
import EditarComplementares from "./editar/EditarComplementares";
import AdicionarComplementares from "./adicionar/AdicionarComplementares";
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '../../ContentFicha'

function Complementares() {
    const [itemsPerPage] = useState(20);
    const [currentPage] = useState(1);
    const navigate = useNavigate()
    const query = useQuery()
    const params = useParams()
    const { id } = params

    const handleEditarClick = (complementarId) => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=editar&infoId=${complementarId}`);

    }

    const handleAdicionarClick = () => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=adicionar`);
    }

    return (
        <div className="Complementares">
            <PainelFicha titulo="2.7 Informações Complementares" botaoNew={true} onAdicionarClick={handleAdicionarClick}>
                <div className="Conteudo">
                    {query.get('view') === 'tabela' && (
                        <TabelaComplementares
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onEditarClick={handleEditarClick}
                        />
                    )}
                    {query.get('view') === 'editar' && (
                        <EditarComplementares/>
                    )}
                    {query.get('view') === 'adicionar' && (
                        <AdicionarComplementares/>
                    )}
                </div>
            </PainelFicha>
        </div>
    );
}

export default Complementares;
