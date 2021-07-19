import React from 'react'
import Lottie from "lottie-react";
import loadingAnimation from "../assets/animations/9329-loading.json";
import '../App.css';

export default function Loader() {
    return (
        <Lottie className='overlay' animationData={loadingAnimation} background="transparent" speed="2"  style={{margin:"auto"}}  loop autoplay></Lottie>
    )
}