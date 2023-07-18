import React, {useEffect, useState} from "react";
import "./EditarFragilidades.css"
import api from "../../../../../../../service/api";

function EditarFragilidades(props) {
    const [fragilidade, setFragilidade] = useState();
    const [p1, setP1] = useState(true);
    const [p2_1, setP2_1] = useState("22.00");
    const [p2_2, setP2_2] = useState(true);
    const [p3_1, setP3_1] = useState("");
    const [p3_2, setP3_2] = useState("");
    const [p3_3, setP3_3] = useState(true);
    const [p4_1, setP4_1] = useState("");
    const [p4_2, setP4_2] = useState(true);
    const [p5_1a_1, setP5_1a_1] = useState("");
    const [p5_1a_2, setP5_1a_2] = useState(true);
    const [p5_1b_1, setP5_1b_1] = useState("");
    const [p5_1b_2, setP5_1b_2] = useState("");
    const [p5_2a_1, setP5_2a_1] = useState("");
    const [p5_2a_2, setP5_2a_2] = useState(true);
    const [p5_2b_1, setP5_2b_1] = useState("");
    const [p5_2b_2, setP5_2b_2] = useState("");
    const [p5_3a_1, setP5_3a_1] = useState("");
    const [p5_3a_2, setP5_3a_2] = useState(true);
    const [p5_3b_1, setP5_3b_1] = useState("");
    const [p5_3b_2, setP5_3b_2] = useState("");
    const [p5_4a_1, setP5_4a_1] = useState("");
    const [p5_4a_2, setP5_4a_2] = useState("");
    const [p5_4b_1, setP5_4b_1] = useState("");
    const [p5_4b_2, setP5_4b_2] = useState("");
    const [ipaq, setIpaq] = useState("");
    const [baixo_nivel_atividade_fisica, setBaixo_nivel_atividade_fisica] = useState(true);
    const [classificacao_da_fragilidade, setClassificacao_da_fragilidade] = useState("");

    useEffect(() => {
        function carregarFragilidade() {
            try {
                const response = api.get(`v1/fragilidades/${props.fragilidadesId}`);
                setFragilidade(response.data);
                setP1(response.data.p1);
                setP2_1(response.data.p2_1);
                setP2_2(response.data.p2_2);
                setP3_1(response.data.p3_1);
                setP3_2(response.data.p3_2);
                setP3_3(response.data.p3_3);
                setP4_1(response.data.p4_1);
                setP4_2(response.data.p4_2);
                setP5_1a_1(response.data.p5_1a_1);
                setP5_1a_2(response.data.p5_1a_2);
                setP5_1b_1(response.data.p5_1b_1);
                setP5_1b_2(response.data.p5_1b_2);
                setP5_2a_1(response.data.p5_2a_1);
                setP5_2a_2(response.data.p5_2a_2);
                setP5_2b_1(response.data.p5_2b_1);
                setP5_2b_2(response.data.p5_2b_2);
                setP5_3a_1(response.data.p5_3a_1);
                setP5_3a_2(response.data.p5_3a_2);
                setP5_3b_1(response.data.p5_3b_1);
                setP5_3b_2(response.data.p5_3b_2);
                setP5_4a_1(response.data.p5_4a_1);
                setP5_4a_2(response.data.p5_4a_2);
                setP5_4b_1(response.data.p5_4b_1);
                setP5_4b_2(response.data.p5_4b_2);
                setIpaq(response.data.ipaq);
                setBaixo_nivel_atividade_fisica(response.data.baixo_nivel_atividade_fisica);
                setClassificacao_da_fragilidade(response.data.classificacao_da_fragilidade);
            } catch (error) {
                console.log(error);
            }
        }

        carregarFragilidade();
    }, [props.fragilidadesId]);

    const Fragilidade = {
        paciente_id: props.pacienteId,
        p1,
        p2_1,
        p2_2,
        p3_1,
        p3_2,
        p3_3,
        p4_1,
        p4_2,
        p5_1a_1,
        p5_1a_2,
        p5_1b_1,
        p5_1b_2,
        p5_2a_1,
        p5_2a_2,
        p5_2b_1,
        p5_2b_2,
        p5_3a_1,
        p5_3a_2,
        p5_3b_1,
        p5_3b_2,
        p5_4a_1,
        p5_4a_2,
        p5_4b_1,
        p5_4b_2,
        ipaq,
        baixo_nivel_atividade_fisica,
        classificacao_da_fragilidade
    };

    const handleFecharClick = (fragilidadeId) => {
        props.onClose(fragilidadeId);
    }

    const handleEdit = async () => {
        try {
            await api.patch(`v1/fragilidades/${props.fragilidadesId}`, Fragilidade);
            setOpen(true);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setOpenErro400(true);
            } else if (error.response && error.response.status === 500) {
                setOpenErro500(true);
            }
        }
    }

    const [open, setOpen] = useState(false);
    const [openErro400, setOpenErro400] = useState(false);
    const [openErro500, setOpenErro500] = useState(false);

    const handleFecharErro400 = () => {
        setOpenErro400(false);
    }

    const handleFecharErro500 = () => {
        setOpenErro500(false);
    }

    const handleClickOpen = () => {
        handleEdit();
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSalvar = (fragilidadeId) => {
        setOpen(false);
        props.onClose(fragilidadeId);
    }

    return (
        <div className="EditarFragilidades">
            <div className="LabelInput">
                <label className="Titulo"><strong>1. Perda de peso não intencional (≥4,5kg ou ≥5% do peso no ano anterior): </strong></label>
                <select value={p1} onChange={(e) => setP1(parseInt(e.target.value))}>
                    <option value={1}>Sim</option>
                    <option value={0}>Não</option>
                </select>
            </div>
            <div className="LabelInput">
                <label className="Titulo"><strong>2. Diminuição da força de preensão no Dinamômetro Manual Jamar® (mão dominante), com ponto de corte ajustado para sexo e IMC:</strong></label><br/>
                <label>Média da força de preensão: </label>
                <input defaultValue={fragilidade ? fragilidade.p2_1: ''} onChange={(e) => setP2_1(parseFloat(e.target.value))} type="text"/>
            </div>
            <div className="LabelInput">
                <div className="Quadro 1">
                    <label>Quadro 01: Ajuste de gênero e IMC para a força de preensão palmar.</label>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th colSpan="2">HOMENS</th>
                            <th colSpan="2">MULHERES</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th>IMC</th>
                            <th>PONTO DE CORTE</th>
                            <th>IMC</th>
                            <th>PONTO DE CORTE</th>
                        </tr>
                        <tr>
                            <td>0 &lt; IMC ≤ 23</td>
                            <td>≤ 27,00kgf</td>
                            <td>0 &lt; IMC ≤ 23</td>
                            <td>≤ 16,33 kgf</td>
                        </tr>
                        <tr>
                            <td>23 &lt; IMC &lt; 28</td>
                            <td>≤ 28,67 kgf</td>
                            <td>23 &lt; IMC &lt; 28</td>
                            <td>≤ 16,67 kgf</td>
                        </tr>
                        <tr>
                            <td>28 ≤ IMC &lt; 30</td>
                            <td>≤ 29,50 kgf</td>
                            <td>28 ≤ IMC &lt; 30</td>
                            <td>≤ 17,33 kgf</td>
                        </tr>
                        <tr>
                            <td>≥ 30</td>
                            <td>≤ 28,67 kgf</td>
                            <td>≥ 30</td>
                            <td>≤ 16,67 kgf</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="LabelInput">
                <label>Força de preensão diminuída:</label>
                <select value={p2_2} onChange={(e) => setP2_2(parseInt(e.target.value))}>
                    <option value={1}>Sim</option>
                    <option value={0}>Não</option>
                </select>
            </div>
        </div>
    )
}

export default EditarFragilidades;