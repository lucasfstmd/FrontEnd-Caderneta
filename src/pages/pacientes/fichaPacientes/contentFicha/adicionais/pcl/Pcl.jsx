import React, {useState} from "react";
import PainelFicha from "../../../../../../components/painelFicha/PainelFicha";
import TabelaPcl from "./tabela/TabelaPcl";
import EditarPcl from "./editar/EditarPcl";
import AdicionarPcl from "./adicionar/AdicionarPcl";

function Pcl(props) {
    const [itemsPerPage] = useState(20);
    const [currentPage] = useState(1);
    const [editarPclId, setEditarPclId] = useState(null);
    const [componenteAtivo, setComponenteAtivo] = useState('tabela');

    const handleEditarClick = (pclId) => {
        setComponenteAtivo('editar');
        setEditarPclId(pclId);
    }

    const handleFechar = () => {
        setComponenteAtivo('tabela');
        setEditarPclId(null);
    }

    const handleAdicionarClick = () => {
        setComponenteAtivo('adicionar');
    }

    return (
        <div className="Pcl">
            <PainelFicha titulo="4.2 PCL" botaoNew={true} onAdicionarClick={handleAdicionarClick}>
                <div className="Conteudo">
                    {componenteAtivo === 'tabela' && (
                        <TabelaPcl
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onEditarClick={handleEditarClick}
                            pacienteId={props.pacienteId}
                        />
                    )}

                    {componenteAtivo === 'editar' && (
                        <EditarPcl
                            onClose={handleFechar}
                            pacienteId={props.pacienteId}
                            pclId={editarPclId}
                        />
                    )}
                    {componenteAtivo === 'adicionar' && (
                        <AdicionarPcl
                            pacienteId={props.pacienteId}
                            onClose={handleFechar}
                        />
                    )}
                </div>

            </PainelFicha>
        </div>
    );
}

export default Pcl;