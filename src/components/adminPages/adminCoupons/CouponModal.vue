<template>
  <ModalComponent target="coupon" ref="couponModalComponent" @reset-form="resetModalForm">
    <!-- 標題 -->
    <template #title="{titleClass}">
      <h3 :class="titleClass">{{isNew ? '新增' : '編輯'}}優惠券</h3>
    </template>

    <!-- 編輯區 -->
    <VForm v-slot="{errors}" ref="couponForm"
    @submit="updateCoupon">
      <div class="flex flex-col gap-6 h-full">
        <!-- 名稱 -->
        <FormFloat :label-for="'title'" :label="'名稱'" :errors="errors">
          <template #default="{inputClass}">
            <VField type="text" name="名稱" id="title" v-model="tempCoupon.title"
            :class="inputClass" rules="required" placeholder required></VField>
          </template>
        </FormFloat>
        <!-- 優惠碼 -->
        <div>
          <FormFloat :label-for="'code'" :label="'優惠碼'" :errors="errors">
            <template #default="{inputClass}">
              <VField type="text" name="優惠碼" id="code" v-model="tempCoupon.code"
              :class="inputClass" rules="required"
              placeholder required></VField>
            </template>
          </FormFloat>
          <p class="text-stone-500 mt-1">※ 優惠碼英文小寫將會被轉成大寫</p>
        </div>
        <div class="flex gap-3">
          <!-- 折扣 -->
          <div class="w-1/3">
            <FormFloat :label-for="'percent'" :label="'折扣 (%)'" :errors="errors">
              <template #default="{inputClass}">
                <VField type="number" min="0" step="5" name="折扣 (%)" id="percent"
                v-model.number="tempCoupon.percent"
                :class="inputClass" rules="required" placeholder required></VField>
              </template>
            </FormFloat>
          </div>
          <!-- 期限 -->
          <div class="w-2/3">
            <FormFloat :label-for="'due_date'" :label="'期限'">
              <template #default>
                <VueDatePicker
                v-model="tempCoupon.due_date" model-type="timestamp"
                :enable-time-picker="false" format="yyyy/MM/dd"
                locale="zh-TW" :day-names="['一', '二', '三', '四', '五', '六', '日']"
                hide-input-icon :clearable="false"
                teleport-center auto-apply required/>
              </template>
            </FormFloat>
          </div>
        </div>
        <!-- 是否啟用 -->
        <ChecksRadio label-for="is_enable" label="是否啟用">
          <template #default="{inputClass}">
            <input id="is_enable"
            :class="inputClass" type="checkbox"
            v-model="tempCoupon.is_enable">
          </template>
        </ChecksRadio>
        <!-- 按鈕 -->
        <div class="mt-5 text-end">
          <button type="button" class="btn btn-outline-primary me-3"
          @click="closeModal();resetModalForm()">
          取消編輯</button>
          <button type="submit" class="btn btn-primary">
          儲存編輯</button>
        </div>
      </div>

    </VForm>
  </ModalComponent>
</template>
<style>
/* datepicker 樣式 */
.dp__main ~ label{
  @apply after:content-['*'] after:text-red-600 after:ml-1
}
.dp__input{
  @apply w-full pt-5 form-control
}
.dp__today{
  @apply border-primary-800
}
.dp__range_end, .dp__range_start, .dp__active_date{
  @apply bg-primary-800 text-primary-50
}
.dp__theme_light{
  @apply bg-primary-50 text-primary-950 shadow-sm
}

</style>
<script>
import ModalComponent from '@/components/shared/modal/ModalComponent.vue';
import FormFloat from '@/components/shared/form/FormFloat.vue';
import { mapActions, mapState } from 'pinia';
import swalStore from '@/stores/swalStore';
import loadingStore from '@/stores/loadingStore';
import ChecksRadio from '@/components/shared/form/ChecksRadio.vue';

const { VITE_URL, VITE_PATH } = import.meta.env;
export default {
  components: {
    ModalComponent, FormFloat, ChecksRadio,
  },
  props: {
    coupon: Object,
    isNew: Boolean,
    pagination: Object,
  },
  data() {
    return {
      tempCoupon: {},
    };
  },
  mounted() {
    this.tempCoupon = this.coupon;
  },
  watch: {
    coupon() {
      this.tempCoupon = this.coupon;
      if (String(this.tempCoupon.due_date).length === 10) {
        this.tempCoupon.due_date *= 1000;
      }
    },
  },
  methods: {
    showModal() {
      this.$refs.couponModalComponent.showModal();
    },
    closeModal() {
      this.$refs.couponModalComponent.closeModal();
    },
    resetModalForm() {
      this.$refs.couponForm.resetForm();
    },
    async updateCoupon() {
      try {
        // 新增優惠券
        let url = `${VITE_URL}/api/${VITE_PATH}/admin/coupon`;
        let httpMethod = 'post';
        // 回到第一頁
        let page = 1;
        // 優惠碼轉大寫
        this.tempCoupon.code = this.tempCoupon.code.toUpperCase();
        // 提示文字
        const alertText = `已${this.isNew ? '新增' : '更新'}優惠券「${this.tempCoupon.title}」`;

        // 確保 timestamp 是 10 碼
        if (String(this.tempCoupon.due_date).length === 13) {
          this.tempCoupon.due_date = Math.floor(this.tempCoupon.due_date / 1000);
        }

        // 不是新增優惠券時換成編輯優惠券
        if (!this.isNew) {
          url += `/${this.tempCoupon.id}`;
          httpMethod = 'put';
          // 待在目前頁數
          page = this.pagination.current_page;
          // 設定按鈕 loading
          this.loadingStatus.couponId = this.tempCoupon.id;
        } else {
          // 設定按鈕 loading
          this.loadingStatus.newCoupon = true;
        }

        // 關閉 modal
        this.closeModal();
        // axios
        await this.$http[httpMethod](url, { data: this.tempCoupon });
        // 重置表單，避免殘留上次驗證結果
        this.resetModalForm();

        // 取資料
        this.$emit('getData', page);
        // 關閉 loading
        this.loadingStatus.couponId = '';
        this.loadingStatus.newCoupon = false;
        // 通知
        this.swalToast(alertText);
      } catch (error) {
        // 關閉 loading
        this.loadingStatus.couponId = '';
        this.loadingStatus.newCoupon = false;
        // 通知
        this.$swal(error.data?.message || '發生錯誤，請稍後再試');
      }
    },
    ...mapActions(swalStore, ['swalToast']),
    ...mapActions(loadingStore, ['showLoading', 'hideLoading']),
  },
  computed: {
    ...mapState(loadingStore, ['loadingStatus']),
  },
};
</script>
