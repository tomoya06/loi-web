<template>
  <v-card>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>
          <div>
            <span class="display-1">{{ example.word }}</span>
          </div>
        </v-list-item-title>
        <v-list-item-subtitle v-html="examplePinyinFilter(example)" />
        <v-sheet class="py-1"></v-sheet>
        <v-list-item-subtitle>
          <span class="pr-1">释义：</span>
          <span>{{ example.define }}</span>
        </v-list-item-subtitle>
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
