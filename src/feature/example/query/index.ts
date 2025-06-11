import type { Response } from "@/api/api.types";
import { useQuery, type UseQueryReturnType } from "@tanstack/vue-query";
import type { ExampleUser } from "../types";
import { getExampleUsers } from "../service/example.get";


export const EXAMPLE_USER_QUERIES = {
    LIST: Symbol('list-example-users'),
} as const;


export function useGetExampleUsers(): UseQueryReturnType<Response<ExampleUser>, Error> {
    return useQuery({
        queryKey: [EXAMPLE_USER_QUERIES.LIST],
        queryFn: getExampleUsers
    })
}

