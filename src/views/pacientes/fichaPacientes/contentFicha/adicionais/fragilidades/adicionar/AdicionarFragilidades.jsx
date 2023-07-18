import React, {useState} from "react";
import "./AdicionarFragilidades.css"

function AdicionarFragilidades(props) {
    const [p1, setP1] = useState(true);
    const [p2_1, setP2_1] = useState("22.00");
    const [p2_2, setP2_2] = useState(true);
    const [p3_1, setP3_1] = useState("");
    const [p3_2, setP3_2] = useState("");
    const [p3_3, setP3_3] = useState(true);
    const [p4_1, setP4_1] = useState("1.0899182561307903");
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

    return (
        <div className="AdicionarFragilidades">
            <div className="LabelInput">
                <label><strong>1. Perda de peso não intencional (≥4,5kg ou ≥5% do peso no ano anterior): </strong></label>
                <select value={p1} onChange={(e) => setP1(parseInt(e.target.value))}>
                    <option value="">Selecionar</option>
                    <option value={1}>Sim</option>
                    <option value={0}>Não</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>2. Diminuição da força de preensão no Dinamômetro Manual Jamar® (mão dominante), com ponto de corte ajustado para sexo e IMC:</strong></label>
            </div>
            <div className="LabelInput">
                <label>Média da força de preensão: </label>
                <input value={p2_1} onChange={(e) => setP2_1(e.target.value)} type="text"/>
            </div>
            <div className="LabelInput">
                <div className="Quadro">
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
                    <option value="">Selecionar</option>
                    <option value={1}>Sim</option>
                    <option value={0}>Não</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>3. Exaustão, por auto-relato de fadiga: “Senti que tive que fazer esforço para fazer tarefas habituais”e “Não consegui levar adiante minhas coisas” do Center for EpidemiologicalStudies – Depression CESD (TAVARES; NERI; CUPERTINO, 2007). Os idosos que obtiveram escore três ou quatro em qualquer uma das questões preencheram o critério.</strong></label>
            </div>
            <div className="LabelInput">
                <label>Na última semana:
                    <br/>
                    <br/>
                    Sentiu que teve que fazer esforço para das conta das suas tarefas habituais?
                </label>
                <select value={p3_1} onChange={(e) => setP3_1(e.target.value)}>
                    <option value="">Selecionar</option>
                    <option value="Nunca/Raramente">Nunca/Raramente</option>
                    <option value="Poucas Vezes">Poucas Vezes</option>
                    <option value="Na marioria da vezes">Na maioria das vezes</option>
                    <option value="Sempre">Sempre</option>
                </select>
            </div>
            <div className="LabelInput">
                <label>O(a) senhor(a) deixou muitos de seus interesses e atividades?</label>
                <select value={p3_2} onChange={(e) => setP3_2(e.target.value)}>
                    <option value="">Selecionar</option>
                    <option value="Nunca/Raramente">Nunca/Raramente</option>
                    <option value="Poucas Vezes">Poucas Vezes</option>
                    <option value="Na marioria da vezes">Na maioria das vezes</option>
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
            <div className="LabelInput">
                <label><strong>4. Diminuição da velocidade da marcha calculada através do tempo em segundos gasto para percorrer 4 metros, ajustado pelo sexo e altura.</strong></label>
            </div>
            <div className="LabelInput">
                <label>o tempo gasto para percorrer 4 metros:</label>
                <input value={p4_1} onChange={(e) => setP4_1(e.target.value)} type="text"/>
            </div>
            <div className="Quadro">
                <label>Quadro 02: Ajuste de altura e sexo para o tempo gasto para percorrer 4 metros</label>
                <table className="table table-striped">
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
    )
}

export default AdicionarFragilidades;