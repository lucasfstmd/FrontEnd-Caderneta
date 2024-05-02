import React, {useState} from "react";
import PainelFicha from "../../../../../../components/painelFicha/PainelFicha";
import TabelaGlicemia from "./tabela/TabelaGlicemia";
import EditarGlicemia from "./editar/EditarGlicemia";
import AdicionarGlicemia from "./adicionar/AdicionarGlicemia";
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '../../ContentFicha'

function Glicemia() {
    const [itemsPerPage] = useState(20);
    const [currentPage] = useState(1);
    const navigate = useNavigate()
    const query = useQuery()
    const params = useParams()
    const { id } = params

    const handleEditarClick = (glicemiaId) => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=editar&infoId=${glicemiaId}`);
    }

    const handleAdicionarClick = () => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=adicionar`);
    }

    return (
        <div className="Glicemia">
            <PainelFicha titulo="3.2 Controle de Glicemia" botaoNew={true} onAdicionarClick={handleAdicionarClick}>
                <div className="Conteudo">
                    {query.get('view') === 'tabela' && (
                        <TabelaGlicemia
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onEditarClick={handleEditarClick}
                        />
                    )}

                    {query.get('view') === 'editar' && (
                        <EditarGlicemia/>
                    )}
                    {query.get('view') === 'adicionar' && (
                        <AdicionarGlicemia/>
                    )}
                </div>
            </PainelFicha>
        </div>
    );
}

export default Glicemia;
