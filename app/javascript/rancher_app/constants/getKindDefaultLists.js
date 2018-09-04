import compartment from './compartment'

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

export default getKindDefaultLists;
