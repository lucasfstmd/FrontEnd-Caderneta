import React, {useEffect, useState} from "react";
import "./EditarFragilidades.css"
import api from "../../../../../../../service/api";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContent, DialogContentText} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useQuery } from '../../../ContentFicha'
import { useNavigate, useParams } from 'react-router-dom'

function EditarFragilidades() {
    const query = useQuery();
    const fragilidadesId = query.get('infoId')
    const params = useParams();
    const { id } = params
    const navigate = useNavigate()

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

    async function carregarFragilidade() {
        try {
            const response = await api.get(`v1/fragilidades/${fragilidadesId}`);
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
            console.log(undefined);
        }
    }

    useEffect(() => {
        carregarFragilidade();
    }, []);

    const Fragilidade = {
        paciente_id: parseInt(id),
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

    const handleFecharClick = () => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=tabela`);
    }

    const handleEdit = async () => {
        try {
            await api.patch(`v1/fragilidades/${fragilidadesId}`, Fragilidade);
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

    const handleSalvar = () => {
        setOpen(false);
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=tabela`);
    }

    return (
        <div className="EditarFragilidades">
            <div className="LabelInput">
                <label><strong>1. Perda de peso não intencional (≥4,5kg ou ≥5% do peso no ano anterior): </strong></label>
                <select value={p1} onChange={(e) => setP1(parseInt(e.target.value))}>
                    <option value="">Selecionar</option>
                    <option value={1}>Sim</option>
                    <option value={0}>Não</option>
                </select>
            </div>
            <p id="Titulo"><strong>2. Diminuição da força de preensão no Dinamômetro Manual Jamar® (mão dominante), com ponto de corte ajustado para sexo e IMC:</strong></p>
            <div className="LabelInput">
                <label>Média da força de preensão: </label>
                <input defaultValue={fragilidade ? fragilidade.p2_1: ""} onChange={(e) => setP2_1(e.target.value)} type="text"/>
            </div>
            <div className="TabelaQuadro">
                <div className="Quadro">
                    <label>Quadro 01: Ajuste de gênero e IMC para a força de preensão palmar.</label>
                    <table className="table table-striped quadro-style">
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
                    <option value="">Selecionar</option>
                    <option value={1}>Sim</option>
                    <option value={0}>Não</option>
                </select>
            </div>
            <p id="Titulo"><strong>3. Exaustão, por auto-relato de fadiga: “Senti que tive que fazer esforço para fazer tarefas habituais”e “Não consegui levar adiante minhas coisas” do Center for EpidemiologicalStudies – Depression CESD (TAVARES; NERI; CUPERTINO, 2007). Os idosos que obtiveram escore três ou quatro em qualquer uma das questões preencheram o critério.</strong></p>
            <div className="LabelInput">
                <label>Na última semana:
                    <br/>
                    <br/>
                    Sentiu que teve que fazer esforço para das conta das suas tarefas habituais?
                </label>
                <select value={p3_1} onChange={(e) => setP3_1(e.target.value)}>
                    <option value="">Selecionar</option>
                    <option value="Nunca/raramente">Nunca/Raramente</option>
                    <option value="Poucas vezes">Poucas Vezes</option>
                    <option value="Na maioria das vezes">Na maioria das vezes</option>
                    <option value="Sempre">Sempre</option>
                </select>
            </div>
            <div className="LabelInput">
                <label>O(a) senhor(a) deixou muitos de seus interesses e atividades?</label>
                <select value={p3_2} onChange={(e) => setP3_2(e.target.value)}>
                    <option value="">Selecionar</option>
                    <option value="Nunca/raramente">Nunca/Raramente</option>
                    <option value="Poucas vezes">Poucas Vezes</option>
                    <option value="Na maioria das vezes">Na maioria das vezes</option>
                    <option value="Sempre">Sempre</option>
                </select>
            </div>
            <div className="LabelInput">
                <label>Exaustão por auto-relato de fadiga:
                </label>
                <select value={p3_3} onChange={(e) => setP3_3(parseInt(e.target.value))}>
                    <option value="">Selecionar</option>
                    <option value={1}>Sim</option>
                    <option value={0}>Não</option>
                </select>
            </div>
            <p id="Titulo"><strong>4. Diminuição da velocidade da marcha calculada através do tempo em segundos gasto para percorrer 4 metros, ajustado pelo sexo e altura.</strong></p>
            <div className="LabelInput">
                <label>o tempo gasto para percorrer 4 metros:</label>
                <input defaultValue={fragilidade ? fragilidade.p4_1: ""} onChange={(e) => setP4_1(e.target.value)} type="text"/>
            </div>
            <div className="TabelaQuadro">
                <div>
                    <label>Quadro 02: Ajuste de altura e sexo para o tempo gasto para percorrer 4 metros</label>
                    <table className="table table-striped quadro-style">
                        <thead>
                        <tr>
                            <th colSpan="2">Homens</th>
                            <th colSpan="2">Mulheres</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th>Altura</th>
                            <th>PONTO DE CORTE</th>
                            <th>Altura</th>
                            <th>PONTO DE CORTE</th>
                        </tr>
                        <tr>
                            <td>0 &lt; altura ≤ 168</td>
                            <td>≥ 5,49 segundos</td>
                            <td>0 &lt; altura ≤ 155</td>
                            <td>≥ 6,61 segundos</td>
                        </tr>
                        <tr>
                            <td>altura &gt; 168</td>
                            <td>≥ 5,54 segundos</td>
                            <td>Altura &gt; 155</td>
                            <td>≥ 5,92 segundos</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="LabelInput">
                <label>tempo gasto para percorrer 4 metros aumentado:</label>
                <select value={p4_2} onChange={(e) => setP4_2(parseInt(e.target.value))}>
                    <option value="">Selecionar</option>
                    <option value={1}>Sim</option>
                    <option value={0}>Não</option>
                </select>
            </div>
            <div className="LabelInput">
                <label>5. Baixo nível de atividade física avaliado pelo IPAQ.</label>
            </div>
            <p
                className="Titulo"
                style={{
                    fontSize: "1.2rem",
                    display: "flex",
                    justifyContent: "center",
                    borderBottom: "1px solid gray"
                }}
            >
                QUESTIONÁRIO INTERNACIONAL DE ATIVIDADE FÍSICA (IPAQ) – VERSÃO CURTA
            </p>
            <div className="LabelInput">
                <label><b>1. a)</b> Em quantos dias da última semana você CAMINHOU por pelo menos 10minutos contínuos em casa ou no trabalho, como forma de transporte para ir de um lugar para outro, por lazer, por prazer ou como forma de exercício?</label>
                <div className="LabelInput">
                    Dias
                    <input defaultValue={p5_1a_1} onChange={(e) => setP5_1a_1(e.target.value)} type="text"/>
                    por Semana.
                    <div className="LabelInput">
                        <input defaultValue={p5_1a_2} onChange={() => setP5_1a_2(1)} type="checkbox"/>
                        Nenhum
                    </div>
                </div>
            </div>
            <div className="LabelInput">
                <label><b>1. b)</b> Nos dias em que você caminhou por pelo menos 10 minutos contínuos quanto tempo no total você gastou caminhando por dia?</label>
                <div className="LabelInput">
                    Horas:
                    <input defaultValue={p5_1b_1} onChange={(e) => setP5_1b_1(e.target.value)} type="text"/>
                </div>
                <div className="LabelInput">
                    Minutos:
                    <input defaultValue={p5_1b_2} onChange={(e) => setP5_1b_2(e.target.value)} type="text"/>
                </div>
            </div>
            <div className="LabelInput">
                <label><b>2. a)</b> Em quantos dias da última semana, você realizou atividades MODERADAS por pelo menos 10 minutos contínuos, como por exemplo pedalar leve na bicicleta, nadar, dançar, fazer ginástica aeróbica leve, jogar vôlei recreativo, carregar pesos leves, fazer serviços domésticos na casa, no quintal ou no jardim como varrer, aspirar, cuidar do jardim, ou qualquer atividade que fez aumentar moderadamente sua respiração ou batimentos do coração <b>(POR FAVOR NÃO INCLUA CAMINHADA)</b></label>
                <div className="LabelInput">
                    Dias
                    <input defaultValue={p5_2a_1} onChange={(e) => setP5_2a_1(e.target.value)} type="text"/>
                    por Semana.
                    <div className="LabelInput">
                        <input defaultValue={p5_2a_2} onChange={() => setP5_2a_2(1)} type="checkbox"/>
                        Nenhum
                    </div>
                </div>
            </div>
            <div className="LabelInput">
                <label><b>2. b)</b> Nos dias em que você fez essas atividades moderadas por pelo menos 10 minutos contínuos, quanto tempo no total você gastou fazendo essas atividades pordia?</label>
                <div className="LabelInput">
                    Horas:
                    <input defaultValue={p5_2b_1} onChange={(e) => setP5_2b_1(e.target.value)} type="text"/>
                </div>
                <div className="LabelInput">
                    Minutos:
                    <input defaultValue={p5_2b_2} onChange={(e) => setP5_2b_2(e.target.value)} type="text"/>
                </div>
            </div>
            <div className="LabelInput">
                <label><b>3. a)</b> Em quantos dias da última semana, você realizou atividades VIGOROSAS por pelo menos 10 minutos contínuos, como por exemplo correr, fazer ginástica aeróbica, jogar futebol, pedalar rápido na bicicleta, jogar basquete, fazer serviços domésticos pesados em casa, no quintal ou cavoucar no jardim, carregar pesos elevados ou qualquer atividade que fez aumentar MUITO sua respiração ou batimentos docoração.</label>
                <div className="LabelInput">
                    Dias
                    <input defaultValue={p5_3a_1} onChange={(e) => setP5_3a_1(e.target.value)} type="text"/>
                    por Semana.
                    <div className="LabelInput">
                        <input defaultValue={p5_3a_2} onChange={() => setP5_3a_2(1)} type="checkbox"/>
                        Nenhum
                    </div>
                </div>
            </div>
            <div className="LabelInput">
                <label><b>3. b)</b>  Nos dias em que você fez essas atividades vigorosas por pelo menos 10 minutos contínuos quanto tempo no total você gastou fazendo essas atividades <b>por dia?</b></label>
                <div className="LabelInput">
                    Horas:
                    <input defaultValue={p5_3b_1} onChange={(e) => setP5_3b_1(e.target.value)} type="text"/>
                </div>
                <div className="LabelInput">
                    Minutos:
                    <input defaultValue={p5_3b_2} onChange={(e) => setP5_3b_2(e.target.value)} type="text"/>
                </div>
            </div>
            <div className="LabelInput">
                <label><b>4. a)</b>  Quanto tempo no total você gasta sentado durante um <b>dia de semana?</b></label>
                <div className="LabelInput">
                    Horas:
                    <input defaultValue={p5_4a_1} onChange={(e) => setP5_4a_1(e.target.value)} type="text"/>
                </div>
                <div className="LabelInput">
                    Minutos:
                    <input defaultValue={p5_4a_2} onChange={(e) => setP5_4a_2(e.target.value)} type="text"/>
                </div>
            </div>
            <div className="LabelInput">
                <label><b>4. b)</b>  Quanto tempo no total você gasta sentado durante em um <b>dia de final de semana?</b></label>
                <div className="LabelInput">
                    Horas:
                    <input defaultValue={p5_4b_1} onChange={(e) => setP5_4b_1(e.target.value)} type="text"/>
                </div>
                <div className="LabelInput">
                    Minutos:
                    <input defaultValue={p5_4b_2} onChange={(e) => setP5_4b_2(e.target.value)} type="text"/>
                </div>
            </div>
            <div className="LabelInput">
                <label>Classificação segundo o IPAQ:</label>
                <select value={ipaq} onChange={(e) => setIpaq(e.target.value)}>
                    <option value="">Selecionar</option>
                    <option value="Muito ativo">Muito Ativo</option>
                    <option value="Ativo">Ativo</option>
                    <option value="Irregularmente ativo">Irregularmente Ativo</option>
                    <option value="Sedentário">Sedentário</option>
                </select>
            </div>
            <div className="LabelInput">
                <p><strong>Se o idoso for classificado como irregularmente ativo ou sedentário ele será considerado um idoso com baixo nível de atividade física.</strong></p>
            </div>
            <div className="LabelInput">
                <label>Baixo nível de atividade física:</label>
                <select value={baixo_nivel_atividade_fisica} onChange={(e) => setBaixo_nivel_atividade_fisica(parseInt(e.target.value))}>
                    <option value="">Selecionar</option>
                    <option value={1}>Sim</option>
                    <option value={0}>Não</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>CLASSIFICAÇÃO DA FRAGILIDADE:</strong></label>
            </div>
            <div className="LabelInput">
                <label>O idoso será considerado “frágil” se apresentar três ou mais critérios positivos, “pré-frágil” se apresentar um ou dois critérios positivos e “não- frágil” se apresentar nenhum critério positivo.</label>
                <select value={classificacao_da_fragilidade} onChange={(e) => setClassificacao_da_fragilidade(e.target.value)}>
                    <option value="">Selecionar</option>
                    <option value={"Não-frágil"}>Não-frágil</option>
                    <option value={"Pré-frágil"}>Pré-frágil</option>
                    <option value={"Frágil"}>Frágil</option>
                </select>
            </div>
            <div className="BotaoForm">
                <button onClick={handleClickOpen} className="botaoFormSalvar">Salvar</button>
                <button onClick={handleFecharClick} className="botaoFormFechar">Fechar</button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Deseja realmente alterar esse Paciente"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Tem certeza que você deseja alterar os dados desse paciente?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancelar</Button>
                        <Button onClick={handleSalvar} autoFocus>
                            Salvar
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={openErro400}
                    onClose={handleFecharErro400}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Erro"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Algum campo está com dados errados.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleFecharErro400} autoFocus>
                            Fechar
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={openErro500}
                    onClose={handleFecharErro500}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Erro"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Ocorreu um erro no servidor.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleFecharErro500} autoFocus>
                            Fechar
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    )
}

export default EditarFragilidades;
