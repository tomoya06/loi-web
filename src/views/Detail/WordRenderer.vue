<template>
  <div>
    <v-row justify="center" v-if="source !== null">
      <v-col cols="12" sm="6" md="4">
        <v-card>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                <div>
                  <span class="display-2">{{ source.word }}</span>
                </div>
              </v-list-item-title>
              <v-sheet class="py-2"></v-sheet>
              <v-list-item-subtitle>
                <span>共有{{ pinyinCount }}个读音，{{ defCount }}种释义。</span>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <item-pinyin :pinyins="source.pinyinList"></item-pinyin>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <item-example v-if="source.examples" :examples="source.examples"></item-example>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <item-feedback :targetId="source.id"></item-feedback>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import _ from 'lodash';

import ItemPinyin from './ItemPinyin.vue';
import ItemExample from './ItemExample.vue';
import ItemFeedback from './ItemFeedback.vue';

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
  components: {
    ItemPinyin,
    ItemExample,
    ItemFeedback,
  },
};
</script>
