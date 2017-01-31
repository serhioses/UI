import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import Main from 'Main';
import Dropdown from 'Dropdown';
import Tabs from 'Tabs';

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={Main}>
            <IndexRoute component={Dropdown}/>
            <Route path="tabs" component={Tabs}/>
        </Route>
    </Router>,
    document.getElementById('app')
);