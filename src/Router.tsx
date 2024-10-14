import {Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import TwitchLoginRedirectPage from './pages/TwitchLoginRedirectPage';

const Router = () => {
  return (
    <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/twitch" element={<TwitchLoginRedirectPage />} />
    </Routes>
  )
}

export default Router