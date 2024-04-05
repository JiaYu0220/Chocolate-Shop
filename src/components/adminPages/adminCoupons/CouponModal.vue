<template>
  <FormModal target="coupon" ref="couponFormModal" @reset-form="resetModalForm">
    <!-- 標題 -->
    <template #title="{ titleClass }">
      <h3 :class="titleClass">{{ isNew ? '新增' : '編輯' }}優惠券</h3>
    </template>
    <!-- 編輯區 -->
    <VForm v-slot="{ errors }" ref="couponForm" @submit="updateCoupon">
      <div class="flex h-full flex-col gap-6">
        <!-- 名稱 -->
        <FormFloat :label-for="'title'" :label="'名稱'" :errors="errors">
          <template #default="{ inputClass }">
            <VField
              type="text"
              name="名稱"
              id="title"
              v-model="tempCoupon.title"
              :class="inputClass"
              rules="required"
              placeholder
              required
            />
          </template>
        </FormFloat>
        <!-- 優惠碼 -->
        <div>
          <FormFloat :label-for="'code'" :label="'優惠碼'" :errors="errors">
            <template #default="{ inputClass }">
              <VField
                type="text"
                name="優惠碼"
                id="code"
                v-model="tempCoupon.code"
                :class="inputClass"
                rules="required"
                placeholder
                required
              />
            </template>
          </FormFloat>
          <p class="mt-1 text-stone-500">※ 優惠碼英文小寫將會被轉成大寫</p>
        </div>
        <div class="flex gap-3">
          <!-- 折扣 -->
          <div class="w-1/3">
            <FormFloat :label-for="'percent'" :label="'折扣 (%)'" :errors="errors">
              <template #default="{ inputClass }">
                <VField
                  type="number"
                  min="0"
                  step="5"
                  name="折扣 (%)"
                  id="percent"
                  v-model.number="tempCoupon.percent"
                  :class="inputClass"
                  rules="required"
                  placeholder
                  required
                />
              </template>
            </FormFloat>
          </div>
          <!-- 期限 -->
          <div class="w-2/3">
            <FormFloat :label-for="'due_date'" :label="'期限'">
              <template #default>
                <VueDatePicker
                  v-model="tempCoupon.due_date"
                  model-type="timestamp"
                  :enable-time-picker="false"
                  format="yyyy/MM/dd"
                  locale="zh-TW"
                  :day-names="['一', '二', '三', '四', '五', '六', '日']"
                  hide-input-icon
                  :clearable="false"
                  teleport-center
                  auto-apply
                  required
                />
              </template>
            </FormFloat>
          </div>
        </div>
        <!-- 是否啟用 -->
        <ChecksRadio label-for="is_enabled" label="是否啟用">
          <template #default="{ inputClass }">
            <input
              id="is_enabled"
              :class="inputClass"
              type="checkbox"
              v-model="tempCoupon.is_enabled"
              :true-value="1"
              :false-value="0"
            />
          </template>
        </ChecksRadio>
        <!-- 是否為主打優惠(推播在首頁) -->
        <ChecksRadio label-for="is_main" label="是否為主打優惠 (會推播在首頁)">
          <template #default="{ inputClass }">
            <input id="is_main" :class="inputClass" type="checkbox" v-model="tempCoupon.is_main" />
          </template>
        </ChecksRadio>
        <!-- 按鈕 -->
        <div class="mt-5 text-end">
          <button
            type="button"
            class="btn btn-outline-primary me-3"
            @click="
              closeModal();
              resetModalForm();
            "
          >
            取消編輯
          </button>
          <button type="submit" class="btn btn-primary">儲存編輯</button>
        </div>
      </div>
    </VForm>
  </FormModal>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import FormFloat from '@/components/shared/form/FormFloat.vue';
import swalStore from '@/stores/swalStore';
import loadingStore from '@/stores/loadingStore';
import ChecksRadio from '@/components/shared/form/ChecksRadio.vue';
import FormModal from '@/components/shared/modal/FormModal.vue';

const { VITE_URL, VITE_PATH } = import.meta.env;
export default {
  components: {
    FormModal,
    FormFloat,
    ChecksRadio,
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
      this.$refs.couponFormModal.showModal();
    },
    closeModal() {
      this.$refs.couponFormModal.closeModal();
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
        this.apiErrorSwal(error);
      }
    },
    ...mapActions(swalStore, ['swalToast', 'apiErrorSwal']),
    ...mapActions(loadingStore, ['showLoading', 'hideLoading']),
  },
  computed: {
    ...mapState(loadingStore, ['loadingStatus']),
  },
};
</script>
