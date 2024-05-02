import React, {useState} from "react";
import PainelFicha from "../../../../../../components/painelFicha/PainelFicha";
import TabelaPercaPeso from "./tebela/TebelaPercaPeso";
import EditarPercaPeso from "./editar/EditarPercaPeso";
import AdicionarPercaPeso from "./adicionar/AdicionarPercaPeso";
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '../../ContentFicha'

function PercaPeso() {
    const [itemsPerPage] = useState(20);
    const [currentPage] = useState(1);
    const navigate = useNavigate()
    const query = useQuery()
    const params = useParams()
    const { id } = params

    const handleEditarClick = (percaPesoId) => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=editar&infoId=${percaPesoId}`);

    }

    const handleAdicionarClick = () => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=adicionar`);
    }

    return (
        <div className="PercaPeso">
            <PainelFicha titulo="2.5.1 Controle de Perda de Peso" botaoNew={true} onAdicionarClick={handleAdicionarClick}>
                <div className="Conteudo">
                    {query.get('view') === 'tabela' && (
                        <TabelaPercaPeso
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onEditarClick={handleEditarClick}
                        />
                    )}
                    {query.get('view') === 'editar' && (
                        <EditarPercaPeso/>
                    )}
                    {query.get('view') === 'adicionar' && (
                        <AdicionarPercaPeso/>
                    )}
                </div>
            </PainelFicha>
        </div>
    );
}

export default PercaPeso;
