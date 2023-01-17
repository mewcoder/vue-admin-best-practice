import ASide from './src/ASide';
import ASideItem from './src/ASideItem';

const install = function (Vue) {
  Vue.component(ASide.name, ASide);
  Vue.component(ASideItem.name, ASideItem);
};

export default { install };
