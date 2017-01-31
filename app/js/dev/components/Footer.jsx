import React from 'react';

export default class Footer extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <footer className="footer">
                <div className="container">
                    <p className="copyright">&copy; copyright Serhiy Miroshnik 2017</p>
                </div>
            </footer>
        );
    }
}