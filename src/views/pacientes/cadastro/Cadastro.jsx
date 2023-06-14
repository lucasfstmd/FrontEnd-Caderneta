import React, {useEffect, useState} from "react";
import './Cadastro.css'
import {Link, useNavigate} from "react-router-dom";
import {FaUsers} from "react-icons/fa";
import api from "../../../service/api";
import RequestAuth from "../../../service/auth/RequestAuth";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContent, DialogContentText} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function Cadastro() {
    const navigate = useNavigate();
    const [ubsSelecionadaValue, setUbsSelecionadaValue] = useState("");
    const [ubs, setUbs] = useState([]);
    const [nome, setNome] = useState("");
    const [nome_social, setNomeSocial] = useState("");
    const [n_cartao_sus, setNCartaoSus] = useState("");
    const [identidade, setIdentidade] = useState("");
    const [cpf, setCpf] = useState("");
    const [nome_mae, setNomeMae] = useState("");
    const [sexo, setSexo] = useState("");
    const [nascimento_municipio, setNascimentoMunicipio] = useState("");
    const [nascimento_uf, setNascimentoUf] = useState("");
    const [nacionalidade, setNacionalidade] = useState("");
    const [nascimento, setNascimento] = useState("");
    const [sabe_ler_escrever, setSabeLerEscrever] = useState(0);
    const [escolaridade, setEscolaridade] = useState("");
    const [raca_cor, setRacaCor] = useState("");
    const [religiao, setReligiao] = useState("");
    const [religiao_qual, setReligiaoQual] = useState("");
    const [ocupacao, setOcupacao] = useState("");
    const [situacao_conjugal, setSituacaoConjugal] = useState("");
    const [viuvo_desde, setViuvoDesde] = useState("");
    const [unidade_basica, setUnidadeBasica] = useState("");
    const [alergia_maior_gravidade, setAlergiaMaiorGravidade] = useState("");
    const [deficiencia, setDeficiencia] = useState(0);
    const [deficiencia_qual, setDeficienciaQual] = useState("");
    const [deficiencia_especificar, setDeficienciaEspecificar] = useState("");
    const [grupo_sanguineo, setGrupoSanguineo] = useState("");
    const [rua, setRua] = useState("");
    const [numero, setNumero] = useState("");
    const [complemento, setComplemento] = useState("");
    const [bairro, setBairro] = useState("");
    const [ponto_referencia, setPontoReferencia] = useState("");
    const [municipio, setMunicipio] = useState("");
    const [uf, setUf] = useState("");
    const [email, setEmail] = useState("");
    const [qual_etnia, setQualEtnia] = useState("");
    const [data_nascimento, setDataNascimento] = useState("1900-01-01");
    const [possui_internet, setPossuiInternet] = useState(0);
    const [telefone, setTelefone] = useState("");
    const [celular, setCelular] = useState("");
    const [cep, setCep] = useState("");

    useEffect(() => {
        async function carregarUbs() {
            const response = await api.get("v1/ubs");
            setUbs(response.data);
        }

        carregarUbs();
    }, []);

    function mascaraCpf(e) {
        const input = e.target;
        let value = input.value;

        if (isNaN(value[value.length - 1])) {
            value = value.substring(0, value.length - 1);
            input.value = value;
            return;
        }

        input.setAttribute('maxLength', '14');
        if (value.length === 3 || value.length === 7) {
            value += '.';
        }
        if (value.length === 11) {
            value += '-';
        }

        input.value = value;
    }

    function apenasNumerosIdentidade(e) {
        const tecla = e.key;
        if (isNaN(tecla) || tecla === ' ') {
            e.preventDefault();
        }
    }

    function formatarTelefone(valor) {
        let numero = valor.replace(/\D/g, "");
        numero = numero.substring(0, 10);
        if (numero.length === 10) {
            numero = numero.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
        }
        return numero;
    }

    function formatarCelular(valor) {
        let numero = valor.replace(/\D/g, "");
        numero = numero.substring(0, 11);
        if (numero.length === 11) {
            numero = numero.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
        }
        return numero;
    }

    function formatCep(cep) {
        if (cep.length === 8) {
            return cep.replace(/(\d{5})(\d{3})/, "$1-$2");
        } else {
            return cep;
        }
    }

    function handleChangeUbsSelecionada(e) {
        const ubsSelecionadaNome = e.target.value;
        setUbsSelecionadaValue(ubsSelecionadaNome);
    }

    const handleTelefoneChange = (e) => {
        setTelefone(formatarTelefone(e.target.value));
    }

    const handleCelularChange = (e) => {
        setCelular(formatarCelular(e.target.value));
    }

    const handleCepChange = (e) => {
        setCep(formatCep(e.target.value));
    }

    const ubsSelecionada = ubs.find((ubsItem) => ubsItem.nome === ubsSelecionadaValue);
    const ubsNome = ubsSelecionada ? ubsSelecionada.nome : '';

    const Paciente = {
        ubs: ubsNome,
        nome,
        nome_social,
        n_cartao_sus,
        identidade,
        cpf,
        nome_mae,
        sexo,
        nascimento_municipio,
        nascimento_uf,
        nacionalidade,
        nascimento,
        sabe_ler_escrever,
        escolaridade,
        raca_cor,
        religiao,
        religiao_qual,
        ocupacao,
        situacao_conjugal,
        viuvo_desde,
        unidade_basica,
        alergia_maior_gravidade,
        deficiencia,
        deficiencia_qual,
        deficiencia_especificar,
        grupo_sanguineo,
        rua,
        numero,
        complemento,
        bairro,
        ponto_referencia,
        cep,
        municipio,
        uf,
        telefone,
        celular,
        email,
        qual_etnia,
        data_nascimento,
        possui_internet,
        numero_identificacao: "",
    }

    async function handleSalvarApi() {
        try {
            await api.post("v1/pacientes", Paciente);
            setOpen(true);
        } catch (error) {
            setError(error.response.data.message);
            if (error.response && error.response.status === 400) {
                setOpenErro400(true);
            } else if (error.response && error.response.status === 500) {
                setOpenErro500(true);
            }
        }
    }

    const [error, setError] = useState("")
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
        handleSalvarApi();
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSalvar = () => {
        setOpen(false);
        navigate("/caderneta/pacientes")
    }

    const handleFecharClick = () => {
        navigate("/caderneta/pacientes")
    }

    return (
        <RequestAuth>
            <div className="Cadastro">
                <div className="FichaCadastro">
                    <div className="Titulo">
                        <h1>Cadastro de Pacientes</h1>
                        <button><Link style={{textDecoration: 'none', color: 'white'}} to={'/caderneta/pacientes'}><FaUsers/> Lista de Pacinetes</Link></button>
                    </div>
                    <hr/>
                    <div className="LabelInput">
                        <label><strong>UBS: </strong></label>
                        <select
                            value={ubsSelecionadaValue ? ubsSelecionadaValue.nome : ''}
                            onChange={handleChangeUbsSelecionada}
                            id="selectFiltro"
                        >
                            <option value="">Selecionar</option>
                            {ubs.map((ubsItem, index) => (
                                <option key={index} value={ubsItem.nome}>
                                    {ubsItem.nome}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="LabelInput">
                        <label><strong>Nome: </strong></label>
                        <input value={nome} onChange={(e) => setNome(e.target.value)} type="text" className="nome"/>
                    </div>
                    <div className="LabelInput">
                        <label><strong>Nome Social: </strong></label>
                        <input value={nome_social} onChange={(e) => setNomeSocial(e.target.value)} type="text" className="nomeSocial"/>
                    </div>
                    <div className="LabelInput">
                        <label><strong>N° Cartão SUS: </strong></label>
                        <input value={n_cartao_sus} onChange={(e) => setNCartaoSus(e.target.value)} type="text" className="nCartaoSus"/>
                    </div>
                    <div className="LabelInput">
                        <label><strong>CPF: </strong></label>
                        <input onInput={mascaraCpf} value={cpf} onChange={(e) => setCpf(e.target.value)} type="text" className="cpf" />
                    </div>
                    <div className="LabelInput">
                        <label><strong>Identidade: </strong></label>
                        <input value={identidade} type="text" onChange={(e) => setIdentidade(e.target.value)} className="identidade" onKeyPress={apenasNumerosIdentidade} maxLength={7}/>
                    </div>
                    <div className="LabelInput">
                        <label><strong>Nome da Mãe: </strong></label>
                        <input value={nome_mae} type="text" onChange={(e) => setNomeMae(e.target.value)} className="nomeMae"/>
                    </div>
                    <div className="LabelInput">
                        <label><strong>Data de Nascimento: </strong></label>
                        <input value={data_nascimento} onChange={(e) => setDataNascimento(e.target.value)} type="date" className="dataNascimento"/>
                    </div>
                    <div className="LabelInput">
                        <label><strong>Sexo: </strong></label>
                        <select value={sexo} onChange={(e) => setSexo(e.target.value)} name="selectSexo">
                            <option value="">Selecionar</option>
                            <option value="M">Masculino</option>
                            <option value="F">Feminino</option>
                        </select>
                    </div>
                    <div className="LabelInput">
                        <label><strong>Municipio de Nascimento: </strong></label>
                        <input value={nascimento_municipio} type="text" onChange={(e) => setNascimentoMunicipio(e.target.value)} className="municipioNascimentos"/>
                    </div>
                    <div className="LabelInput">
                        <label><strong>UF: </strong></label>
                        <select value={nascimento_uf} onChange={(e) => setNascimentoUf(e.target.value)}>
                            <option value="">Selecionar</option>
                            <option value="AC">Acre</option>
                            <option value="AL">Alagoas</option>
                            <option value="AP">Amapá</option>
                            <option value="AM">Amazonas</option>
                            <option value="BA">Bahia</option>
                            <option value="CE">Ceará</option>
                            <option value="DF">Distrito Federal</option>
                            <option value="ES">Espirito Santo</option>
                            <option value="GO">Goiás</option>
                            <option value="MA">Maranhão</option>
                            <option value="MS">Mato Grosso do Sul</option>
                            <option value="MT">Mato Grosso</option>
                            <option value="MG">Minas Gerais</option>
                            <option value="PA">Pará</option>
                            <option value="PB">Paraíba</option>
                            <option value="PR">Paraná</option>
                            <option value="PE">Pernambuco</option>
                            <option value="PI">Piauí</option>
                            <option value="RJ">Rio de Janeiro</option>
                            <option value="RN">Rio Grande do Norte</option>
                            <option value="RS">Rio Grande do Sul</option>
                            <option value="RO">Rondônia</option>
                            <option value="RR">Roraima</option>
                            <option value="SC">Santa Catarina</option>
                            <option value="SP">São Paulo</option>
                            <option value="SE">Sergipe</option>
                            <option value="TO">Tocantins</option>
                        </select>
                    </div>
                    <div className="LabelInput">
                        <label><strong>Nacionalidade: </strong></label>
                        <select value={nacionalidade} onChange={(e) => setNacionalidade(e.target.value)}>
                            <option value="">Selecionar</option>
                            <option value="brasileira">brasileira</option>
                            <option value="naturalizada">naturalizada</option>
                            <option value="estrangeira">estrnageira</option>
                        </select>
                    </div>
                    <div className="LabelInput">
                        <label><strong>Pais de Origem: </strong></label>
                        <input value={nascimento} type="text" onChange={(e) => setNascimento(e.target.value)} className="paisOrigem"/>
                    </div>
                    <div className="LabelInput">
                        <label><strong>Sabe ler e escrever?: </strong></label>
                        <select value={sabe_ler_escrever} name="sabeLer" onChange={(e) => setSabeLerEscrever(parseInt(e.target.value))}>
                            <option value={null}>Selecionar</option>
                            <option value={0}>Não</option>
                            <option value={1}>Sim</option>
                        </select>
                    </div>
                    <div className="LabelInput">
                        <label><strong>Escolaridade: </strong></label>
                        <select value={escolaridade} name="Escolaridade" onChange={(e) => setEscolaridade(e.target.value)}>
                            <option value="nenhuma">Nenhuma</option>
                            <option value="de 1 a 3 anos">de 1 - 3 anos</option>
                            <option value="de 4 a 7 anos">de 4 - 7 anos</option>
                            <option value="mais de 8 anos">8 ou mais</option>
                        </select>
                    </div>
                    <div className="LabelInput">
                        <label><strong>Raça Cor: </strong></label>
                        <select value={raca_cor} name="Raca" onChange={(e) => setRacaCor(e.target.value)}>
                            <option value="">Selecionar</option>
                            <option value="branca">Branca</option>
                            <option value="parda">Parda</option>
                            <option value="preta">Preta</option>
                            <option value="amarela">Amarela</option>
                            <option value="indigina">Indigina</option>
                            <option value="nao-declarada">Não Declarada</option>
                        </select>
                    </div>
                    <div className="LabelInput">
                        <label><strong>Qual Etnia?: </strong></label>
                        <input value={qual_etnia} type="text" onChange={(e) => setQualEtnia(e.target.value)} className="etniaQual"/>
                    </div>
                    <div className="LabelInput">
                        <label><strong>Religião: </strong></label>
                        <select value={religiao} name="religiao" onChange={(e) => setReligiao(e.target.value)}>
                            <option value={null}>Selecionar</option>
                            <option value={0}>Não</option>
                            <option value={1}>Sim</option>
                        </select>
                    </div>
                    <div className="LabelInput">
                        <label><strong>Qual Religião?: </strong></label>
                        <input value={religiao_qual} type="text" onChange={(e) => setReligiaoQual(e.target.value)} className="religiaoQual"/>
                    </div>
                    <div className="LabelInput">
                        <label><strong>Ocupacao/profissão: </strong></label>
                        <input value={ocupacao} type="text" onChange={(e) => setOcupacao(e.target.value)} className="ocupacoaQual"/>
                    </div>
                    <div className="LabelInput">
                        <label><strong>Estado Civil: </strong></label>
                        <select value={situacao_conjugal} name="EstadoCivil" onChange={(e) => setSituacaoConjugal(e.target.value)}>
                            <option value="">Selecionar</option>
                            <option value="solteiro(a)">Solteiro(a)</option>
                            <option value="casado(a)/convívio com parceiro(a)">Casado(a) / Convivio com Parceiro(a)</option>
                            <option value="divorciado(a)/separado(a)">Divorciado(a) / Separado(a)</option>
                            <option value="viúvo(a)">Viúvo(a)</option>
                            <option value="outro">Outro</option>
                        </select>
                    </div>
                    <div className="LabelInput">
                        <label><strong>Desde Quando (ano)?: </strong></label>
                        <input type="text" value={viuvo_desde} onChange={(e) => setViuvoDesde(e.target.value)} className="estadoCivilDesdeQuando"/>
                    </div>
                    <div className="LabelInput">
                        <label><strong>UBS que Frequenta: </strong></label>
                        <input value={unidade_basica} type="text" onChange={(e) => setUnidadeBasica(e.target.value)} className="ubsQueFrequenta"/>
                    </div>
                    <div className="LabelInput">
                        <label><strong>Alergia de Maior Gravidade: </strong></label>
                        <input value={alergia_maior_gravidade} type="text" onChange={(e) => setAlergiaMaiorGravidade(e.target.value)} className="alergia"/>
                    </div>
                    <div className="LabelInput">
                        <label><strong>Deficiencia: </strong></label>
                        <select value={deficiencia} name="deficiencia" onChange={(e) => setDeficiencia(parseInt(e.target.value))}>
                            <option value={null}>Selecionar</option>
                            <option value={0}>Não</option>
                            <option value={1}>Sim</option>
                        </select>
                    </div>
                    <div className="LabelInput">
                        <label><strong>Deficiencia Qual?: </strong></label>
                        <select value={deficiencia_qual} name="deficienciaQual" onChange={(e) => setDeficienciaQual(e.target.value)}>
                            <option value="nenhuma">Nenhuma</option>
                            <option value="auditiva">Auditiva</option>
                            <option value="visual">Visual</option>
                            <option value="intelectual/cognitiva">Intelectual/Cognitiva</option>
                            <option value="física">Fisica</option>
                            <option value="outra">Outra</option>
                        </select>
                    </div>
                    <div className="LabelInput">
                        <label><strong>Deficiencia Especificar: </strong></label>
                        <input value={deficiencia_especificar} type="text" onChange={(e) => setDeficienciaEspecificar(e.target.value)} className="deficienciaEspecificada"/>
                    </div>
                    <div className="LabelInput">
                        <label><strong>Grupo Sanguíneo: </strong></label>
                        <select value={grupo_sanguineo} name="GrupoSanguineo" onChange={(e) => setGrupoSanguineo(e.target.value)}>
                            <option value="">Selecionar</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>
                    </div>
                    <div className="LabelInput">
                        <label><strong>Possui Internet?: </strong></label>
                        <select value={possui_internet} name="possuiInternt" onChange={(e) => setPossuiInternet(parseInt(e.target.value))}>
                            <option value={null}>Selecionar</option>
                            <option value={0}>Não</option>
                            <option value={1}>Sim</option>
                        </select>
                    </div>
                    <div className="Titulo">
                        <h1>Endereço Residencial</h1>
                    </div>
                    <hr/>
                    <div className="LabelInput">
                        <label><strong>CEP: </strong></label>
                        <input value={cep} type="text" name="cep" onChange={handleCepChange}/>
                    </div>
                    <div className="LabelInput">
                        <label><strong>Rua: </strong></label>
                        <input value={rua} type="text" name="rua" onChange={(e) => setRua(e.target.value)}/>
                    </div>
                    <div className="LabelInput">
                        <label><strong>Numero: </strong></label>
                        <input value={numero} type="text" name="numero" onChange={(e) => setNumero(e.target.value)}/>
                    </div>
                    <div className="LabelInput">
                        <label><strong>Bairro: </strong></label>
                        <input value={bairro} type="text" name="bairro" onChange={(e) => setBairro(e.target.value)}/>
                    </div>
                    <div className="LabelInput">
                        <label><strong>Ponto de Referência: </strong></label>
                        <input value={ponto_referencia} type="text" name="ponto-referencia" onChange={(e) => setPontoReferencia(e.target.value)}/>
                    </div>
                    <div className="LabelInput">
                        <label><strong>Complemento: </strong></label>
                        <input value={complemento} type="text" name="complemento" onChange={(e) => setComplemento(e.target.value)}/>
                    </div>
                    <div className="LabelInput">
                        <label><strong>Cidade: </strong></label>
                        <input value={municipio} type="text" name="cidade" onChange={(e) => setMunicipio(e.target.value)}/>
                    </div>
                    <div className="LabelInput">
                        <label><strong>Estado: </strong></label>
                        <select value={uf} onChange={(e) => setUf(e.target.value)}>
                            <option value="">Selecionar</option>
                            <option value="AC">Acre</option>
                            <option value="AL">Alagoas</option>
                            <option value="AP">Amapá</option>
                            <option value="AM">Amazonas</option>
                            <option value="BA">Bahia</option>
                            <option value="CE">Ceará</option>
                            <option value="DF">Distrito Federal</option>
                            <option value="ES">Espirito Santo</option>
                            <option value="GO">Goiás</option>
                            <option value="MA">Maranhão</option>
                            <option value="MS">Mato Grosso do Sul</option>
                            <option value="MT">Mato Grosso</option>
                            <option value="MG">Minas Gerais</option>
                            <option value="PA">Pará</option>
                            <option value="PB">Paraíba</option>
                            <option value="PR">Paraná</option>
                            <option value="PE">Pernambuco</option>
                            <option value="PI">Piauí</option>
                            <option value="RJ">Rio de Janeiro</option>
                            <option value="RN">Rio Grande do Norte</option>
                            <option value="RS">Rio Grande do Sul</option>
                            <option value="RO">Rondônia</option>
                            <option value="RR">Roraima</option>
                            <option value="SC">Santa Catarina</option>
                            <option value="SP">São Paulo</option>
                            <option value="SE">Sergipe</option>
                            <option value="TO">Tocantins</option>
                        </select>
                    </div>
                    <div className="LabelInput">
                        <label><strong>Telefone: </strong></label>
                        <input value={telefone} type="text" onChange={handleTelefoneChange} />
                    </div>
                    <div className="LabelInput">
                        <label><strong>Celular: </strong></label>
                        <input value={celular} type="text" onChange={handleCelularChange} />
                    </div>
                    <div className="LabelInput">
                        <label><strong>Email: </strong></label>
                        <input value={email} type="text" className="email" onChange={(e) => setEmail(e.target.value)}/>
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
                                    Informações salvas com sucesso!
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleSalvar} autoFocus>
                                    Fechar
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
                                    {error }
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
                                    {error }
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
            </div>
        </RequestAuth>
    );
}

export default Cadastro;