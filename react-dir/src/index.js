import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';

import Friends from './friends.js';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends React.Component{
    render(){
        return(
                <Router>
                    <div>
                        <Link to="/friends">Friends</Link>
                        <Route path="/friends" Component={Friends} />
                    </div>
                </Router>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
