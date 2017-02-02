import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import Main from 'Main';
import Home from 'Home';
import Dropdown from 'Dropdown';
import Tabs from 'Tabs';
import Form from 'Form';

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={Main}>
            <IndexRoute component={Home}/>
            <Route path="dropdown" component={Form}>
                <IndexRoute component={Dropdown}/>
            </Route>
            <Route path="tabs" component={Tabs}/>
        </Route>
    </Router>,
    document.getElementById('app')
);

/*
    <Route path="tabs" component={Form}>
        <Route component={Dropdown}/>
    </Route>
*/