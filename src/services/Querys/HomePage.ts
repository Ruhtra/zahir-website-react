import { useQuery } from "react-query";
import { HomePage } from "../../models/model";
import { api } from "../Api";

const PathUrl = `/homePage`;

// Função para embaralhar array
function shuffleArray(array: any[]) {
  // eslint-disable-line @typescript-eslint/no-explicit-any
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function useCarousel(isShuffle: boolean | null = null) {
  return useQuery<HomePage[]>({
    queryKey: ["carousel"],
    queryFn: async () => {
      const response = await api.get<HomePage[]>(`${PathUrl}/`);
      if (isShuffle) return shuffleArray(response.data);
      return response.data;
    },
    staleTime: 1000 * 60, // 1 minute
  });
}
