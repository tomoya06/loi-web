import Instance from './base';

export const getKaptcha = () => Instance.get('/kaptcha/get');

export const validateKaptcha = (code) => Instance.post(
  '/kaptcha/validate',
  {},
  {
    headers: {
      KAPTCHA_HEADER: code,
    },
  },
);

export const postFeedback = (code, form) => Instance.post('/feedback/send', form, {
  headers: {
    KAPTCHA_HEADER: code,
  },
});
