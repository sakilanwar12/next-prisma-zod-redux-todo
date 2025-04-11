import { env } from "@/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
type TFetchBaseQueryReturnType = ReturnType<typeof fetchBaseQuery>;
export const baseQuery: TFetchBaseQueryReturnType = fetchBaseQuery({
  baseUrl: env.apiBaseUrl,
  prepareHeaders: (headers) => {
    return headers;
  },
});

export const baseQueryWithReAuth: TFetchBaseQueryReturnType = async (
  args,
  api,
  extraOptions
) => {
  const result = await baseQuery(args, api, extraOptions);
  return result;
};

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),
  tagTypes: [
    // todos
    "getAllTodos",
  ],
});
export type TApiSlice = typeof apiSlice;
