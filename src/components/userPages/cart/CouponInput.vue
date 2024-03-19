<template>
  <FormFloat label-for="coupon" label="優惠券">
    <template #default="{inputClass}">
      <div class="flex border border-stone-300 rounded-md">
        <input type="text" list="couponList" name="coupon" id="coupon"
        :class="inputClass" class="rounded-r-none border-0"
        v-model="couponCode" placeholder>
        <datalist id="couponList">
          <option value="ILOVECOCOA">ILOVECOCOA</option>
        </datalist>
        <LoadingBtn
        class="btn btn-primary-light rounded-l-none text-nowrap
        shadow-none" :isLoading="loadingStatus.newCoupon"
        @click="handleUseCoupon"
        :disabled="!couponCode">
        使用</LoadingBtn>
      </div>
    </template>
  </FormFloat>
  <p class="text-primary-800" v-if="usedCoupon">已使用優惠券：{{usedCoupon}}</p>
</template>
<script>
import FormFloat from '@/components/shared/form/FormFloat.vue';
import { mapActions, mapState } from 'pinia';
import cartStore from '@/stores/cartStore';
import loadingStore from '@/stores/loadingStore';
import LoadingBtn from '@/components/shared/button/LoadingBtn.vue';

export default {
  props: ['swalContainer'],
  components: {
    FormFloat, LoadingBtn,
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
