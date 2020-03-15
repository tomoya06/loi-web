import _ from 'lodash';

export default {
  props: {
    item: {},
  },
  filters: {
    pinyinFilter(pinyinList) {
      return _.flatten(pinyinList).join(' | ');
    },
    examplePinyinFilter(pinyinList) {
      return _.flatten(pinyinList).join(' ');
    },
    defineFilter(defineList) {
      return _.flatten(defineList).join('；');
    },
  },
};
