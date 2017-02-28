import React from 'react';
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
                        <span>U</span>
                        <span className="presentation__space">I</span>
                        <span>T</span>
                        <span>o</span>
                        <span>o</span>
                        <span>l</span>
                        <span>s</span>
                        <Link className="presentation__button button button--big button--blue" to="/dropdown">Get started</Link>
                    </div>
                </div>
            </div>
        );
    }
}