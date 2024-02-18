import { Link } from "react-router-dom";
import { Profile } from "../../models/model"

export interface PropsProfile {
    filtrado?: Profile[];
}
export function Profiles({ filtrado }: PropsProfile) {
    return (
        <>
        <ul>
        {
            filtrado?.map((e) => {

                return (
                  <li key={e._id}>
                    <Link to={`/profile/${e._id}`}>
                        {e.name}
                    </Link>
                </li>
                )
            })
        }
        </ul>
        </>
    )
}