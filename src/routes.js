
// src/routes.js
import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

import App from './components/App';
import Map from './components/Map';
import NotFound from './components/NotFound';

const Routes = (props) => (
    <Router {...props}>
        <div>
            <Route exact path="/" component={App} />
            <Route path="/map" component={Map} />
        </div>

    </Router>
);

export default Routes;