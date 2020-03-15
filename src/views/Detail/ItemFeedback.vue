<template>
  <v-card :elevation="!showFeedback ? undefined : 24" :ripple="!showFeedback">
    <v-sheet class="text-center py-1" @click="openFeedback">
      <span class="caption font-italic font-weight-light">
        <template v-if="showFeedback === false">发现错误了？点我反馈吧</template>
        <template v-else>您的反馈十分宝贵</template>
      </span>
    </v-sheet>
    <v-expand-transition>
      <div v-show="showFeedback">
        <v-divider></v-divider>

        <v-container>
          <v-textarea
            label="来吐槽吧"
            hide-details
            filled
            v-model="form.feedbackMsg"
            ref="feedbackTxt"
          ></v-textarea>
          <v-text-field label="联系方式" v-model="form.contact"></v-text-field>
          <div class="text-center" id="btn-panel">
            <v-btn class="mx-2" @click="closeFeedback">取消</v-btn>
            <v-btn class="mx-2" color="success" :disabled="isSubmitDisabled"
              >提交<v-icon right dark>mdi-send</v-icon>
            </v-btn>
          </div>
        </v-container>
      </div>
    </v-expand-transition>
  </v-card>
</template>
<script>
export default {
  props: {
    targetId: String,
  },
  data() {
    return {
      showFeedback: false,
      form: {
        contact: '',
        feedbackMsg: '',
      },
    };
  },
  computed: {
    isSubmitDisabled() {
      return !this.feedbackMsg;
    },
  },
  methods: {
    openFeedback() {
      this.showFeedback = true;
      setTimeout(() => {
        this.$vuetify.goTo('#btn-panel', {
          duration: 100,
        });
        this.$refs.feedbackTxt.focus();
      }, 200);
    },
    closeFeedback() {
      this.showFeedback = false;
      setTimeout(() => {
        this.$vuetify.goTo(0, {
          duration: 100,
        });
      }, 0);
    },
  },
};
</script>
