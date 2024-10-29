import { getShowAnImageSettings, updateShowAnImageSettings } from "@/service/ShowAnImage.service";
import { createSlice, ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";

export interface ShowAnImageState {
    accountId: string | null;
    key: string;
    isEnabled: boolean;
    channelRewardId: string | null;
    enableImageModeration: boolean;
    isLoading: boolean;
}

const initialState: ShowAnImageState = {
    accountId: "",
    key: "",
    isEnabled: false,
    channelRewardId: null,
    enableImageModeration: false,
    isLoading: false,
};

const showAnImageSlice = createSlice({
    name: "showAnImage",
    initialState,
    reducers: {
        setAccountId: (state: ShowAnImageState, action) => {
            state.accountId = action.payload;
        },
        setKey: (state: ShowAnImageState, action) => {
            state.key = action.payload;
        },
        setIsEnabled: (state: ShowAnImageState, action) => {
            state.isEnabled = action.payload;
        },
        setChannelRewardId: (state: ShowAnImageState, action) => {
            state.channelRewardId = action.payload;
        },
        setEnableImageModeration: (state: ShowAnImageState, action) => {
            state.enableImageModeration = action.payload;
        },
        setIsLoading: (state: ShowAnImageState, action) => {
            state.isLoading = action.payload;
        },
    },
})

export async function loadShowAnImage(
    dispatch: ThunkDispatch<{
        shoutoutWithClip: ShowAnImageState;
    }, undefined, UnknownAction>,
    accountId: string
) {
    dispatch({ type: "showAnImage/setIsLoading", payload: true });

    const response = await getShowAnImageSettings(accountId)
    console.log(response.data)
    dispatch({ type: "showAnImage/setAccountId", payload: response.data.accountId });
    dispatch({ type: "showAnImage/setKey", payload: response.data.key });
    dispatch({ type: "showAnImage/setIsEnabled", payload: response.data.isEnabled });
    dispatch({ type: "showAnImage/setChannelRewardId", payload: response.data.channelRewardId });
    dispatch({ type: "showAnImage/setEnableImageModeration", payload: response.data.enableImageModeration });

    dispatch({ type: "showAnImage/setIsLoading", payload: false });
}

export async function updateShowAnImage(
    dispatch: ThunkDispatch<{
        shoutoutWithClip: ShowAnImageState;
    }, undefined, UnknownAction>,
    state: ShowAnImageState
) {
    console.log(state)
    if (!state.accountId) return;

    dispatch({ type: "showAnImage/setIsLoading", payload: true });
    console.log("updateShowAnImageSettings")
    await updateShowAnImageSettings(state.accountId, {
        isEnabled: state.isEnabled,
        channelRewardId: state.channelRewardId ?? null,
        enableImageModeration: state.enableImageModeration,
    })
    dispatch({ type: "showAnImage/setIsLoading", payload: false });
}

export default showAnImageSlice.reducer;