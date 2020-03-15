<template>
  <v-list-item two-line link :to="{ name: 'Detail', query: { id: item.targetId } }">
    <v-list-item-content>
      <v-list-item-title>
        <span>
          <span class="display-1">{{ item.word }}</span>
          <v-chip outlined class="px-2 ml-2" color="primary" x-small>
            字
          </v-chip>
        </span>
      </v-list-item-title>
      <v-list-item-subtitle>
        <div class="caption">{{ item.pinyin | pinyinFilter }}</div>
      </v-list-item-subtitle>
      <v-list-item-subtitle>
        <div class="caption text-truncate">{{ item.define | defineFilter }}</div>
      </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>
<script>
import SearchedItemMixin from './SearchedItemMixin';

export default {
  mixins: [SearchedItemMixin],
};
</script>
