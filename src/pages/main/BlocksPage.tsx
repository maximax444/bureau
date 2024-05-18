import { Header } from "../../components/Header"
import { Footer } from "../../components/Footer"
import Container from "../../components/Container"
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { getBlocks } from "../../http/setupApi";
import { Block } from "../../model/Block";


export function BlocksPage() {

    const [blocks, setBlocks] = useState<Block[]>([]);

    useEffect(() => {
        getAllBlocks();
    }, [])

    const getAllBlocks = async () => {
        const resp = await getBlocks().catch((err) => {
            console.log(err);

        })
        if (resp && resp.status == 200) {
            setBlocks(resp.data)
        }
    }

    return (
        <div className="page">
            <Header />
            <Container className="login">
                <div className="articles__top">
                    <div className="articles__main">
                        <h1>Блоки</h1>
                        <p className="setup__descr">Кубики для постройки ваших страниц</p>
                    </div>
                    <div className="articles__btns">
                        <Link to="/blocks/new">Добавить новый блок</Link>
                    </div>
                </div>
                <div className="fields">
                    {blocks.map(block =>
                        <Link to={"/blocks/" + block.id} className="fields__block">
                            <div className="fields__left">
                                {block.title} <br />
                                {block.descr}
                            </div>
                            <div className="fields__slug">Slug: {block.slug}</div>
                        </Link>
                    )}
                </div>
            </Container>
            <Footer />
        </div>
    )
}