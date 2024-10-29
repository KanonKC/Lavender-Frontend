export interface ShowAnImage {
    id: string;
    accountId: string;
    key: string;
    isEnabled: boolean;
    channelRewardId: string | null;
    enableImageModeration: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface UpdateShowAnImageSettingsPayload {
    isEnabled?: boolean;
	enableImageModeration?: boolean;
    channelRewardId?: string | null;
}
