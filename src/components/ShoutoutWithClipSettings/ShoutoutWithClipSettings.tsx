import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";

const ShotoutsWithClipSettings = () => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Shoutout with Clip</CardTitle>
			</CardHeader>
			<CardContent>
				<p>
					This feature allows you to shoutout a user with a clip from
					their channel.
				</p>

				<Separator />

				<div>
					<div>
						<Button>Enable</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default ShotoutsWithClipSettings;
