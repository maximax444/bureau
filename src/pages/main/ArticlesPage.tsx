import { Header } from "../../components/Header"
import { Footer } from "../../components/Footer"
import Container from "../../components/Container"
import { useEffect, useState } from "react";
import { getArts } from "../../http/setupApi"
import "./articles.sass"
import { Link } from 'react-router-dom';
import { Article } from "../../model/Articles";

export function ArticlesPage() {


    const [arts, setArts] = useState<Article[]>();


    useEffect(() => {
        getAllCats();
    }, [])

    const getAllCats = async () => {
        const resp = await getArts().catch((err) => {
            console.log(err);
            
        })
        if (resp && resp.status == 200) {
            console.log(resp.data);

            setArts(resp.data)
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
                        {arts && arts.map(art =>
                            <Link to={"/articles/" + art.id} className="articles__block">
                                <div className="articles__img">
                                    <img src={"http://localhost:3500/" + art?.articleImg} alt="" />
                                </div>
                                <div className="articles__name">{art.title}</div>
                                <div className="articles__category">{art?.Category?.title}</div>
                                <div className="articles__dates">
                                    Создано: <br />{art?.createdAt}<br />
                                    Изменено: <br />{art?.updatedAt}
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