import React from 'react';
import {Link, IndexLink} from 'react-router';
import eclipse from 'eclipse';
import 'eclipseUI';

export default class Nav extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        var nav = new eclipse.UI.Bundle('nav-trigger', '');
        nav.init();

        $('body').on('click', '.nav__link:not(.nav__link--active)', function () {
            $('.bundle-overlay--visible').trigger('click');
        });
    }
    render() {
        return (
            <header className="header">
                <div className="container">
                    <button className="nav-trigger" data-container="nav" data-body="true" data-overlay="overlay" data-bundle-outside="true" data-bundle-id="nav" data-bundle-action="toggle" data-bundle>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon--middle" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M0 0h24v24H0z" fill="none"/>
                            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
                        </svg>
                    </button>
                    <nav className="nav" data-bundle-outside="true">
                        <IndexLink className="nav__link" activeClassName="nav__link--active" to="/">Home</IndexLink>
                        <Link className="nav__link" activeClassName="nav__link--active" to="/dropdown">Dropdown</Link>
                        <Link className="nav__link" activeClassName="nav__link--active" to="/tabs">Tabs</Link>
                        <Link className="nav__link" activeClassName="nav__link--active" to="/spinner">Spinner</Link>
                        <Link className="nav__link" activeClassName="nav__link--active" to="/bundle">Bundle</Link>
                        <Link className="nav__link" activeClassName="nav__link--active" to="/search">Search</Link>
                        <Link className="nav__link" activeClassName="nav__link--active" to="/about">About</Link>
                    </nav>
                    <div className="overlay" data-bundle-outside="true" data-bundle-id="nav" data-bundle-action="close" data-bundle></div>
                </div>
            </header>
        );
    }
}