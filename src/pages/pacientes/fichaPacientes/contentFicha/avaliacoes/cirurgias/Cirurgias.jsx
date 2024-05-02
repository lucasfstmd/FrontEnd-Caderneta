import React, {useState} from "react";
import PainelFicha from "../../../../../../components/painelFicha/PainelFicha";
import TabelaCirurgias from "./tabela/TabelaCirurgias";
import EditarCirurgias from "./editar/EditarCirurgias";
import AdicionarCirurgias from "./adicionar/AdicionarCirurgias";
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '../../ContentFicha'

function Cirurgias() {
    const [itemsPerPage] = useState(20);
    const [currentPage] = useState(1);
    const navigate = useNavigate()
    const query = useQuery()
    const params = useParams()
    const { id } = params

    const handleEditarClick = (cirurgiasId) => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=editar&infoId=${cirurgiasId}`);

    }

    const handleAdicionarClick = () => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=adicionar`);
    };

    return (
        <div className="Diagnosticos">
            <PainelFicha titulo="2.3 Cirurgias Realizadas"  botaoNew={true} onAdicionarClick={handleAdicionarClick}>
                <div className="ConteudoDiagnosticos">
                    {query.get('view') === 'tabela' && (
                        <TabelaCirurgias
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onEditarClick={handleEditarClick}
                        />
                    )}
                    {query.get('view') === 'editar' && (
                        <EditarCirurgias/>
                    )}
                    {query.get('view') === 'adicionar' && (
                        <AdicionarCirurgias/>
                    )}
                </div>
            </PainelFicha>
        </div>
    );
}

export default Cirurgias;
