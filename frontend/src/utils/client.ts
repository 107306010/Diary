import type { 
    GetDiariesResponse,
    CreateDiaryPayload,
    CreateDiaryResponse,
    UpdateDiaryPayload,
    UpdateDiaryResponse,
    DeleteDiaryResponse
} from '@lib/shared_types'
import axios from 'axios';
// import { env } from "./env";

const client = axios.create({
    // baseURL: env.VITE_API_URL,
    baseURL: 'http://localhost:8000/api'
});

export const getDiaries = () =>{
    return client.get<GetDiariesResponse>('/diaries')
}

export const createDiaries = (input: CreateDiaryPayload) =>{
    return client.post<CreateDiaryResponse>('/diaries', input)
}

export const updateDiaries = (id: string, input: UpdateDiaryPayload) =>{
    return client.put<UpdateDiaryResponse>(`/diaries/${id}`, input)
}

export const deleteDiary = (id: string) => {
    return client.delete<DeleteDiaryResponse>(`/diaries/${id}`);
}