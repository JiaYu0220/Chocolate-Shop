import { defineStore } from 'pinia';
import GlobalVariables from '@/GlobalVariableHolder';
import { h } from 'vue';
import loadingIconSrc from '../assets/loading.gif';

export default defineStore('loading', {
  state: () => ({
    isLoading: false,
    fullLoader: null,
    loadingStatus: {
      productId: '',
      cartId: '',
      delOrder: '',
      delProduct: false,
      imageUrl: false,
      imagesUrl: false,
      updateProduct: false,
    },
  }),
  actions: {
    showLoading() {
      // this.isLoading = true;
      // console.log(store);
      const loadingSlot = {
        default: () => h('img', { src: loadingIconSrc, alt: 'Loading...' }),
      };

      this.fullLoader = GlobalVariables.variables.$loading.show({}, loadingSlot);
    },
    hideLoading() {
      // this.isLoading = false;
      this.fullLoader.hide();
    },
  },
});
