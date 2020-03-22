<template>
  <div v-if="!!source">
    <v-row justify="center" dense>
      <template v-if="type === 'EXAMPLE'">
        <v-col cols="12" :sm="colSm" :md="colMd">
          <target-example :example="targetExample"></target-example>
          <div class="text-center my-2" v-ripple="{ center: true }">
            <span class="mx-2 subtitle-2 grey--text">收录于『{{ source.word }}』字</span>
            <v-icon color="blue-grey lighten-4" dense>mdi-chevron-down</v-icon>
          </div>
        </v-col>
      </template>
    </v-row>
    <v-row justify="center" dense>
      <template>
        <v-col cols="12" :sm="colSm" :md="colMd">
          <item-header :source="source"></item-header>
        </v-col>
        <v-col cols="12" :sm="colSm" :md="colMd">
          <item-pinyin :pinyins="source.pinyinList"></item-pinyin>
        </v-col>
        <v-col cols="12" :sm="colSm" :md="colMd">
          <item-example
            v-if="displayExamples && source.examples"
            :examples="source.examples"
          ></item-example>
        </v-col>
        <v-col cols="12" :sm="colSm" :md="colMd">
          <item-feedback :targetId="source.id"></item-feedback>
        </v-col>
      </template>
    </v-row>
  </div>
</template>
<script>
import ItemHeader from './ItemHeader.vue';
import ItemPinyin from './ItemPinyin.vue';
import ItemExample from './ItemExample.vue';
import ItemFeedback from './ItemFeedback.vue';
import TargetExample from './TargetExample.vue';

export default {
  props: {
    source: Object,
    type: String,
    targetId: Array,
  },
  components: {
    ItemPinyin,
    ItemExample,
    ItemFeedback,
    ItemHeader,
    TargetExample,
  },
  computed: {
    targetExample() {
      return this.source && this.source.examples
        ? this.source.examples.find((example) => `${example.nid}` === this.targetId[1])
        : {};
    },
    displayExamples() {
      return this.type !== 'EXAMPLE';
    },
  },
};
</script>
