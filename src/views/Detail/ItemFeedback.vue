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
        <v-form ref="form">
          <v-container>
            <v-textarea
              label="来吐槽吧"
              hide-details
              filled
              v-model="form.content"
              ref="feedbackTxt"
              :rules="formRule.content"
              validate-on-blur
            ></v-textarea>
            <v-text-field
              label="邮箱"
              v-model="form.contact"
              :rules="formRule.contact"
              validate-on-blur
            ></v-text-field>
            <v-sheet class="d-flex align-content-center pb-4">
              <v-img
                :src="kaptchaImage"
                width="160"
                height="60"
                class="v-sheet"
                @click="loadKaptchaImage"
              />
              <v-text-field
                label="验证码"
                class="ml-4 flex-grow-1"
                v-model="form.kaptcha"
                :rules="formRule.kaptcha"
                validate-on-blur
              ></v-text-field>
            </v-sheet>
            <div class="text-center" id="btn-panel">
              <v-btn class="mx-2" @click="closeFeedback">取消</v-btn>
              <v-btn class="mx-2" color="success" @click="submitFeedback">
                <span>提交</span>
                <v-progress-circular
                  v-if="feedbackSending"
                  color="white"
                  :size="16"
                  :width="2"
                  class="ml-2"
                  indeterminate
                ></v-progress-circular>
                <v-icon v-else right dark>mdi-send</v-icon>
              </v-btn>
            </div>
          </v-container>
        </v-form>
      </div>
    </v-expand-transition>
  </v-card>
</template>
<script>
import { getKaptcha, postFeedback } from '@/api/kaptchaAPI';

const BASE64_PREFIX = 'data:image/png;base64,';

export default {
  props: {
    rawTargetId: String,
  },
  data() {
    return {
      showFeedback: false,
      form: {
        contact: '',
        content: '',
        kaptcha: '',
      },
      formRule: {
        content: [(v) => !!v || '请填写反馈内容'],
        contact: [
          (v) => !!v || '请提供您的电子邮箱',
          (v) => /.+@.+\..+/.test(v) || '电子邮箱格式不正确',
        ],
        kaptcha: [(v) => !!v || '请输入验证码'],
      },
      kaptchaImage: '',
      feedbackSending: false,
    };
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
    async submitFeedback() {
      await this.$nextTick();
      const isFormValid = this.$refs.form.validate();
      if (!isFormValid) {
        return;
      }
      const feedbackForm = {
        author: this.form.contact,
        content: this.form.content,
        targetId: this.rawTargetId,
      };
      this.feedbackSending = true;
      postFeedback(this.form.kaptcha, feedbackForm)
        .then(() => {
          this.$toast('感谢您的反馈', {
            color: 'green',
          });
          this.closeFeedback();
          this.$refs.form.reset();
        })
        .catch((e) => {
          console.log(e);
          if (e.response && e.response.status === 403) {
            this.$toast('验证码错误');
            return;
          }
          this.$toast('提交失败了，请稍后重试');
        })
        .finally(() => {
          this.feedbackSending = false;
        });
    },
    loadKaptchaImage() {
      getKaptcha().then((response) => {
        const imageData = response.data;
        this.kaptchaImage = `${BASE64_PREFIX}${imageData}`;
      });
    },
  },
  watch: {
    showFeedback(val, oldval) {
      if (val === oldval) {
        return;
      }
      if (val) {
        this.loadKaptchaImage();
      }
    },
  },
};
</script>
