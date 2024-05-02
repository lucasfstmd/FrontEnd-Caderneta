import React, {useState} from "react";
import PainelFicha from "../../../../../../components/painelFicha/PainelFicha";
import TabelaQueda from "./tabela/TabelaQueda";
import EditarQueda from "./editar/EditarQueda";
import AdicionarQueda from "./adicionar/AdicionarQueda";
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '../../ContentFicha'

function Quedas(props) {
    const [itemsPerPage] = useState(20);
    const [currentPage] = useState(1);
    const navigate = useNavigate()
    const query = useQuery()
    const params = useParams()
    const { id } = params

    const handleEditarClick = (quedasId) => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=editar&infoId=${quedasId}`);

    }

    const handleAdicionarClick = () => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=adicionar`);
    }
    return (
        <div className="Quedas">
            <PainelFicha titulo="2.9 Quedas" botaoNew={true} onAdicionarClick={handleAdicionarClick}>
                <div className="Conteudo">
                    {query.get('view') === 'tabela' && (
                        <TabelaQueda
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onEditarClick={handleEditarClick}
                        />
                    )}

                    {query.get('view') === 'editar' && (
                        <EditarQueda/>
                    )}
                    {query.get('view') === 'adicionar' && (
                        <AdicionarQueda/>
                    )}
                </div>
            </PainelFicha>
        </div>
    );
}

export default Quedas;
