import { useQuery } from "react-query";

import { Profile, RecentsMovies } from "../../models/model";
import { api } from "../Api";
// import { BaseUrl } from "../QueryClient";

const PathUrl = `/profile`

export function useProfiles() {
    // Atenção para o modelo que pode estar errado
    // O correto seria ProfileLst
    // Porém é passivel de mudança no back para retoranr todos os dados sem filtro
    return useQuery<Profile[]>({
        queryKey: ['profiles'],
        queryFn: async () => {
            const response = await api.get<Profile[]>(
                `${PathUrl}/all`
            )
            return response.data
        },
        staleTime: 1000 * 60 // 1 minute
    })
}

export function useGetProfile(id: string) {
    return useQuery<Profile>({
        queryKey: ['profile', id],
        queryFn: async () => {
            const response = await api.get<Profile[]>(
                `${PathUrl}/getbyid?id=${id}`
            );
            
            // -=-=-=-=-=-=-=-=-=-
            // REMOVER RETORNO DO PRIMEIRO ITEM DA LISTA POIS O BACK
            // ESTA RETORNANDO UMA LISTA DE PROFILE AO INVEZ DE RETORANR
            // UM UNICO OBJETO
            // -=-=-=-=-=-=-=-=-=-
    
            return response.data[0];
        },
        staleTime: 1000 * 60 // 1 minute
    })
}

export function useRecents() {
    return useQuery<RecentsMovies[]>({
        queryKey: ['recents'],
        queryFn: async () => {
            const response = await api.get<RecentsMovies[]>(
                `${PathUrl}/recent`
            );
            return response.data;
        },
        staleTime: 1000 * 60 // 1 minute
    })
}
