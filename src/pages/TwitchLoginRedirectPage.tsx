import { createOrUpdateAccount } from '@/service/Account.service';
import { getUserLoginAccessToken } from '@/service/Twitch.service';
import { useEffect } from 'react';

const TwitchLoginRedirectPage = () => {

    const twitchAuthorize = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code')

        if (code) {
            const authResponse = await getUserLoginAccessToken(code)
            await createOrUpdateAccount(authResponse.data)
        }
    }

    useEffect(() => {
        twitchAuthorize()
    }, [])

    return (
        <div>TwitchLoginRedirectPage</div>
    )
}

export default TwitchLoginRedirectPage