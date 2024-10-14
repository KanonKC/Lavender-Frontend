import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface TwitchAuthState {
    accessToken: string | null
    refreshToken: string | null
    expiresAt: number | null
}

const initialState: TwitchAuthState = {
    accessToken: null,
    refreshToken: null,
    expiresAt: null
}

export const twitchAuthSlice = createSlice({
    name: 'twitchAuth',
    initialState,
    reducers: {
        setAccessToken: (state: TwitchAuthState, action: PayloadAction<string>) => {
            state.accessToken = action.payload
        },
        setRefreshToken: (state: TwitchAuthState, action: PayloadAction<string>) => {
            state.refreshToken = action.payload
        },
        setExpiresAt: (state: TwitchAuthState, action: PayloadAction<number>) => {
            state.expiresAt = action.payload
        }
    }
})

export default twitchAuthSlice.reducer