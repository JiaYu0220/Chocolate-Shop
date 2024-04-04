<template>
  <VForm ref="form" v-slot="{ errors }" @submit="postOrder">
    <div class="">
      <div class="mb-3">
        <FormFloat label-for="myName" label="收件人姓名" :errors="errors">
          <template #default="{ inputClass }">
            <VField
              id="myName"
              name="收件人姓名"
              type="text"
              :class="inputClass"
              rules="required"
              v-model="user.name"
              required
            />
          </template>
        </FormFloat>
      </div>
      <div class="mb-3">
        <FormFloat label-for="email" label="電子信箱" :errors="errors">
          <template #default="{ inputClass }">
            <VField
              id="email"
              name="電子信箱"
              type="email"
              :class="inputClass"
              rules="email|required"
              v-model="user.email"
              required
            />
          </template>
        </FormFloat>
      </div>
      <div class="mb-3">
        <FormFloat label-for="tel" label="收件人電話" :errors="errors">
          <template #default="{ inputClass }">
            <VField
              id="tel"
              name="收件人電話"
              type="tel"
              :class="inputClass"
              :rules="isPhone"
              v-model="user.tel"
              required
            />
          </template>
        </FormFloat>
      </div>
      <div class="mb-3">
        <FormFloat label-for="address" label="收件人地址" :errors="errors">
          <template #default="{ inputClass }">
            <VField
              id="address"
              name="收件人地址"
              type="text"
              :class="inputClass"
              rules="required"
              v-model="user.address"
              required
            />
          </template>
        </FormFloat>
      </div>
      <div class="mb-3">
        <FormFloat label-for="message" label="留言">
          <template #default="{ inputClass }">
            <VField
              id="message"
              name="留言"
              type="text"
              :class="inputClass"
              as="textarea"
              v-model="message"
            />
          </template>
        </FormFloat>
      </div>
    </div>
    <!-- 按鈕 -->
    <div class="mt-10 flex justify-between">
      <button type="button" class="btn btn-link" @click="$emit('prevStep')">
        <i class="bi bi-chevron-double-left me-1"></i>再確認購物清單
      </button>
      <button type="submit" class="btn btn-primary">
        送出訂單
        <i class="bi bi-chevron-double-right ml-1"></i>
      </button>
    </div>
  </VForm>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import FormFloat from '@/components/shared/form/FormFloat.vue';
import loadingStore from '@/stores/loadingStore';
import swalStore from '@/stores/swalStore';
import validateStore from '@/stores/validateStore';
import orderStore from '@/stores/orderStore';
import cartStore from '@/stores/cartStore';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  components: {
    FormFloat,
  },
  data() {
    return {
      user: {},
      message: '',
    };
  },
  methods: {
    async postOrder() {
      if (this.cartNum) {
        try {
          const swal = await this.confirmSwal('確定提交訂單？');
          if (swal.isConfirmed) {
            this.showLoading();
            const url = `${VITE_URL}/api/${VITE_PATH}/order`;
            const data = { user: this.user, message: this.message };
            const res = await this.$http.post(url, { data });
            this.hideLoading();

            this.$refs.form.resetForm();
            this.swalToast(res.data.message);
            this.finishOrder();
          }
        } catch (error) {
          this.hideLoading();
          // 通知
          const { message } = error.response.data;
          this.$swal(Array.isArray(message) ? message[0] : message);
        }
      } else {
        this.$swal('請選購商品後再提交表單');
      }
    },
    async finishOrder() {
      this.$emit('nextStep');
      this.showLoading();
      const promiseArray = [this.getCart(), this.getOrders()];
      const resArr = await Promise.allSettled(promiseArray);
      resArr.forEach((res) => {
        if (res.status === 'rejected') {
          this.hideLoading();
          this.$swal(res.response.data);
        }
      });
      this.hideLoading();
    },
    ...mapActions(swalStore, ['confirmSwal', 'swalToast']),
    ...mapActions(validateStore, ['isPhone']),
    ...mapActions(loadingStore, ['showLoading', 'hideLoading']),
    ...mapActions(orderStore, ['getOrders']),
    ...mapActions(cartStore, ['getCart']),
  },
  computed: {
    ...mapState(cartStore, ['cartNum']),
  },
};
</script>
