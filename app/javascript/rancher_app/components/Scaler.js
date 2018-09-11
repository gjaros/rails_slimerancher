import React from 'react';

export default class Scaler extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customStyles: props.customStyles,
      children: props.children,
      aspectRatio: [],
      scalerWidth: undefined,
      scalerHeight: undefined,
      scale: 1
    };
  }
  //Before mounting, add resize event listener to window to call resizeScaler.
  componentWillMount() {
    window.addEventListener('resize', this.resizeScaler);
  }
  //Finds aspectRatio of image, triggers first resize.
  componentDidMount() {
    this.setState(
      () => ({ aspectRatio: [document.getElementById('scaler').getElementsByTagName('img')[0].naturalWidth, document.getElementById('scaler').getElementsByTagName('img')[0].naturalHeight] }),
      () => { this.resizeScaler() }
    );
  }
  //Keeps any props of children updated inside Scaler.
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setState({ children: this.props.children });
    }
  }
  resizeScaler = () => {
    //Resizes scaler window if content size is greater than application window size.
    if (this.state.aspectRatio[0] > window.outerWidth || this.state.aspectRatio[1] > window.outerHeight) {
      this.setState(() => {
        const aspectRatio = this.state.aspectRatio;
        let differenceX = (window.outerWidth/aspectRatio[0]);
        let differenceY = (window.outerHeight/aspectRatio[1]);

        return {
          scale: (differenceX < differenceY ? differenceX : differenceY),
          scalerWidth: (aspectRatio[1]/aspectRatio[0]) * outerHeight,
          scalerHeight: (aspectRatio[1]/aspectRatio[0]) * outerWidth,
        };
      });
    }
  }
  incScale = () => {
    if (this.state.scale < 1.75) {
      this.setState({ scale: this.state.scale + .1 });
    }
  }
  decScale = () => {
    if (this.state.scale > .25) {
      this.setState({ scale: this.state.scale - .1 });
    }
  }
  render() {
    return (
      <div
        className='scaler-container'
        style={{ ...this.state.customStyles.scalerContainer }}
      >
        <div className='button-bar'>
          <button className='button-bar__L' style={{ ...this.state.customStyles.buttonL }} onClick={this.incScale}>+</button>
          <button className='button-bar__R' style={{ ...this.state.customStyles.buttonR }} onClick={this.decScale}>-</button>
          {/*
            //diagnostic stuff
            <p style={{ backgroundColor: 'white' }}><strong>Scale: {this.state.scale}</strong></p>
            <p style={{ backgroundColor: 'white' }}><strong>Outer  W x H: {Math.floor(window.outerWidth)} x {Math.floor(window.outerHeight)}</strong></p>
            <p style={{ backgroundColor: 'white' }}><strong>Scaler W x H: {Math.floor(this.state.scalerWidth)} x {Math.floor(this.state.scalerHeight)}</strong></p>
          */}
        </div>
        <div
          id='scaler'
          style={
            {
              height: this.state.scalerHeight + 'px',
              width: this.state.scalerWidth + 'px',
              transform: 'scale(' + this.state.scale + ')',
              transformOrigin: '0 0'
            }
          }
        >
          {this.state.children}
        </div>
      </div>
    );
  }
}

Scaler.defaultProps = {
  customStyles: {}
}
