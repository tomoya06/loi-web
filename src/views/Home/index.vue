<template>
  <div class="view-container">
    <div class="header">
      <v-row justify="center">
        <v-col cols="12" :sm="colSm" :md="colMd">
          <v-text-field
            label="输入你想搜索的字词"
            outlined
            hide-details
            v-model="form.query"
            @keyup.enter.native="handleSubmitQuery"
            @input="handleInputQuery"
            clearable
          ></v-text-field>
        </v-col>
      </v-row>
    </div>
    <div class="search-result" v-show="!isSearchIdle">
      <v-row justify="center">
        <v-col cols="12" :sm="colSm" :md="colMd" class="pt-0">
          <v-card>
            <v-skeleton-loader type="list-item-three-line" :loading="searchLoading">
              <v-list v-if="!noSearchResult">
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
              <v-card-text v-else-if="noSearchResult">
                <span>没有找到相关词条</span>
              </v-card-text>
            </v-skeleton-loader>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div class="general-result" v-show="isSearchIdle">
      <v-row justify="center">
        <v-col cols="12" :sm="colSm" :md="colMd" class="pt-0">
          <general-grid />
        </v-col>
      </v-row>
    </div>
    <div class="recommand-result" v-show="isSearchIdle">
      <v-row justify="center">
        <v-col cols="12" :sm="colSm" :md="colMd" class="pt-0">
          <recommand-grid />
        </v-col>
      </v-row>
    </div>
    <v-footer fixed class="caption">
      <v-spacer></v-spacer>
      <span>NFRD Software &amp; Zieng ft. Namwaa Culture</span>
      <span class="px-1">&copy;</span>
      <span>{{ new Date().getFullYear() }}</span>
    </v-footer>
  </div>
</template>
<script>
// import * as searchedResult from '@/mock/searchedResult.json';
import { search } from '@/api/dicAPI';
import _ from 'lodash';

import SearchedExampleItem from './SearchedExampleItem.vue';
import SearchedPinyinItem from './SearchedPinyinItem.vue';
import SearchedWordItem from './SearchedWordItem.vue';
import RecommandGrid from './RecommandGrid.vue';
import GeneralGrid from './GeneralGrid.vue';

export default {
  data() {
    return {
      dialogVisible: false,
      searchedResult: [],
      searchLoading: false,
      noSearchResult: false,
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
      if (query) {
        this.fetchSearchData(query, false);
      }
    },
    fetchSearchData(query, dizzy) {
      this.searchLoading = true;
      this.noSearchResult = false;
      this.searchedResult = [];
      search({ query, dizzy })
        .then((response) => {
          const { data } = response.data;
          this.searchedResult = data;
          if (data.length === 0) {
            this.noSearchResult = true;
          }
        })
        .catch(() => {
          this.$toast('Error');
          this.noSearchResult = false;
        })
        .finally(() => {
          this.searchLoading = false;
        });
    },
  },
  computed: {
    isSearchIdle() {
      return !this.form.query || this.form.query.length === 0;
    },
    handleInputQuery() {
      return _.debounce(this.handleSubmitQuery, 500);
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
    GeneralGrid,
  },
};
</script>
