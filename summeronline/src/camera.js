import React, {useRef,useEffect,useState} from 'react';
const CameraComponent = (isPlay) => {
    const videoRef = useRef(null);
    const video = () => {
    navigator.mediaDevices.getUserMedia({ video: { width: 1920, height: 1080} }).then(stream => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
    }).catch(err => {
        console.log(err);
    }) 
   }
   useEffect(() => {
    video();
   }, [videoRef]);
    return (
        <div>
            <video ref={videoRef} />
        </div>
    );
    
};

export default CameraComponent;
