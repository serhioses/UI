import React from 'react';

export default class UI extends React.Component {
    constructor(props) {
        super(props);
    }
    handleUIUpdate(uiType, variable) {
        var property = this.props.update[uiType].property,
            value = this.props.update[uiType].value,
            indexes = this.props.update[uiType].indexes,
            update = {};

        if (property !== undefined && value !== undefined) {
            update[property] = value;
            
            indexes.forEach((idx, i) => {
                this[variable][parseInt(idx, 10)].reinit(update);
            });
        }
    }
    render() {
        return null;
    }
}