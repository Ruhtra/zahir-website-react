import { useContext } from "react"
import { ExampleContext } from "../../routes/Index"


export function Profiles() {
    const { data, filtrado }  = useContext(ExampleContext)

    return (
        <>
        <ul>
        
        {
            filtrado.length > 0
            ? (filtrado.map(e => {
                    return <li key={e._id}>{e.name}</li>
            }))
            : ( data?.map(e => {
                return <li key={e._id}>{e.name}</li>
            })
            )
        }
        </ul>
        </>
    )
}