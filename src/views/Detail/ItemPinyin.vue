<template>
  <v-card>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="font-italic font-weight-light">读音</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item v-for="(pinyinItem, index) in pinyins" :key="index" subheader dense>
      <v-list-item-content>
        <v-sheet class="body-2" v-html="pinyinTitleFilter(pinyinItem, index)"></v-sheet>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>
<script>
export default {
  props: {
    pinyins: Array,
  },
  data() {
    return {};
  },
  methods: {
    pinyinTitleFilter(pinyinItem) {
      const allPinyin = pinyinItem.pinyin.join(' / ');
      return `
      <span class='text--primary pl-2'>${allPinyin}</span>
      <span class='pl-1'>${pinyinItem.define}</span>
      `;
    },
  },
};
</script>
