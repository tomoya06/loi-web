<template>
  <div class="general-container">
    <v-sheet class="mt-4 mb-2">
      <div class="title"></div>
    </v-sheet>
    <v-skeleton-loader
      type="list-item-three-line"
      :loading="fetchLoading"
      transition="scroll-y-transition"
    >
      <v-row dense>
        <v-col :cols="6">
          <v-sheet class="text-center">
            <div class="display-1">
              <!-- <span>{{ general.totalWord }}</span> -->
              <animated-number
                :value="general.totalWord"
                :duration="1000"
                :formatValue="formatValue"
              />
            </div>
            <div class="subtitle-2">
              <span>收录的单字总数</span>
            </div>
          </v-sheet>
        </v-col>
        <v-col :cols="6">
          <v-sheet class="text-center">
            <div class="display-1">
              <!-- <span>{{ general.totalExample }}</span> -->
              <animated-number
                :value="general.totalExample"
                :duration="1000"
                :formatValue="formatValue"
              />
            </div>
            <div class="subtitle-2">
              <span>收录的词组总数</span>
            </div>
          </v-sheet>
        </v-col>
      </v-row>
    </v-skeleton-loader>
  </div>
</template>
<script>
import AnimatedNumber from 'animated-number-vue';

import { getGeneral } from '@/api/dicAPI';

export default {
  data() {
    return {
      general: {},
      fetchLoading: false,
      fetchError: false,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.fetchLoading = true;
      getGeneral()
        .then((response) => {
          const { data } = response.data;
          this.general = data;
        })
        .catch(() => {
          this.$toast('Get Total Error');
        })
        .finally(() => {
          this.fetchLoading = false;
        });
    },
    formatValue(val) {
      return val.toFixed(0);
    },
  },
  components: {
    AnimatedNumber,
  },
};
</script>
