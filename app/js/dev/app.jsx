import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import Main from 'Main';
import Home from 'Home';
import Dropdown from 'Dropdown';
import Tabs from 'Tabs';
import Spinner from 'Spinner';
import Bundle from 'Bundle';
import Search from 'Search';
import Form from 'Form';

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={Main}>
            <IndexRoute component={Home}/>
            <Route path="dropdown" component={Form}>
                <IndexRoute component={Dropdown}/>
            </Route>
            <Route path="tabs" component={Form}>
                <IndexRoute component={Tabs}/>
            </Route>
            <Route path="spinner" component={Form}>
                <IndexRoute component={Spinner}/>
            </Route>
            <Route path="bundle" component={Form}>
                <IndexRoute component={Bundle}/>
            </Route>
            <Route path="search" component={Form}>
                <IndexRoute component={Search}/>
            </Route>
        </Route>
    </Router>,
    document.getElementById('app')
);

/*
    <Route path="tabs" component={Form}>
        <Route component={Dropdown}/>
    </Route>
*/