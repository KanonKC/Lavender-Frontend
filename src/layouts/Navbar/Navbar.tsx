import { createTwitchOAuthUrl } from '@/utils/createTwitchOAuthUrl'
import { Button } from '../../components/ui/button'
import { Separator } from '../../components/ui/separator'
import './Navbar.css'
import { useAppDispatch, useAppSelector } from '@/stores/hooks'
import { useEffect, useMemo } from 'react'
import Sidebar from '@/components/Sidebar/Sidebar'

const Navbar = ({
    children
}: {
    children: React.ReactNode
}) => {

    const account = useAppSelector(state => state.account)
    const dispatch = useAppDispatch()

    const isLoggedIn = useMemo(() => !!(account.username || account.twitchId), [account])

    const handleOnClickLoginButton = () => {
        const url = createTwitchOAuthUrl()
        window.location.href = url
    }

    const handleOnClickLogoutButton = () => {
        dispatch({ type: 'account/logout' })
        window.location.reload();
    }

    useEffect(() => {
        dispatch({ type: 'account/loadAccountFromLocalStorage' })

        if (account.accessToken && (!account.twitchTokenExpiresAt || new Date(account.twitchTokenExpiresAt) < new Date())) {
            dispatch({ type: 'account/logout' })
        }

    }, [dispatch, account])

  return (
    <div>
        <div className='top-navbar'>
            <div className='top-navbar-content'>
                { !isLoggedIn ? (
                    <Button onClick={handleOnClickLoginButton}>Login using Twitch account</Button>
                ) : (
                    <div>
                        <span className='pr-2'>{account.username}</span>
                        <Button onClick={handleOnClickLogoutButton}>Logout</Button>
                    </div>
                )}
            </div>
            <Separator/>
        </div>
        <div className='navbar-spacing'>
            <div className='sidebar-content-container'>
                <Sidebar/>
                <div className='content-container'>
                    { children }
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar