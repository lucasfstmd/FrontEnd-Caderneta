import React, {useState} from "react";
import PainelFicha from "../../../../../../components/painelFicha/PainelFicha";
import TabelaSarcf from "./tabela/TabelaSarcf";
import EditarSarcf from "./editar/EditarSarcf";
import AdicionarSarcf from "./adicionar/AdicionarSarcf";
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '../../ContentFicha'

function Sarcf() {
    const [itemsPerPage] = useState(20);
    const [currentPage] = useState(1);
    const navigate = useNavigate()
    const query = useQuery()
    const params = useParams()
    const { id } = params

    const handleEditarClick = (sarcfId) => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=editar&infoId=${sarcfId}`);
    }

    const handleAdicionarClick = () => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=adicionar`);
    }

    return (
        <div className="Sarc">
            <PainelFicha titulo="4.11 Sarcfs" botaoNew={true} onAdicionarClick={handleAdicionarClick}>
                <div className="ConteudoDiagnosticos">
                    {query.get('view') === 'tabela' && (
                        <TabelaSarcf
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onEditarClick={handleEditarClick}
                        />
                    )}
                    {query.get('view') === 'editar' && (
                        <EditarSarcf/>
                    )}
                    {query.get('view') === 'adicionar' && (
                        <AdicionarSarcf/>
                    )}
                </div>
            </PainelFicha>
        </div>
    );
}

export default Sarcf;
