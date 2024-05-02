import React, {useState} from "react";
import PainelFicha from "../../../../../../components/painelFicha/PainelFicha";
import TabelaControlePeso from "./tabela/TabelaControlePeso";
import EditarControlePeso from "./editar/EditarControlePeso";
import AdicionarControlePeso from "./adicionar/AdicionarControlePeso";
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '../../ContentFicha'

function ControlePeso() {
    const [itemsPerPage] = useState(20);
    const [currentPage] = useState(1);
    const navigate = useNavigate()
    const query = useQuery()
    const params = useParams()
    const { id } = params

    const handleEditarClick = (controlePesoId) => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=editar&infoId=${controlePesoId}`);

    }

    const handleAdicionarClick = () => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=adicionar`);
    }

    return (
        <div className="ControlePeso">
            <PainelFicha titulo="2.5.2 Controle de Peso" botaoNew={true} onAdicionarClick={handleAdicionarClick}>
                <div className="ConteudoReferencia">
                    {query.get('view') === 'tabela' && (
                        <TabelaControlePeso
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onEditarClick={handleEditarClick}
                        />
                    )}

                    {query.get('view') === 'editar' && (
                        <EditarControlePeso/>
                    )}
                    {query.get('view') === 'adicionar' && (
                        <AdicionarControlePeso/>
                    )}
                </div>
            </PainelFicha>
        </div>
    );
}

export default ControlePeso;
