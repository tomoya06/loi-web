<template>
  <v-list-item three-line link :to="{ name: 'Detail', query: { id: item.targetId } }">
    <v-list-item-content>
      <v-list-item-title>
        <div>
          <span>{{ item.word }}</span>
          <v-chip outlined class="px-2 ml-2" color="primary" x-small>
            音
          </v-chip>
        </div>
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
