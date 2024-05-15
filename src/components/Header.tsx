import { Link } from 'react-router-dom';
import './Header.sass';
import { Navigation } from './Navigation';

export function Header() {
    return (
        <header className="header">
            <div className="container">
                <div className="header__wrap">
                    <Link to="/" className="header__logo">
                        БЮРО
                    </Link>
                    <Navigation />
                    
                </div>
            </div>
        </header>
    )
}