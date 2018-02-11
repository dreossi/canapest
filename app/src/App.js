import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ImageUploader from './react-image-upload';
import Webcam from './Webcam';
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


/*
TODO:
- add cancel button
*/

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { pictures: [] };
    this.onDrop = this.onDrop.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  cancel() {
    console.log(this);
    this.setState({
      pictures: []
    });
  }

  onDrop(picture) {
    this.setState({
      pictures: this.state.pictures.concat(picture),
    });

    fetch('http://localhost:5000/upload_image/', {
      method:'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      file: picture
    }).then((data)=> {
      console.log(data)
    });
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
                  Analizing...
                  <CircularProgress />
                  <RaisedButton
                    label="Cancel"
                    secondary={true}
                    onClick={this.cancel}
                    // icon={<FontIcon className="muidocs-icon-custom-github" />}
                  />
                </div>
              </Col>
              <Col xs={12} md={6}>
                <ImageUploader
                    buttonText='Upload image'
                    onChange={this.onDrop}
                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                    maxFileSize={5242880}
                    withPreview={true}
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
