import { Header } from "../../components/Header"
import { Footer } from "../../components/Footer"
import Container from "../../components/Container"
import { useEffect, useState } from "react";
import { Form as MyForm } from "../../components/Form"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "./articles.sass";
import { Link } from 'react-router-dom';
import { addCat, getCats, updateCat, deleteCat } from "../../http/setupApi";
import { Category } from "../../model/Category";

export function CategoriesPage() {

    const [cats, setCats] = useState<Category[]>([]);
    const [isError, setError] = useState(false);
    const [isAdd, setAdd] = useState(true);
    const [errorText, setErrorText] = useState("");

    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [updateId, setUpdateId] = useState<number>();


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

    async function newCat(e: Event) {
        e.preventDefault()
        const resp = await addCat(title, slug).catch((err) => {
            setError(true)
            setErrorText(err.response.data.message)
        })
        if (resp && resp.status == 200) {
            setError(false)
            getAllCats()
        }

    }

    const rewriteCat = (id: Number, title: string, slug: string) => {
        setAdd(false)
        setUpdateId(id as number)
        setTitle(title);
        setSlug(slug);
    }

    async function updCat(e: Event) {
        e.preventDefault()
        const resp = await updateCat(updateId as number, title, slug).catch((err) => {
            setError(true)
            setErrorText(err.response.data.message)
        })
        if (resp && resp.status == 200) {
            setError(false)
            getAllCats()
            setAdd(true);
            setTitle("");
            setSlug("");
        }

    }

    const delCat = async (id: Number) => {
        const resp = await deleteCat(id).catch((err) => {
            setError(true)
            setErrorText(err.response.data.message)
        })
        if (resp && resp.status == 200) {
            setError(false)
            getAllCats()
        }
    }

    return (
        <div className="page">
            <Header />
            <Container className="login">

                <div className="articles__top">
                    <div className="articles__main">
                        <h1>Категории статей</h1>
                        <p className="setup__descr">О чём сегодня напишем?</p>
                    </div>
                    <div className="articles__btns">
                        <Link to="/articles">Список статей</Link>
                        <Link to="/articles/new">+ Новая статья</Link>
                    </div>
                </div>

                <div className="categories__wrap">
                    <div className="categories__left">
                        <h2>Категории:</h2>
                        {cats.map(cat =>
                            <div className="categories__block">
                                {cat.title}
                                <div className="categories__controls">
                                    <div className="categories__update" onClick={() => { rewriteCat(cat.id as number, cat.title, cat.slug) }}>
                                        <svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11 4H7.2C6.0799 4 5.51984 4 5.09202 4.21799C4.71569 4.40974 4.40973 4.7157 4.21799 5.09202C4 5.51985 4 6.0799 4 7.2V16.8C4 17.9201 4 18.4802 4.21799 18.908C4.40973 19.2843 4.71569 19.5903 5.09202 19.782C5.51984 20 6.0799 20 7.2 20H16.8C17.9201 20 18.4802 20 18.908 19.782C19.2843 19.5903 19.5903 19.2843 19.782 18.908C20 18.4802 20 17.9201 20 16.8V12.5M15.5 5.5L18.3284 8.32843M10.7627 10.2373L17.411 3.58902C18.192 2.80797 19.4584 2.80797 20.2394 3.58902C21.0205 4.37007 21.0205 5.6364 20.2394 6.41745L13.3774 13.2794C12.6158 14.0411 12.235 14.4219 11.8012 14.7247C11.4162 14.9936 11.0009 15.2162 10.564 15.3882C10.0717 15.582 9.54378 15.6885 8.48793 15.9016L8 16L8.04745 15.6678C8.21536 14.4925 8.29932 13.9048 8.49029 13.3561C8.65975 12.8692 8.89125 12.4063 9.17906 11.9786C9.50341 11.4966 9.92319 11.0768 10.7627 10.2373Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </div>
                                    <div className="categories__delete" onClick={() => { delCat(cat.id as number) }}>
                                        <svg width="26px" height="26px" viewBox="0 -0.5 21 21" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                <g id="Dribbble-Light-Preview" transform="translate(-179.000000, -360.000000)" fill="#000000">
                                                    <g id="icons" transform="translate(56.000000, 160.000000)">
                                                        <path d="M130.35,216 L132.45,216 L132.45,208 L130.35,208 L130.35,216 Z M134.55,216 L136.65,216 L136.65,208 L134.55,208 L134.55,216 Z M128.25,218 L138.75,218 L138.75,206 L128.25,206 L128.25,218 Z M130.35,204 L136.65,204 L136.65,202 L130.35,202 L130.35,204 Z M138.75,204 L138.75,200 L128.25,200 L128.25,204 L123,204 L123,206 L126.15,206 L126.15,220 L140.85,220 L140.85,206 L144,206 L144,204 L138.75,204 Z" id="delete-[#1487]">

                                                        </path>
                                                    </g>
                                                </g>
                                            </g>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        )}
                        {!isAdd &&
                            <div className="categories__add" onClick={() => {
                                setAdd(true);
                                setTitle("");
                                setSlug("");
                            }}>
                                + Новая категория
                            </div>
                        }
                    </div>
                    <div className="categories__form">
                        <h2>{isAdd ? "Новая категория" : "Обновление категории"}</h2>
                        {isAdd &&
                            <MyForm onSubmit={newCat}>
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
                        }
                        {!isAdd &&
                            <MyForm onSubmit={updCat}>
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
                        }
                    </div>
                </div>
            </Container>
            <Footer />
        </div>
    )
}