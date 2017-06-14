
// src/routes.js
import React from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'

import Registration from './components/Registration';
import Map from './components/Map/map-container';

const Routes = (props) => (
    <Router {...props}>
        <div>
            <Route exact path="/" component={Registration} />
            <Route path="/map" component={Map} />
        </div>

    </Router>
);

export default Routes;