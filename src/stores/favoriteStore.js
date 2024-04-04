import { defineStore } from 'pinia';
import swalStore from './swalStore';

const { swalToast } = swalStore();

export default defineStore('favoriteStore', {
  state: () => ({
    favorites: [],
  }),
  actions: {
    getFavorites() {
      this.favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    },
    handleFavorite(isFavorite, id) {
      if (isFavorite) {
        // 將產品加入收藏
        this.favorites.push(id);
        swalToast('已加入收藏');
      } else {
        // 將產品移除收藏
        this.favorites = this.favorites.filter((item) => item !== id);
        swalToast('已移除收藏');
      }
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
    },
  },
});
