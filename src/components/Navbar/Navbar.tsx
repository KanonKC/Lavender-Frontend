import { createTwitchOAuthUrl } from '@/utils/createTwitchOAuthUrl'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import './Navbar.css'

const Navbar = () => {

    const handleOnClickLoginButton = () => {
        const url = createTwitchOAuthUrl()
        window.location.href = url
    }

  return (
    <div>
        <div className='navbar-content'>
            <Button onClick={handleOnClickLoginButton}>Login using Twitch account</Button>
        </div>
        <Separator/>
    </div>
  )
}

export default Navbar