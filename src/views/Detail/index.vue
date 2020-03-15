<template>
  <div class="view-container">
    <word-renderer :source="source"></word-renderer>
  </div>
</template>
<script>
import * as sourceData from '@/mock/sourceData.json';

import WordRenderer from './WordRenderer.vue';

export default {
  data() {
    return {
      targetId: '',
      source: null,
      sourceLoading: false,
    };
  },
  created() {
    this.parsedParam();
    this.fetchSourceData();
  },
  methods: {
    parsedParam() {
      const curUrl = new URL(window.location.href);
      this.targetId = curUrl.searchParams.get('id');
    },
    async fetchSourceData() {
      this.sourceLoading = true;
      await this.$nextTick();
      setTimeout(() => {
        this.source = sourceData.data;
        this.sourceLoading = false;
      }, 0);
    },
  },
  components: {
    WordRenderer,
  },
};
</script>
