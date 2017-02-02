import React from 'react';
import Nav from 'Nav';
import Footer from 'Footer';
import Form from 'Form';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="wrapper">
                <Nav/>
                <main className="main">
                    {this.props.children}
                </main>
                <Footer/>
            </div>
        );
    }
}