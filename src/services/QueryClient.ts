import { QueryClient } from "react-query";

import { useQuery } from "react-query";
import axios from "axios";
import { Profile } from "../routes/model";

const BaseUrl = 'http://localhost:4000/api'

export function useProfiles() {
    return useQuery<Profile[]>('profiles', async () => {
        const response = await axios.get<Profile[]>(
            `${BaseUrl}/profile/getlist`
        );
        return response.data;
    });
}




export const queryClient =  new QueryClient()