import React from "react";

export class PercentValidInputCounter extends React.Component {
    render() {
        const allCharts = this.props.text.toString().length
        const invalidCountCharts = this.props.invalidCount

        return <p>Accuracy: {(100 - invalidCountCharts / allCharts * 100).toFixed(2)}%</p>
    }
}
