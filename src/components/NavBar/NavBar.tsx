import { Link } from "react-router-dom";

import './NavBar.css'

export function NavBar() {
    return (
        <nav >
            <div className="nav desktop">
                <div className="logo">
                    <Link to="/">
                        <img src="/images/icon.png" alt="" />
                    </Link>
                </div>
                <div className="links-block">
                    <ul className="links">
                        <li key={'Home'}>
                            <Link className="item" to={'/'}>Home</Link>
                        </li>
                        <li className="line"></li>
                        <li key={'Reviews'}>
                            <Link className="item" to={'/profiles'}>Reviews</Link>
                        </li>
                        <li className="line"></li>
                        <li key={'Loja'}>
                            <Link className="item" to={'/loja'}>Loja</Link>
                        </li>
                        <li className="line"></li>
                        <li key={'Anuncie'}>
                            <Link className="item" to={'/anuncie'}>Anuncie</Link>
                        </li>
                    </ul>
                </div>

                {/* <div className="btns">
                    <Link to={'#'} className="login" >Log in</Link>
                    <Link to={'#'} className="register" >Regristre-se</Link>
                </div> */}
            </div>
        </nav>
    ) 
}