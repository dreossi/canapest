import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ImageUploader from './react-image-upload';
// import Webcam from './Webcam';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import spacing from 'material-ui/styles/spacing';
import withWidth, {MEDIUM, LARGE} from 'material-ui/utils/withWidth';
import {darkWhite, lightWhite, grey900} from 'material-ui/styles/colors';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from 'material-ui/Card';
import WarningIcon from 'material-ui/svg-icons/alert/warning';
import { Row, Col } from 'react-flexbox-grid';
import CircularProgress from 'material-ui/CircularProgress';
import Theme from './Theme.js';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { VictoryPie } from 'victory-pie';
import PieChart from "react-svg-piechart"


/*
TODO:
- Make working cancel button
*/

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      pictures: [],
      classification: [],
      data: [],
      analysis: {}
    };
    this.onDrop = this.onDrop.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onResponse = this.onResponse.bind(this);
  }

  onCancel() {
    this.setState({
      pictures: []
    });
  }

  onDrop(picture) {
    console.log(this);
    this.setState({
      pictures: this.state.pictures.concat(picture),
    });
  }

  onResponse (response) {
    this.setState({classification: response});
    let labels = ['Healthy', 'Deficiency', 'Powder', 'Burn'];
    let colors = ["#72E39E", "#FAE29C", "#F95F75", "#FF7F50"];
    let datalist = [];
    for (let i in response) {
      let data = {};
      data.y = response[i];
      data.x = labels[i];
      data.title = labels[i] + ": " + String(Math.round(response[i] * 100)) + " %";
      data.value = response[i];
      data.color = colors[i];
      datalist.push(data);
    }

    let decision = response.indexOf(Math.max(...response));
    let report = {
      x: datalist[decision].x,
      y: Math.round(datalist[decision].y * 100),
    }
    this.setState({data: datalist});
    this.setState({analysis: report});
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(Theme)}>
        <AppBar
          title={<span style={{cursor: 'pointer'}}>Cannapest</span>}
          iconElementLeft={
            <img src={logo} className="App-logo" alt="logo" />
          }
        />
        <Card className="center" style={{height: 1000}}>
          <CardText>
            <Row>
              <Col xs={12} md={6} className="center">
                <div className={this.state.pictures.length < 1 ? 'App-intro': 'hide'}>
                  <h3>Welcome to the Cannabis disease classifier!</h3>
                  <h4>Upload an image to classify it.</h4>
                </div>
                <div className={this.state.pictures.length < 1 ? 'hide': 'analysis'}>
                  {
                    this.state.classification.length < 1 ? <div>
                      <CircularProgress />
                      Analizing...
                    </div>: <div>
                      <h1>{this.state.analysis.x}</h1>
                      <h3>Confidence: {this.state.analysis.y} %</h3>
                      <PieChart
                        data={this.state.data}
                        expandOnHover={true}
                        expandSize={5}
                        shrinkOnTouchEnd={false}
                        strokeColor="#fff"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        viewBoxSize={100}
                      />
                    </div>
                  }
                </div>
              </Col>
              <Col xs={12} md={6}>
                <ImageUploader
                    buttonText='Upload image'
                    onChange={this.onDrop}
                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                    maxFileSize={5242880}
                    withPreview={true}
                    onResponse={this.onResponse}
                    onCancel={this.onCancel}
                    withIcon={this.state.pictures.length < 1 ? true: false}
                    withLabel={false}
                    buttonClassName={this.state.pictures.length < 1 ? 'chooseFileButton': 'hide'}
                />
              </Col>
            </Row>
          </CardText>
        </Card>
      </MuiThemeProvider>
    );
  }
}

export default App;
