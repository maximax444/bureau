import { Header } from "../../components/Header"
import { Footer } from "../../components/Footer"
//import { Editor } from "../../components/Editor"
import Container from "../../components/Container"
import { useEffect, useState } from "react";
import { deleteArt, getSingleArt } from "../../http/setupApi"
import "./articles.sass"
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Article } from "../../model/Articles";
import HTMLReactParser from "html-react-parser";

export function SingleArticlePage() {
    const { articleId } = useParams();


    const [art, setArt] = useState<Article>();

    const navigate = useNavigate();
    // const editor = useRef(null)
    // const [content, setContent] = useState("")

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

    const handleDelete = async (e: Event) => {
        e.preventDefault();
        const resp = await deleteArt(Number(articleId)).catch((err) => {
            console.log(err);
            
        })
        if (resp && resp.status == 200) {
            navigate("/articles")
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
                        <a href="" onClick={(e) => {handleDelete(e)}}>Удалить статью</a>
                        <Link to={"/articles/" + articleId + "/edit"}>Редактировать статью</Link>
                    </div>
                </div>
                <div className="article__img">
                    <img src={"http://localhost:3500/" + art?.articleImg} alt="" />
                </div>
                {/* <Editor editor={editor} content={content} onChange={(newContent) => {
                    setContent(newContent)
                    console.log(content);

                }} /> */}
                {art?.text && HTMLReactParser(art?.text)}

            </Container>
            <Footer />
        </div>
    )
}