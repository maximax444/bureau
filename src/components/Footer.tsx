import { Link } from 'react-router-dom';
import './Header.sass';
import { Navigation } from './Navigation';

export function Footer() {
    return (
        <footer className="header footer">
            <div className="container">
                <div className="header__wrap">
                    <Link to="/" className="header__logo">
                        БЮРО
                    </Link>
                    <Navigation />

                </div>
            </div>
        </footer>
    )
}