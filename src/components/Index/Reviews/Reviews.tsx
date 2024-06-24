

import { useRecents } from "../../../services/Querys/Profiles";

import './Reviews.css'

// import required modules
import { NavLink } from "react-router-dom";
import { Estrela } from "../../../assets/Icons/Icons";
import { Skeleton } from "@radix-ui/themes";
import { useContext } from "react";
import { CarouselContext } from "../CarouselContext";

export function Reviews() {
    const { data: dataRecents } = useRecents()
    const { isLoading } = useContext(CarouselContext)

    return (<>
        <Skeleton loading={isLoading}>
        <NavLink to={"/profiles"} className={"lastReviews"}>
                <div className="stars">
                    {
                        [...Array(5).keys()].map((_e, index) => {
                            return (
                                <Estrela key={`star_${index}`} className="icon icon-star"></Estrela>
                            );
                        })                        
                    }
                </div>
                Últimos Reviews 
        </NavLink>
        </Skeleton>

        <div className="reviews">
            <div className="grid">
                {isLoading
                ? [...Array(5).keys()].map((_e, index) => {
                        return <Skeleton key={index} loading={isLoading}>
                            <div  className="movie">
                                <div className="inside">
                                    <iframe width="320px" height="610px" style={{border: "none"}} scrolling="no" loading="lazy"></iframe>
                                </div>
                            </div>
                        </Skeleton>
                    }
                ) 
                : dataRecents?.map(e => {
                        return <div key={e.id} className="movie">
                            <div className="inside">
                                <iframe src={e.movie} width="320px" height="610px" style={{border: "none"}} scrolling="no" loading="lazy"></iframe>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>      
    </>)
}