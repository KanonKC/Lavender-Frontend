import { Route, Routes } from 'react-router-dom';
import FeatureSettingsPage from './pages/FeatureSettingsPage';
import LandingPage from './pages/LandingPage';
import TwitchLoginRedirectPage from './pages/TwitchLoginRedirectPage';
import ShoutoutWithClipDisplayPage from './pages/ShoutoutWithClipDisplayPage';
import ShowAnImageDisplayPage from './pages/ShowAnImageDisplayPage';

const Router = () => {
  return (
    <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/twitch" element={<TwitchLoginRedirectPage />} />
        <Route path="/features/:feature" element={<FeatureSettingsPage />} />
        
        <Route path="/shoutout-with-clip/:key" element={<ShoutoutWithClipDisplayPage />} />
        <Route path="/show-an-image/:key" element={<ShowAnImageDisplayPage />} />
    </Routes>
  )
}

export default Router