import {Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import TwitchLoginRedirectPage from './pages/TwitchLoginRedirectPage';
import ShoutoutWithClipSettingsPage from './pages/ShoutoutWithClipSettingsPage';

const Router = () => {
  return (
    <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/twitch" element={<TwitchLoginRedirectPage />} />
        <Route path="/features/shoutouts-with-clip" element={<ShoutoutWithClipSettingsPage />} />
    </Routes>
  )
}

export default Router