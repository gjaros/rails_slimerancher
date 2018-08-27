let newState = [];
let newList = [];

const compartment = [
  { selected: 'Blank', modalIsOpen: false },
  { selected: 'Blank', modalIsOpen: false },
  { selected: 'Blank', modalIsOpen: false }
];

const reducer = (state, action) => {
  newState = [];
  newList = [];

  const getKindDefaultProps = (kind) => {
    const resources = {
      food: {
        fruits: ['Pogofruit', 'Cuberry', 'Mint_Mango', 'Phase_Lemon', 'Prickle_Pear', 'Kookadoba'],
        veggies: ['Carrot', 'Heart_Beet', 'Oca_Oca', 'Odd_Onion', 'Silver_Parsnip', 'Gilded_Ginger'],
        meats: ['Hen_Hen', 'Stony_Hen', 'Briar_Hen', 'Painted_Hen', 'Roostro', 'Elder_Hen', 'Elder_Roostro']
      },
      slimes: ['Pink', 'Phosphor', 'Tabby', 'Honey', 'Saber', 'Hunter', 'Quantum', 'Tangle', 'Dervish', 'Rock', 'Boom', 'Rad', 'Crystal', 'Mosaic', 'Fire', 'Puddle'],
      plorts: ['pink_plort', 'phosphor_plort', 'tabby_plort', 'honey_plort', 'puddle_plort', 'saber_plort', 'hunter_plort', 'quantum_plort', 'tangle_plort', 'dervish_plort', 'rock_plort', 'boom_plort', 'rad_plort', 'crystal_plort', 'mosaic_plort', 'fire_plort']
    }
    switch (kind) {
      case 'coop':
        return { resources: resources.food.meats.splice(0, 4) };
        break;
      case 'corral':
        return { resources: resources.slimes.splice(0, 14), isHybrid: false };
        break;
      case 'garden':
        return { resources: { fruits: resources.food.fruits.splice(0, 5), veggies: resources.food.veggies.splice(0, 5) } };
        break;
      case 'incinerator':
        return { hasSlimes: false };
        break;
      case 'pond':
        return { hasSlimes: false };
        break;
      case 'silo':
        return { resources: { food: { fruits: resources.food.fruits.splice(0,5), veggies: resources.food.veggies, meats: resources.food.meats }, slimes: resources.slimes, plorts: resources.plorts }, compartments: 1 };
        break;
      default:
    }
  }
  const getKindDefaultLists = (kind) => {
    switch (kind) {
      case 'coop':
        return [{ selected: 'Blank', modalIsOpen: false }];
        break;
      case 'corral':
        return [{ selected: 'Blank', modalIsOpen: false }, { selected: 'Blank', modalIsOpen: false }];
        break;
      case 'garden':
          return [{ selected: 'Blank', modalIsOpen: false }];
          break;
      case 'incinerator':
        return [{ selected: 'Fire', modalIsOpen: false }];
        break;
      case 'pond':
        return [{ selected: 'Puddle', modalIsOpen: false }];
        break;
      case 'silo':
        return compartment;
        break;
      default:
    }
  }

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
          newState.push(plot);
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
    case 'LOAD_STATE':
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

export default reducer;
