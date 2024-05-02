import React, {useState} from "react";
import PainelFicha from "../../../../../../components/painelFicha/PainelFicha";
import TabelaDiagnosticos from "./tabela/TabelaDiagnosticos";
import EditarDiagnosticos from "./editar/EditarDiagnosticos";
import AdicionarDiagnosticos from "./adicionar/AdicionarDiagnosticos";
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '../../ContentFicha'

function Diagnosticos() {
    const [itemsPerPage] = useState(20);
    const [currentPage] = useState(1);
    const navigate = useNavigate()
    const query = useQuery()
    const params = useParams()
    const { id } = params

    const handleEditarClick = (diagnosticosId) => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=editar&infoId=${diagnosticosId}`);
    }

    const handleAdicionarClick = () => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=adicionar`);
    }

    return (
        <div className="Diagnosticos">
            <PainelFicha titulo="2.2 Diagnósticos e Internações Prévios" botaoNew={true} onAdicionarClick={handleAdicionarClick}>
                <div className="ConteudoDiagnosticos">
                    {query.get('view') === 'tabela' && (
                        <TabelaDiagnosticos
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onEditarClick={handleEditarClick}
                        />
                    )}
                    {query.get('view') === 'editar' && (
                        <EditarDiagnosticos/>
                    )}
                    {query.get('view') === 'adicionar' && (
                        <AdicionarDiagnosticos/>
                    )}
                </div>
            </PainelFicha>
        </div>
    );
}

export default Diagnosticos;
