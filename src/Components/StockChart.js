/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component} from 'react';
import ChartData from '../Chart/ChartData';
import './StockChart.css'
 
export default class StockChart extends Component {	
  constructor() {
    super()
    this.state={
      activeTime: 0,
      activeCurrency: 0,
    }
  }

  handleTimeClick(time) {
    this.setState({activeTime: time})
  }

  handleCurrencyClick(currency) {
    this.setState({activeCurrency: currency})
  }

    render() {
     return (
       <div className="chartContainer">
         <div className="options">
          <span id="timePeriod">
            <a href="#" onClick={() => this.handleTimeClick(0)} className={this.state.activeTime == 0 ? "activeOption" : "default"}>1 month</a>
            <a href="#" onClick={() => this.handleTimeClick(1)} className={this.state.activeTime == 1 ? "activeOption" : "default"}>6 months</a>
            <a href="#" onClick={() => this.handleTimeClick(2)} className={this.state.activeTime == 2 ? "activeOption" : "default"}>Year-to-date</a>
            <a href="#" onClick={() => this.handleTimeClick(3)} className={this.state.activeTime == 3 ? "activeOption" : "default"}>1 year</a>
            <a href="#" onClick={() => this.handleTimeClick(4)} className={this.state.activeTime == 4 ? "activeOption" : "default"}>5 years</a>
            <a href="#" onClick={() => this.handleTimeClick(5)} className={this.state.activeTime == 5 ? "activeOption" : "default"}>Max</a>
          </span>

          <span id="currency">
            <a href="#" onClick={() => this.handleCurrencyClick(0)} className={this.state.activeCurrency == 0 ? "activeOption" : "default"}>SGD</a>
            <a href="#" onClick={() => this.handleCurrencyClick(1)} className={this.state.activeCurrency == 1 ? "activeOption" : "default"}>USD</a>
          </span>
         </div>

        <div className="chartInfo">
                <h2 style={{color: "#a8b2bb"}}>Portfolio value based on gross returns</h2>
                <p style={{color: "#a8b2bb"}}>Gross returns sources from Yahoo Finance and exchange rates from Morningstar as of 25th March 2020</p>
                <div className="chartData">
                  <ChartData selectedTime={this.state.activeTime} selectedCurrency={this.state.activeCurrency}/>
                </div>
        </div>

       </div>
      );
    }
  }