import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ImageUploader from 'react-images-upload';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { pictures: [] };
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(picture) {
    this.setState({
      pictures: this.state.pictures.concat(picture),
    });

    // fetch('/upload_image/', {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     firstParam: 'yourValue',
    //     secondParam: 'yourOtherValue',
    //   }),
    // });
    fetch('http://localhost:5000/upload_image/', {
      method:'POST',
      body: picture
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
      </div>
    );
  }
}

export default App;
