import { Loading } from "../components/Loading/Loading";   
import { useCarousel } from "../services/Querys/HomePage";
import { useRecents } from "../services/Querys/Profiles";


export function Index() {
    const {data, isLoading} = useCarousel(true)
    const {data: dataRecents, isLoading: isLoadingRecents} = useRecents()
    

    return (
        <>
        <h1>Carousel</h1>
            {isLoading && <Loading />}
             {
                data?.map(e => {
                    return <h1 key={e.profile._id}>{e.profile._id}</h1>
                })
            }

            <h1>Recents</h1>

            {isLoadingRecents && <Loading />}
            {
                dataRecents?.map(e => {
                    return <h1 key={e._id}>{e._id}</h1>
                })
            }
        </>
    )
}