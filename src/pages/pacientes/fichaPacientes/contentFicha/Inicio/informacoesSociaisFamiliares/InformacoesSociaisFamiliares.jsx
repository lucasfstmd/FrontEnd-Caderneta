import React, {useState} from "react";
import "./InformacoesSociaisFamiliares.css";
import PainelFicha from "../../../../../../components/painelFicha/PainelFicha";
import TabelaFamiliares from "./tabela/TabelaFamiliares";
import EditarFamiliares from "./editar/EditarFamiliares"
import AdicionarFamiliares from "./adicionar/AdicionarFamiliares";
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '../../ContentFicha'

function InformacoesSociaisFamiliares() {
    const [itemsPerPage] = useState(20);
    const [currentPage] = useState(1);
    const navigate = useNavigate()
    const query = useQuery()
    const params = useParams()
    const { id } = params

    const handleEditarClick = (familiarId) => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=editar&infoId=${familiarId}`);
    }

    const handleAdicionarClick = () => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=adicionar`);
    }


    return (
        <div className="InformacoesSociaisFamiliares">
            <PainelFicha titulo="1.2 Informações sociais e familiares" botaoNew={true} onAdicionarClick={handleAdicionarClick}>
                <div className="ConteudoFamiliares">
                    {query.get('view') === 'tabela' && (
                        <TabelaFamiliares
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onEditarClick={handleEditarClick}
                        />
                    )}

                    {query.get('view') === 'editar' && (
                        <EditarFamiliares/>
                    )}

                    {query.get('view') === 'adicionar' && (
                        <AdicionarFamiliares/>
                    )}
                </div>
            </PainelFicha>
        </div>
    );
}

export default InformacoesSociaisFamiliares;
