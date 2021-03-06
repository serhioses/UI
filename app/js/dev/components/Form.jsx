import React from 'react';

export default class Form extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            update: {
                dropdown: {},
                spinner: {},
                tabs: {}
            }
        };
    }
    componentWillMount() {
        $('body').removeClass('main');
    }
    componentDidMount() {
        var form = document.getElementById('form');

        form.addEventListener('change', this.handleChange);

        // this.setState({
        //     update: {
        //         dropdown: {},
        //         spinner: {},
        //         tabs: {}
        //     }
        // });
    }
    handleChange(e) {
        var target = $(e.target),
            uiType = target.data('ui'),
            propName, propType, indexes, updates;

        if (!uiType) {
            console.log('uiType error');
            return;
        }

        propName = target.data('property');
        propType = target.data('property-type');
        indexes = target.data('indexes');
        updates = this.state.update[uiType];

        if (!updates) {
            console.log('no updates found');
            return;
        }

        updates = {};
        updates.property = propName;

        if (propType === 'boolean') {
            updates.value = target.is(':checked');
        } else if (propType === 'function') {
            if (target.is(':checked')) {
                updates.value = function () {
                    alert(target.val());
                }
            } else {
                updates.value = $.noop;
            }
        } else {
            updates.value = target.val();
        }
        updates.indexes = String(indexes).split(',');

        switch (uiType) {
            case 'dropdown': {
                this.setState({
                    update: {
                        dropdown: updates,
                        spinner: {},
                        tabs: {}
                    }
                });
                break;
            }
            case 'spinner': {
                this.setState({
                    update: {
                        spinner: updates,
                        dropdown: {},
                        tabs: {}
                    }
                });
                break;
            }
            case 'tabs': {
                this.setState({
                    update: {
                        tabs: updates,
                        dropdown: {},
                        spinner: {}
                    }
                });
                break;
            }
        }
    }
    render() {
        var {update} = this.state;

        const childrenWithProps = React.Children.map(this.props.children,
            (child) => React.cloneElement(child, {
                update: update
            })
        );
        
        return (
            <form id="form">
                {childrenWithProps}
            </form>
        );
    }
}