<template>
  <v-card>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="font-italic font-weight-light">词组</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item v-for="(exampleItem, index) in examples" :key="index" subheader dense>
      <v-list-item-content>
        <v-list-item-title class="body-1">{{exampleItem.word}}</v-list-item-title>
        <v-list-item-subtitle v-html="examplePinyinFilter(exampleItem)"></v-list-item-subtitle>
        <v-sheet class="caption">{{exampleItem.define}}</v-sheet>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>
<script>
export default {
  props: {
    examples: Array,
  },
  methods: {
    examplePinyinFilter(exampleItem) {
      const pinyinList = exampleItem.pinyinList.map((list) => list.join(' ')).join(' / ');
      return `
        <span class="caption">${pinyinList}</span>
      `;
    },
  },
};
</script>
