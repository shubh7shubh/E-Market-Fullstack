import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { server } from "../store";
import { MessageResponse, UserResponse } from "../../types/api-types";
import { User } from "../../types/types";
import axios from "axios";


export const userAPI = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/user/` }),
    //   tagTypes: ["User"],
    endpoints: (builder) => ({
        login: builder.mutation<MessageResponse, User>({
            query: (user) => ({
                url: "new",
                method: "POST",
                body: user,
            }),
            //   invalidatesTags: ["User"],
        }),
    })
});


export const getUser = async (id: string) => {
    try {
        //   const data: UserResponse =res.data
        const { data }: { data: UserResponse } = await axios.get(
            `${import.meta.env.VITE_SERVER}/api/v1/user/${id}`
        );

        return data;
    } catch (error) {
        throw error;
    }
};

export const { useLoginMutation } = userAPI