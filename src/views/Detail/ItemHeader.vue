<template>
  <v-card>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>
          <span class="display-2 pr-2">{{ source.word }}</span>
          <v-chip outlined class="px-1" color="primary" x-small>
            字
          </v-chip>
        </v-list-item-title>
        <v-sheet class="py-2"></v-sheet>
        <v-list-item-subtitle>
          <span>共有{{ pinyinCount }}个读音，{{ defCount }}种释义。</span>
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>
<script>
import _ from 'lodash';

export default {
  props: {
    source: Object,
  },
  computed: {
    defCount() {
      return this.source.pinyinList.length;
    },
    pinyinCount() {
      return _.flatten(this.source.pinyinList.map((p) => p.pinyin)).length;
    },
  },
};
</script>
