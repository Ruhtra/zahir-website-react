// import axios from "axios";
// import { useQuery } from "react-query";
// import { api } from "../Api";

// export interface googleUser {
//   id: string;
//   email: string;
//   picture?: string;
//   role: "user" | "admin";
//   name: string;
// }

// export function useGetProifleUser() {
//   return useQuery<googleUser>({
//     queryKey: ["user"],
//     queryFn: async () => {

//       // const response = await api.get<googleUser>('/getUser');

//       // return response.data;
//     },
//     staleTime: 15 * 60 * 1000, // 15 minutos
//     retry: (failureCount, error) => {
//       if (axios.isAxiosError(error) && error.response?.status === 401)
//         return false;

//       if (failureCount < 3) return true;
//     },
//     retryDelay: 5 * 1000, // 5 seconds
//     refetchOnWindowFocus: false,
//   });
// }
