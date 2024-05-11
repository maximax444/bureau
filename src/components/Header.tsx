import './Header.sass';
import { Navigation } from './Navigation';

export function Header() {
    return (
        <header className="header">
            <div className="container">
                <div className="header__wrap">
                    <a href="" className="header__logo">
                        BUREAU
                    </a>
                    <Navigation />
                    
                </div>
            </div>
        </header>
    )
}