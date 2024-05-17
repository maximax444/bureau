import { Header } from "../../components/Header"
import { Footer } from "../../components/Footer"
import Container from "../../components/Container"
import "./main.sass"

export function HelpPage() {


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