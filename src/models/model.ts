
interface Category {
    _id: string;
    name: string;
}

interface Local {
    uf: string;
    city: string;
    neighborhood: string,
    street: string,
    number: string
    lat: number,
    lng: number
}

interface Promotion {
    title: string;
    description?: string;
}

interface Telephones {
    whatsapp: string[];
    telephone: string[];
}

export interface Profile {
    _id: string;
    name: string;
    resume?: string;
    categoryType: string;
    categorie: Category[];
    informations?: string;
    telephones: Telephones;
    local: Local;
    movie?: string
    promotion?: Promotion;
    picture: string;
}



export interface ProfileList extends
    Pick<Profile, '_id' | 'name' | 'categoryType' | 'categorie' | 'promotion' | 'picture'> {
    local: Pick<Local, 'uf' | 'city'>
}


export interface HomePage {
    order: number;
    profile:
    Omit<Profile,
        'resume' | 'informations' | 'telephones' | 'local' | 'movie'> &
    { local: Pick<Local, 'uf' | 'city'> };
}

export interface RecentsMovies {
    id: string;
    movie: string;
}




// export interface GetAllHomePageResponseDto extends Pick<
//     HomePage,
//     'order'
// > {
//     profile: Pick<
//         Profile,
//         '_id' |
//         'picture' |
//         'name' |
//         'promotion'
//     > & {
//         local: Pick<Profile['local'], 'uf' | 'city'>
//     }
// }
