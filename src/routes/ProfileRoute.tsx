import { useParams } from "react-router-dom";
import { Loading } from "../components/Loading/Loading";
import { useGetProfile } from "../services/Querys/Profiles";


export function ProfileRoute() {

    const { id } = useParams();

    const {data, isFetching} = useGetProfile(id);


    return (
        <>
            <h1>Profile route para o id {id}</h1>

            <h1>Profile</h1>
            {isFetching && <Loading />}
            {
                data?._id
            }
        </>
    )
}