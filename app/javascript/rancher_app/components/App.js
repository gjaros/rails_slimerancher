import React from 'react';
import Plot from './Plot';
import SiteUI from './SiteUI'
import { connect } from 'react-redux';

const Rancher_App = (props) => (
  <div>
    {/* Renders map image and a <Plot /> for each location */}
    <div className='map'>
      <img src={require('../images/Map-Stylized.png')} />
      <div>
        {
          props.plots.map((plot, index) => (
            <Plot key={index} {...plot} />
          ))
        }
      </div>
    </div>
    <SiteUI current_state={props.plots} dispatch={props.dispatch}/>
  </div>
);

const mapStateToProps = (state) => {
  return {
    plots: state.plotsReducer
  };
}

export default connect(mapStateToProps)(Rancher_App);
