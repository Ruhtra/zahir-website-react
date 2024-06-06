import { QueryClient } from "react-query";

export const queryClient =  new QueryClient()


export const clearUser = () => {
    queryClient.setQueryData('user', null)
}