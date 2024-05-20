

import { useRecents } from "../../../services/Querys/Profiles";

import './Reviews.css'

// import required modules
import { NavLink } from "react-router-dom";
import { Estrela } from "../../../assets/Icons/Icons";
import { Skeleton } from "@radix-ui/themes";
import { useContext } from "react";
import CarouselContext from "../IndexContext";


export function Reviews() {
    const { data: dataRecents, isLoading: isLoadingRecents } = useRecents()
    const { isLoading } = useContext(CarouselContext)


    console.log(isLoadingRecents);

    return (<>
        <Skeleton loading={isLoading}>
        <NavLink to={"/profiles"} className={"lastReviews"}>
                <div className="stars">
                    {
                        [... Array(5).keys()].map(() => {
                            return <>
                                <Estrela className="icon icon-star"></Estrela>
                            </>
                        })
                    }
                </div>
                Últimos Reviews
        </NavLink>
        </Skeleton>

        <div className="reviews">
            <div className="grid">
                {isLoading
                ? Array(1,2,3,4,5).map(e => {
                        return <Skeleton loading={isLoading}>
                            <div key={e} className="movie">
                                <div className="inside">
                                    <iframe width="320px" height="610px" style={{border: "none"}} scrolling="no" loading="lazy"></iframe>
                                </div>
                            </div>
                        </Skeleton>
                    }
                ) 
                : dataRecents?.map(e => {
                        return <div key={e._id} className="movie">
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