import React, {useState} from "react";
import PainelFicha from "../../../../../../components/painelFicha/PainelFicha";
import TabelaIntensidades from "./tabela/TabelaIntensidades";
import EditarIntensidades from "./editar/EditarIntensidades";
import AdicionarIntensidades from "./adicionar/AdicionarIntensidades";
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '../../ContentFicha'

function Intensidade() {
    const [itemsPerPage] = useState(20);
    const [currentPage] = useState(1);
    const navigate = useNavigate()
    const query = useQuery()
    const params = useParams()
    const { id } = params

    const handleEditarClick = (intensidadesId) => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=editar&infoId=${intensidadesId}`);

    }


    const handleAdicionarClick = () => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=adicionar`);
    }

    return (
        <div className="Intensidade">
            <PainelFicha titulo="2.10.1 Intensidade da Dor" botaoNew={true} onAdicionarClick={handleAdicionarClick}>
                <div className="Conteudo">
                    {query.get('view') === 'tabela' && (
                        <TabelaIntensidades
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onEditarClick={handleEditarClick}
                        />
                    )}

                    {query.get('view') === 'editar' && (
                        <EditarIntensidades/>
                    )}
                    {query.get('view') === 'adicionar' && (
                        <AdicionarIntensidades/>
                    )}
                </div>
            </PainelFicha>
        </div>
    );
}

export default Intensidade;
