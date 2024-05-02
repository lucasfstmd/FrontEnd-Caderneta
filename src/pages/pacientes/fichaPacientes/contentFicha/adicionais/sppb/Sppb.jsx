import React, {useState} from "react";
import PainelFicha from "../../../../../../components/painelFicha/PainelFicha";
import TabelaSppb from "./tabela/TabelaSppb";
import EditarSppb from "./editar/EditarSppb";
import AdicionarSppb from "./adicionar/AdicionarSppb";
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '../../ContentFicha'

function Sppb() {
    const [itemsPerPage] = useState(20);
    const [currentPage] = useState(1);
    const navigate = useNavigate()
    const query = useQuery()
    const params = useParams()
    const { id } = params

    const handleEditarClick = (editarSppbId) => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=editar&infoId=${editarSppbId}`);

    }

    const handleAdicionarClick = () => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=adicionar`);
    }

    return (
        <div className="Sppb">
            <PainelFicha titulo="4.4 Short Physical Performace Battery (SPPB)" botaoNew={true} onAdicionarClick={handleAdicionarClick}>
                <div className="Conteudo">
                    {query.get('view') === 'tabela' && (
                        <TabelaSppb
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onEditarClick={handleEditarClick}
                        />
                    )}

                    {query.get('view') === 'editar' && (
                        <EditarSppb/>
                    )}
                    {query.get('view') === 'adicionar' && (
                        <AdicionarSppb/>
                    )}
                </div>
            </PainelFicha>
        </div>
    );
}

export default Sppb;
