import React from 'react';
import { loadPlots, loadOutlines } from '../actions/actions';
import axios from 'axios-on-rails';
import ClipboardJS from 'clipboard';
import { current_user } from '../constants/defaultStates'

// Instantiate ClipboardJS for button to copy state to clipboard as JSON string.
new ClipboardJS('#copy-button');

const SiteUI = (props) => (
  <div className='container mt-2'>
    {/* If no one is logged in props.outlines will be null so this section won't render */}
    {
      props.outlines !== null &&
      <div>
        {/* Fluid container holding all buttons */}
        <div className='mb-3 d-flex flex-wrap justify-content-center'>
          {/* Renders button groups for each outline. OnClick each button's state will be passed to the reducer to change the state */}
          {
            props.outlines.map((outline) => (
              <div key={outline.id} className='btn-group mt-1 mr-1 ml-1'>
                {/* Changes plots state */}
                <button
                  className='btn btn-outline-primary'
                  onClick={() => { props.dispatch(loadPlots(outline.data)) }}
                >
                  {outline.name}
                </button>
                {/* Deletes layout */}
                <button
                  className='btn btn-outline-danger'
                  onClick={() => {
                    axios.delete(`/outlines/${outline.id}.json`)
                      .catch(error => console.log(error));
                    //After DELETE, GET all outlines and refresh Outlines State.
                    axios.get('/outlines.json')
                      .then((response) => {
                        props.dispatch(loadOutlines(response.data));
                      })
                      .catch(error => console.log(error));
                    }}>
                  ×
                </button>
              </div>
            ))
          }
        </div>
        {/* Renders POST action for axios */}
        <div className='input-group mb-3'>
          <input
            id='outline-name'
            className='form-control'
            type='text'
            placeholder='layout name'
            data-trigger='focus'
            data-toggle='popover'
            data-placement='top'
            title='Layout will not save if name:'
            data-html='true'
            data-content='
              <ul>
                <li>is already used</li>
                <li>is blank</li>
                <li>length > 15 characters</li>
                <li>length < 3  characters</li>
              </ul>
            '
          />
          <div className='input-group-append'>
            <button
              className='btn btn-outline-success'
              onClick={(e) => {
                //If statement checks to see if the layout's name has already been used.
                if(props.outlines.filter(outline => outline.name === document.getElementById('outline-name').value).length < 0) {
                  //Performs Outline POST request
                  axios.post('/outlines', {
                    user_id: current_user,
                    name: document.getElementById('outline-name').value,
                    data: JSON.stringify(props.plots)
                  })
                    .then(() => { document.getElementById('outline-name').value = ''; })
                    .catch(error => console.log(error));
                  //After POST, GET all outlines and refresh Outlines State.
                  axios.get('/outlines.json')
                    .then((response) => {
                      props.dispatch(loadOutlines(response.data));
                    })
                    .catch(error => console.log(error));
                }
              }}>
              Create
            </button>
          </div>
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
          props.dispatch(loadPlots(e.target.value))
        }}
      />
      <div className='input-group-append'>
        {/* Clears state-input. */}
        <button
          className='btn btn-outline-info'
          onClick={() => {
            document.getElementById('state-input').value = '';
          }}>
          Clear
        </button>
        {/* OnClick copies current state to clipboard */}
        <button
          id='copy-button'
          className='btn btn-outline-info fade-tooltip'
          type='button'
          data-toggle='manual'
          data-placement='right'
          title='Copied!'
          data-trigger='click'
          data-clipboard-text={ JSON.stringify(props.plots) }
        >
          Copy
        </button>
      </div>
    </div>
  </div>
);

export default SiteUI;
