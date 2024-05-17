import { Header } from "../../components/Header"
import { Footer } from "../../components/Footer"
import Container from "../../components/Container"
import { useEffect, useState, useRef } from "react";
import { getSingleArt } from "../../http/setupApi"
import "./articles.sass"
import { Link, useParams } from 'react-router-dom';
import JoditEditor from "jodit-react";
import { Article } from "../../model/Articles";

export function SingleArticlePage() {
    const { articleId } = useParams();


    const [art, setArt] = useState<Article>();


    const editor = useRef(null)
    const [content, setContent] = useState("")

    useEffect(() => {
        getArticle(articleId as any);
    }, [])

    const getArticle = async (articletId: Number) => {
        const resp = await getSingleArt(articletId).catch((err) => {
            console.log(err);
            
        })
        if (resp && resp.status == 200) {
            console.log(resp.data);

            setArt(resp.data)
        }
    }

    return (
        <div className="page">
            <Header />
            <Container className="login">

                <div className="articles__top">
                    <div className="articles__main">
                        <h1>{art?.title}</h1>
                        <p className="setup__descr">{art?.descr} </p>
                    </div>
                    <div className="articles__btns">

                        <Link to="/articles">Вернуться в статьи</Link>
                        <a href="">Удалить статью</a>
                        <a href="">Сохранить изменения</a>
                    </div>
                </div>
                <div className="article__img">
                    <img src={"http://localhost:3500/" + art?.articleImg} alt="" />
                </div>
                <JoditEditor ref={editor} value={content} onChange={newContent => {
                    setContent(newContent)
                    console.log(content);

                }} />

            </Container>
            <Footer />
        </div>
    )
}