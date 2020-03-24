<template>
  <div class="recommend-container">
    <v-sheet class="mt-4 mb-2">
      <div class="title">
        <span class="title">推荐速览</span>
      </div>
    </v-sheet>
    <v-skeleton-loader
      type="list-item-three-line"
      :loading="fetchLoading"
      transition="scroll-y-transition"
    >
      <v-row dense>
        <v-col v-for="(recItem, idx) in recommendList" :key="idx" :cols="recItem.col">
          <v-card :color="recItem.color" :to="{ name: 'Detail', query: { id: recItem.targetId } }">
            <v-card-title>{{ recItem.title }}</v-card-title>
            <v-card-subtitle class="text-no-wrap text-truncate">
              <span>{{ recItem.subtitle }}</span>
            </v-card-subtitle>
            <v-card-actions class="px-4 pt-4 text-no-wrap text-truncate">
              <span class="subtitle-2">{{ recItem.action }}</span>
              <v-spacer></v-spacer>
              <v-icon dense>mdi-chevron-right</v-icon>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-skeleton-loader>
  </div>
</template>
<script>
import { getRecommend } from '@/api/dicAPI';

export default {
  data() {
    return {
      recommendList: [],
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
      getRecommend()
        .then((response) => {
          const { data } = response.data;
          this.recommendList = data;
        })
        .catch(() => {
          this.$toast('Get Recommend Error');
          this.fetchError = true;
        })
        .finally(() => {
          this.fetchLoading = false;
        });
    },
  },
};
</script>
