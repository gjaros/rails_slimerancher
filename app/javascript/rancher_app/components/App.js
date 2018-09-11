import React from 'react';
import Plot from './Plot';
import SiteUI from './SiteUI';
import Scaler from './Scaler';
import { connect } from 'react-redux';

let scalerStyles = {
  scalerContainer: {
    backgroundColor: '#60b6ff',
    borderBottom: 'solid grey 1px'
  },
  buttonL: {
    backgroundColor: '#79ff4d',
    borderColor: '#79ff4d',
    filter: '40%',
    borderRight: 'none'
  },
  buttonR: {
    backgroundColor: '#ff4d4d',
    borderColor: '#ff4d4d',
    filter: '40%',
    borderLeft: 'none'
  }
}

const Rancher_App = (props) => (
  <div>
    {/* Renders map image and a <Plot /> for each location */}
    <Scaler customStyles={scalerStyles}>
      <img src={require('../images/Map-Stylized.png')} />
      {
        props.plots.map((plot, index) => (
          <Plot key={index} {...plot} />
        ))
      }
    </Scaler>
    <SiteUI plots={props.plots} outlines={props.outlines} dispatch={props.dispatch}/>
  </div>
);

const mapStateToProps = (state) => {
  return {
    plots: state.plotsReducer,
    outlines: state.outlinesReducer
  };
}

export default connect(mapStateToProps)(Rancher_App);
