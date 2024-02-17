
interface Category {
    type: string;
    categories?: string[];
}

interface Local {
    uf: string;
    city: string;
    neighborhood: string,
    street: string,
    number: string
}

interface Promotion {
    title?: string;
    description?: string;
}

interface Telephones {
    whatsapp: string[];
    telephone: string[];
}

export interface Profile {
    _id: string;
    name: string;
    resume: string;
    category: Category;
    informations: string;
    telephones: Telephones;
    local: Local;
    movie: string
    promotion: Promotion;
    picture: string;
}



export interface ProfileList extends
Pick<Profile, '_id' | 'name' | 'category' | 'promotion' | 'picture' >  {
    local: Pick<Local, 'uf' | 'city'>
}


export interface HomePage {
    order: number;
    profile:
        Omit<Profile,
            'resume' | 'informations' | 'telephones' | 'local' | 'movie'> &
        { local: Pick<Local, 'uf' | 'city'> };
} 