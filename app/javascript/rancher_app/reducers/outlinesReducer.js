import { defaultOutlines } from '../constants/defaultStates';

const outlinesReducer = (state = defaultOutlines, action) => {
  switch (action.type) {
    case 'LOAD_OUTLINES':
      return action.outlines;
      break;
    default:
      return state;
  }
}

export default outlinesReducer;
