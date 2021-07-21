import React from 'react'
// import Lottie from "lottie-react";
// import loadingError from "../assets/animations/9195-error.json";
import '../App.css';

export default function Error() {
    return (
        <div className='d-flex justify-content-center' style={{margin:'auto'}}>
        {/* <Lottie className='overlay' animationData={loadingError} background="transparent" speed={'2.5'}  style={{margin:"auto"}}  loop autoplay></Lottie> */}
        <img src={"https://image.freepik.com/free-vector/something-went-wrong-neon-text_118419-43.jpg"} alt="Error Poster"/>
        </div>
    )
}