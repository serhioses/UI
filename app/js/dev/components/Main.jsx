import React from 'react';
import Nav from 'Nav';
import Footer from 'Footer';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        var w = $(window),
            body = $('body'),
            staticTop = w.scrollTop(),
            header = $('.header');

        function stickHeader () {
            var dynamicTop = w.scrollTop();

            header.addClass('header--fixed');
            
            if (dynamicTop <= staticTop) {
                header.addClass('header--fixed_visible');
            } else if (dynamicTop > 48) {
                header.removeClass('header--fixed_visible');
            }

            staticTop = dynamicTop;
        }
        stickHeader();
        w.scroll(stickHeader);
    }
    render() {
        return (
            <div className="wrapper">
                <Nav/>
                <main className="main">
                    <div className="main__inner">
                        {this.props.children}
                    </div>
                </main>
                <Footer/>
            </div>
        );
    }
}