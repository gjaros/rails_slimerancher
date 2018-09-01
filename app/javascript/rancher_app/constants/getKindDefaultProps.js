import resources from './resources'

const getKindDefaultProps = (kind) => {
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

export default getKindDefaultProps;
