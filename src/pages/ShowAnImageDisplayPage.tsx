import socket from "@/socket";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ShowAnImageDisplayPage = () => {
	const [imageUrl, setImageUrl] = useState<string | null>(null);

    const { key } = useParams<{ key: string }>();

	useEffect(() => {
		socket.on(`recieveShowAnImage/${key}`, (response) => {
			// console.log('recieveShowAnImage', response);
			setImageUrl(response.imageUrl);
			setTimeout(() => {
				setImageUrl(null);
			}, 10000);
		});

        return () => {
            socket.off("recieveShowAnImage");
        }
	});

	return <div>{imageUrl && <img src={imageUrl} alt="image" />}</div>;
};

export default ShowAnImageDisplayPage;
