import { Header } from "../../components/Header"
import { Footer } from "../../components/Footer"
import Container from "../../components/Container"
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { getFields } from "../../http/setupApi";
import { Field } from "../../model/Field";


export function FieldsPage() {

    const [fields, setFields] = useState<Field[]>([]);

    useEffect(() => {
        getAllFields();
    }, [])

    const getAllFields = async () => {
        const resp = await getFields().catch((err) => {
            console.log(err);

        })
        if (resp && resp.status == 200) {
            setFields(resp.data)
        }
    }

    return (
        <div className="page">
            <Header />
            <Container className="login">
                <div className="articles__top">
                    <div className="articles__main">
                        <h1>Поля</h1>
                        <p className="setup__descr">Ниже вы видете кастомные поля, которые есть на вашем сайте, создавайте новые и добавляйте в блоки</p>
                    </div>
                    <div className="articles__btns">
                        <Link to="/fields/new">Добавить новое поле</Link>
                    </div>
                </div>
                <div className="fields">
                    {fields.map(field =>
                        <Link to={"/fields/" + field.id} className="fields__block">
                            <div className="fields__left">
                                {field.title} <br />
                                {field.descr}
                            </div>
                            <div className="fields__slug">Slug: {field.slug}</div>
                        </Link>
                    )}
                </div>
            </Container>
            <Footer />
        </div>
    )
}