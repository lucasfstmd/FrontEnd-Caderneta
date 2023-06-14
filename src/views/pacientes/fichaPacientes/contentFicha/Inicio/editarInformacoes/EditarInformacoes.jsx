import React, {useEffect, useState} from "react";
import PainelFicha from "../../../../../../components/painelFicha/PainelFicha";
import "./EditarInformacoes.css"
import api from "../../../../../../service/api";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import {DialogContent, DialogContentText} from "@mui/material";

function EditarInformacoes(props) {
    const [paciente, setPaciente] = useState();
    const [ubsSelecionadaValueEditar, setUbsSelecionadaValueEditar] = useState('');
    const [ubs, setUbs] = useState([]);
    const [nome, setNome] = useState('');
    const [nome_social, setNomeSocial] = useState('');
    const [n_cartao_sus, setNCartaoSus] = useState('');
    const [identidade, setIdentidade] = useState('');
    const [cpf, setCpf] = useState('');
    const [nome_mae, setNomeMae] = useState('');
    const [sexo, setSexo] = useState('');
    const [nascimento_municipio, setNascimentoMunicipio] = useState('');
    const [nascimento_uf, setNascimentoUf] = useState('');
    const [nacionalidade, setNacionalidade] = useState('');
    const [nascimento, setNascimento] = useState('');
    const [sabe_ler_escrever, setSabeLerEscrever] = useState(false);
    const [escolaridade, setEscolaridade] = useState('');
    const [raca_cor, setRacaCor] = useState('');
    const [religiao, setReligiao] = useState('');
    const [religiao_qual, setReligiaoQual] = useState('');
    const [ocupacao, setOcupacao] = useState('');
    const [situacao_conjugal, setSituacaoConjugal] = useState('');
    const [viuvo_desde, setViuvoDesde] = useState('');
    const [unidade_basica, setUnidadeBasica] = useState('');
    const [alergia_maior_gravidade, setAlergiaMaiorGravidade] = useState('');
    const [deficiencia, setDeficiencia] = useState(false);
    const [deficiencia_qual, setDeficienciaQual] = useState('');
    const [deficiencia_especificar, setDeficienciaEspecificar] = useState('');
    const [grupo_sanguineo, setGrupoSanguineo] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [bairro, setBairro] = useState('');
    const [ponto_referencia, setPontoReferencia] = useState('');
    const [municipio, setMunicipio] = useState('');
    const [uf, setUf] = useState('');
    const [email, setEmail] = useState('');
    const [qual_etnia, setQualEtnia] = useState('');
    const [data_nascimento, setDataNascimento] = useState('');
    const [possui_internet, setPossuiInternet] = useState(false);
    const [telefone, setTelefone] = useState('');
    const [celular, setCelular] = useState('');
    const [cep, setCep] = useState('');


    useEffect(() => {
        async function carregarUbs() {
            const response = await api.get("v1/ubs");
            setUbs(response.data);
        }

        carregarUbs();
    }, []);

    useEffect(() => {
        async function carregarPaciente() {
            try {
                const response = await api.get(`v1/pacientes/${props.pacienteId}`);
                setPaciente(response.data);
                setNome(response.data.nome);
                setUbsSelecionadaValueEditar(response.data.ubs);
                setNomeSocial(response.data.nome_social);
                setNCartaoSus(response.data.n_cartao_sus);
                setCpf(response.data.cpf);
                setIdentidade(response.data.identidade);
                setNomeMae(response.data.nome_mae);
                setDataNascimento(response.data.data_nascimento);
                setSexo(response.data.sexo);
                setNascimento(response.data.nascimento_municipio);
                setNascimentoUf(response.data.nascimento_uf);
                setNacionalidade(response.data.nacionalidade);
                setNascimento(response.data.nascimento);
                setSabeLerEscrever(response.data.sabe_ler_escrever);
                setEscolaridade(response.data.escolaridade);
                setRacaCor(response.data.raca_cor);
                setQualEtnia(response.data.qual_etnia);
                setReligiao(response.data.religiao);
                setReligiaoQual(response.data.religiao_qual);
                setOcupacao(response.data.ocupacao);
                setSituacaoConjugal(response.data.situacao_conjugal);
                setUnidadeBasica(response.data.unidade_basica);
                setAlergiaMaiorGravidade(response.data.alergia_maior_gravidade);
                setDeficiencia(response.data.deficiencia);
                setDeficienciaQual(response.data.deficiencia_qual);
                setDeficienciaEspecificar(response.data.deficiencia_especificar);
                setGrupoSanguineo(response.data.grupo_sanguineo);
                setPossuiInternet(response.data.possui_internet);
                setCep(response.data.cep);
                setRua(response.data.rua);
                setNumero(response.data.numero);
                setBairro(response.data.bairro);
                setPontoReferencia(response.data.ponto_referencia);
                setComplemento(response.data.complemento);
                setMunicipio(response.data.municipio);
                setUf(response.data.uf);
                setTelefone(response.data.telefone);
                setCelular(response.data.celular);
                setEmail(response.data.email);
            } catch (error) {
                console.log(error)
            }
        }

        carregarPaciente();
    });



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


    function handleChangeUbsSelecionada(e) {
        const ubsSelecionadaNome = e.target.value;
        setUbsSelecionadaValueEditar(ubsSelecionadaNome);
    }

    const handleTelefoneChange = (e) => {
        setTelefone(formatarTelefone(e.target.value));
    };

    const handleCelularChange = (e) => {
        setCelular(formatarCelular(e.target.value));
    };


    const ubsSelecionada = ubs.find((ubsItem) => ubsItem.nome === ubsSelecionadaValueEditar);
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
        numero_identificacao: '',
    }

    const handleEdit = async () => {
        try {
            await api.patch(`v1/pacientes/${props.pacienteId}`, Paciente)
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
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSalvar = () => {
        setOpen(false);
    };


    return (
        <div className="EditarInformacoes">
            <PainelFicha titulo="1.1 Editar Dados Pessoais">
                <form>
                    <div className="LabelInput">
                        <label><strong>UBS: </strong></label>
                        <select
                            value={ubsSelecionadaValueEditar}
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
                        <input defaultValue={paciente ? paciente.nome : ''} onChange={(e) => setNome(e.target.value)} type="text" className="nome" />
                    </div>
                    <div className="LabelInput">
                        <label><strong>Nome Social: </strong></label>
                        <input defaultValue={paciente ? paciente.nome_social: ''} onChange={(e) => setNomeSocial(e.target.value)} type="text" className="nomeSocial"/>
                    </div>
                    <div className="LabelInput">
                        <label><strong>N° Cartão SUS: </strong></label>
                        <input defaultValue={paciente ? paciente.n_cartao_sus: ''} onChange={(e) => setNCartaoSus(e.target.value)} type="text" className="nCartaoSus"/>
                    </div>
                    <div className="LabelInput">
                        <label><strong>CPF: </strong></label>
                        <input onInput={mascaraCpf} defaultValue={paciente ? paciente.cpf: ''} onChange={(e) => setCpf(e.target.value)} type="text" className="cpf" />
                    </div>
                    <div className="LabelInput">
                        <label><strong>Identidade: </strong></label>
                        <input defaultValue={paciente ? paciente.identidade: ''} type="text" onChange={(e) => setIdentidade(e.target.value)} className="identidade" onKeyPress={apenasNumerosIdentidade} maxLength={7}/>
                    </div>
                    <div className="LabelInput">
                        <label><strong>Nome da Mãe: </strong></label>
                        <input defaultValue={paciente ? paciente.nome_mae: ''} type="text" onChange={(e) => setNomeMae(e.target.value)} className="nomeMae"/>
                    </div>

                    <div className="LabelInput">
                        <label><strong>Data de Nascimento: </strong></label>
                        <input defaultValue={paciente ? paciente.data_nascimento: ''} onChange={(e) => setDataNascimento(e.target.value)} type="date" className="dataNascimento"/>
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
                        <input defaultValue={paciente ? paciente.nascimento_municipio: ''} type="text" onChange={(e) => setNascimentoMunicipio(e.target.value)} className="municipioNascimentos"/>
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
                        <input defaultValue={paciente ? paciente.nascimento: ''} type="text" onChange={(e) => setNascimento(e.target.value)} className="paisOrigem"/>
                    </div>
                    <div className="LabelInput">
                        <label><strong>Sabe ler e escrever?: </strong></label>
                        <select value={sabe_ler_escrever} name="sabeLer" onChange={(e) => setSabeLerEscrever(e.target.value)}>
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
                        <input defaultValue={paciente ? paciente.qual_etnia: ''} type="text" onChange={(e) => setQualEtnia(e.target.value)} className="etniaQual"/>
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
                        <input defaultValue={paciente ? paciente.religiao_qual: ''} type="text" onChange={(e) => setReligiaoQual(e.target.value)} className="religiaoQual"/>
                    </div>
                    <div className="LabelInput">
                        <label><strong>Ocupacao/profissão: </strong></label>
                        <input defaultValue={paciente ? paciente.ocupacao: ''} type="text" onChange={(e) => setOcupacao(e.target.value)} className="ocupacoaQual"/>
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
                        <input type="text" defaultValue={paciente ? paciente.viuvo_desde: ''} onChange={(e) => setViuvoDesde(e.target.value)} className="estadoCivilDesdeQuando"/>
                    </div>
                    <div className="LabelInput">
                        <label><strong>UBS que Frequenta: </strong></label>
                        <input defaultValue={paciente ? paciente.unidade_basica: ''} type="text" onChange={(e) => setUnidadeBasica(e.target.value)} className="ubsQueFrequenta"/>
                    </div>
                    <div className="LabelInput">
                        <label><strong>Alergia de Maior Gravidade: </strong></label>
                        <input defaultValue={paciente ? paciente.alergia_maior_gravidade: ''} type="text" onChange={(e) => setAlergiaMaiorGravidade(e.target.value)} className="alergia"/>
                    </div>
                    <div className="LabelInput">
                        <label><strong>Deficiencia: </strong></label>
                        <select value={deficiencia} name="deficiencia" onChange={(e) => setDeficiencia(e.target.value)}>
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
                        <input defaultValue={paciente ? paciente.deficiencia_especificar: ''} type="text" onChange={(e) => setDeficienciaEspecificar(e.target.value)} className="deficienciaEspecificada"/>
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
                        <select value={possui_internet} name="possuiInternt" onChange={(e) => setPossuiInternet(e.target.value)}>
                            <option value={null}>Selecionar</option>
                            <option value={0}>Não</option>
                            <option value={1}>Sim</option>
                        </select>
                    </div>
                    <div className="TituloEndereco">
                        <h1>Endereço Residencial</h1>
                    </div>
                    <div className="LabelInput">
                        <label><strong>CEP: </strong></label>
                        <input defaultValue={paciente ? paciente.cep: ''} type="text" name="cep" onChange={(e) => setCep(e.target.value)}/>
                    </div>
                    <div className="LabelInput">
                        <label><strong>Rua: </strong></label>
                        <input defaultValue={paciente ? paciente.rua: ''} type="text" name="rua" onChange={(e) => setRua(e.target.value)}/>
                    </div>
                    <div className="LabelInput">
                        <label><strong>Numero: </strong></label>
                        <input defaultValue={paciente ? paciente.numero: ''} type="text" name="numero" onChange={(e) => setNumero(e.target.value)}/>
                    </div>
                    <div className="LabelInput">
                        <label><strong>Bairro: </strong></label>
                        <input defaultValue={paciente ? paciente.bairro: ''} type="text" name="bairro" onChange={(e) => setBairro(e.target.value)}/>
                    </div>
                    <div className="LabelInput">
                        <label><strong>Ponto de Referência: </strong></label>
                        <input defaultValue={paciente ? paciente.ponto_referencia: ''} type="text" name="ponto-referencia" onChange={(e) => setPontoReferencia(e.target.value)}/>
                    </div>
                    <div className="LabelInput">
                        <label><strong>Complemento: </strong></label>
                        <input defaultValue={paciente ? paciente.complemento: ''} type="text" name="complemento" onChange={(e) => setComplemento(e.target.value)}/>
                    </div>
                    <div className="LabelInput">
                        <label><strong>Cidade: </strong></label>
                        <input defaultValue={paciente ? paciente.municipio: ''} type="text" name="cidade" onChange={(e) => setMunicipio(e.target.value)}/>
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
                        <input defaultValue={paciente ? paciente.celular: ''} type="text" onChange={handleCelularChange} />
                    </div>
                    <div className="LabelInput">
                        <label><strong>Email: </strong></label>
                        <input defaultValue={paciente ? paciente.email: ''} type="text" className="email" onChange={(e) => setEmail(e.target.value)}/>

                    </div>
                    <div className="BotaoForm">
                        <button onClick={handleClickOpen} className="botaoForm">Salvar</button>
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
                </form>
            </PainelFicha>
        </div>
    )
}
export default EditarInformacoes;