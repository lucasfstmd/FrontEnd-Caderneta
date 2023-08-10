import React, {useEffect, useState} from "react";
import "./Identificacao.css"
import PainelFicha from "../../../../../../components/painelFicha/PainelFicha";
import api from "../../../../../../service/api";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContent, DialogContentText} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function Identificacao(props) {
    const [pacienteObj, setPacienteObj] = useState();
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
    const [viuvo_desde] = useState('');
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
    const [numero_identificacao, setNumeroIdentificacao] = useState();



    useEffect(() => {
        async function carregarPaciente() {
            try {
                const response = await api.get(`v1/pacientes/${props.pacienteId}`);
                setPacienteObj(response.data);
                setNome(response.data.nome);
                setUbs(response.data.ubs);
                setNomeSocial(response.data.nome_social);
                setNCartaoSus(response.data.n_cartao_sus);
                setCpf(response.data.cpf);
                setIdentidade(response.data.identidade);
                setNomeMae(response.data.nome_mae);
                setDataNascimento(response.data.data_nascimento);
                setSexo(response.data.sexo);
                setNascimentoMunicipio(response.data.nascimento_municipio);
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
                setNumeroIdentificacao(response.data.numero_identificacao)
            } catch (error) {
                console.log(undefined)
            }
        }

        carregarPaciente();
    });

    const Paciente = {
        ubs,
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
        numero_identificacao,
    }

    const handleEdit = async () => {
        try {
            await api.patch(`v1/pacientes/${props.pacienteId}`, Paciente)
            setOpen(true);
        } catch (error) {
            if (error.response && error.response.status === 400) {
            } else if (error.response && error.response.status === 500) {
                setOpenErro500(true);
            }
        }
    }

    const [open, setOpen] = useState(false);
    const [openErro500, setOpenErro500] = useState(false);

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
    }


    return (
        <div className="Identificacao">
            <PainelFicha titulo="4.1 Número de Identificação">
                <div className="LabelInput">
                    <label><strong>Numero de Indentificação: </strong></label>
                    <input defaultValue={pacienteObj ? pacienteObj.numero_identificacao : ''} onChange={(e) => setNumeroIdentificacao(e.target.value)} type="text"/>
                </div>
                <div className="BotaoForm">
                    <button onClick={handleClickOpen} className="botaoFormSalvar">Salvar</button>
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
            </PainelFicha>
        </div>
    );
}

export default Identificacao;