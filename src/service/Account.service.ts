import { TwitchUserAuthorization } from "@/types/Twitch.type";
import axios from "axios";

const { VITE_BACKEND_URL } = import.meta.env;

const accountAxios = axios.create({
    baseURL: VITE_BACKEND_URL,
    headers: {
        "Content-Type": "application/json",
    },
})

export async function createOrUpdateAccount(payload: TwitchUserAuthorization) {
    return accountAxios.post("/accounts", payload)
}