import { Header } from "../../components/Header"
import { Footer } from "../../components/Footer"
import Container from "../../components/Container"
import { useState } from "react";
import { Form as MyForm } from "../../components/Form"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import { login } from "../../http/setupApi"

export function MainPage() {
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [isError, setError] = useState(false);
    const [errorText, setErrorText] = useState("");

    const navigate = useNavigate();

    async function loginForm(e: Event) {
        e.preventDefault()
        const resp = await login(user, pass).catch((err) => {
            setError(true)
            setErrorText(err.response.data.message)
        })
        if (resp && resp.status == 200) {
            setError(false)
            localStorage.setItem("token", resp.data)
            navigate("/")
        }

    }

    return (
        <div className="page">
            <Header />
            <Container className="login">
                <h1>Добро пожаловать в Бюро</h1>
                <p className="setup__descr">Предлагаем вам ознакомиться с разделами</p>
                
            </Container>
            <Footer />
        </div>
    )
}