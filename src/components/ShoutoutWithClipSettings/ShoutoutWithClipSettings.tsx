import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Switch } from "../ui/switch";

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
						<Button>เปิดใช้งาน</Button>
					</div>
                    <div>
                        {/* Settings: Featured Clip */}
                        <div className="flex items-center space-x-2">
                            <Label>เลือกแสดง Clip ที่ได้ Featured มาก่อน (ติดดาว)</Label>
                            <Switch />
                        </div>
						<Button variant="secondary">ปิดใช้งาน</Button>
						<Button>บันทึก</Button>
                    </div>
				</div>
			</CardContent>
		</Card>
	);
};

export default ShotoutsWithClipSettings;
