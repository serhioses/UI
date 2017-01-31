import React from 'react';

export default class Form extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            update: {
                dropdown: {

                }
            }
        };
    }
    handleChange(e) {
        var target = $(e.target),
            uiType = target.data('ui'),
            propName = target.data('property'),
            propType = target.data('property-type'),
            updates = this.state.update[uiType];

        updates.property = propName;
        if (propType === 'boolean') {
            updates.value = target.is(':checked');
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
            <main className="main">
                <form onChange={this.handleChange}>
                    {childrenWithProps}
                </form>
            </main>
        );
    }
}