import { Header } from "../../components/Header"
import { Footer } from "../../components/Footer"
import Container from "../../components/Container"
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { getSingleField, updateField, deleteField } from "../../http/setupApi";
import { Form as MyForm } from "../../components/Form"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Field } from "../../model/Field";


export function SingleFieldsPage() {
    const { fieldId } = useParams();


    const [field, setField] = useState<Field>();
    const [isError, setError] = useState(false);
    const [errorText, setErrorText] = useState("");

    const [title, setTitle] = useState("");
    const [descr, setDescr] = useState("");
    const [slug, setSlug] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getField();
    }, []);

    useEffect(() => {
        setTitle(field?.title as string);
        setDescr(field?.descr as string);
        setSlug(field?.slug as string);
    }, [field]);

    const getField = async () => {
        const resp = await getSingleField(Number(fieldId)).catch((err) => {
            console.log(err);

        })
        if (resp && resp.status == 200) {
            console.log(resp.data);

            setField(resp.data)
        }
    }

    async function handleUpdate(e: Event) {
        e.preventDefault()
        const resp = await updateField(Number(fieldId), title, descr, slug).catch((err) => {
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
        const resp = await deleteField(Number(fieldId)).catch((err) => {
            console.log(err);

        })
        if (resp && resp.status == 200) {
            navigate("/fields")
        }

    }

    return (
        <div className="page">
            <Header />
            <Container className="login">
                <div className="articles__top">
                    <div className="articles__main">
                        <h1>Редактирование поля: {title}</h1>
                        <p className="setup__descr">Здесь вы заполняете только информацию о поле, значения будут заполнены в блоках</p>
                    </div>
                    <div className="articles__btns">
                        <Link to="/fields">Вернуться к полям</Link>
                        <a href="" onClick={(e) => { handleDelete(e as any) }}>Удалить поле</a>
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
                        <Button className="setup__btn" type="submit">Изменить</Button>
                        {isError && <div className="error">{errorText}</div>}
                    </MyForm>
                </div>
            </Container>
            <Footer />
        </div>
    )
}