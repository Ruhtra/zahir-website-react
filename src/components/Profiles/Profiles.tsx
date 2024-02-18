import { Profile } from "../../routes/model"

export interface PropsProfile {
    data?: Profile[];
    filtrado?: Profile[];
}
export function Profiles({ filtrado }: PropsProfile) {

    console.log(filtrado);
    return (

        
        <>
        <ul>
        {
            filtrado?.map((e) => {
                return <li key={e._id}>{e.name}</li>
            })
        }
        </ul>
        </>
    )
}