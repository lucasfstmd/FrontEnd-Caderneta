import React, {useState} from "react";
import PainelFicha from "../../../../../../components/painelFicha/PainelFicha";
import TabelaAntropometricos from "./tebela/TabelaAntropometricos";
import EditarAntropometricos from "./editar/EditarAntropometricos";
import AdicionarAntropometricos from "./adicionar/AdicionarAntropometricos";
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '../../ContentFicha'

function Antropometricos() {
    const [itemsPerPage] = useState(20);
    const [currentPage] = useState(1);
    const navigate = useNavigate()
    const query = useQuery()
    const params = useParams()
    const { id } = params

    const handleEditarClick = (antropometricosId) => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=editar&infoId=${antropometricosId}`);

    }

    const handleAdicionarClick = () => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=adicionar`);
    }

    return (
        <div className="Antropometricos">
            <PainelFicha titulo="2.5 Dados Antropométricos" botaoNew={true} onAdicionarClick={handleAdicionarClick}>
                <div className="ConteudoDiagnosticos">
                    {query.get('view') === 'tabela' && (
                        <TabelaAntropometricos
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onEditarClick={handleEditarClick}
                        />
                    )}
                    {query.get('view') === 'editar' && (
                        <EditarAntropometricos/>
                    )}
                    {query.get('view') === 'adicionar' && (
                        <AdicionarAntropometricos/>
                    )}
                </div>
            </PainelFicha>
        </div>
    );
}

export default Antropometricos;
