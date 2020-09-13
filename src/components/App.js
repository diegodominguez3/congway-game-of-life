import React, {Component} from 'react'; 
import Grid from './Grid'; 

class App extends Component {
    render() {
        return (
            <div className="ui container" style={{marginTop: '20px'}}>
                <Grid />
            </div>
        );
    }
}

export default App; 