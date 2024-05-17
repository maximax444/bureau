import { Header } from "../../components/Header"
import { Footer } from "../../components/Footer"
import Container from "../../components/Container"
import { useNavigate } from "react-router-dom";
import "./main.sass"

export function HelpPage() {

    const navigate = useNavigate();



    const myLink = (path: string) => {
        navigate(path);
    }

    return (
        <div className="page">
            <Header />
            <Container className="login">
                <h1>Здесь должна быть помощь</h1>
                <p className="setup__descr">но, простите... её нет... приходите позже</p>

            </Container>
            <Footer />
        </div>
    )
}