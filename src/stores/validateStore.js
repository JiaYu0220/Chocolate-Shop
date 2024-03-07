import { defineStore } from 'pinia';

export default defineStore('validateStore', {
  actions: {
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value) ? true : '須為有效的手機號碼';
    },
  },
});
