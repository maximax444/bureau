
import './Navigation.sass';
import { Link } from 'react-router-dom';

export function Navigation() {
    return (
        <nav className="nav">
            <Link to="/pages">Страницы</Link>
            <Link to="/map">Статьи</Link>
            <Link to="/map">Настройки</Link>
            <Link to="/map">Помощь</Link>

        </nav>
    )
}