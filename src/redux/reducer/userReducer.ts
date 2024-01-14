import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserReducerIntialState } from "../../types/reducer-types";
import { User } from "../../types/types";

const initialState: UserReducerIntialState = {
    user: null,
    loading: true
};

export const userReducer = createSlice({
    name: 'userReducer',
    initialState,
    reducers: {
        userExits: (state, action: PayloadAction<User>) => {
            state.loading = false;
            state.user = action.payload;
        },
        userNotExist: (state) => {
            state.loading = false;
            state.user = null;
        }
    }
});


export const { userExits, userNotExist } = userReducer.actions