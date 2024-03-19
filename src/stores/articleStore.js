import { defineStore } from 'pinia';
import axios from 'axios';
import GlobalVariables from '@/GlobalVariableHolder';
import loadingStore from './loadingStore';

const { $swal } = GlobalVariables.variables;

const { hideLoading } = loadingStore();

const { VITE_URL, VITE_PATH } = import.meta.env;

export default defineStore('articleStore', {
  state: () => ({
    articles: [],
  }),
  actions: {
    async getAllArticles() {
      try {
        const url = `${VITE_URL}/api/${VITE_PATH}/articles`;
        const res = await axios.get(url);
        res.data.articles.sort((a, b) => b.create_at - a.create_at);
        this.articles = res.data.articles;
      } catch (error) {
        hideLoading();
        // 通知
        const { message } = error.response.data;
        $swal(Array.isArray(message) ? message[0] : message);
      }
    },

  },
});
