import React, {Component} from 'react'; 
import uuid from 'react-uuid'; 
import Cell from './Cell'; 
import './Grid.css'

class Grid extends Component {
    initialState = {
        cols: 20,
        rows: 30,
        grid: []
    }
    constructor(props) {
        super(props);
        this.state = {...this.initialState, bounds: true}; 

        this.makeGrid = this.makeGrid.bind(this); 
        this.getNextGen = this.getNextGen.bind(this); 
        this.handleRestart = this.handleRestart.bind(this); 
    }

    componentDidMount() {
        this.setState({grid: [...this.setupGrid()]});
    }

    componentDidUpdate() {
        this.delayState();
    }

    delayState() {
        setTimeout(() => {
            this.getNextGen();
        }, 300);
    }

    // function to create an empty 2D Array
    makeGrid(cols, rows) {
        let arr = new Array(cols); 
        for (let i= 0; i < arr.length; i++) {
            arr[i] = new Array(rows); 
        }
        return arr; 
    }

    // function to setup 2D Array with actual values taken from state
    setupGrid() {
        const {cols, rows} = this.state; 
        let newGrid = this.makeGrid(cols, rows);
        for(let i = 0; i < cols; i ++) {
            for (let j = 0; j < rows; j++) {
                newGrid[i][j] = Math.floor((Math.random() * 2)); 
            }
        }
        return newGrid; 
    }

    getNextGen() {
        const {cols, rows, grid, bounds} = this.state; 
        const next = this.makeGrid(cols,rows); 
        for(let i = 0; i < cols; i ++) {
            for (let j = 0; j < rows; j++) {
                let state = grid[i][j]; 
                //edges
                if((i === 0 || i === cols -1 || j === 0 || j === rows - 1) && bounds) {
                    next[i][j] = state;
                }
                else {
                    //count live neighbors
                    let neighbors = this.countNeighbors(grid, i, j); 
                    if(state === 0 && neighbors === 3) {
                        next[i][j] = 1; 
                    } else if(state === 1 && (neighbors < 2 || neighbors > 3)) {
                        next[i][j] = 0; 
                    } else {
                        next[i][j] = state; 
                    }
                }
            }
        }

        this.setState({grid: [...next]})
    }

    countNeighbors(grid, x, y) {
        let res = 0; 
        const {cols, rows} = this.state; 
        for (let i=-1; i < 2; i++) {
            for(let j=-1; j < 2; j++) {
                let col = (x + i + cols) % cols; 
                let row = (y + j + cols) % rows;
                res += grid[col][row];
            }
        }
        //dont count myself
        res -= grid[x][y]; 
        return res; 
    }

    renderGrid() {
       const grid = this.state.grid;
       return (
           grid.map(row => {
               return (
                    <div className="row" key={uuid()}>
                       {row.map(cellVal => {
                           return (
                            <Cell key={uuid()} value={cellVal} columns={this.state.cols}/>
                           );
                       })}
                   </div>
               );
           })
       );
    }
    

    handleRestart() {
        this.setState({...this.initialState, bounds: this.state.bounds}); 
        this.setState({grid: [...this.setupGrid()]}); 
    }

    handleBoundsToggle = () => {
        this.setState({ bounds: !this.state.bounds });
    }

    render() {
        return (
            <React.Fragment>
                <div className="Grid">
                    <div className="actions">
                        <button className="ui button primary" onClick={this.handleRestart}>Restart</button>
                        <div className="ui toggle checkbox">
                            <input type="checkbox" name="public" checked={this.state.bounds} onChange = {this.handleBoundsToggle}/>
                            <label>Enable bounds</label>
                        </div>
                    </div>
                    <div style={{marginTop: '20px'}}>{this.renderGrid()}</div>
                </div>
            </React.Fragment>
        );
    }
}

export default Grid; 