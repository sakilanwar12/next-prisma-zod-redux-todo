import { TApiResponse } from "@/lib/api/api-response";


export type TTodo = {
    title: string;
    completed: boolean;
    user: number;
};

export type todoArgs = TApiResponse<TTodo>;