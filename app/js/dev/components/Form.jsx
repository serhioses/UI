import React from 'react';

export default class Form extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            update: {
                dropdown: {}
            }
        };
    }
    componentDidMount() {
        var form = document.getElementById('form');

        form.addEventListener('change', this.handleChange);
    }
    handleChange(e) {
        var target = $(e.target),
            uiType = target.data('ui'),
            propName, propType, updates;

        // if (target[0].type.toLowerCase() === 'text' || target[0].type.toLowerCase() === 'number') {
        //     console.log('input typing');
        //     return;
        // }

        if (!uiType) {
            console.log('uiType error');
            return;
        }

        propName = target.data('property');
        propType = target.data('property-type');
        updates = this.state.update[uiType];

        if (!updates) {
            console.log('no updates found');
            return;
        }

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
        
        switch (uiType) {
            case 'dropdown': {
                this.setState({
                    update: {
                        dropdown: updates
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