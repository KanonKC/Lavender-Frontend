import ShotoutsWithClipSettings from "@/components/ShotoutsWithClipSettings/ShotoutsWithClipSettings";
import ShowAnImageSettings from "@/components/ShowAnImageSettings/ShowAnImageSettings";
import TarotCardSettings from "@/components/TarotCardSettings/TarotCardSettings";
import Navbar from "@/layouts/Navbar/Navbar";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const FeatureSettingsPage = () => {
	const { feature } = useParams();

    useEffect(() => {
        console.log(feature)
    }, [feature])

	return (
		<div>
			<Navbar>
				{ feature === 'shoutouts-with-clip' && <ShotoutsWithClipSettings />}
                { feature === 'show-an-image' && <ShowAnImageSettings />}
                { feature === 'tarot-card' && <TarotCardSettings />}
			</Navbar>
		</div>
	);
};

export default FeatureSettingsPage;
