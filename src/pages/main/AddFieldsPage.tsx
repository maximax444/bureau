import { Header } from "../../components/Header"
import { Footer } from "../../components/Footer"
import Container from "../../components/Container"
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import { addField } from "../../http/setupApi";
import { Form as MyForm } from "../../components/Form"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


export function AddFieldsPage() {
    const [isError, setError] = useState(false);
    const [errorText, setErrorText] = useState("");

    const [title, setTitle] = useState("");
    const [descr, setDescr] = useState("");
    const [slug, setSlug] = useState("");
    const navigate = useNavigate();

    async function handleAdd(e: Event) {
        e.preventDefault()
        const resp = await addField(title, descr, slug).catch((err) => {
            setError(true)
            setErrorText(err.response.data.message)
        })
        if (resp && resp.status == 200) {
            setError(false)
            navigate("/fields")
        }

    }

    return (
        <div className="page">
            <Header />
            <Container className="login">
                <div className="articles__top">
                    <div className="articles__main">
                        <h1>Добавить поле</h1>
                        <p className="setup__descr">Здесь вы заполняете только информацию о поле, значения будут заполнены в блоках</p>
                    </div>
                    <div className="articles__btns">
                        <Link to="/fields">Вернуться к полям</Link>
                    </div>
                </div>
                <div className="articles">
                    <MyForm onSubmit={handleAdd}>
                        <Form.Label htmlFor="inputTitle">Название</Form.Label>
                        <Form.Control
                            type="text"
                            id="inputTitle"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                        <br />
                        <Form.Label htmlFor="inputDescr">Краткое описание</Form.Label>
                        <Form.Control
                            type="text"
                            id="inputDescr"
                            value={descr}
                            onChange={(e) => setDescr(e.target.value)}
                            required
                        />
                        <br />
                        <Form.Label htmlFor="inputSlug">Slug</Form.Label>
                        <Form.Control
                            type="text"
                            id="inputSlug"
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                            aria-describedby="slugHelpBlock"
                            required
                        />
                        <br />
                        <Button className="setup__btn" type="submit">Отправить!</Button>
                        {isError && <div className="error">{errorText}</div>}
                    </MyForm>
                </div>
            </Container>
            <Footer />
        </div>
    )
}