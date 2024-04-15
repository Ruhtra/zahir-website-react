import { Link } from "react-router-dom";
import { Profile } from "../../models/model"


import "./Profiles.css"


export interface PropsProfile {
    filtrado?: Profile[];
}
export function Profiles({ filtrado }: PropsProfile) {
    return (
        <>
        <ul className="profiles">
        {
            filtrado?.map((e) => {
                return (
                    <li key={e._id}>
                        <Link to={`/profile/${e._id}`} style={{all: "inherit"}}>
                            <div className="card">
                                <img src={e.picture} alt="" />
                                <div className="infos">
                                    <div className="name">
                                        {e.name}
                                    </div>
                                    <div className="local">
                                        {e.local.uf} - {e.local.city}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </li>
                )
            })
        }
        </ul>
        </>
    )
}