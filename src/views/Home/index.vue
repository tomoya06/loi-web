<template>
  <div class="view-container">
    <div class="header">
      <v-row justify="center">
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            label="输入你要搜索的字词/拼音..."
            outlined
            hide-details
            v-model="form.query"
            @keyup.enter.native="handleSubmitQuery"
          ></v-text-field>
        </v-col>
      </v-row>
    </div>
    <div class="search-result">
      <v-row justify="center">
        <v-col cols="12" sm="6" md="4">
          <v-card>
            <v-list>
              <template v-for="(item, index) in searchedResult">
                <searched-example-item
                  :key="item.targetId"
                  v-if="item.type === 'EG'"
                  :item="item"
                ></searched-example-item>
                <searched-pinyin-item
                  :key="item.targetId"
                  v-if="item.type === 'PINYIN'"
                  :item="item"
                ></searched-pinyin-item>
                <searched-word-item
                  :key="item.targetId"
                  v-if="item.type === 'WORD'"
                  :item="item"
                ></searched-word-item>
                <v-divider v-if="index + 1 < searchedResult.length" :key="index"></v-divider>
              </template>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
// import * as searchedResult from '@/mock/searchedResult.json';
import { search } from '@/api/dicAPI';

import SearchedExampleItem from './SearchedExampleItem.vue';
import SearchedPinyinItem from './SearchedPinyinItem.vue';
import SearchedWordItem from './SearchedWordItem.vue';

export default {
  data() {
    return {
      dialogVisible: false,
      searchedResult: [],
      searchLoading: false,
      form: {
        query: '',
      },
    };
  },
  methods: {
    openDialog() {
      this.dialogVisible = true;
    },
    handleQueryChange(query) {
      if (query) {
        this.fetchSearchData(query, false);
      }
    },
    handleSubmitQuery() {
      const { query } = this.form;
      this.fetchSearchData(query, false);
    },
    fetchSearchData(query, dizzy) {
      this.searchLoading = true;
      search({ query, dizzy }).then((response) => {
        const { data } = response.data;
        this.searchedResult = data;
      }).finally(() => {
        this.searchLoading = false;
      });
    },
  },
  components: {
    SearchedExampleItem,
    SearchedPinyinItem,
    SearchedWordItem,
  },
};
</script>
