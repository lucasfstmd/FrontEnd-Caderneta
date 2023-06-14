import React, {useState} from "react";
import PainelFicha from "../../../../../../components/painelFicha/PainelFicha";
import TabelaSppb from "./tabela/TabelaSppb";
import EditarSppb from "./editar/EditarSppb";
import AdicionarSppb from "./adicionar/AdicionarSppb";

function Sppb(props) {
    const [itemsPerPage] = useState(20);
    const [currentPage] = useState(1);
    const [editarSppbId, setEditarSppbId] = useState(null);
    const [componenteAtivo, setComponenteAtivo] = useState('tabela');

    const handleEditarClick = (editarSppbId) => {
        setComponenteAtivo('editar');
        setEditarSppbId(editarSppbId);
    }

    const handleFechar = () => {
        setComponenteAtivo('tabela');
        setEditarSppbId(null);
    }

    const handleAdicionarClick = () => {
        setComponenteAtivo('adicionar');
    }

    return (
        <div className="Sppb">
            <PainelFicha titulo="4.4 Short Physical Performace Battery (SPPB)" botaoNew={true} onAdicionarClick={handleAdicionarClick}>
                <div className="Conteudo">
                    {componenteAtivo === 'tabela' && (
                        <TabelaSppb
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onEditarClick={handleEditarClick}
                            pacienteId={props.pacienteId}
                        />
                    )}

                    {componenteAtivo === 'editar' && (
                        <EditarSppb
                            onClose={handleFechar}
                            pacienteId={props.pacienteId}
                            sppbId={editarSppbId}
                        />
                    )}
                    {componenteAtivo === 'adicionar' && (
                        <AdicionarSppb
                            pacienteId={props.pacienteId}
                            onClose={handleFechar}
                        />
                    )}
                </div>
            </PainelFicha>
        </div>
    );
}

export default Sppb;