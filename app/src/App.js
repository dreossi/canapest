import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ImageUploader from 'react-images-upload';
import Webcam from 'react-webcam';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { pictures: [] };
    this.onDrop = this.onDrop.bind(this);
  }

  setRef = (webcam) => {
    this.webcam = webcam;
  }

  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
    console.log(imageSrc);
    this.onDrop(imageSrc);
  };

  onDrop(picture) {
    this.setState({
      pictures: this.state.pictures.concat(picture),
    });

    console.log(picture);

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
        {
          // this.state.pictures.map((picture, index) => {
          //   return (
          //     <div key={index} className="uploadPictureContainer">
          //       <img src={picture} className="uploadPicture" alt="preview"/>
          //     </div>
          //   );
          // })
        }
        {
        // <Webcam
        //   audio={false}
        //   height={350}
        //   ref={this.setRef}
        //   screenshotFormat="image/jpeg"
        //   width={350}
        // />
        // <button onClick={this.capture}>Capture photo</button>
        }
      </div>
    );
  }
}

export default App;
