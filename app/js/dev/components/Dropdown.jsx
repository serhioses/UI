import React from 'react';

export default class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dd: null
        };
    }
    componentDidMount() {
        simpla.UI.Dropdown.hideOutside();

        this.setState({
            dd: new simpla.UI.Dropdown('dropdown', {
                trigger: 'dd-trigger',
                effect: 'slide',
                animationDuration: 300
            })
        }, () => {
            this.state.dd.init();
        });
    }
    componentDidUpdate(prevProps, prevState) {
        var property = this.props.update.dropdown.property,
            value = this.props.update.dropdown.value,
            update = {};

        if (property !== undefined && value !== undefined) {
            update[property] = value;
            this.state.dd.reinit(update);
        }
    }
    render() {
        return (
            <div className="content">
                <div className="container">
                    <h1 className="title">Dropdown</h1>
                    <h2 className="subtitle">Description</h2>
                    <div className="description">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus veniam, voluptatum voluptatibus sit maxime eveniet.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis necessitatibus explicabo non deserunt modi soluta sint corrupti consectetur!</p>
                    </div>
                    <div className="row clearfix">
                        <div className="col-md-6 right">
                            <h2 className="subtitle">Settings</h2>
                            <div className="settings">
                                <input id="hide-nested" className="none" type="checkbox" value="1" data-ui="dropdown" data-property="hideNested" data-property-type="boolean" />
                                <label className="checkbox" htmlFor="hide-nested">Hide nested</label>
                                <input id="hide-siblings" className="none" type="checkbox" value="1" data-ui="dropdown" data-property="hideSiblings" data-property-type="boolean" />
                                <label className="checkbox" htmlFor="hide-siblings">Hide siblings</label>
                            </div>
                        </div>
                        <div className="col-md-6 left">
                            <h2 className="subtitle">Example</h2>
                            <div className="example">
                                <div id="dropdown">
                                    Not ready yet...
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}