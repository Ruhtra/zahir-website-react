import { useQuery } from "react-query";

import { api } from "../Api";

interface FollwerReponse {
  _id: string;
  instagram: number;
  tiktok: number;
  youtube: number;
  total: number;
}

const PathUrl = `/followers`;

export function useFollwers() {
  return useQuery<FollwerReponse>({
    queryKey: ["follwers"],
    queryFn: async () => {
      const response = await api.get<FollwerReponse>(`${PathUrl}`);
      return response.data;
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}
