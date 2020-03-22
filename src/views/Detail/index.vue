<template>
  <div class="view-container">
    <word-renderer
      :source="source"
      :type="targetIdType"
      :targetId="targetId"
    ></word-renderer>
    <v-card v-if="sourceLoading">
      <div class="text-center py-4">
        <v-progress-linear indeterminate />
      </div>
    </v-card>
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
      this.source = null;
      this.$nextTick().then(() => {
        getWordById({
          id: this.targetId[0],
        })
          .then((response) => {
            const { data } = response.data;
            this.source = data;
          })
          .catch((error) => {
            console.log(error.getMessage);
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
