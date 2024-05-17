import { Header } from "../../components/Header"
import { Footer } from "../../components/Footer"
import { Editor } from "../../components/Editor"
import Container from "../../components/Container"
import { Form as MyForm } from "../../components/Form"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useEffect, useState, useRef } from "react";
import { updateArt, getSingleArt, getCats } from "../../http/setupApi"
import "./articles.sass"
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Article } from "../../model/Articles";
import HTMLReactParser from "html-react-parser";
import { Category } from "../../model/Category"

export function UpdateArticlePage() {
    const [cats, setCats] = useState<Category[]>();
    const { articleId } = useParams();


    const [art, setArt] = useState<Article>();
    const [isError, setError] = useState(false);
    const [errorText, setErrorText] = useState("");

    const navigate = useNavigate();
    const editor = useRef(null)

    const [title, setTitle] = useState("");
    const [descr, setDescr] = useState("");
    const [slug, setSlug] = useState("");
    const [file, setFile] = useState("");
    const [cat, setCat] = useState("");
    const [fileName, setFileName] = useState("");
    const [content, setContent] = useState("")

    useEffect(() => {
        getArticle(articleId as any);
        getAllCats();
    }, [])
    useEffect(() => {

        setTitle(art?.title as string)
        setDescr(art?.descr as string)
        setCat(art?.Category?.id as any)
        setSlug(art?.slug as string)
        setContent(art?.text as string)
    }, [art])
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
    const getArticle = async (articletId: Number) => {
        const resp = await getSingleArt(articletId).catch((err) => {
            console.log(err);

        })
        if (resp && resp.status == 200) {

            setArt(resp.data)
        }
    }

    const handleSave = async (e: Event) => {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append("id", articleId as string)
        if (file) {
            formdata.append("file", file)
        }
        formdata.append("title", title)
        formdata.append("descr", descr)
        formdata.append("slug", slug)
        formdata.append("text", content)
        formdata.append("category_id", cat as any)
        const resp = await updateArt(formdata).catch((err) => {
            setError(true)
            setErrorText(err.response.data.message)
        })
        if (resp && resp.status == 200) {
            setError(false)
            navigate("/articles/" + articleId)
        }
        // const resp = await updateArt(Number(articleId)).catch((err) => {
        //     console.log(err);

        // })
        // if (resp && resp.status == 200) {
        //     navigate("/articles")
        // }
    }

    return (
        <div className="page">
            <Header />
            <Container className="login">

                <div className="articles__top">
                    <div className="articles__main">
                        <h1>{art?.title}</h1>
                    </div>
                    <div className="articles__btns">

                        <Link to={"/articles/" + articleId}>Вернуться к статье</Link>
                        <a href="" onClick={(e) => { handleSave(e as any) }}>Сохранить изменения</a>
                    </div>
                </div>
                <div className="articles">
                    <MyForm>
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
                            {cats && cats.map(cat =>
                                <option value={cat.id}>{cat.title}</option>
                            )}
                        </Form.Select>
                        <br />
                        <Form.Label htmlFor="inputImg">Image</Form.Label>
                        <Form.Control
                            type="file"
                            id="inputImg"
                            value={fileName}
                            onChange={(e) => {
                                setFile((e.target as any)?.files[0])
                                setFileName(e.target.value)
                            }}
                            required
                        />
                        <br />

                        {isError && <div className="error">{errorText}</div>}
                    </MyForm>

                </div>
                <Form.Label>Текст</Form.Label>
                <Editor editor={editor} content={content} onChange={(newContent) => {
                    setContent(newContent)
                    console.log(content);

                }} />

            </Container>
            <Footer />
        </div>
    )
}