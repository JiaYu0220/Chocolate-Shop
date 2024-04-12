<template>
  <div
    class="item-center flex w-full flex-wrap justify-center bg-orange-600 py-2 text-xs
      text-primary-50 sm:py-3 sm:text-sm"
  >
    <p class="pr-4">
      結帳輸入 {{ coupon.code }} <span class="font-bold">全館 {{ coupon.percent / 10 }} 折</span>
    </p>
    <i class="bi bi-alarm me-1 hidden sm:inline"></i>
    <ul v-if="Object.keys(couponTimer).length" class="flex gap-1">
      <li v-for="(item, key) in couponTimer" :key="item">
        <p class="font-bold">{{ `${item} ${key}` }}</p>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapActions, mapState } from 'pinia';
import timerStore from '@/stores/timerStore';

export default {
  mounted() {
    this.handleCouponTimer();
  },
  methods: {
    ...mapActions(timerStore, ['handleCouponTimer']),
  },
  computed: {
    ...mapState(timerStore, ['couponTimer', 'coupon']),
  },
};
</script>
