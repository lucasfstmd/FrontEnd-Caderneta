import React, { useState } from "react";
import "./Login.css";
import { login } from "../../service/auth/auth";
import api from "../../service/api";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai"

function Login() {
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();
        const user = { usuario, senha };
        if (!usuario || !senha) {
            setError("Preencha usuário e senha para continuar!");
        } else {
            try {
                const response = await api.post("auth/login", user);
                login(response.data.access_token);
                navigate("/caderneta", { replace: true });
                window.location.reload(true);
            } catch (error) {
                setError("Nome de usuário ou senha incorretos");
            }
        }
    };


    return (
        <div className="Login">
            <div className="FormLogin">
                <form onSubmit={handleSignIn} className="Form">
                    <div className="TituloLogin">
                        Acessar Sistema
                    </div>
                    <div className="IconInputUser">
                        <AiOutlineUser/>
                        <input
                            type="text"
                            placeholder="Nome de Usuário"
                            onChange={(e) => setUsuario(e.target.value)}
                        />
                    </div>
                    <div className="IconInputPassword">
                        <AiOutlineLock/>
                        <input
                            type="password"
                            placeholder="Senha"
                            onChange={(e) => setSenha(e.target.value)}
                        />
                    </div>
                    <div className="ButtonLogin">
                        <Button variant="contained" type="submit">Entrar</Button>
                    </div>
                    {error && <p id="ErrorLogin"><strong>{error}</strong></p>}
                </form>
            </div>
        </div>
    );
}

export default Login;
