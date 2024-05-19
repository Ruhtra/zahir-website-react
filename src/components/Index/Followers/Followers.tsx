import "./Followers.css"

import { Instagram, Tiktok, Youtube } from "../../../assets/Icons/Icons"
import { Skeleton } from "@radix-ui/themes"
import CarouselContext from "../IndexContext"
import { useContext } from "react"

export function Followers() {
    const { isLoading } =  useContext(CarouselContext)
    return (<>
    <div className="followers">
        <div className="desktop">
            <Skeleton loading={isLoading}>
                <h2>Nossos Números</h2>
            </Skeleton>
            <ul className="items">
            <Skeleton loading={isLoading}>
                <li className="tiktok">
                    <Tiktok className="icon icon-tiktok"></Tiktok>
                    <div className="number">274,5k</div>
                </li>
            </Skeleton>
            <Skeleton loading={isLoading}>
                <li className="instagram">
                    <Instagram className="icon icon-instagram"></Instagram>
                    <div className="number">111 k</div>
                </li>
            </Skeleton>
            <Skeleton loading={isLoading}>
                <li className="youtube">
                    <Youtube className="icon icon-youtube"></Youtube>
                    <div className="number">87,5 k</div>
                </li>
            </Skeleton>
            </ul>
        </div>
            <Skeleton loading={isLoading}>
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
        </Skeleton>
    </div>
    </>)
}