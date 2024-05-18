import { Header } from "../../components/Header"
import { Footer } from "../../components/Footer"
import Container from "../../components/Container"
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from "react";
import { getSingleBlock, updateBlock, deleteBlock, getFieldsBlock, updateFieldsBlock } from "../../http/setupApi";
import { Form as MyForm } from "../../components/Form"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Block } from "../../model/Block";
import { Editor } from "../../components/Editor";
import { FieldsValues, fvMap } from "../../model/Field";


export function SingleBlocksPage() {
    const { blockId } = useParams();


    const [block, setBlock] = useState<Block>();
    const [fields, setFields] = useState<fvMap>();
    const [isError, setError] = useState(false);
    const [errorText, setErrorText] = useState("");

    const [title, setTitle] = useState("");
    const [descr, setDescr] = useState("");
    const [slug, setSlug] = useState("");
    const navigate = useNavigate();
    const editor = useRef(null)
    const [content, setContent] = useState("")
    const [frontend, setFrontend] = useState("")

    useEffect(() => {
        getBlock();
        getCurrFields();
    }, []);

    useEffect(() => {
        setTitle(block?.title as string);
        setDescr(block?.descr as string);
        setSlug(block?.slug as string);
        setContent(block?.content as string);
        setFrontend(block?.frontend as string);
    }, [block]);

    const getBlock = async () => {
        const resp = await getSingleBlock(Number(blockId)).catch((err) => {
            console.log(err);

        })
        if (resp && resp.status == 200) {
            console.log(resp.data);

            setBlock(resp.data)
        }
    }
    const getCurrFields = async () => {
        const resp = await getFieldsBlock(Number(blockId)).catch((err) => {
            console.log(err);

        })
        if (resp && resp.status == 200) {
            let initSets: fvMap = {};
            resp.data.forEach((el: FieldsValues) => {
                initSets[el.id as number] = el;
            });
            console.log(resp.data);

            setFields(initSets)
        }
    }

    async function handleUpdate(e: Event) {
        e.preventDefault()
        const resp = await updateBlock(Number(blockId), title, descr, slug, content).catch((err) => {
            setError(true)
            setErrorText(err.response.data.message)
        })
        if (resp && resp.status == 200) {
            setError(false)
            navigate("/blocks")
        }

    }
    async function handleUpdateFields(e: Event) {
        e.preventDefault()
        const resp = await updateFieldsBlock(fields!).catch((err) => {
            setError(true)
            setErrorText(err.response.data.message)
        })
        if (resp && resp.status == 200) {
            setError(false)
            navigate("/blocks")
        }

    }
    async function handleDelete(e: Event) {
        e.preventDefault()
        const resp = await deleteBlock(Number(blockId)).catch((err) => {
            console.log(err);

        })
        if (resp && resp.status == 200) {
            navigate("/blocks")
        }

    }

    return (
        <div className="page">
            <Header />
            <Container className="login">
                <div className="articles__top">
                    <div className="articles__main">
                        <h1>Редактирование блока: {title}</h1>
                        <p className="setup__descr">Здесь вы заполняете только информацию о поле, значения будут заполнены в блоках</p>
                    </div>
                    <div className="articles__btns">
                        <Link to="/blocks">Вернуться к блокам</Link>
                        <a href="" onClick={(e) => { handleDelete(e as any) }}>Удалить блок</a>
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
                        <Form.Label>Текст</Form.Label>
                        <Editor editor={editor} content={content} onChange={(newContent) => {
                            setContent(newContent)
                        }} />
                        <br />
                        <Button className="setup__btn" type="submit">Изменить</Button>
                        {isError && <div className="error">{errorText}</div>}
                    </MyForm>
                </div>
                <br /><br /><br /><br />
                <div className="articles__top">
                    <div className="articles__main">
                        <h1>Поля блока</h1>
                        <p className="setup__descr">Поля, которые вы добавили в тело блока</p>
                    </div>
                    <div className="articles__btns">
                        <a href="" onClick={(e) => { handleUpdateFields(e as any) }}>Обновить значения полей</a>
                    </div>
                </div>

                <div className="articles">
                    {!fields &&
                        <div className="error">Вы не добавили полей</div>
                    }
                    <MyForm>
                        {fields && Object.entries(fields).map(([key, value]) =>
                            <div className="settings__block">
                                <Form.Label>{value.title} -- ({value.slug})</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={value.value}
                                    onChange={(e) => {
                                        setFields({
                                            ...fields, [key]: {
                                                id: value.id,
                                                blockId: value.blockId,
                                                fieldId: value.fieldId,
                                                title: value.title,
                                                descr: value.descr,
                                                slug: value.slug,
                                                createdAt: value.createdAt,
                                                updatedAt: value.updatedAt,
                                                value: e.target.value
                                            }
                                        })
                                    }}
                                    required
                                />
                                <Form.Text muted>
                                    {value.descr}
                                </Form.Text>
                                <br /><br />
                            </div>
                        )}

                    </MyForm>
                </div>
            </Container>
            <Footer />
        </div>
    )
}