import React from 'react';
import * as d3 from 'd3';

import { runSimulator, transformData } from './utils';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      possibleOutcomes: 2,
      priceToPlay: 1,
      reward: 1,
      numberOfPlays: 1,
      shouldShowRawData: true,
      data: [],
      transformedData: {}
    }

    this.updateField = this.updateField.bind(this);
    this.runSimulator = this.runSimulator.bind(this);
    this.resetData = this.resetData.bind(this);
    this.toggleShowData = this.toggleShowData.bind(this);
    this.createChart = this.createChart.bind(this);
    this.createGraph = this.createGraph.bind(this);
  }

  updateField(e, field) {
    this.setState({
      [field]: e.target.value
    });
  }

  runSimulator(num) {
    const { numberOfPlays, possibleOutcomes, data } = this.state;
    if (num === undefined) {
      num = numberOfPlays || 1;
    }

    let temp = data.slice(0);
    for(let i = 0; i < num; i++) {
      temp.push(runSimulator(possibleOutcomes));
    }

    this.setState({data: temp, transformedData: transformData(temp)});
  }

  resetData() {
    this.setState({data: []});
  }

  toggleShowData() {
    const { shouldShowRawData } = this.state;
    this.setState({shouldShowRawData: !shouldShowRawData})
  }

  createChart() {
    console.log('create chart');
    const { data, transformedData } = this.state;

    const padding = 100;
    const width = 500;
    const height = 500;

    const xScale = d3.scaleBand().range ([0, width]).padding(0.4);
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(transformedData)])
      .range([0, height - 100])

    xScale.domain(transformedData.map((d, i) => i));
    // yScale.domain([0, d3.max(transformedData)]);

    const svg = d3.select('#chart')
    .attr('height', '500px')
    .attr('width', '500px')
    .attr('padding', `${padding}px`)
    .style('border', '1px solid black')

    var g = svg.append("g");

    g.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(xScale));

    g.append('g')
      .

    g.selectAll('.bar')
      .data(transformedData)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', (d, i) => i * 45)
      .attr('y', d => height)
      .attr('height', 0)
      .attr('height', d => yScale(d))
      .attr('y', d => height - yScale(d))

    this.forceUpdate();
  }

  createGraph() {
    console.log('create graph')
    const { data, transformedData } = this.state;
  }

  render() {
    return (
      <div className='App'>
        <div className='leftCol'>
          <h2>Controls: </h2>

          <div>
            <h3>Settings: </h3>
            <div className='field'>
              <label className='inputLabel'>Possible Outcomes: </label>
              <input
                className='inputField'
                type='number'
                value={this.state.possibleOutcomes}
                onChange={e => this.updateField(e, 'possibleOutcomes')}
              />
            </div>
            <div className='field'>
              <label className='inputLabel'>Price to Play: </label>
              <input
                className='inputField'
                type='number'
                value={this.state.priceToPlay}
                onChange={e => this.updateField(e, 'priceToPlay')}
              />
            </div>
            <div className='field'>
              <label className='inputLabel'>Reward: </label>
              <input
                className='inputField'
                type='number'
                value={this.state.reward}
                onChange={e => this.updateField(e, 'reward')}
              />
            </div>
          </div>

          <div>
            <h3>Plays: </h3>
            <div className='field'>
              <label className='inputLabel'>Number of Plays: </label>
              <input
                className='inputField'
                type='number'
                value={this.state.numberOfPlays}
                onChange={e => this.updateField(e, 'numberOfPlays')}
              />
            </div>
            <div className='buttonRow'>
              <button onClick={() => this.runSimulator()}>Run X times</button>
              <button onClick={() => this.runSimulator(1)}>Run Once</button>
              <button onClick={() => this.runSimulator(5)}>Run 5</button>
              <button onClick={() => this.runSimulator(100)}>Run 100</button>
              <button onClick={() => this.runSimulator(1000)}>Run 1000</button>
            </div>
            <button className='resetButton' onClick={this.resetData}>RESET DATA</button>
          </div>
        </div>
        <div className='rightCol'>
          <div className='chartDiv'>
            <div className='section'>
              <h4>Chart:</h4>
              <button onClick={this.createChart}>Create Chart</button>
            </div>
            <div className='chart'>
              <svg id='chart'/>
            </div>
          </div>

          <div className='graphDiv'>
            <div className='section'>
              <h4>Graph:</h4>
              <button onClick={this.createGraph}>Create Graph</button>
            </div>
            <div className='graph'></div>
          </div>

          <div className='rawDataDiv'>
            <button onClick={this.toggleShowData}>Show/Hide Raw Data</button>
            {this.state.shouldShowRawData &&
            <pre className='rawData'>
              <span>Transformed:</span>
              {JSON.stringify(this.state.transformedData, null, 4)}
              <br />
              <span>Data:</span>
              {JSON.stringify(this.state.data, null, 4)}
            </pre>}
          </div>
        </div>
      </div>
    )
  }
}

export default App;
