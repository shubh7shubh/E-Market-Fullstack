import { User } from "./types";



export interface UserReducerIntialState {
    user: User | null;
    loading: boolean;
}   