import React from 'react';
import { Default, Coop, Corral, Garden, Incinerator, Pond, Silo } from './Kinds';
import { toggleHidden, setKind } from '../actions/actions';
import { connect } from 'react-redux';

const Plot = ({ dispatch, hidden, location, kind, plotProps, lists }) => {
  let plot = null;
  switch (kind) {
    case 'default':
      plot = <Default />;
      break;
    case 'coop':
      plot = <Coop plotID={location.toString()} lists={lists} {...plotProps} />;
      break;
    case 'corral':
      plot = <Corral plotID={location.toString()} lists={lists} {...plotProps} />;
      break;
    case 'garden':
      plot = <Garden plotID={location.toString()} lists={lists} {...plotProps} />;
      break;
    case 'incinerator':
      plot = <Incinerator plotID={location.toString()} lists={lists} {...plotProps} />;
      break;
    case 'pond':
      plot = <Pond plotID={location.toString()} lists={lists} {...plotProps} />;
      break;
    case 'silo':
      plot = <Silo plotID={location.toString()} lists={lists} {...plotProps} />;
      break;
  }
  return (
    <div>
      {
        ((kind === 'garden' || kind === 'coop' || kind === 'corral') || (kind === 'incinerator' || kind === 'pond' && plotProps.hasSlimes)) &&
        <div
          className="badge"
          style={{ backgroundImage: 'url(' + require('../images/' + lists[0].selected + '.png') + ')', left: location[0], top: location[1], zIndex: 1, transform: "translate(-8px, -8px)" }}>
        </div>
      }
      {
        kind === 'corral' &&
        <div
          className="badge"
          style={{ backgroundImage: 'url(' + require('../images/' + lists[1].selected + '.png') + ')', left: location[0], top: location[1], zIndex: 1, transform: "translate(40px, -8px)"}}>
        </div>
      }
      <button
        className="plot-button"
        style={{ backgroundImage: 'url(' + require('../images/' + kind + '.png') + ')', left: location[0], top: location[1] }}
        onClick={() => {
          dispatch(toggleHidden(location.toString()));
        }}>
      </button>
      <div
        hidden={hidden}
        className="plot"
        style={hidden ? {} : { left: location[0], top: location[1], transform: 'translate(-50%, -50%)', display: 'block', position: 'absolute', zIndex: 2 }}
        >
        <select onChange={(e) => {
          dispatch(setKind({ kind: e.target.value, plotID: location.toString() }));
        }}>
          <option value="default">{ kind.charAt(0).toUpperCase() + kind.slice(1) }</option>
          <option value="coop">Coop</option>
          <option value="corral">Corral</option>
          <option value="garden">Garden</option>
          <option value="incinerator">Incinerator</option>
          <option value="pond">Pond</option>
          <option value="silo">Silo</option>
        </select>
        { plot }
        <button
          className="close-button"
          hidden={hidden}
          onClick={() => {
            dispatch(toggleHidden(location.toString()))
          }}>
            Close
        </button>
      </div>
    </div>
  );
}

export default connect()(Plot);
