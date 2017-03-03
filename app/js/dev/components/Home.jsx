import React from 'react';
// import simpla from 'simpla';
import {Link} from 'react-router';

export default class Home extends React.Component {
    componentWillMount() {
        $('body').addClass('main');
    }
    render() {
        return (
            <div className="container">
                <div className="presentation">
                    <div className="presentation__inner">
                        <span className="presentation__letter">U</span>
                        <span className="presentation__letter presentation__space">I</span>
                        <span className="presentation__letter">T</span>
                        <span className="presentation__letter">o</span>
                        <span className="presentation__letter">o</span>
                        <span className="presentation__letter">l</span>
                        <span className="presentation__letter">s</span>
                        <Link className="presentation__button button button--big button--blue js-ripple-button" to="/dropdown" data-color-action="lighten" data-percent="30">
                          <span className="button__text">Get started</span>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}