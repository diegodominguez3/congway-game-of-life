import React, {Component} from 'react'; 
import './Cell.css';

class Cell extends Component {
    color = {
        1: 'white',
        0: 'black'
    }

    inlineStyles = {
        backgroundColor : this.color[this.props.value],
        width : `calc(100%/${this.props.columns})`
    }

    render() {
        return (
            <div className="Cell" style={this.inlineStyles}></div>
        );
    }
}

export default Cell