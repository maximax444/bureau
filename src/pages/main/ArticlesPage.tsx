import { Header } from "../../components/Header"
import { Footer } from "../../components/Footer"
import Container from "../../components/Container"
import { useEffect, useState } from "react";
import { Form as MyForm } from "../../components/Form"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import { getArts } from "../../http/setupApi"
import "./articles.sass"
import { Link } from 'react-router-dom';

export function ArticlesPage() {


    const [arts, setArts] = useState([]);
    const [isError, setError] = useState(false);
    const [errorText, setErrorText] = useState("");

    const navigate = useNavigate();


    useEffect(() => {
        getAllCats();
    }, [])

    const getAllCats = async () => {
        const resp = await getArts().catch((err) => {
            setError(true)
            setErrorText(err.response.data.message)
        })
        if (resp && resp.status == 200) {
            console.log(resp.data);

            setArts(resp.data)
            setError(false)
        }
    }

    return (
        <div className="page">
            <Header />
            <Container className="login">

                <div className="articles__top">
                    <div className="articles__main">
                        <h1>Ваши статьи</h1>
                        <p className="setup__descr">Отдел общественного информирования и дезинформации  </p>
                    </div>
                    <div className="articles__btns">
                        <Link to="/categories">+ Новая категория</Link>
                        <Link to="/articles/new">+ Новая статья</Link>
                    </div>
                </div>

                <div className="articles">
                    <div className="articles__wrap">
                        <div className="articles__thead">
                            <div className="articles__thead-img">Фото</div>
                            <div className="articles__thead-name">Название</div>
                            <div className="articles__thead-cat">Категория</div>
                            <div className="articles__thead-dates">Даты</div>
                        </div>
                        <Link to="/articles" className="articles__block">
                            <div className="articles__img">
                                <img src="https://mykaleidoscope.ru/x/uploads/posts/2022-10/1666365017_1-mykaleidoscope-ru-p-krasivie-peizazhi-prirodi-oboi-3.jpg" alt="" />
                            </div>
                            <div className="articles__name">КРАСИВЫЕ ПЕЙЗАЖИ ПРИРОДЫ (59 ФОТО)</div>
                            <div className="articles__category">Основное</div>
                            <div className="articles__dates">
                                Создано: <br />
                                Изменено:
                            </div>
                        </Link>
                        {arts.map(art =>
                            <Link to={"/articles/" + art.id} className="articles__block">
                                <div className="articles__img">
                                    <img src={"http://localhost:3500/" + art?.articleImg} alt="" />
                                </div>
                                <div className="articles__name">{art.title}</div>
                                <div className="articles__category">{art?.Category?.title}</div>
                                <div className="articles__dates">
                                    Создано: {art.createdAt}<br />
                                    Изменено: {art.updatedAt}
                                </div>
                            </Link>
                        )}
                    </div>
                </div>
            </Container>
            <Footer />
        </div>
    )
}