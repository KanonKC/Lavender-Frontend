import { deliverShowAnImage } from "@/service/ShowAnImage.service";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import {
    loadShowAnImage,
    updateShowAnImage,
} from "@/stores/slices/showAnImageSlice";
import { Dot, RotateCw, TriangleAlert } from "lucide-react";
import { useEffect, useMemo } from "react";
import { ChannelPointRewardsSelector } from "../ChannelPointRewardsSelector/ChannelPointRewardsSelector";
import LoginTwitchButton from "../LoginTwitchButton/LoginTwitchButton";
import ReadOnlyInput from "../ReadOnlyInput/ReadOnlyInput";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { Switch } from "../ui/switch";
import VerticalMultiStepSection from "../VerticalMultiStepSection/VerticalMultiStepSection";
import VerticalMultiStepSectionItem from "../VerticalMultiStepSectionItem/VerticalMultiStepSectionItem";

const ShowAnImageSettings = () => {
	const dispatch = useAppDispatch();

	const frontendUrl = import.meta.env.VITE_FRONTEND_URL as string;

	const account = useAppSelector((state) => state.account);
	const showAnImage = useAppSelector((state) => state.showAnImage);

    const accountId = useAppSelector((state) => state.account.accountId);
	const twitchId = useAppSelector((state) => state.account.twitchId);

	// const isEnabled = true; // useAppSelector((state) => state.shoutoutWithClip.isEnabled);
	const enableImageModeration = useAppSelector(
		(state) => state.showAnImage.enableImageModeration
	);
	const isLoading = useAppSelector((state) => state.showAnImage.isLoading);

	const isLoggedIn = useMemo(
		() => !!(account.username || account.twitchId),
		[account]
	);

	const onSelectChannelPointReward = (value: string) => {
		dispatch({
			type: "showAnImage/setChannelRewardId",
			payload: value,
		});
	};

	const onClickEnableImageModerationSwitch = () => {
		dispatch({
			type: "showAnImage/setEnableImageModeration",
			payload: !showAnImage.enableImageModeration,
		});
	};

	const saveShowAnImageSettings = () => {
		console.log("saveShowAnImageSettings");
		updateShowAnImage(dispatch, showAnImage);
	};

	const onClickTestShowAnImage = async () => {
        
        if (!twitchId) {
            return;
		}

        // dispatch({ type: "showAnImage/setIsLoading", payload: true });
		await deliverShowAnImage(twitchId)
        // dispatch({ type: "showAnImage/setIsLoading", payload: false });
	};

	useEffect(() => {
		if (!accountId) return;
		loadShowAnImage(dispatch, accountId);
	}, [accountId, dispatch]);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Show An Image</CardTitle>
			</CardHeader>
			<CardContent>
				<p>
					อนุญาติให้ผู้ชมของคุณสามารถแลกแต้มช่องของคุณเพื่อแสดงรูปภาพที่พวกเขาต้องการ
				</p>

				<Separator className="my-4" />

				<div>
					<VerticalMultiStepSection>
						<VerticalMultiStepSectionItem
							nodeLabel="1"
							title="เชื่อมต่อกับบัญชีของ Twitch คุณ"
							description="ยืนยันตัวตนผ่าน Twitch OAuth"
						>
							{!isLoggedIn ? (
								<LoginTwitchButton />
							) : (
								<div className="flex">
									<Card className="p-2">
										<p>Username: {account.username}</p>
									</Card>
								</div>
							)}
						</VerticalMultiStepSectionItem>
						<VerticalMultiStepSectionItem
							nodeLabel="2"
							title="เลือกแต้มช่องของคุณที่ต้องการใช้งานร่วมกับฟีเจอร์นี้"
							description="โดยแต้มช่องที่คุณเลือกจะต้องสามารถรับข้อความเพิ่มเติมมาจากผู้ชมที่ทำการแลกได้"
						>
							<div className="flex gap-[4px]">
								<ChannelPointRewardsSelector
                                    initialValue={showAnImage.channelRewardId ?? ""}
									onSelect={onSelectChannelPointReward}
								/>
								<Button
									disabled={isLoading}
									onClick={saveShowAnImageSettings}
								>
									บันทึก
								</Button>
							</div>
						</VerticalMultiStepSectionItem>
						<VerticalMultiStepSectionItem
							nodeLabel="3"
							title="ตั้งค่าสำหรับการใช้งาน Show an Image"
							description="ตั้งค่าการแสดงผลต่างๆ สำหรับรูปภาพ
								ที่จะถูกนำมาแสดงเมื่อมีคนแลกแต้มช่องเข้ามา"
						>
							<Card>
								<div className="p-4 flex flex-col gap-4">
									<div className="flex justify-between">
										<div>
											<div className="font-medium">
												เปิดใช้งาน Image Moderation โดย
												Sightengine
											</div>
											<div>
												รูปภาพที่ถูกส่งมาจากผู้ชมจะถูกตรวจสอบโดย
												AI ก่อนนำมาแสดงผลบนหน้าจอ
												เพื่อป้องกันรูปภาพที่มีเนื้อหาไม่เหมาะสม
												ซึ่งอาจจะขัดต่อกฎหมายชุมชนหรือนโยบายของ
												Twitch ได้
											</div>
										</div>
										<Switch
											checked={enableImageModeration}
											onClick={
												onClickEnableImageModerationSwitch
											}
										/>
									</div>
								</div>
							</Card>

							<div className="flex justify-end mt-[8px]">
								<Button
									disabled={isLoading}
									onClick={saveShowAnImageSettings}
								>
									บันทึก
								</Button>
							</div>
						</VerticalMultiStepSectionItem>
						<VerticalMultiStepSectionItem
							nodeLabel="4"
							title="นำลิงก์สำหรับการแสดงรูปภาพไปติดตั้งใน OBS"
							description="นำลิงก์ด้านล่างไปใส่ไว้ในโปรแกรม OBS หรือโปรแกรมสำหรับการถ่ายทอดสดของคุณ โดยลิงก์นี้จะใช้เพื่อแสดง Clip เมื่อมีการ Raid เกิดขึ้น"
						>
							<ReadOnlyInput
								value={`${frontendUrl}/show-an-image/${showAnImage.key}`}
							/>

							<p className="my-4">
								หากใช้ในโปรแกรม OBS
								สามารถทำได้เหมือนกับการนำลิงก์ Alert ไปใส่ได้เลย
							</p>

							<div className="text-destructive">
								<p className="flex items-center gap-2">
									<TriangleAlert size={14} /> ข้อควรระวัง:
								</p>

								<ul>
									<div className="flex items-center gap-2">
										<Dot />
										อย่าส่งลิงก์นี้ให้ใครเป็นอันขาด
										(ใครก็ตามที่ได้ลิงก์นี้ไป
										สามารถที่จะแสดง Clip เมื่อมีการ Shoutout
										เกิดขึ้นเหมือนกับตัวคุณ)
									</div>
									<div className="flex items-center gap-2">
										<Dot />
										หากเผลอทำลิงก์นี้หลุดออกไปแล้ว
										ให้คุณกดที่รูป <RotateCw
											size={14}
										/>{" "}
										เพื่อสร้างลิงก์อันใหม่
										จากนั้นให้คุณคัดลอกลิงก์แล้วนำไปใส่ไว้ในโปรแกรม
										OBS ใหม่อีกครั้ง
									</div>
								</ul>
							</div>
						</VerticalMultiStepSectionItem>
						<VerticalMultiStepSectionItem
							nodeLabel="5"
							title="ทดสอบการทำงาน"
							description="ลองกดปุ่มทดสอบด้านล่างดู จะต้องมี Clip แสดงขึ้นมาบนหน้าจอ OBS ของคุณ"
							lastNode
							hideSeparator
						>
							<Button
								disabled={isLoading}
								onClick={onClickTestShowAnImage}
							>
								ทดสอบการทำงาน
							</Button>
						</VerticalMultiStepSectionItem>
					</VerticalMultiStepSection>

					{/* {!isEnabled ? (
						<div>
							<Button onClick={onClickEnable}>เปิดใช้งาน</Button>
						</div>
					) : (
						<div>
							<div className="flex items-center space-x-2">
								<Label>
									เลือกแสดง Clip ที่ได้ Featured มาก่อน
									(ติดดาว)
								</Label>
								<Switch
									checked={featuredClipPriority}
									onClick={onClickFeaturedClipPrioritySwitch}
								/>
							</div>

							<div className="flex gap-4">
								<Button variant="destructive">ปิดใช้งาน</Button>
								<Button>บันทึก</Button>
							</div>
						</div>
					)} */}
				</div>
			</CardContent>
		</Card>
	);
};

export default ShowAnImageSettings;
