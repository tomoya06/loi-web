<template>
  <div>
    <v-sheet class="text-center mt-12 mb-6">
      <vue-typer
        :text="currentTextTop"
        @erased="handleErased"
        class="display-2"
        :caretAnimation="'solid'"
        :preEraseDelay="3000"
        :typeDelay="100"
      ></vue-typer>
    </v-sheet>
    <v-sheet class="text-center mt-0 mb-6">
      <vue-typer
        :text="currentTextBtm"
        @erased="handleErased"
        :typeDelay="40"
        :caretAnimation="'solid'"
        :preEraseDelay="10000"
        class="subtitle-1"
      ></vue-typer>
    </v-sheet>
  </div>
</template>
<script>
import { VueTyper } from 'vue-typer';

export default {
  data() {
    return {
      textList: [
        [
          '雷 州 話',
          '[lui ziu ue]',
        ],
        [
          '黎 話',
          '[loi ue]',
        ],
      ],
      currentIdx: 0,
    };
  },
  methods: {
    handleErased() {
      this.currentIdx = (this.currentIdx + 1) % this.textList.length;
    },
  },
  computed: {
    currentTextTop() {
      return this.textList[this.currentIdx][0];
    },
    currentTextBtm() {
      return this.textList[this.currentIdx][1];
    },
  },
  components: {
    VueTyper,
  },
};
</script>
