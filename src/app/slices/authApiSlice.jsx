import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApiSlice = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/users/" }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: credentials => ({
        url: "login/",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApiSlice;