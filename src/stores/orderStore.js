import GlobalVariables from '@/GlobalVariableHolder';
import { defineStore } from 'pinia';
import axios from 'axios';
import loadingStore from './loadingStore';

const { $swal } = GlobalVariables.variables;

const { VITE_URL, VITE_PATH } = import.meta.env;
const { hideLoading } = loadingStore();

export default defineStore('orderStore', {
  state: () => ({
    orders: [],
    currentOrder: {},
  }),
  actions: {
    async getOrders() {
      try {
        const url = `${VITE_URL}/api/${VITE_PATH}/orders`;
        const { data } = await axios.get(url);
        this.orders = data?.orders;
        [this.currentOrder] = this.orders;
      } catch (error) {
        hideLoading();
        // 通知
        const { message } = error.response.data;
        $swal(Array.isArray(message) ? message[0] : message);
      }
    },
  },
});
