import { ShowAnImage, UpdateShowAnImageSettingsPayload } from "@/types/ShowAnImage.type";
import { baseUrl } from ".";

export function createShowAnImageSettings(accountId: string) {
    return baseUrl.post<ShowAnImage>(`/show-an-image/${accountId}/settings`);
}

export function getShowAnImageSettings(accountId: string) {
    return baseUrl.get<ShowAnImage>(`/show-an-image/${accountId}/settings`);
}

export function updateShowAnImageSettings(accountId: string, data: UpdateShowAnImageSettingsPayload) {
    return baseUrl.put<ShowAnImage>(`/show-an-image/${accountId}/settings`, data);
}

export function enableShowAnImage(accountId: string) {
    return baseUrl.post<ShowAnImage>(`/show-an-image/${accountId}/settings/enable`);
}

export function disableShowAnImage(accountId: string) {
    return baseUrl.post<ShowAnImage>(`/show-an-image/${accountId}/settings/disable`);
}

export function deliverShowAnImage(accountId: string) {
    return baseUrl.post<ShowAnImage>(`/show-an-image/${accountId}/test`);
}