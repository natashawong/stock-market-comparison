/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable eqeqeq */
import React, {Component} from 'react';
import './Header.css';

export default class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {activeTab: 0}
    this.handleClick = this.handleClick.bind(this);
  }  
  
  handleClick(index) {
      this.setState({
          activeTab: index
      });
    }

    render() {
      const name = "Natasha"
     return (
        <div className='bigBox'>
          <div className='topNav'>
            <span>
              <a href="/">Home</a>
              <a href="/">Support</a>
              <a href="/">{name}</a>
            </span>
          </div>

          <div className='title'>
          <h1 style={{margin: 0, paddingTop: 25}}>Stock Market Comparison</h1>
          </div>

          <div className='bottomNav'>
            <a href="#" onClick={() => this.handleClick(0)} className={this.state.activeTab == 0 ? "activeTab" : null}>Overview</a>
            <a href="#" onClick={() => this.handleClick(1)} className={this.state.activeTab == 1 ? "activeTab" : null}>Assets</a>
            <a href="#" onClick={() => this.handleClick(2)} className={this.state.activeTab == 2 ? "activeTab" : null}>Projections</a>
            <form id="additionalActions">More actions</form>
          </div>
        </div>
      );
     }
}