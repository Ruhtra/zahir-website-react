
import { useRecents } from "../../../services/Querys/Profiles";
import { Loading } from "../../Loading/Loading";

import './Reviews.css'

export function Reviews() {
    const { data: dataRecents, isLoading: isLoadingRecents } = useRecents()

    return (<>
        
        <div className="reviews">
                {isLoadingRecents ? <Loading /> :
                        dataRecents?.map(e => {
                            return <div key={e._id} className="movie">
                                <div className="inside">
                                    <iframe src={e.movie} width="320px" height="610px" style={{border: "none"}} scrolling="no" loading="lazy"></iframe>
                                </div>
                            </div>
                        })
                    }
                   
            </div>      
    </>)
}