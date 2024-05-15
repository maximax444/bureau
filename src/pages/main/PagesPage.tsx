import { Header } from "../../components/Header"
import { Footer } from "../../components/Footer"
import "./pages.sass"
import Container from "../../components/Container"
import Tree from "../../components/Tree"
import { useEffect, useState } from "react";
import { Form as MyForm } from "../../components/Form"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import { getPages, addPage } from "../../http/setupApi"

export function PagesPage() {
    const [pages, setPages] = useState([]);
    const [isError, setError] = useState(false);
    const [isAddForm, setAddForm] = useState(false);
    const [parentToAdd, setParentToAdd] = useState(-1);
    const [errorText, setErrorText] = useState("");
    
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");

    const getAllPages = async () => {
        const resp = await getPages().catch((err) => {
            setError(true)
            setErrorText(err.response.data.message)
        })
        if (resp && resp.status == 200) {
            console.log(resp.data)
            setPages(resp.data)
            setError(false)
        }
    }


    async function newPage(e: Event) {
        e.preventDefault()
        const resp = await addPage(title, slug, parentToAdd.toString()).catch((err) => {
            setError(true)
            setErrorText(err.response.data.message)
        })
        if (resp && resp.status == 200) {
            setError(false)
            setAddForm(false)
        }

    }


    useEffect(() => {
        getAllPages()
    }, [])

    return (
        <div className="page">
            <Header />
            <Container className="login">
                <h1>Страницы</h1>
                <p className="setup__descr">Смотрите, какие страницы есть на вашем сайте, добавляйте новые, редактируйте существующие, удаляйте ненужные</p>
                <div className="pages__wrap">
                    <Tree className="pages__tree" onClickPlus={
                        (parent_id: any) => {
                            console.log(parent_id);

                            setParentToAdd(parent_id)
                            setAddForm(true)
                        }
                    } items={pages} isError={isError} errorText={errorText} />
                    {isAddForm &&
                        <div className="pages__form">
                            <h2>Новая страница {(parentToAdd == -1) ? "(в корне)" : "(дочернюю)"}</h2>
                            <MyForm onSubmit={newPage}>
                                <Form.Label htmlFor="inputTitle">Название</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="inputTitle"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
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
                                <Form.Text id="slugHelpBlock" muted>
                                    Часть названия в URL (например, "about")
                                </Form.Text>
                                <Button className="setup__btn" type="submit">Отправить!</Button>
                                {isError && <div className="error">{errorText}</div>}
                            </MyForm>
                            
                        </div>
                    }
                </div>
            </Container>
            <Footer />
        </div>
    )
}