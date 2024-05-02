import React, {useState} from "react";
import PainelFicha from "../../../../../../components/painelFicha/PainelFicha";
import TabelaAmbientais from "./tabela/TabelaAmbientais";
import EditarAmbientais from "./editar/EditarAmbientais";
import AdicionarAmbientais from "./adicionar/AdicionarAmbientais";
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '../../ContentFicha'

function Ambientais(props) {
    const [itemsPerPage] = useState(20);
    const [currentPage] = useState(1);
    const navigate = useNavigate()
    const query = useQuery()
    const params = useParams()
    const { id } = params

    const handleEditarClick = (ambientaisId) => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=editar&infoId=${ambientaisId}`);

    }

    const handleAdicionarClick = () => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=adicionar`);
    }

    return (
        <div className="Ambientais">
            <PainelFicha titulo="2.8 Avaliação Ambiental" botaoNew={true} onAdicionarClick={handleAdicionarClick}>
                <div className="Conteudo">
                    {query.get('view') === 'tabela' && (
                        <TabelaAmbientais
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onEditarClick={handleEditarClick}
                        />
                    )}

                    {query.get('view') === 'editar' && (
                        <EditarAmbientais/>
                    )}
                    {query.get('view') === 'adicionar' && (
                        <AdicionarAmbientais/>
                    )}
                </div>
            </PainelFicha>
        </div>
    );
}

export default Ambientais;
