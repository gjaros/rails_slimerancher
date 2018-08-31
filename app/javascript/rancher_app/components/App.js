import React from 'react';
import Plot from './Plot';
import { connect } from 'react-redux';
import { loadState } from '../actions/actions';
// Rancher_App is not dependent on these imports.
import axios from 'axios-on-rails';
import ClipboardJS from 'clipboard';

// Constants bring outlines data (of current user) into component via attribute. Rancher_App is not dependent on these constants.
const node = document.getElementById('outlines_payload');
const payload = JSON.parse(node.getAttribute('payload'));
const current_user = node.getAttribute('current_user');

// Instantiate ClipboardJS for button to copy state to clipboard as JSON string. Not a Rancher_App dependency.
new ClipboardJS('#copy-button');

const Rancher_App = (props) => (
  <div>
    {/* Renders map image and a <Plot /> for each location */}
    <section className='map'>
      <img src={require('../images/Map-Stylized.png')} />
      <div>
        {
          props.plots.map((plot, index) => (
            <Plot key={index} {...plot} />
          ))
        }
      </div>
    </section>
    {/* container with axios POST, buttons to load each outline's state for current_user, and button to copy JSON string of state to clipboard */}
    <section className='container mt-3'> {/* This section could be a separate component. It's not needed for Rancher_App to function */}
      {/* If no one is logged in payload will be null so this section won't load */}
      {
        payload !== null &&
        <div>
          {/* Renders POST action for axios */}
          <div className='input-group mb-3'>
            <input
              id='outline-name'
              className='form-control'
              type='text'
              placeholder='layout name'
              data-toggle='popover'
              data-placement='top'
              title='it will not save if name:'
              data-html='true'
              data-content='
                <ul>
                  <li>is blank</li>
                  <li>length > 15 characters</li>
                  <li>length < 3  characters</li>
                  <li>is already used</li>
                </ul>
              '
            />
            <div className='input-group-append'>
              <button
                className='btn btn-outline-success'
                onClick={(e) => {
                e.preventDefault();
                // performs POST request
                axios.post('/outlines', {
                  outline: {
                    user_id: current_user,
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
                Create
              </button>
            </div>
          </div>
          {/* Renders buttons for each outline. OnClick each button's state will be passed to the reducer to change the state */}
          <div className='mb-3 d-flex flex-wrap justify-content-around'>
            {
              payload.map((outline) => (
                <button
                  key={outline.id}
                  className='btn btn-outline-primary mt-2'
                  onClick={() => { props.dispatch(loadState(outline.data)) }}
                >
                  {outline.name}
                </button>
              ))
            }
          </div>
        </div>
      }
      {/* Renders dynamically changing state in an input field. This allows for users to paste states not in this database */}
      <div className='input-group mb-3'>
        <input
          id='state-input'
          className='form-control'
          type='text'
          placeholder='Paste Your Layout Here!'
          value={ JSON.stringify(props.plots) }
          onChange={(e) => {
            props.dispatch(loadState(e.target.value))
          }}
        />
        {/* Clears state-input. */}
        <div className='input-group-append'>
          <button
            className='btn btn-outline-info'
            onClick={() => {
              document.getElementById('state-input').value = ''
            }}>
            Clear
          </button>
        </div>
      </div>
      {/* OnClick copies current state to clipboard */}
      <button
        id='copy-button'
        className='btn btn-info mb-3 fade-tooltip'
        type='button'
        data-toggle='manual'
        data-placement='right'
        title='Copied!'
        data-trigger='click'
        data-clipboard-text={ JSON.stringify(props.plots) }
      >
        Copy Layout to Clipboard!
      </button>
    </section>
  </div>
);

const mapStateToProps = (state) => {
  return {
    plots: state
  };
}

export default connect(mapStateToProps)(Rancher_App);
