import "./Followers.css"

export function Followers() {
    return (<>
    <div className="followers">
        <div className="desktop">
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
        <div className="mobile" style={{display: "none"}}>
            <span>Olha só quantos já somos!</span> 
            <p className="total">509,7k</p>
            <ul className="icons">
                <li className="tiktok"></li>
                <li className="instagram"></li>
                <li className="youtube"></li>
            </ul>
        </div>
    </div>
    </>)
}