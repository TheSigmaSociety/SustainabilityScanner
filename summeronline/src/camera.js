import React, { useState, useEffect } from 'react';

const CameraComponent = (isPlay) => {
    const videoRef = useRef(null);
    const video = () => {
    navigator.mediaDevices.getUserMedia({ video: { width: 1920, height: 1080} }).then(stream => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
    }) 
   }
   useEffect(() => {
    video();
   }, [videoRef]);
    
};

export default CameraComponent;
