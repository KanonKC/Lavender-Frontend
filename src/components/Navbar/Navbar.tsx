import { createTwitchOAuthUrl } from '@/utils/createTwitchOAuthUrl'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import './Navbar.css'
import { useAppDispatch, useAppSelector } from '@/stores/hooks'
import { useEffect, useMemo } from 'react'

const Navbar = () => {

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
    }, [dispatch])

  return (
    <div>
        <div className='navbar-content'>
            { !isLoggedIn ? (
                <Button onClick={handleOnClickLoginButton}>Login using Twitch account</Button>
            ) : (
                <div>
                    <span>{account.username}</span>
                    <Button onClick={handleOnClickLogoutButton}>Logout</Button>
                </div>
            )}
        </div>
        <Separator/>
    </div>
  )
}

export default Navbar