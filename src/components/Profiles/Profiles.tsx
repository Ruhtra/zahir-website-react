import { Profile } from "../../routes/model"

export interface PropsProfile {
    filtrado?: Profile[];
}
export function Profiles({ filtrado }: PropsProfile) {
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