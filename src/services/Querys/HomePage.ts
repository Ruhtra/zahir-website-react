import { useQuery } from "react-query";
import axios from "axios";
import { HomePage } from "../../models/model";
import { BaseUrl } from "../QueryClient";

const PathUrl = `${BaseUrl}/homePage`

// Função para embaralhar array
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}


export function useCarousel(isShuffle: boolean | null = null) {
    return useQuery<HomePage[]>('carousel', async () => {
        const response = await axios.get<HomePage[]>(
            `${PathUrl}/getAll`
        );
        if (isShuffle) return shuffleArray(response.data);
        return response.data
    }, {
        staleTime: 1000 * 5 // 1 minute
    });
}
