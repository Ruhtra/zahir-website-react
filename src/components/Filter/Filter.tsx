// import { useState } from "react";


// export interface propsFilter {
//     setFiltrado: React.Dispatch<React.SetStateAction<boolean[]>>
// }
// export function Filter() {

//     const [search, setSearch] =  useState("");
//     const [promotion, setPromotion] =  useState(false);

//     function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
//         setSearch(e.target.value)
//     }

//     function handlePromotion(e: React.ChangeEvent<HTMLInputElement>) {
//         setPromotion(e.target.checked)
//     }

//     // useEffect(() => {
//     //     // const newFilter : boolean[] | undefined =  data?.map((e, i) => {
//     //     //     if (filtrado[i])
//     //     //         if (Object.keys(e.promotion).length > 0 ) return true
//     //     //     return false;
//     //     // })

//     //     // setFiltrado(newFilter)

//     //     // console.log(newFilter);
        


//     //     // this.arrFilter = this.data.map((e, i) => {
//     //     //     if (this.arrFilter[i] == 1) 
//     //     //         if (Object.keys(e['promotion']).length > 0) return 1
//     //     //     return 0
//     //     // })
//     // }, [search, promotion])

//     return (
//         <>
//         <div>
//             <input type="checkbox" checked={promotion} onChange={handlePromotion} />
//             <input type="search" value={search} onChange={handleSearch}/>
//         </div>
//         </>
//     )
// }