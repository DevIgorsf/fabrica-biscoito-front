import React, { useState, useEffect } from 'react';
import { AbBotao } from './../../components/AbBotao';
import http from "../../http";
import Logo from "./../../images/Coplanet.jpg";
import { AbCampoTexto } from '../../components/AbCampoTexto';
import styled from './Login.module.scss';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    let navigate = useNavigate()


    const [login, setLogin] = useState('')
    const [senha, setSenha] = useState('')

    //verificar se o usuário já está logado
    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            navigate(-1)
        }
    }, [navigate])

    const aoSubmeterFormular = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()
        const usuario = {
            login,
            senha,
        }

        http.post('/login', usuario)
            .then((resposta) => {
                sessionStorage.setItem('token', resposta.data.token)
                sessionStorage.setItem('name', resposta.data.nome)
                sessionStorage.setItem('role', resposta.data.role)
                setLogin('')
                setSenha('')
                navigate('/')
            })
            .catch((erro) => {
                if (erro?.response?.data?.message) {
                    alert(erro.response.data.message)
                } else {
                    alert('Aconteceu um erro inesperado ao afetuar o seu login! Entre em contato com o suporte!')
                }

            })
    }

    return (
        <div className={styled.login__background}>
            <section className={styled.login} >
                <figure>
                    <img className={styled.login__img} src={Logo} alt="Logo da empresa e seu nome" />
                </figure>
                <div className={styled.login__block}></div>
                <form onSubmit={aoSubmeterFormular}>
                    <h2>
                        Já sou Cliente
                    </h2>
                    <AbCampoTexto
                        label="Login"
                        value={login}
                        placeholder="Entre com o seu login aqui"
                        onChange={setLogin}
                        type="text"
                    />
                    <AbCampoTexto
                        label="Senha"
                        value={senha}
                        onChange={setSenha}
                        placeholder="Entre com o sua senha aqui"
                        type="password"
                    />

                    <AbBotao texto="Entrar" />

                    <div className={styled.login__singIn__register} >
                        Ainda não tem conta? <Link to="/register">Cadastrar</Link>
                    </div>
                </form>
            </section>
        </div>)
}

export default Login;