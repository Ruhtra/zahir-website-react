import { Link } from "react-router-dom";

export function NavBar() {
    return (
        <nav>
            <ul>
                <li key={'Home'}>
                    <Link to={'/'}>Home</Link>
                </li>
                <li key={'Reviews'}>
                    <Link to={'/profiles'}>Reviews</Link>
                </li>
                <li key={'Loja'}>
                    <Link to={'/loja'}>Loja</Link>
                </li>
                <li key={'Anuncie'}>
                    <Link to={'/anuncie'}>Anuncie</Link>
                </li>
            </ul>
        </nav>
    ) 
}