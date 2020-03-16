<template>
  <div class="view-container">
    <word-renderer :source="source"></word-renderer>
  </div>
</template>
<script>
// import * as sourceData from '@/mock/sourceData.json';
import { getWordById } from '@/api/dicAPI';

import WordRenderer from './WordRenderer.vue';

export default {
  data() {
    return {
      targetId: [],
      source: null,
      sourceLoading: false,
    };
  },
  created() {
    this.fetchSourceData();
  },
  methods: {
    fetchSourceData() {
      const queryId = this.$route.query.id;
      if (!queryId) {
        console.log('no queryid');
        return;
      }
      this.targetId = queryId.split(/[-@]/);
      this.targetId.push(queryId.replace(/[^-@]/g, ''));
      this.sourceLoading = true;
      this.$nextTick().then(() => {
        getWordById({
          id: this.targetId[0],
        }).then((response) => {
          const { data } = response.data;
          this.source = data.main;
        }).catch((error) => {
          console.log(error.getMessage);
        }).finally(() => {
          this.sourceLoading = false;
        });
      });
    },
  },
  computed: {
    targetIdType() {
      if (this.targetId.length === 2) {
        return 'WORD';
      }
      return this.targetId[2] === '-' ? 'PINYIN' : 'EXAMPLE';
    },
  },
  components: {
    WordRenderer,
  },
};
</script>
