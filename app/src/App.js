import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ImageUploader from 'react-images-upload';
import { Spin } from 'antd';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { pictures: [] };
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(picture) {
    console.log(picture);
    this.setState({
      pictures: this.state.pictures.concat(picture),
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Canapest</h1>
        </header>
        <p className="App-intro">
          Welcome to the Canabis plant disease classifier, upload an image to classify it.
        </p>
        <ImageUploader
            withIcon={true}
            buttonText='Upload image'
            onChange={this.onDrop}
            imgExtension={['.jpg', '.gif', '.png', '.gif']}
            maxFileSize={5242880}
            withPreview={true}
            withLabel={false}
        />
        <Spin size="large" />
      </div>
    );
  }
}

export default App;
