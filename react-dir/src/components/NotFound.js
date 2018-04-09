import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

const NotFound = ()=>(
    <div align="center">
{/*<img src="../../public/images/404page.jpg"/>*/}
        <h1>opps</h1>
        <h1>404</h1>
        <h1>Page Not Found</h1>
        <Button as={ Link } to="/" secondary size="large">Back to Home</Button> 
    </div>
)
export default NotFound;