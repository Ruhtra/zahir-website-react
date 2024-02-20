import { QueryClient } from "react-query";

import { useQuery } from "react-query";
import axios from "axios";
import { HomePage, Profile, RecentsMovies } from "../models/model";



// Função para embaralhar array
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}


// const BaseUrl = 'http://localhost:4000/api'
const BaseUrl = 'https://zahir-website.onrender.com/api'

export function useProfiles() {
    // Atenção para o modelo que pode estar errado
    // O correto seria ProfileLst
    // Porém é passivel de mudança no back para retoranr todos os dados sem filtro
    return useQuery<Profile[]>('profiles', async () => {
        const response = await axios.get<Profile[]>(
            `${BaseUrl}/profile/getlist`
        );
        return response.data;
    }, {
        staleTime: 1000 * 60 // 1 minute
    });
}

export function useGetProfile(id : string) {
    return useQuery<Profile>('carousel', async () => {
        const response = await axios.get<Profile[]>(
            `${BaseUrl}/profile/get?id=${id}`
        );
        
        // -=-=-=-=-=-=-=-=-=-
        // REMOVER RETORNO DO PRIMEIRO ITEM DA LISTA POIS O BACK
        // ESTA RETORNANDO UMA LISTA DE PROFILE AO INVEZ DE RETORANR
        // UM UNICO OBJETO
        // -=-=-=-=-=-=-=-=-=-

        return response.data[0];
    }, {
        staleTime: 1000 * 60 // 1 minute
    });
}

export function useCarousel(isShuffle: boolean | null = null) {
    return useQuery<HomePage[]>('carousel', async () => {
        const response = await axios.get<HomePage[]>(
            `${BaseUrl}/homePage/getAll`
        );
        if (isShuffle) return shuffleArray(response.data);
        return response.data
    }, {
        staleTime: 1000 * 5 // 1 minute
    });
}


export function useRecents() {
    return useQuery<RecentsMovies[]>('recents', async () => {
        const response = await axios.get<RecentsMovies[]>(
            `${BaseUrl}/profile/getRecents`
        );
        return response.data;
    }, {
        staleTime: 1000 * 60 // 1 minute
    });
}




export const queryClient =  new QueryClient()