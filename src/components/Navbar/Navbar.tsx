import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import './Navbar.css'

const Navbar = () => {
  return (
    <div>
        <div className='navbar-content'>
            <Button>Login using Twitch account</Button>
        </div>
        <Separator/>
    </div>
  )
}

export default Navbar