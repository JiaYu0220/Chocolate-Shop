import { defineStore } from 'pinia';

export default defineStore('timerStore', {
  state: () => ({
    couponTimer: {},
    coupon: {
      code: 'ILOVECACAO',
      due_date: 1714665060,
      id: '-NuixPXLqbqvgW08-R1y',
      is_enabled: 1,
      is_main: true,
      percent: 80,
      title: '快閃',
      num: 1,
    },
    couponTimerInterval: null,
  }),
  actions: {
    handleCouponTimer() {
      // 清除之前的計時器，避免多個計時器並行運行
      if (this.couponTimerInterval) {
        clearInterval(this.couponTimerInterval);
      }
      // 設置新的計時器
      this.couponTimerInterval = setInterval(() => {
        const now = Math.floor(new Date().getTime() / 1000);
        const time = this.coupon.due_date - now;
        this.couponTimer = {
          日: Math.floor(time / 60 / 60 / 24)
            .toString()
            .padStart(2, '0'),
          時: (Math.floor(time / 60 / 60) % 24).toString().padStart(2, '0'),
          分: (Math.floor(time / 60) % 60).toString().padStart(2, '0'),
          秒: (time % 60).toString().padStart(2, '0'),
        };
      }, 1000);
    },
  },
});
