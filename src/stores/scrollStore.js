import { defineStore } from 'pinia';

export default defineStore('scrollStore', {
  state: () => ({
    topScroll: 0,
    leftScroll: 0,
  }),
  actions: {
    getCurrentScroll() {
      this.topScroll = window.screenY;
      this.leftScroll = window.screenX;
    },
    disableScroll() {
      document.body.classList.add('w-full');
      document.body.classList.add('fixed');
      // 搭配 position: fixed 讓背景停在現在位置
      document.body.classList.add(`-top-[${this.topScroll}px]`);
    },
    enableScroll() {
      document.body.classList.remove('w-full');
      document.body.classList.remove('fixed');
      document.body.classList.remove(`-top-[${this.topScroll}px]`);
      // 讓卷軸到打開前的位置
      window.scrollTo(this.leftScroll, this.topScroll);
    },
  },
});
