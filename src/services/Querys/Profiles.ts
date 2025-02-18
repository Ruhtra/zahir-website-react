import { useQuery } from "react-query";

import { Profile, RecentsMovies } from "../../models/model";
import { api } from "../Api";
// import { BaseUrl } from "../QueryClient";

const PathUrl = `/profiles`;

export function useProfiles() {
  // Atenção para o modelo que pode estar errado
  // O correto seria ProfileLst
  // Porém é passivel de mudança no back para retoranr todos os dados sem filtro
  return useQuery<Profile[]>({
    queryKey: ["profiles"],
    queryFn: async () => {
      const response = await api.get<Profile[]>(`${PathUrl}`);
      return response.data;
    },
    staleTime: 1000 * 60, // 1 minute
  });
}

export function useGetProfile(id: string) {
  return useQuery<Profile>({
    queryKey: ["profile", id],
    queryFn: async () => {
      const response = await api.get<Profile>(`${PathUrl}/${id}`);

      return response.data;
    },
    staleTime: 1000 * 60, // 1 minute
  });
}

export function useRecents() {
  return useQuery<RecentsMovies[]>({
    queryKey: ["recents"],
    queryFn: async () => {
      const response = await api.get<RecentsMovies[]>(`${PathUrl}/recents`);
      return response.data;
    },
    staleTime: 1000 * 60, // 1 minute
  });
}
