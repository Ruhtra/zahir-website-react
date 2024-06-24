import "./Followers.css"

import { Instagram, Tiktok, Youtube } from "../../../assets/Icons/Icons"
import { Skeleton } from "@radix-ui/themes"
import { useContext } from "react"
import { Link } from "react-router-dom"
import { CarouselContext } from "../CarouselContext"

export function Followers() {
    const { isLoading } =  useContext(CarouselContext)
    return (<>
    <div className="followers">
        {/* <div className="desktop">
            <Skeleton loading={isLoading}>
                <h2>Nossos Números</h2>
            </Skeleton>
            <ul className="items">
            <Skeleton loading={isLoading}>
                <Link to={"https://www.tiktok.com/@dozahir"} target="_blank">
                    <li className="tiktok">
                        <Tiktok className="icon icon-tiktok"></Tiktok>
                        <div className="number">274,5k</div>
                    </li>
                </Link>
            </Skeleton>
            <Skeleton loading={isLoading}>
                <Link to={"https://www.instagram.com/dozahir/"} target="_blank">
                    <li className="instagram">
                        <Instagram className="icon icon-instagram"></Instagram>
                        <div className="number">111 k</div>
                    </li>
                </Link>
            </Skeleton>
            <Skeleton loading={isLoading}>
                <Link to={"https://www.youtube.com/@doZahir"} target="_blank">
                    <li className="youtube">
                        <Youtube className="icon icon-youtube"></Youtube>
                        <div className="number">87,5 k</div>
                    </li>
                </Link>
            </Skeleton>
            </ul>
        </div> */}
        <Skeleton loading={isLoading}>
            <div className="bloco" >
                <span>Olha só quantos já somos!</span> 
                <p className="total">509,7k</p>
                <ul className="icons">
                    <Link to={"https://www.tiktok.com/@dozahir"} target="_blank">
                        <li className="tiktok">
                            <Tiktok className="icon icon-tiktok"></Tiktok>
                        </li>
                    </Link>
                    <Link to={"https://www.instagram.com/dozahir/"} target="_blank">
                        <li className="instagram">    
                            <Instagram className="icon icon-instagram" ></Instagram>
                        </li>
                    </Link>
                    <Link to={"https://www.youtube.com/@doZahir"} target="_blank">
                        <li className="youtube">
                            <Youtube className="icon icon-youtube"></Youtube>
                        </li>
                    </Link>
                </ul>
            </div>
        </Skeleton>
    </div>
    </>)
}