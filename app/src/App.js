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


/*
TODO:
- Make working cancel button
- Get response -> Classification screen
*/

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      pictures: [],
      classification: [],
      data: []
    };
    this.onDrop = this.onDrop.bind(this);
    this.cancel = this.cancel.bind(this);
    this.onResponse = this.onResponse.bind(this);
  }

  cancel() {
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
    let datalist = [];
    for (let i in response) {
      let data = {};
      data.y = response[i];
      data.x = labels[i];
      datalist.push(data);
    }
    this.setState({data: datalist});
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
        <Card className="center">
          <CardText>
            <Row>
              <Col xs={12} md={6}>
                <p className={this.state.pictures.length < 1 ? 'App-intro': 'hide'}>
                  Welcome to the Canabis plant disease classifier, upload an image to classify it.
                </p>
                <div className={this.state.pictures.length < 1 ? 'hide': 'analysis'}>
                  {
                    this.state.classification.length < 1 ? <div>
                      <CircularProgress />
                      Analizing...
                    </div>: <div>
                      <VictoryPie
                        data={this.state.data}
                        innerRadius={100}
                        colorScale={["green", "yellow", "grey", "red"]}
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
