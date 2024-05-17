import Container from "../../components/Container"
import { useState } from "react";
import { Form as MyForm } from "../../components/Form"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import { addSet } from "../../http/setupApi"
import { SmallHeader } from "../../components/SmallHeader";
import { SmallFooter } from "../../components/SmallFooter";

export function AddSettingsPage() {
    const [isError, setError] = useState(false);
    const [errorText, setErrorText] = useState("");

    const [title, setTitle] = useState("");
    const [descr, setDescr] = useState("");
    const [slug, setSlug] = useState("");
    const [val, setVal] = useState("");
    const navigate = useNavigate();

    async function handleAdd(e: Event) {
        e.preventDefault()
        const resp = await addSet(title, descr, slug,val).catch((err) => {
            setError(true)
            setErrorText(err.response.data.message)
        })
        if (resp && resp.status == 200) {
            setError(false)
            navigate("/settings")
        }

    }

    return (
        <div className="page">
            <SmallHeader />
            <Container className="login">
                <h1>Добавление настройки</h1>
                <p className="setup__descr">Хорошее это дело</p>
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
                    <Form.Label htmlFor="inputVal">Значение</Form.Label>
                    <Form.Control
                        type="text"
                        id="inputVal"
                        value={val}
                        onChange={(e) => setVal(e.target.value)}
                        required
                    />
                    <br />
                    <Button className="setup__btn" type="submit">Отправить!</Button>
                    {isError && <div className="error">{errorText}</div>}
                </MyForm>
            </Container>
            <SmallFooter />
        </div>
    )
}