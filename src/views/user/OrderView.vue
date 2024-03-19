<template>
  <div>
    <p>收件人：{{order.user.name}}</p>
    <p>電子信箱：{{order.user.email}}</p>
    <p>電話：{{order.user.tel}}</p>
    <p>地址：{{order.user.address}}</p>
    <p>備註：{{order.message}}</p>
  </div>
</template>
<script>
import { mapActions } from 'pinia';
import loadingStore from '@/stores/loadingStore';

const { VITE_URL, VITE_PATH } = import.meta.env;
export default {
  props: ['id'],
  data() {
    return {
      order: {},
    };
  },
  mounted() {
    this.getOrder();
  },
  methods: {
    async getOrder() {
      try {
        this.showLoading();
        const url = `${VITE_URL}/api/${VITE_PATH}/order/${this.id}`;
        const res = await this.$http.post(url);
        this.order = res.data.order;
        this.hideLoading();
      } catch (error) {
        this.hideLoading();
        // 通知
        const { message } = error.response.data;
        this.$swal(Array.isArray(message) ? message[0] : message);
      }
    },
    ...mapActions(loadingStore, ['showLoading', 'hideLoading']),
  },
};
</script>
