import React from 'react'; 
import {Link} from 'react-router-dom'; 

const LandingPage = () => {
    return (
        <div>
            Hi this is the landing page
            <Link to="/dashboard">Go to employee screen</Link>
        </div>
    )
}

export default LandingPage
