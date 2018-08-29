import React from 'react';
import Plot from './Plot';
import { connect } from 'react-redux';
import { loadState } from '../actions/actions';
import axios from 'axios-on-rails'

const node = document.getElementById('outlines_payload');
const payload = JSON.parse(node.getAttribute('payload'));

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
    <input type="text" id="outline-name" />
    <button onClick={(e) => {
      e.preventDefault();
      axios.post('/outlines', {
        outline: {
          user_id: payload[0].user_id,
          name: document.getElementById('outline-name').value,
          data: JSON.stringify(props.plots)
        }
      })
      .then(function(response){
        console.log(response)
      })
      .catch(function(error){
        console.log(error)
      })
    }}>
      Send
    </button>
    <div>
      {
        payload.map((outline) => (
          <button
            key={outline.id}
            onClick={() => { props.dispatch(loadState(outline.data)) }}
          >
            {outline.name}
          </button>
        ))
      }
    </div>
    {/* <p>Paste Your Layout Here!</p>
    <div>
      <input type="text" onChange={(e) => {
        props.dispatch(loadState(e.target.value))
      }}/>
    </div>
    // TODO: create copy button for JSON string
    <div className="JSON-string">
      { JSON.stringify(props.plots) }
    </div> */}
  </div>
);

const mapStateToProps = (state) => {
  return {
    plots: state
  };
}

export default connect(mapStateToProps)(Rancher_App);
