import { defineStore } from 'pinia';

export default defineStore('loading', {
  state: () => ({
    isLoading: false,
    loadingStatus: {
      productId: '',
      orderId: '',
      cartId: '',
      delProduct: false,
      imageUrl: false,
      imagesUrl: false,
      updateProduct: false,
    },
  }),
  actions: {
    showLoading() {
      this.isLoading = true;
    },
    hideLoading() {
      this.isLoading = false;
    },
  },
});
