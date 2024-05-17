import { Header } from "../../components/Header"
import { Footer } from "../../components/Footer"
import Container from "../../components/Container"
import "./main.sass"
import { Form as MyForm } from "../../components/Form"
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from "react"
import { Settings, numberMap } from "../../model/Settings"
import { getSets, updateSets } from "../../http/setupApi"
import { Link } from 'react-router-dom';

export function SettingsPage() {
    const [sets, setSets] = useState<numberMap>({});
    const [btnText, setBtnText] = useState("Измените настройки для сохранения");

    useEffect(() => {
        getAllSets();
    }, [])
    useEffect(() => {
        console.log(sets);

    }, [sets])

    const getAllSets = async () => {
        const resp = await getSets().catch((err) => {
            console.log(err);

        })
        if (resp && resp.status == 200) {
            let initSets: numberMap = {};
            resp.data.forEach((el: Settings) => {
                initSets[el.id as number] = el;
            });
            console.log(initSets);
            setSets(initSets)
        }
    }

    const handleUpdate = async (e: Event) => {
        e.preventDefault();
        const resp = await updateSets(sets).catch((err) => {
            console.log(err);

        })
        console.log(resp)
        if (resp && resp.status == 200) {
            setBtnText("Обновлено!")
            setTimeout(() => {
                setBtnText("Измените настройки для сохранения")
            }, 2000)
        }
    }

    return (
        <div className="page">
            <Header />
            <Container className="login">
                <div className="articles__top">
                    <div className="articles__main">
                        <h1>Настройки</h1>
                        <p className="setup__descr">Будьте осторожны, тут опасно</p>
                    </div>
                    <div className="articles__btns">
                        <Link to="/settings/new">Добавить новую настройку</Link>
                        <a href="" onClick={(e) => { handleUpdate(e as any) }}>{btnText}</a>
                    </div>
                </div>
                <div className="articles">
                    <MyForm>
                        {Object.entries(sets).map(([key, value]) =>
                            <div className="settings__block">
                                <Form.Label>{value.title} -- ({value.slug})</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={value.val}
                                    onChange={(e) => {
                                        setBtnText("Сохранить")
                                        setSets({
                                            ...sets, [key]: {
                                                id: value.id,
                                                title: value.title,
                                                descr: value.descr,
                                                slug: value.slug,
                                                createdAt: value.createdAt,
                                                updatedAt: value.updatedAt,
                                                val: e.target.value
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