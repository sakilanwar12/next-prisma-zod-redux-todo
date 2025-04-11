import { generateQueryString } from "@/lib/query-management/generate-query-string";

import { apiSlice } from ".";
import { TCreateTodoArgs, TCreateTodoRes } from "@/app/api/todos/todos.types";

export const todosApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTodo: builder.mutation<TCreateTodoRes, TCreateTodoArgs>({
      query: (data) => ({
        url: "todos",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["getAllTodos"],
    }),
    // getAllBarMenu: builder.query<TGetAllBarMenuRes, TGetAllBarMenuArgs>({
    //   query: (args) => {
    //     const { queryString } = generateQueryString(args);
    //     return {
    //       url: `/api/v1/bar-menus${queryString}`,
    //       method: "GET",
    //     };
    //   },
    //   providesTags: ["getAllBarMenu"],
    // }),
    // getABarMenu: builder.query<TGetABarMenuRes, TGetABarMenuArgs>({
    //   query: ({ slug }) => ({
    //     url: `/api/v1/products/${slug}`,
    //     method: "GET",
    //   }),
    //   providesTags: (result, error, arg) => [
    //     { type: "getABarMenu", slug: arg?.slug },
    //   ],
    // }),
    // updateABarMenu: builder.mutation<TUpdateABarMenuRes, TUpdateABarMenuArgs>({
    //   query: ({ slug, body }) => ({
    //     url: `/api/v1/bar-menus/${slug}`,
    //     method: "PATCH",
    //     body,
    //   }),
    //   invalidatesTags: (result, error, arg) => [
    //     "getAllBarMenu",
    //     { type: "getABarMenu", slug: arg?.slug },
    //   ],
    // }),
    // deleteBarMenu: builder.mutation<TDeleteABarMenuRes, TDeleteABarMenuArgs>({
    //   query: ({ slug }) => ({
    //     url: `/api/v1/bar-menus/${slug}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: (result, error, arg) => [
    //     "getAllBarMenu",
    //     { type: "getABarMenu", slug: arg?.slug },
    //   ],
    // }),
  }),
});

export const {
  // useCreateBarMenuMutation,
  // useGetAllBarMenuQuery,
  // useDeleteBarMenuMutation,
  // useUpdateABarMenuMutation,
} = todosApi;
