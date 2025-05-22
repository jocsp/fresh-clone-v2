import React, { useEffect, useState } from 'react';
import desktopImg from "../assets/desktop.png";
import orientationImg from "../assets/orientation.png"
import { useNavigate } from 'react-router-dom';
import { set } from 'date-fns';

const Mobiles = ({setHasAcknowledged}) => {
  // states to decide which image to use
  const [turnScreen, setTurnScreen] = useState(false);
  const [changeDevice, setChangeDevice] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;

    // in case the user directly access /mobile route from a valid device
    if (screenWidth > 1000) navigate("/home");

    // testing if the user can change device orientation for a better experience
    // states will allow to show the corresponding image
    // screen width was already tested and proved to be less than 1000px in App.js
    if (screenHeight < 1000) {
      setChangeDevice(true);
      setMessage("please switch to a computer. If you’d rather continue on your current device, turning it to landscape mode will improve visibility.")
    } else if (screenHeight >= 1000) {
      setTurnScreen(true);
      setChangeDevice(false);
      setMessage("please rotate your device.")
    } 

  },[])

  const acknowledgeScreenSize = () => {
    localStorage.setItem("acknowledgedScreenSize", "true");
    setHasAcknowledged(true);
    navigate("/dashboard");
  }

  return (
    <div className='mobiles-page-container'>
      {changeDevice ? <img src={desktopImg} alt="Desktop Computer" /> : null}
      {turnScreen ? <img src={orientationImg} alt="Desktop Computer" /> : null}
      
      <p>This web app is designed for desktop devices. Your device should ideally be at least 1000px wide.</p>
      <p>For the best experience, {message}</p>

      <button onClick={acknowledgeScreenSize} className='continue-button'>Continue</button>

    </div>
  )
}

export default Mobiles