import "./Followers.css"

export function Followers() {
    return (<>
    <div className="followers">
        <h2>Nossos Números</h2>
        <ul className="items">
            <li className="tiktok">
                <div className="icon"></div>
                <div className="number">274,5k</div>
            </li>
            <li className="instagram">
                <div className="icon"></div>
                <div className="number">111 k</div>
            </li>
            <li className="youtube">
                <div className="icon"></div>
                <div className="number">87,5 k</div>
            </li>
        </ul>
    </div>
    </>)
}