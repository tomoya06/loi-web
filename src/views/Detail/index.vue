<template>
  <div class="view-container">
    <v-skeleton-loader
      :loading="sourceLoading"
      type="list-item-three-line"
      transition="scroll-y-transition"
    >
      <word-renderer
        :source="source"
        :type="targetIdType"
        :targetId="targetId"
        :rawTargetId="queryId"
      ></word-renderer>
    </v-skeleton-loader>
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
      queryId: '',
      source: null,
      sourceLoading: false,
    };
  },
  methods: {
    fetchSourceData() {
      const queryId = this.$route.query.id;
      this.queryId = queryId;
      if (!queryId) {
        this.$toast('No Query ID');
        return;
      }
      this.targetId = queryId.split(/[-@]/);
      this.targetId.push(queryId.replace(/[^-@]/g, ''));
      this.sourceLoading = true;
      this.source = null;
      this.$nextTick().then(() => {
        getWordById({
          id: this.targetId[0],
        })
          .then((response) => {
            const { data } = response.data;
            this.source = data;
          })
          .catch(() => {
            this.$toast('error');
          })
          .finally(() => {
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
  watch: {
    $router() {
      this.fetchSourceData();
    },
  },
  components: {
    WordRenderer,
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.fetchSourceData();
      next();
    });
  },
};
</script>
