/**
 * Created by rozer on 4/28/2018.
 */
import React from 'react';
import { Link } from 'react-router-dom'

const NotFound = () =>
    <div>
        <center>
            <h3>404 page not found</h3>
            <p>We are sorry but the page you are looking for does not exist.</p>
            Go Back To <Link to="/">Home</Link>
        </center>
    </div>

export default NotFound;
