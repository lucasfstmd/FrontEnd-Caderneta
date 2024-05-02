import React, {useState} from "react";
import PainelFicha from "../../../../../../components/painelFicha/PainelFicha";
import TabelaMedicamentos from "./tabela/TabelaMedicamentos";
import EditarMedicamentos from "./editar/EditarMedicamentos";
import AdicionarMedicamentos from "./adicionar/AdicionarMedicamentos";
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '../../ContentFicha'

function Medicamentos() {
    const [itemsPerPage] = useState(20);
    const [currentPage] = useState(1);
    const navigate = useNavigate()
    const query = useQuery()
    const params = useParams()
    const { id } = params

    const handleEditarClick = (medicamentosId) => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=editar&infoId=${medicamentosId}`);

    }

    const handleAdicionarClick = () => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=adicionar`);
    }

    return (
        <div className="Medicamentos">
            <PainelFicha titulo="2.1 Medicamentos, Fitoterápicos, Suplementos e Vitaminas em Uso" botaoNew={true} onAdicionarClick={handleAdicionarClick}>
                <div className="ConteudoReferencia">
                    {query.get('view') === 'tabela' && (
                        <TabelaMedicamentos
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onEditarClick={handleEditarClick}
                        />
                    )}

                    {query.get('view') === 'editar' && (
                        <EditarMedicamentos/>
                    )}
                    {query.get('view') === 'adicionar' && (
                        <AdicionarMedicamentos/>
                    )}
                </div>
            </PainelFicha>
        </div>
    );
}

export default Medicamentos;
