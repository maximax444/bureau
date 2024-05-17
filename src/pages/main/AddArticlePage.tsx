import { Header } from "../../components/Header"
import { Footer } from "../../components/Footer"
import Container from "../../components/Container"
import { useEffect, useState } from "react";
import { Form as MyForm } from "../../components/Form"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import { getCats, addArt } from "../../http/setupApi"
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import "./articles.sass"
import { Link } from 'react-router-dom';

export function AddArticlePage() {
    const [cats, setCats] = useState([]);
    const [cat, setCat] = useState();
    const [isError, setError] = useState(false);
    const [errorText, setErrorText] = useState("");

    const [title, setTitle] = useState("");
    const [descr, setDescr] = useState("");
    const [slug, setSlug] = useState("");
    const [file, setFile] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        getAllCats();
    }, [])

    const getAllCats = async () => {
        const resp = await getCats().catch((err) => {
            setError(true)
            setErrorText(err.response.data.message)
        })
        if (resp && resp.status == 200) {
            setCats(resp.data)
            setError(false)
        }
    }

    async function newArt(e: Event) {
        e.preventDefault()
        const formdata = new FormData();
        formdata.append("file", file)
        formdata.append("title", title)
        formdata.append("descr", descr)
        formdata.append("category_id", cat as any)
        const resp = await addArt(formdata).catch((err) => {
            setError(true)
            setErrorText(err.response.data.message)
        })
        if (resp && resp.status == 200) {
            setError(false)
            navigate("/articles")
        }

    }

    return (
        <div className="page">
            <Header />
            <Container className="login">

                <div className="articles__top">
                    <div className="articles__main">
                        <h1>Новая статья</h1>
                        <p className="setup__descr">Вы движетесь в правильном направлении</p>
                    </div>
                    <div className="articles__btns">
                        <Link to="/categories">Все категории</Link>
                        <Link to="/articles">Все статьи</Link>
                    </div>
                </div>

                <div className="articles">
                    <MyForm onSubmit={newArt}>
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
                        <Form.Label htmlFor="inputSlug">Категория</Form.Label>
                        <Form.Select onChange={(e) => {
                            setCat(e.target.value as any)
                        }}>
                            <option value="-1">Без категории</option>
                            {cats.map(cat =>
                                <option value={cat.id}>{cat.title}</option>
                            )}
                        </Form.Select>
                        <br />
                        <Form.Label htmlFor="inputImg">Image</Form.Label>
                        <Form.Control
                            type="file"
                            id="inputImg"
                            value={file.filename}
                            onChange={(e) => setFile((e.target as HTMLInputElement)?.files[0])}
                            required
                        />

                        <Button className="setup__btn" type="submit">Отправить!</Button>
                        {isError && <div className="error">{errorText}</div>}
                    </MyForm>

                </div>
            </Container>
            <Footer />
        </div>
    )
}