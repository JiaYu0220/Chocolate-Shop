import { defineStore } from 'pinia';
import axios from 'axios';
import GlobalVariables from '@/GlobalVariableHolder';
import loadingStore from './loadingStore';

const { $swal } = GlobalVariables.variables;

const { hideLoading } = loadingStore();

const { VITE_URL, VITE_PATH } = import.meta.env;

export default defineStore('productStore', {
  state: () => ({
    allProducts: [],
  }),
  actions: {
    async getAllProducts() {
      try {
        const url = `${VITE_URL}/api/${VITE_PATH}/products/all`;
        const res = await axios.get(url);
        this.allProducts = res.data.products;
      } catch (error) {
        hideLoading();
        // 通知
        const { message } = error.response.data;
        $swal(Array.isArray(message) ? message[0] : message);
      }
    },
    async filterProduct(key, value) {
      if (this.allProducts.length === 0) {
        await this.getAllProducts();
      }
      return this.allProducts.filter((item) => item[key] === value);
    },

  },
});
