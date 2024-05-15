import './Header.sass';
import { Navigation } from './Navigation';

export function Footer() {
    return (
        <footer className="header footer">
            <div className="container">
                <div className="header__wrap">
                    <a href="" className="header__logo">
                        БЮРО
                    </a>
                    <Navigation />

                </div>
            </div>
        </footer>
    )
}