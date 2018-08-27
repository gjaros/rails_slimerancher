import React from 'react';
import List from './List';
import { connect } from 'react-redux';
import { toggleIsHybrid, addComp, subComp, toggleHasSlimes } from '../actions/actions';

const Default = () => (
  <div className="default" style={{ backgroundImage: 'url(' + require('../images/default.png') + ')' }}>
  </div>
);

const Coop = ({ plotID, lists, resources }) => {
  return (
    <div className="coop" style={{ backgroundImage: 'url(' + require('../images/coop.png') + ')' }}>
      <List
        plotID={plotID}
        selected={lists[0].selected}
        modalIsOpen={lists[0].modalIsOpen}
        listsIndex={0}
        resources={resources}
      />
    </div>
  );
}

const corral = ({ dispatch, plotID, lists, resources, isHybrid }) => (
  <div className="corral" style={{ backgroundImage: 'url(' + require('../images/corral.png') + ')' }}>
    <label>
      Hybrid Corral
      <input
        type="checkbox"
        id="hybrid"
        value={isHybrid}
        onChange={() => {
          dispatch(toggleIsHybrid(plotID))
        }}
      />
    </label>
    <List
      plotID={plotID}
      selected={lists[0].selected}
      modalIsOpen={lists[0].modalIsOpen}
      listsIndex={0}
      resources={resources}
    />
    {
      isHybrid &&
      <List
        plotID={plotID}
        selected={lists[1].selected}
        modalIsOpen={lists[1].modalIsOpen}
        listsIndex={1}
        resources={resources}
      />
    }
  </div>
);

const Garden = ({ plotID, lists, resources }) => {
  return (
    <div className="garden" style={{ backgroundImage: 'url(' + require('../images/garden.png') + ')' }}>
      <List
        plotID={plotID}
        selected={lists[0].selected}
        modalIsOpen={lists[0].modalIsOpen}
        listsIndex={0}
        resources={resources}
      />
    </div>
  );
}

const incinerator = ({ dispatch, plotID, hasSlimes }) => (
  <div className="incinerator" style={{ backgroundImage: 'url(' + require('../images/incinerator.png') + ')' }}>
    <label>
      Fire Slimes?
      <input
        type="checkbox"
        id="hybrid"
        value={hasSlimes}
        onChange={() => {
          dispatch(toggleHasSlimes(plotID))
        }}
      />
    </label>
  </div>
);

const pond = ({ dispatch, plotID, hasSlimes }) => (
  <div className="pond" style={{ backgroundImage: 'url(' + require('../images/pond.png') + ')' }}>
    <label>
      Puddle Slimes?
      <input
        type="checkbox"
        id="hybrid"
        value={hasSlimes}
        onChange={() => {
          dispatch(toggleHasSlimes(plotID))
        }}
      />
    </label>
  </div>
);

const silo = ({ dispatch, plotID, lists, resources, compartments }) => (
  <div className="silo" style={{ backgroundImage: 'url(' + require('../images/silo.png') + ')' }}>
    <span>
      <button className="countModButton countModButton--add" onClick={ () => { dispatch(addComp(plotID)) } }>+</button>
      <button className="countModButton countModButton--sub" onClick={ () => { dispatch(subComp(plotID)) } }>-</button>
    </span>
    <div className="flex-container">
      {
        lists.map((list, index) => (
          <List
            key={index}
            plotID={plotID}
            selected={list.selected}
            modalIsOpen={list.modalIsOpen}
            listsIndex={index}
            resources={resources}
          />
        ))
      }
    </div>
  </div>
);

const Corral = connect()(corral);
const Incinerator = connect()(incinerator);
const Pond = connect()(pond);
const Silo = connect()(silo);

export { Default, Coop, Corral, Garden, Incinerator, Pond, Silo };
