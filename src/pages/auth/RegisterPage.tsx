import { Header } from "../../components/Header"
import { Footer } from "../../components/Footer"
import Container from "../../components/Container"
import { Form as MyForm } from "../../components/Form"
import Form from 'react-bootstrap/Form';
import "./register.sass"
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { register } from "../../http/setupApi"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function RegisterPage() {
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [pass2, setPass2] = useState("");
    const [isNotValid, setNotValid] = useState(false);

    const navigate = useNavigate();

    async function registerForm(e: Event) {
        e.preventDefault()
        if (pass != pass2) {
            setNotValid(true)
            return
        } else {
            setNotValid(false)
        }
        const resp = await register(name, lastname, user, pass).catch((err) => {
            console.log(err)
        })
        if (resp && resp.status == 200) {
            navigate("/login")
        }

    }
    return (
        <div className="page">
            <Header />
            <Container className="setup">
                <h1>Данные для входа администратора</h1>
                <p className="setup__descr">
                    А теперь познакомимся - зарегистрируем директора!
                </p>
                <MyForm onSubmit={registerForm}>
                    <Form.Label htmlFor="inputName">Имя</Form.Label>
                    <Form.Control
                        type="text"
                        id="inputName"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        aria-describedby="nameHelpBlock"
                        required
                    />
                    <Form.Text id="nameHelpBlock" muted>
                        Как нам вас называть?
                    </Form.Text>
                    <br />
                    <br />
                    <Form.Label htmlFor="inputName2">Фамилия</Form.Label>
                    <Form.Control
                        type="text"
                        id="inputName2"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        aria-describedby="name2HelpBlock"
                        required
                    />
                    <Form.Text id="name2HelpBlock" muted>
                        Как нам вас называть в сложных ситуациях?
                    </Form.Text>
                    <br />
                    <br />
                    <Form.Label htmlFor="inputUser">Email (логин)</Form.Label>
                    <Form.Control
                        type="email"
                        id="inputUser"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        aria-describedby="userHelpBlock"
                        required
                    />
                    <Form.Text id="userHelpBlock" muted>
                        Будет использоваться для входа
                    </Form.Text>
                    <br />
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
                        Пароль пользователя
                    </Form.Text>
                    <br />
                    <br />
                    <Form.Label htmlFor="inputPass2">Повторите пароль</Form.Label>
                    <Form.Control
                        type="password"
                        id="inputPass2"
                        value={pass2}
                        pattern=".{8,}"
                        onChange={(e) => setPass2(e.target.value)}
                        aria-describedby="pass2HelpBlock"
                        required
                    />
                    <Form.Text id="pass2HelpBlock" muted>
                        И мы будем уверены, что вы ввели всё правильно!
                    </Form.Text>

                    {isNotValid &&
                        <div className="error">Пароли не совпадают</div>
                    }
                    <Button className="setup__btn" type="submit">Отправить!</Button>
                </MyForm>
            </Container>
            <Footer />
        </div>
    )
}