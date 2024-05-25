import { Header } from "../../components/Header"
import { Footer } from "../../components/Footer"
import Container from "../../components/Container"
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { getSinglePage, updatePage, deletePage, getBlocks } from "../../http/setupApi";
import { Form as MyForm } from "../../components/Form"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Page } from "../../model/Page";
import { Block } from "../../model/Block";


export function SinglePagePage() {
    const { pageId } = useParams();


    const [page, setPage] = useState<Page>();
    const [isError, setError] = useState(false);
    const [errorText, setErrorText] = useState("");

    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const navigate = useNavigate();
    const [blocks, setBlocks] = useState<Block[]>();
    const [currBlocks, setCurrBlocks] = useState<Block[]>([]);

    useEffect(() => {
        getPage();
        getPageBlocks();
    }, []);

    useEffect(() => {
        console.log(currBlocks);

    }, [currBlocks]);
    useEffect(() => {
        setTitle(page?.title as string);
        setSlug(page?.slug as string);
    }, [page]);

    useEffect(() => {
        if (page?.blocks && blocks) {
            let arr = page?.blocks?.split(",");
            let cb: Block[] = [];

            for (const currId of arr) {
                for (const newId of blocks) {
                    if (newId.id?.toString() == currId) {
                        cb.push(newId);
                    }
                }
                
            }

            if (cb && cb.length > 0) {
                setCurrBlocks(cb as any);
            }

        }
    }, [page, blocks]);


    const getPage = async () => {
        const resp = await getSinglePage(Number(pageId)).catch((err) => {
            console.log(err);

        })
        if (resp && resp.status == 200) {
            console.log(resp.data);

            setPage(resp.data)
        }
    }

    const getPageBlocks = async () => {
        const resp = await getBlocks().catch((err) => {
            console.log(err);

        })
        if (resp && resp.status == 200) {
            console.log(resp.data);

            setBlocks(resp.data)
        }
    }

    async function handleUpdate(e: Event) {
        e.preventDefault()
        const resp = await updatePage(Number(pageId), title, slug, currBlocks).catch((err) => {
            setError(true)
            setErrorText(err.response.data.message)
        })
        if (resp && resp.status == 200) {
            setError(false)
            navigate("/pages")
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

    const blockBack = (block: Block) => {
        let cb = currBlocks;
        console.log(cb);

        let cbNew: Block[] = []
        for (const bl of cb) {
            if (block != bl) {
                cbNew.push(bl)
            }
        }
        console.log(cbNew);
        setCurrBlocks(cbNew);
    }

    const blockAdd = (block: Block) => {
        const cb = [...currBlocks];

        if (cb && !cb.includes(block)) {
            cb.push(block);
            setCurrBlocks(cb);
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
                        />
                        <br />
                        <Form.Label htmlFor="inputBlocks">Блоки</Form.Label>
                        <div className="blocks__wrap">
                            <div className="blocks__all">
                                Все
                                {blocks?.map(block =>
                                    <div className="blocks__block" onClick={() => { blockAdd(block) }}>
                                        {block.title}
                                    </div>
                                )}
                            </div>
                            <div className="blocks__curr">
                                Выбранные
                                {currBlocks?.map(block2 =>
                                    <div className="blocks__checked">
                                        {block2.title}

                                        <div className="blocks__remove" onClick={() => { blockBack(block2) }}>
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
                                )}
                            </div>
                        </div>
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