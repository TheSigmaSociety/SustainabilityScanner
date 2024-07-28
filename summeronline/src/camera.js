import React, { useState, useEffect } from 'react';

const CameraComponent = (isPlay) => {
    const [stream, setStream] = useState(null);

    useEffect(() => {
        if(!isPlay) {
            return;
        }
        // Access the user's camera and video
        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
            .then((mediaStream) => {
                setStream(mediaStream);
            })
            .catch((error) => {
                console.error('Error accessing camera:', error);
            });

        // Cleanup: stop the stream when the component unmounts
        return () => {
            if (stream) {
                stream.getTracks().forEach((track) => track.stop());
            }
        };
    }, [isPlay,stream]);
    if(!isPlay) {
        return null;
    }
    return (
        <div>
            {stream && <video autoPlay muted playsInline srcobject={stream} />}
        </div>
    );
};

export default CameraComponent;
