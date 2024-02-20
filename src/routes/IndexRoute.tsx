import { useCarousel, useRecents } from "../services/QueryClient"     


export function Index() {
    const {data, isFetching} = useCarousel(true)
    const {data: dataRecents, isFetching: isFetchingRecents} = useRecents()

    console.log(isFetching);
    

    return (
        <>
        <h1>Carousel</h1>
            {isFetching && <p>Loaddinnng....</p>}
             {
                data?.map(e => {
                    return <h1 key={e.profile._id}>{e.profile._id}</h1>
                })
            }

            <h1>Recents</h1>

            {isFetchingRecents && <p>Loaddinnng....</p>}
            {
                dataRecents?.map(e => {
                    return <h1 key={e._id}>{e._id}</h1>
                })
            }
        </>
    )
}