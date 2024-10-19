// import React, { useEffect, useState } from "react";
import socket from "@/socket";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

const ShoutoutWithClipDisplayPage = () => {
	// const [videoFilePath, setVideoFilePath] = useState(null);

    const [videoUrl, setVideoUrl] = useState<string | null>(null)
    const [playing, setPlaying] = useState(false)

    const handleVideoEnd = () => {
        setVideoUrl(null)
    }

    const handleVideoReady = () => {
        setTimeout(() => setPlaying(true), 3000)
    }

    useEffect(() => {

        // console.log('socket', socket)

        socket.on('recieveShoutoutWithClip', (response) => {
            console.log(response)
            setVideoUrl(response.videoUrl)
        })

        // setTimeout(() => {
        //     const data = {
        //         durationMilliseconds: 9184,
        //         videoUrl: "http://localhost:8080/public/shoutout-clips/twitch_0tdc4eBA0DdHsqOn.mp4"
        //     }

        //     setVideoUrl(data.videoUrl)

        //     setTimeout(() => setVideoUrl(null), data.durationMilliseconds)
        // }, 1000)

        return () => {
            socket.off('deliverShoutoutWithClip')
        }
    }, [])

	return (
		<div>
			{ videoUrl && 
                <ReactPlayer
				// url={'C:/Users/user/Documents/Twitch-Reward/dumps/shoutout-clips/twitch_4E3bn7RAJuu0tb7p.mp4'}}
                    // controls
                    playing={playing}
                    onReady={handleVideoReady}
                    onEnded={handleVideoEnd}
                    url={videoUrl}
                    width={1920}
                    height={1080}
                />
            }
		</div>
	);
};

export default ShoutoutWithClipDisplayPage;
