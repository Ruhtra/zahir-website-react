import { useParams } from "react-router-dom";

export function ProfileRoute() {

    const { id } = useParams();

    return (
        <>
            <h1>Profile route para o id {id}</h1>
        </>
    )
}