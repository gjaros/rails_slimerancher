import React from 'react';
import Plot from './Plot';
import { connect } from 'react-redux';
import { loadState } from '../actions/actions';

const Rancher_App = (props) => (
  <div>
    <div className="map">
      <img src={require('../images/Map-Stylized.png')} />
      <div>
        {
          props.plots.map((plot, index) => (
            <Plot key={index} {...plot} />
          ))
        }
      </div>
    </div>
    <p>Paste Your Layout Here!</p>
    <div>
      <input type="text" onChange={(e) => {
        props.dispatch(loadState(e.target.value))
      }}/>
    </div>
    <div className="JSON-string">
      { JSON.stringify(props.plots) }
    </div>
  </div>
);

const mapStateToProps = (state) => {
  return {
    plots: state
  };
}

export default connect(mapStateToProps)(Rancher_App);
