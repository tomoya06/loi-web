<template>
  <v-card>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>
          <span class="display-1 pr-2">{{ example.word }}</span>
          <v-chip outlined class="px-1" color="primary" x-small>
            词
          </v-chip>
        </v-list-item-title>
        <v-list-item-subtitle v-html="examplePinyinFilter(example)" />
      </v-list-item-content>
    </v-list-item>
    <v-list-item>
      <v-list-item-content class="pt-0">
        <v-sheet class="subtitle-2">
          <span class="pr-1">释义：</span>
          <span>{{ example.define }}</span>
        </v-sheet>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>
<script>
export default {
  props: {
    example: Object,
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
