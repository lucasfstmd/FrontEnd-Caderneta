import React, {useState} from "react";
import PainelFicha from "../../../../../../components/painelFicha/PainelFicha";
import TabelaCirurgias from "./tabela/TabelaCirurgias";
import EditarCirurgias from "./editar/EditarCirurgias";
import AdicionarCirurgias from "./adicionar/AdicionarCirurgias";

function Cirurgias(props) {
    const [itemsPerPage] = useState(20);
    const [currentPage] = useState(1);
    const [editarCirurgiasId, setEditarCirurgiasId] = useState(null);
    const [componenteAtivo, setComponenteAtivo] = useState('tabela');

    const handleEditarClick = (cirurgiasId) => {
        setComponenteAtivo('editar');
        setEditarCirurgiasId(cirurgiasId);
    }

    const handleFechar = () => {
        setComponenteAtivo('tabela');
        setEditarCirurgiasId(null);
    }

    const handleAdicionarClick = () => {
        setComponenteAtivo('adicionar');
    };

    return (
        <div className="Diagnosticos">
            <PainelFicha titulo="2.3 Cirurgias Realizadas"  botaoNew={true} onAdicionarClick={handleAdicionarClick}>
                <div className="ConteudoDiagnosticos">
                    {componenteAtivo === 'tabela' && (
                        <TabelaCirurgias
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onEditarClick={handleEditarClick}
                            pacienteId={props.pacienteId}
                        />
                    )}
                    {componenteAtivo === 'editar' && (
                        <EditarCirurgias
                            onClose={handleFechar}
                            pacienteId={props.pacienteId}
                            cirurgiasId={editarCirurgiasId}
                        />
                    )}
                    {componenteAtivo === 'adicionar' && (
                        <AdicionarCirurgias
                            pacienteId={props.pacienteId}
                            onClose={handleFechar}
                        />
                    )}
                </div>
            </PainelFicha>
        </div>
    );
}

export default Cirurgias;