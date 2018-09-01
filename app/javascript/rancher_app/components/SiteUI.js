import React from 'react';
import { loadState } from '../actions/actions';
import axios from 'axios-on-rails';
import ClipboardJS from 'clipboard';

// Constants bring outlines data (of current user) into component via attribute..
const node = document.getElementById('outlines_payload');
const payload = JSON.parse(node.getAttribute('payload'));
const current_user = node.getAttribute('current_user');

// Instantiate ClipboardJS for button to copy state to clipboard as JSON string.
new ClipboardJS('#copy-button');

const SiteUI = (props) => (
  <div className='container mt-3'>
    {/* If no one is logged in payload will be null so this section won't load */}
    {
      payload !== null &&
      <div>
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
              // performs Outline POST request
              axios.post('/outlines', {
                outline: {
                  user_id: current_user,
                  name: document.getElementById('outline-name').value,
                  data: JSON.stringify(props.current_state)
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
      </div>
    }
    {/* Renders dynamically changing state in an input field. This allows for users to paste states not in this database */}
    <div className='input-group mb-3'>
      <input
        id='state-input'
        className='form-control'
        type='text'
        placeholder='Paste Your Layout Here!'
        value={ JSON.stringify(props.current_state) }
        onChange={(e) => {
          props.dispatch(loadState(e.target.value))
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
          data-clipboard-text={ JSON.stringify(props.current_state) }
          >
            Copy
        </button>
      </div>
    </div>
  </div>
);

export default SiteUI;
