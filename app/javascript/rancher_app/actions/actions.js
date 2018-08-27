const toggleHidden = (plotID) => ({
  type: 'TOGGLE_HIDDEN',
  plotID
});

const setKind = ({ kind, plotID }) => ({
  type: 'SET_KIND',
  kind,
  plotID
});

const setSelected = (plotID, listsIndex, selected) => ({
  type: 'SET_SELECTED',
  plotID,
  listsIndex,
  selected
});

const toggleModal = (plotID, listsIndex) => ({
  type: 'TOGGLE_MODAL',
  plotID,
  listsIndex
});

const toggleIsHybrid = (plotID) => ({
  type: 'TOGGLE_IS_HYBRID',
  plotID
});

const addComp = (plotID) => ({
  type: 'ADD_COMP',
  plotID
});

const subComp = (plotID) => ({
  type: 'SUB_COMP',
  plotID
});

const loadState = (newState) => ({
  type: 'LOAD_STATE',
  newState
});

const toggleHasSlimes = (plotID) => ({
  type: 'TOGGLE_HAS_SLIMES',
  plotID
});

export { toggleHidden, setKind, setSelected, toggleModal, toggleIsHybrid, addComp, subComp, loadState, toggleHasSlimes };
