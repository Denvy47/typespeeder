import React from "react";

export class InputCounter extends React.Component {
    render() {
        return <p>Correct symbols: {this.props.value}</p>
    }
}
