import React from 'react'
import {Link} from "react-router-dom";
import "./style.scss"
function Unauthorized() {
    return (
        <div className="unauthorized-container">
            <h3>Please <Link to="/" className="login-link">Log in</Link> to access this page.</h3>
        </div>
    )
}

export default Unauthorized
