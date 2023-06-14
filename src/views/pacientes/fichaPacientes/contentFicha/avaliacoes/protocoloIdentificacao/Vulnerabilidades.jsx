import React, {useState} from "react";
import PainelFicha from "../../../../../../components/painelFicha/PainelFicha";
import TabelaVulnerabilidades from "./tabela/TabelaVulnerabilidades";
import EditarVulnerabilidades from "./editar/EditarVulnerabilidades";
import AdicionarVulnerabilidades from "./adicionar/AdicionarVulnerabilidades";

function Vulnerabilidades(props) {
    const [itemsPerPage] = useState(20);
    const [currentPage] = useState(1);
    const [editarVulnerabilidadesId, setEditarVulnerabilidadesId] = useState(null);
    const [componenteAtivo, setComponenteAtivo] = useState('tabela');

    const handleEditarClick = (vulnerabilidadesId) => {
        setComponenteAtivo('editar');
        setEditarVulnerabilidadesId(vulnerabilidadesId);
    }

    const handleFechar = () => {
        setComponenteAtivo('tabela');
        setEditarVulnerabilidadesId(null);
    }

    const handleAdicionarClick = () => {
        setComponenteAtivo('adicionar');
    }

    return (
        <div className="ProtocoloIdentificacao">
            <PainelFicha titulo="2.6 Protocolo de Identificação do Idoso Vulnerável (VES-13)" botaoNew={true} onAdicionarClick={handleAdicionarClick}>
                <div className="Conteudo">
                    {componenteAtivo === 'tabela' && (
                        <TabelaVulnerabilidades
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onEditarClick={handleEditarClick}
                            pacienteId={props.pacienteId}
                        />
                    )}
                    {componenteAtivo === 'editar' && (
                        <EditarVulnerabilidades
                            onClose={handleFechar}
                            pacienteId={props.pacienteId}
                            vulnerabilidadeId={editarVulnerabilidadesId}
                        />
                    )}
                    {componenteAtivo === 'adicionar' && (
                        <AdicionarVulnerabilidades
                            pacienteId={props.pacienteId}
                            onClose={handleFechar}
                        />
                    )}
                </div>
            </PainelFicha>
        </div>
    );
}

export default Vulnerabilidades;