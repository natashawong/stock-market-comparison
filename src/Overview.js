import React, {Component} from 'react';
import './Overview.css';
import StockChart from './Components/StockChart';
import Select from 'react-select';


const options = [
    { value: '100s', label: "VTSMX (Stock)"},
    { value: 'todo', label: "More to come!"},
]

export default class Overview extends Component {
    constructor(props) {
        super(props)
        this.state= {
            selectedOption: '',
        }
    }

    handleChange = selectedOption => {
        this.setState({ selectedOption });
    };

    render() {
     return (
         <div className="mainPage">
             <h2>Portfolio Benchmark</h2>
             <h4>Please give it a couple seconds – Yahoo Finance API takes a while.</h4>

             <div className="comparisonTool">
                <div className="apple">
                    <div style={{padding: 15}}>
                    <h5>Benchmark Stock</h5>
                    <h4 style={{color: "#2f79d7"}}>Apple Stock</h4>
                    </div>
                </div>

                <div className="benchmark">
                    <div style={{padding: 30}}>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChange}
                            options={options}
                            placeholder={'Which benchmark do you want to compare?'}
                        />
                    </div>
                </div>

             </div>
             <div>
                <StockChart/>
            </div>

         </div>
      )
    }
}