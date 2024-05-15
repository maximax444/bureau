
import './Navigation.sass';
import { Link } from 'react-router-dom';

export function Navigation() {
    return (
        <nav className="nav">
            <Link to="/pages">Страницы</Link>
            <Link to="/articles">Статьи</Link>
            <Link to="/blocks">Блоки</Link>
            <Link to="/fields">Поля</Link>
            <Link to="/settings">Настройки</Link>
            <Link to="/help">Помощь</Link>

        </nav>
    )
}