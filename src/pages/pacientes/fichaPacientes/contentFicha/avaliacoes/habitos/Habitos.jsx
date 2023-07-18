import React, {useState} from "react";
import PainelFicha from "../../../../../../components/painelFicha/PainelFicha";
import TabelaHabitos from "./tabela/TabelaHabitos";
import EditarHabitos from "./editar/EditarHabitos";
import AdicionarHabitos from "./adicionar/AdicionarHabitos";

function Habitos(props) {
    const [itemsPerPage] = useState(20);
    const [currentPage] = useState(1);
    const [editarHabitosId, setEditarHabitosId] = useState(null);
    const [componenteAtivo, setComponenteAtivo] = useState('tabela');

    const handleEditarClick = (habitosId) => {
        setComponenteAtivo('editar');
        setEditarHabitosId(habitosId);
    }

    const handleFechar = () => {
        setComponenteAtivo('tabela');
        setEditarHabitosId(null);
    }

    const handleAdicionarClick = () => {
        setComponenteAtivo('adicionar');
    }

    return (
        <div className="Habitos">
            <PainelFicha titulo="2.11 Habitos" botaoNew={true} onAdicionarClick={handleAdicionarClick}>
                <div className="Conteudo">
                    {componenteAtivo === 'tabela' && (
                        <TabelaHabitos
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onEditarClick={handleEditarClick}
                            pacienteId={props.pacienteId}
                        />
                    )}

                    {componenteAtivo === 'editar' && (
                        <EditarHabitos
                            onClose={handleFechar}
                            pacienteId={props.pacienteId}
                            habitosId={editarHabitosId}
                        />
                    )}
                    {componenteAtivo === 'adicionar' && (
                        <AdicionarHabitos
                            pacienteId={props.pacienteId}
                            onClose={handleFechar}
                        />
                    )}
                </div>
            </PainelFicha>
        </div>
    );
}

export default Habitos;