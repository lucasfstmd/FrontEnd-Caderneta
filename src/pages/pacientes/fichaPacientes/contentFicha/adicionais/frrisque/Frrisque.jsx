import React, {useState} from "react";
import PainelFicha from "../../../../../../components/painelFicha/PainelFicha";
import TabelaFrrisques from "./tabela/TabelaFrrisques";
import EditarFrrisques from "./editar/EditarFrrisques";
import AdicionarFrrisques from "./adicionar/AdicionarFrrisques";
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '../../ContentFicha'

function Frrisque(props) {
    const [itemsPerPage] = useState(20);
    const [currentPage] = useState(1);
    const navigate = useNavigate()
    const query = useQuery()
    const params = useParams()
    const { id } = params

    const handleEditarClick = (frrisquesId) => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=editar&infoId=${frrisquesId}`);

    }

    const handleAdicionarClick = () => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=adicionar`);
    }

    return (
        <div className="Frrisque">
            <PainelFicha titulo="4.8 Frrisque" botaoNew={true} onAdicionarClick={handleAdicionarClick}>
                <div className="Conteudo">
                    {query.get('view') === 'tabela' && (
                        <TabelaFrrisques
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onEditarClick={handleEditarClick}
                        />
                    )}

                    {query.get('view') === 'editar' && (
                        <EditarFrrisques/>
                    )}
                    {query.get('view') === 'adicionar' && (
                        <AdicionarFrrisques/>
                    )}
                </div>
            </PainelFicha>
        </div>
    );
}

export default Frrisque;
