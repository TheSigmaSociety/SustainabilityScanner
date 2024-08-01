import React, { useRef, useEffect, useState } from 'react';

const CameraComponent = () => {
  const UPLOAD_IP = "http://127.0.0.1:5000/upload"; //change this to the server's IP
  const videoRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [upload, setUpload] = useState("Take photo");

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.addEventListener('loadedmetadata', () => {
            videoRef.current.play();
          });
        }
      } catch (err) {
        console.error("Error accessing camera: ", err);
      }
    };

    startCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        let tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  const getSigma = () => {
    const video = videoRef.current;
    if (video && !photo) {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      setPhoto(canvas.toDataURL('image/png'));
      setUpload("Submit?");
    } else {
      //upload to server
      fetch(UPLOAD_IP, {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify({ image: photo }),
      }).then(response => response.json()).then(data => {
        console.log(data);
        //do something with the response
        //har with the response

      }).catch((error) => {console.error('Error:', error);});
    }
  };

  return (
    <div className = "flex flex-col justify-center items-center ">
      {photo && <img src={photo}  className='w-auto h-auto, aspect-auto'/>}
      {!photo && <video ref={videoRef} autoPlay className='w-auto h-auto, aspect-auto'/>}
      <div
        className="flex bottom-0 w-24 items-center justify-center bg-secondary rounded cursor-pointer mt-1"
        onClick={getSigma}
      >
        {upload}
      </div>
    </div>
  );
};

export default CameraComponent;
