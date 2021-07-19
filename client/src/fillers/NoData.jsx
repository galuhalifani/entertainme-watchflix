import React from 'react'
// import Lottie from "lottie-react";
// import loadingError from "../assets/animations/9195-error.json";
import '../App.css';
import image from "../assets/pic/magnifyingglass.jpg"

export default function Error() {
    return (
        <div style={{margin:'auto', paddingTop: '10%', textAlign: 'center'}}>
            <h1 style={{color: 'white', margin: 'auto'}}>No Data</h1>
            <img src={image} alt="Error Poster" style={{marginLeft: '1%', marginTop: '3%', width: '20%'}}/>
        </div>
    )
}