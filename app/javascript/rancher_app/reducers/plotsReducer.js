import { defaultPlots } from '../constants/defaultStates';
import compartment from '../constants/compartment';
import getKindDefaultProps from '../constants/getKindDefaultProps';
import getKindDefaultLists from '../constants/getKindDefaultLists';

let newState = [];
let newList = [];

const plotsReducer = (state = defaultPlots, action) => {
  newState = [];
  newList = [];

  switch (action.type) {
    case 'TOGGLE_HIDDEN':
      state.map((plot) => {
        if (plot.location.toString() === action.plotID) {
          newState.push({
            ...plot,
            hidden: !plot.hidden
          });
        }
        else {
          newState.push({
            ...plot,
            hidden: true
          });
        }
      });
      return newState;
      break;
    case 'SET_KIND':
      state.map((plot) => {
        if (plot.location.toString() === action.plotID) {
          newState.push({
            ...plot,
            kind: action.kind,
            plotProps: getKindDefaultProps(action.kind),
            lists: getKindDefaultLists(action.kind)
          });
        }
        else {
          newState.push(plot);
        }
      });
      return newState;
      break;
    case 'SET_SELECTED':
      state.map((plot) => {
        if (plot.location.toString() === action.plotID) {
          plot.lists.map((list, index) => {
            if (index === action.listsIndex) {
              newList.push({...list, selected: action.selected});
            }
            else {
              newList.push(list);
            }
          });
          newState.push({...plot, lists: newList});
        }
        else {
          newState.push(plot);
        }
      });
      return newState;
      break;
    case 'TOGGLE_MODAL':
      state.map((plot) => {
        if (plot.location.toString() === action.plotID) {
          plot.lists.map((list, index) => {
            if (index === action.listsIndex) {
              newList.push({...list, modalIsOpen: !list.modalIsOpen});
            }
            else {
              newList.push(list);
            }
          });
          newState.push({...plot, lists: newList});
        }
        else {
          newState.push(plot);
        }
      });
      return newState;
      break;
    case 'TOGGLE_IS_HYBRID':
      state.map((plot) => {
        if (plot.location.toString() === action.plotID) {
          newState.push(
            {
              ...plot,
              plotProps: {
                ...plot.plotProps,
                isHybrid: !plot.plotProps.isHybrid
              },
              lists: plot.lists.concat({ selected: 'Blank', modalIsOpen: false })
            }
          );
        }
        else {
          newState.push(plot);
        }
      });
      return newState;
      break;
    case 'ADD_COMP':
      state.map((plot) => {
        if (plot.location.toString() === action.plotID && plot.plotProps.compartments < 4) {
          newState.push(
            {
              ...plot,
              plotProps: {
                ...plot.plotProps,
                compartments: plot.plotProps.compartments + 1
              },
              lists: plot.lists.concat(compartment)
            }
          );
        }
        else {
          newState.push(plot);
        }
      });
      return newState;
      break;
    case 'SUB_COMP':
      state.map((plot) => {
        if (plot.location.toString() === action.plotID && plot.plotProps.compartments > 1) {
          newState.push(
            {
              ...plot,
              plotProps: {
                ...plot.plotProps,
                compartments: plot.plotProps.compartments - 1
              },
              lists: plot.lists.splice(0, 3*(plot.plotProps.compartments-1))
            }
          );
        }
        else {
          newState.push(plot);
        }
      });
      return newState;
      break;
    case 'LOAD_PLOTS':
      return JSON.parse(action.newState);
      break;
    case 'TOGGLE_HAS_SLIMES':
      state.map((plot) => {
        if (plot.location.toString() === action.plotID) {
          newState.push(
            {
              ...plot,
              plotProps: {
                ...plot.plotProps,
                hasSlimes: !plot.plotProps.hasSlimes
              }
            }
          );
        }
        else {
          newState.push(plot);
        }
      });
      return newState;
      break;
    default:
      return state;
  }
}

export default plotsReducer;
