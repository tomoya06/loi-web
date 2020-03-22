<template>
  <div class="view-container">
    <div class="header">
      <v-row justify="center">
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            label="输入你想搜索的字词"
            outlined
            hide-details
            v-model="form.query"
            @keyup.enter.native="handleSubmitQuery"
            @focus="searchFocus = true"
            @blur="searchFocus = false"
          ></v-text-field>
        </v-col>
      </v-row>
    </div>
    <div class="search-result" v-if="!isSearchIdle">
      <v-row justify="center">
        <v-col cols="12" sm="6" md="4" class="pt-0">
          <v-card>
            <div class="text-center my-2" v-if="isSearchTyping">
              <v-progress-linear indeterminate v-if="searchLoading" />
              <span v-else class="caption font-weight-light">按回车开始搜索</span>
            </div>
            <v-list v-else>
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
    <div class="recommand-result" v-else>
      <v-row justify="center">
        <v-col cols="12" sm="6" md="4" class="pt-0">
          <recommand-grid />
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
import RecommandGrid from './RecommandGrid.vue';

export default {
  data() {
    return {
      dialogVisible: false,
      searchedResult: [],
      searchLoading: false,
      searchFocus: false,
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
      this.searchedResult = [];
      search({ query, dizzy })
        .then((response) => {
          const { data } = response.data;
          this.searchedResult = data;
        })
        .catch(() => {
          this.$toast('Error');
        })
        .finally(() => {
          this.searchLoading = false;
        });
    },
  },
  computed: {
    isSearchNoResult() {
      return this.form.query.length > 0 && !this.searchLoading && this.searchedResult.length === 0;
    },
    isSearchIdle() {
      return this.form.query.length === 0;
    },
    isSearchTyping() {
      return this.form.query.length > 0 && this.searchedResult.length === 0;
    },
  },
  watch: {
    'form.query': {
      handler(val, oldval) {
        if (val === oldval) {
          return;
        }
        this.searchedResult = [];
      },
    },
  },
  components: {
    SearchedExampleItem,
    SearchedPinyinItem,
    SearchedWordItem,
    RecommandGrid,
  },
};
</script>
