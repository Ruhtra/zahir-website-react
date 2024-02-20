import { Loading } from "../components/Loading/Loading";   
import { useCarousel } from "../services/Querys/HomePage";
import { useRecents } from "../services/Querys/Profiles";


export function Index() {
    const {data, isFetching} = useCarousel(true)
    const {data: dataRecents, isFetching: isFetchingRecents} = useRecents()
    

    return (
        <>
        <h1>Carousel</h1>
            {isFetching && <Loading />}
             {
                data?.map(e => {
                    return <h1 key={e.profile._id}>{e.profile._id}</h1>
                })
            }

            <h1>Recents</h1>

            {isFetchingRecents && <Loading />}
            {
                dataRecents?.map(e => {
                    return <h1 key={e._id}>{e._id}</h1>
                })
            }
        </>
    )
}