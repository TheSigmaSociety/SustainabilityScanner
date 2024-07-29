import React, { useRef, useEffect,useState} from 'react';
const CameraComponent = () => {
  const videoRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [upload, setUpload] = useState("Take photo");
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
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
        console.log("har har har har har har")
    }
  };
  return <div> {photo && <img src = {photo}/>}
               {!photo && <video ref={videoRef} autoPlay />}
                <div className = "flex bottom-0 items-center justify-center bg-third rounded cursor-pointer" onClick={getSigma}>{upload}</div>
        </div>;
};

export default CameraComponent;