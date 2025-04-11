import { TApiResponse } from "@/lib/api/api-response";

export type TTodo = {
  title: string;
  completed: boolean;
  user: number;
};

/*
 * Create Todo Start
 */

export type TCreateTodoArgs = TApiResponse<TTodo>;

export type TCreateTodoRes = TApiResponse<TTodo>;
