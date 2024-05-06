import "./Followers.css"

import { Instagram, Tiktok, Youtube } from "../../../assets/Icons/Icons"

export function Followers() {
    return (<>
    <div className="followers">
        <div className="desktop">
            <h2>Nossos Números</h2>
            <ul className="items">
                <li className="tiktok">
                    <Tiktok className="icon icon-tiktok"></Tiktok>
                    <div className="number">274,5k</div>
                </li>
                <li className="instagram">
                    <Instagram className="icon icon-instagram"></Instagram>
                    <div className="number">111 k</div>
                </li>
                <li className="youtube">
                    <Youtube className="icon icon-youtube"></Youtube>
                    <div className="number">87,5 k</div>
                </li>
            </ul>
        </div>
        <div className="mobile" style={{display: "none"}}>
            <span>Olha só quantos já somos!</span> 
            <p className="total">509,7k</p>
            <ul className="icons">
                <li className="tiktok">
                    <Tiktok className="icon icon-tiktok"></Tiktok>
                </li>
                <li className="instagram">    
                    <Instagram className="icon icon-instagram" ></Instagram>
                </li>
                <li className="youtube">
                    <Youtube className="icon icon-youtube"></Youtube>
                </li>
            </ul>
        </div>
    </div>
    </>)
}