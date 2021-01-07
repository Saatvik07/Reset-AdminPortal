import React from 'react'
import "./style.css"
function Banner(props) {
    return (
        <div className="bg-half-260">
            <h1 style={{color:"white"}}>{props.title}</h1>
        </div>
    )
}

export default Banner
