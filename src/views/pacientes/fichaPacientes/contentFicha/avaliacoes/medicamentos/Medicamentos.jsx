import React, {useState} from "react";
import PainelFicha from "../../../../../../components/painelFicha/PainelFicha";
import TabelaMedicamentos from "./tabela/TabelaMedicamentos";
import EditarMedicamentos from "./editar/EditarMedicamentos";
import AdicionarMedicamentos from "./adicionar/AdicionarMedicamentos";

function Medicamentos(props) {
    const [itemsPerPage] = useState(20);
    const [currentPage] = useState(1);
    const [editarMedicamentosId, setEditarMedicamentosId] = useState(null);
    const [componenteAtivo, setComponenteAtivo] = useState('tabela');

    const handleEditarClick = (medicamentosId) => {
        setComponenteAtivo('editar');
        setEditarMedicamentosId(medicamentosId);
    }

    const handleFechar = () => {
        setComponenteAtivo('tabela');
        setEditarMedicamentosId(null);
    }

    const handleAdicionarClick = () => {
        setComponenteAtivo('adicionar');
    }

    return (
        <div className="Medicamentos">
            <PainelFicha titulo="2.1 Medicamentos, Fitoterápicos, Suplementos e Vitaminas em Uso" botaoNew={true} onAdicionarClick={handleAdicionarClick}>
                <div className="ConteudoReferencia">
                    {componenteAtivo === 'tabela' && (
                        <TabelaMedicamentos
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onEditarClick={handleEditarClick}
                            pacienteId={props.pacienteId}
                        />
                    )}

                    {componenteAtivo === 'editar' && (
                        <EditarMedicamentos
                            onClose={handleFechar}
                            pacienteId={props.pacienteId}
                            medicamentosId={editarMedicamentosId}
                        />
                    )}
                    {componenteAtivo === 'adicionar' && (
                        <AdicionarMedicamentos
                            pacienteId={props.pacienteId}
                            onClose={handleFechar}
                        />
                    )}
                </div>
            </PainelFicha>
        </div>
    );
}

export default Medicamentos;