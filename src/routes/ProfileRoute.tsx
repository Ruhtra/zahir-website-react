import { useParams } from "react-router-dom";
import { useGetProfile } from "../services/QueryClient";


export function ProfileRoute() {

    const { id } = useParams();

    const {data, isFetching} = useGetProfile(id);

    console.log('renderizei');
    


    return (
        <>
            <h1>Profile route para o id {id}</h1>

            <h1>Profile</h1>
            {isFetching && <p>Loadiiing...</p>}
            {
                data?._id
            }
        </>
    )
}