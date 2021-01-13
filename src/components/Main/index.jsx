import React from 'react';
import StatusBar from '../StatusBar/';
import {
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area,
} from 'recharts';

import './main.css';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {      
      socket: 'ws://localhost:8999',
      messages: [],
      id1: {},
      id2: {},
      graphArr: Array(10).fill({legend: undefined, ID1: undefined, ID2: undefined }),
      status: {
        server: '',
        info: '',
        error: false
      },
    };
  } 

  componentDidMount(){
    // initializing Socket
    this.socket = new WebSocket(this.state.socket);
    this.setState({status: {...this.state.status, server: this.state.socket} });

    // connected successfully
    this.socket.onopen = () => {
      this.setState({status: {...this.state.status, 
                              info: "Connected", 
                              error: false
      }});
    };

    // received data from device and format it
    this.socket.onmessage = event => { 
      let messages = JSON.parse(event.data);
      this.setState({messages});
      this.setState({id1: messages[0]});
      this.setState({id2: messages[1]});
      this.draw();
    };

    // encountered error
    this.socket.onerror = err => {
      this.setState({status: {...this.state.status, 
        info: `Socket encountered error: ${err.message}. Closing socket`, 
        error: true
      }});
      this.socket.close();
    };

    // connection lost
    this.socket.onclose = event => {
      if (event.wasClean)
          this.setState({status: {...this.state.status, 
            info: `Socket was closed clearly, code=${event.code}`, 
            error: true
          }});
        else
          this.setState({status: {...this.state.status, 
            info: 'The connection was lost', 
            error: true
          }});
    };
  };

  // create and modifying incoming data + check data values less then 100
  draw = () => {
    if (this.state.id1.data<=100 && this.state.id2.data<=100) {
      let array = [...this.state.graphArr];
      array.shift();
      array.push({legend: array.length + 1, ID1: this.state.id1.data, ID2: this.state.id2.data });
      this.setState({graphArr: array.map((item, idx) => { 
        return {...item, legend: (idx+1).toString()}
      })});
    }
  }
  
  hundred = number => { if (number > 100) return "warning" };

  render() {
    return (
      <div className="container">
        <header className="header">
          <div className="header__trunc">
            <p className="header__trunc__title">WILIOT</p>
            <p className="header__trunc__subtitle">Demo version</p>
          </div>
        </header>

        <div className="wrapper">
          <div className="temp">
            <span className="temp__block">
              <p className="temp__block__id">ID1</p>
              <p>Temperature: <strong>{this.state.id1.temperature}</strong> &deg;C; &nbsp;
                <span className={this.hundred(this.state.id1.data)}>
                  data: <strong>{this.state.id1.data}</strong>.
                </span>
              </p>
            </span>
            <span className="temp__block-space">&nbsp;</span>
            <span className="temp__block">
              <p className="temp__block__id">ID2</p>
              <p>Temperature: <strong>{this.state.id2.temperature}</strong> &deg;C; &nbsp;
                <span className={this.hundred(this.state.id2.data)}>
                  data: <strong>{this.state.id2.data}</strong>.
                </span>
              </p>
            </span>
          </div>

          <ResponsiveContainer height={400} debounce={1}>
            <AreaChart
              data={this.state.graphArr}
              margin={{ top: 20, right: 0, left: 10, bottom: 5 }}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#002df4" stopOpacity={0.6}/>
                  <stop offset="95%" stopColor="#002df4" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#b100ba" stopOpacity={0.45}/>
                  <stop offset="95%" stopColor="#b100ba" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="legend" />
              <YAxis label={{ value: 'Data', angle: -90, offset: 0, position: 'insideLeft', 
                     fontSize: 25, fontWeight: 'bold' }} 
              />
              <Legend iconSize={20} />
              <Tooltip />
              <Area type="monotoneX" dataKey="ID1" stroke="#002df4" strokeWidth={2} 
                    fillOpacity={1} fill="url(#colorUv)"
                    animationDuration={700} animationEasing="ease-in-out"
              />
              <Area type="monotoneX" dataKey="ID2" stroke="#b100ba" strokeWidth={2} 
                    fillOpacity={1} fill="url(#colorPv)" 
                    animationDuration={700} animationEasing="ease-in-out"
              />
            </AreaChart>
          </ResponsiveContainer>

          <StatusBar status={this.state.status} />
        </div>
      </div>
    );
  }
};

// <LineChart
//   data={this.state.graphArr}
//   margin={{ top: 20, right: 0, left: 0, bottom: 5 }}
// >
//   <CartesianGrid strokeDasharray="3 3" />
//   <XAxis dataKey="legend" />
//   <YAxis />
//   <Legend iconSize={20} />
//   <Line type="monotoneX" dataKey="ID1" stroke="#002df4" strokeWidth={2} 
//     animationDuration={700} animationEasing="ease-in-out"
//   />
//   <Line type="monotoneX" dataKey="ID2" stroke="#b100ba" strokeWidth={2} 
//     animationDuration={700} animationEasing="ease-in-out"              
//   />
// </LineChart>