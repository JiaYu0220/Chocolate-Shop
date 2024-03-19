import { defineStore } from 'pinia';

export default defineStore('loading', {
  state: () => ({
    isLoading: false,
    loadingStatus: {
      productId: '',
      newProduct: false,
      orderId: '',
      articleId: '',
      editArticle: false,
      couponId: '',
      newCoupon: false,
      cartId: '',
      imageUrl: false,
      imagesUrl: false,
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
