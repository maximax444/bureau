import { Header } from "../../components/Header"
import { Footer } from "../../components/Footer"
import Container from "../../components/Container"
import "./login.sass"
import { useState } from "react";
import { Form as MyForm } from "../../components/Form"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import { login } from "../../http/setupApi"

export function LoginPage() {
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [isError, setError] = useState(false);

    const navigate = useNavigate();

    async function loginForm(e: Event) {
        e.preventDefault()
        const resp = await login(user, pass).catch((err) => {
            console.log(err)
        })
        if (resp && resp.status == 200) {
            setError(false)
            localStorage.setItem("token", resp.data)
            navigate("/")
        } else {
            setError(true)
        }

    }

    return (
        <div className="page">
            <Header />
            <Container className="login">
                <h1>Вход в Бюро</h1>
                <p className="setup__descr">Вас ожидают...</p>
                <MyForm onSubmit={loginForm}>
                    <Form.Label htmlFor="inputUser">Email (логин)</Form.Label>
                    <Form.Control
                        type="email"
                        id="inputUser"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        required
                    />
                    <br />
                    <Form.Label htmlFor="inputPass">Пароль</Form.Label>
                    <Form.Control
                        type="password"
                        id="inputPass"
                        value={pass}
                        pattern=".{8,}"
                        onChange={(e) => setPass(e.target.value)}
                        aria-describedby="passHelpBlock"
                        required
                    />
                    <Form.Text id="passHelpBlock" muted>
                        От 8 символов
                    </Form.Text>
                    <Button className="setup__btn" type="submit">Отправить!</Button>
                    {isError && <div className="error">Проверьте логин и пароль, данные неверны</div>}
                </MyForm>
            </Container>
            <Footer />
        </div>
    )
}