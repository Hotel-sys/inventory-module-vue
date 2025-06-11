import type { Response } from "@/api/api.types";
import type { ExampleUser } from "../types";
import { ExampleApiClient } from "@/api";



export async function getExampleUsers(): Promise<Response<ExampleUser>> {
    try {
        const res = await ExampleApiClient.get<ExampleUser[]>("/users");
        
        return {
            results: res.data,
            count: res.data.length
        }
    } catch (error) {
        throw Error('Failed to fetch users')
    }
}











