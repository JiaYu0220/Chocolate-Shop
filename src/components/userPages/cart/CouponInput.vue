<template>
  <div class="inline-flex">
    <select name="coupon" id="coupon" class="form-control rounded-r-none" v-model="couponCode">
      <option value="" class="hover-bg-primary-800" selected>請選擇優惠碼</option>
      <option value="ILOVECACAO" class="">ILOVECACAO</option>
    </select>
    <LoadingBtn
      class="btn btn-primary-light text-nowrap rounded-l-none shadow-none"
      :isLoading="loadingStatus.newCoupon"
      @click="handleUseCoupon"
      :disabled="!couponCode"
    >
      使用
    </LoadingBtn>
  </div>
  <p class="text-primary-800" v-if="usedCoupon">已使用優惠券：{{ usedCoupon }}</p>
</template>
<script>
import { mapActions, mapState } from 'pinia';
// import FormFloat from '@/components/shared/form/FormFloat.vue';
import cartStore from '@/stores/cartStore';
import loadingStore from '@/stores/loadingStore';
import LoadingBtn from '@/components/shared/button/LoadingBtn.vue';

export default {
  props: ['swalContainer'],
  components: {
    // FormFloat,
    LoadingBtn,
  },
  data() {
    return {
      couponCode: '',
    };
  },
  methods: {
    handleUseCoupon() {
      if (this.container) {
        this.postCoupon(this.couponCode, this.container);
      } else {
        this.postCoupon(this.couponCode);
      }
      this.couponCode = '';
    },
    ...mapActions(cartStore, ['postCoupon']),
  },
  computed: {
    ...mapState(cartStore, ['usedCoupon']),
    ...mapState(loadingStore, ['loadingStatus']),
  },
};
</script>
