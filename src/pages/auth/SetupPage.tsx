import Container from "../../components/Container"
import { Form as MyForm } from "../../components/Form"
import Form from 'react-bootstrap/Form';
import "./setup.sass"
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { setup } from "../../http/setupApi"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SmallFooter } from "../../components/SmallFooter";
import { SmallHeader } from "../../components/SmallHeader";

export function SetupPage() {
    const [server, setServer] = useState("localhost");
    const [db, setDb] = useState("");
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");

    const navigate = useNavigate();

    async function setupForm(e: Event) {
        e.preventDefault()
        const resp = await setup(server, db, user, pass).catch((err) => {
            console.log(err)
        })
        if (resp && resp.status == 200) {
            navigate("/register")
        }

    }
    return (
        <div className="page">
            <SmallHeader />
            <Container className="setup">
                <h1>Установка Бюро</h1>
                <p className="setup__descr">
                    Давайте подключимся к вашей базе данных, введите в форме ниже информацию для её подключения и мы проверим доступность!
                </p>
                <MyForm onSubmit={setupForm}>
                    <Form.Label htmlFor="inputServer">Сервер</Form.Label>
                    <Form.Control
                        type="text"
                        id="inputServer"
                        value={server}
                        onChange={(e) => setServer(e.target.value)}
                        aria-describedby="serverHelpBlock"
                        required
                    />
                    <Form.Text id="serverHelpBlock" muted>
                        Если localhost не работает, узнайте правильный адрес в службе поддержки хостинг-провайдера
                    </Form.Text>
                    <br />
                    <br />

                    <Form.Label htmlFor="inputDb">База данных</Form.Label>
                    <Form.Control
                        type="text"
                        id="inputDb"
                        value={db}
                        onChange={(e) => setDb(e.target.value)}
                        aria-describedby="dbHelpBlock"
                        required
                    />
                    <Form.Text id="dbHelpBlock" muted>
                        Имя базы данных, в которую будет усновлена система
                    </Form.Text>
                    <br />
                    <br />
                    <Form.Label htmlFor="inputUser">Пользователь базы данных</Form.Label>
                    <Form.Control
                        type="text"
                        id="inputUser"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        aria-describedby="userHelpBlock"
                        required
                    />
                    <Form.Text id="userHelpBlock" muted>
                        Имя пользователя базы данных
                    </Form.Text>
                    <br />
                    <br />
                    <Form.Label htmlFor="inputPass">Пароль</Form.Label>
                    <Form.Control
                        type="password"
                        id="inputPass"
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        aria-describedby="passHelpBlock"
                    />
                    <Form.Text id="passHelpBlock" muted>
                        Пароль пользователя базы данных
                    </Form.Text>
                    <Button className="setup__btn" type="submit">Отправить!</Button>
                </MyForm>
            </Container>
            <SmallFooter />
        </div>
    )
}