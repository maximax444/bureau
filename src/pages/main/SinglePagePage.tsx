import { Header } from "../../components/Header"
import { Footer } from "../../components/Footer"
import Container from "../../components/Container"
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { getSingleField, updateField, deleteField, getSinglePage, updatePage, deletePage } from "../../http/setupApi";
import { Form as MyForm } from "../../components/Form"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Field } from "../../model/Field";
import { Page } from "../../model/Page";


export function SinglePagePage() {
    const { pageId } = useParams();


    const [page, setPage] = useState<Page>();
    const [isError, setError] = useState(false);
    const [errorText, setErrorText] = useState("");

    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getPage();
    }, []);

    useEffect(() => {
        setTitle(page?.title as string);
        setSlug(page?.slug as string);
    }, [page]);

    const getPage = async () => {
        const resp = await getSinglePage(Number(pageId)).catch((err) => {
            console.log(err);

        })
        if (resp && resp.status == 200) {
            console.log(resp.data);

            setPage(resp.data)
        }
    }

    async function handleUpdate(e: Event) {
        e.preventDefault()
        const resp = await updatePage(Number(pageId), title, slug).catch((err) => {
            setError(true)
            setErrorText(err.response.data.message)
        })
        if (resp && resp.status == 200) {
            setError(false)
            navigate("/fields")
        }

    }
    async function handleDelete(e: Event) {
        e.preventDefault()
        const resp = await deletePage(Number(pageId)).catch((err) => {
            console.log(err);

        })
        if (resp && resp.status == 200) {
            navigate("/pages")
        }

    }

    return (
        <div className="page">
            <Header />
            <Container className="login">
                <div className="articles__top">
                    <div className="articles__main">
                        <h1>Страница: {title}</h1>
                        <p className="setup__descr">Здесь вы собираете страницу из блоков</p>
                    </div>
                    <div className="articles__btns">
                        <Link to="/pages">Вернуться к страницам</Link>
                        <a href="" onClick={(e) => { handleDelete(e as any) }}>Удалить страницу</a>
                    </div>
                </div>
                <div className="articles">
                    <MyForm onSubmit={handleUpdate}>
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
                        <br />
                        <Button className="setup__btn" type="submit">Изменить</Button>
                        {isError && <div className="error">{errorText}</div>}
                    </MyForm>
                </div>
            </Container>
            <Footer />
        </div>
    )
}