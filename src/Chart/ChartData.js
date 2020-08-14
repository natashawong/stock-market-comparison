import React, {Component} from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { timeConverterUtil, momentManipulations } from '../util/util';

const axios = require('axios');

export default class ChartData extends Component {    
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }  

    // Chart options
    currency = "SGD" || "USD"
    timeScale = "1d" || "1wk" || "1mo"
    timePeriod2 = momentManipulations.today
    timePeriod1 = momentManipulations.monthBefore
    frequency = "1mo"

    renderTimeAndCurrency() {
        this.currency = this.props.selectedCurrency === 0 ? "SGD" : "USD"
        switch (this.props.selectedTime) {
            // 1 month
            case 0:
                this.timePeriod1 = momentManipulations.monthBefore
                this.timeScale = "withinYTD";
                this.frequency = "1d";
                break;
            // 6 months
            case 1: 
                this.timePeriod1 = momentManipulations.six_monthBefore
                this.timeScale = "withinYTD";
                this.frequency = "1wk"
                break
            // Year-to-date
            case 2:
                this.timePeriod1 = momentManipulations.yearToDate
                this.timeScale = "withinYTD";
                this.frequency = "1wk"
                break
            // 1 year
            case 3:
                this.timePeriod1 = momentManipulations.yearBefore
                this.timeScale = "afterYTD";
                this.frequency = "1mo"
                break
            // 5 years
            case 4:
                this.timePeriod1 = momentManipulations.five_yearBefore
                this.timeScale = "afterYTD";
                break
            // Max
            case 5:
                this.timePeriod1 = momentManipulations.maxBefore
                this.timeScale = "afterYTD";
                break
            // 1 month as default
            default:
                this.timePeriod1 = momentManipulations.monthBefore
                this.timeScale = "withinYTD";
                break;
            }
        }

    getData() {
        const tempData = []
        this.renderTimeAndCurrency();
        const frequency = this.frequency
        const timePeriod1 = this.timePeriod1
        const timePeriod2 = this.timePeriod2
        const currency = this.currency

        // API options
        const url = "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-historical-data"
        const headers = {
            "content-type":"application/octet-stream",
            "x-rapidapi-host":"apidojo-yahoo-finance-v1.p.rapidapi.com",
            "x-rapidapi-key":"9e901d7e23msh1a11b2cabdd5037p1538d9jsn8030aa49c4df"
        }

        function SAdata() {
            return axios({
                "method":"GET", "url": url, "headers": headers,
                "params": {
                    "frequency": frequency,
                    "filter": "history",
                    "period1": timePeriod1,
                    "period2": timePeriod2,
                    "symbol": "AAPL",
                },
            })
        }

        function VTSMX() {
            return axios({
                "method":"GET", "url": url, "headers": headers,
                "params":{
                    "frequency": frequency,
                    "filter":"history",
                    "period1":timePeriod1,
                    "period2":timePeriod2,
                    "symbol":"VTSMX"
                }
            })
        } 

        Promise.all([SAdata(), VTSMX()])
        .then(axios.spread((SA, SMX) => {
            const SAprices = SA.data.prices
            const SMXprices = SMX.data.prices

            for (var i = 0; i < SMXprices.length; i++) {

                if (currency === "USD") {
                    // multipliers normalize to 100k
                    const SAmultiplier = 100000/(SAprices[SAprices.length-1].close)
                    const SMXmultiplier = 100000/(SMXprices[SMXprices.length-1].close)
                    
                    tempData.push({
                        date: timeConverterUtil(SAprices[i]?.date, this.timeScale),
                        SA: Math.round((SAprices[i]?.close) * SAmultiplier),
                        SMX: Math.round((SMXprices[i]?.close) * SMXmultiplier),
                    })

                } else if (currency === "SGD") {
                    const SAmultiplierSGD = 100000/(1.45 * (SAprices[SAprices.length-1].close))
                    const SMXmultiplierSGD = 100000/(1.45 * (SMXprices[SMXprices.length-1].close))
                    
                    tempData.push({
                        date: timeConverterUtil(SAprices[i]?.date, this.timeScale),
                        SA: Math.round((1.45 * SAprices[i]?.close) * SAmultiplierSGD),
                        SMX: Math.round((1.45 * SMXprices[i]?.close) * SMXmultiplierSGD),
                    })
                }
            }

            // API returns data from most recent to oldest, so reverse is used
            this.setState({data: tempData.reverse()})
        }))
        .catch((error)=>{
            console.log(error)
        })
    }

    componentDidMount() {
        this.getData();
    }

	componentDidUpdate(prevProps) { 
        if (prevProps.selectedTime !== this.props.selectedTime || prevProps.selectedCurrency !== this.props.selectedCurrency) {
            this.getData()
        }
    }

    legendText = (value) => {
        return <span style={{color: '#a8b2bb'}}>{value}</span>;
    }

	render() {
		return (
            <ResponsiveContainer>
            <LineChart data={this.state.data} margin={{left: 65}}>
                <CartesianGrid vertical={false} stroke="#a8b2bb"/>
                <Line type="monotone" dataKey="SA" stroke="#3bb7dd" id="SA" dot={false} />
                <Line type="monotone" dataKey="SMX" stroke='#dcac3d' dot={false} />
                <XAxis dataKey="date" minTickGap={5}/>
                <YAxis width={40} axisLine={false} tickMargin={20}/>
                <Legend 
                    formatter={this.legendText} 
                    payload={[{ value: 'Apple', color: "#3bb7dd", type: 'line', id:"SA"}, 
                    {value: 'VTSMX (Stock)', color: '#dcac3d', type: 'line', id:'SMX' }]}
                />
                <Tooltip />
            </LineChart>  
            </ResponsiveContainer>
		);
    }
}