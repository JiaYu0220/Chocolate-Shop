<template>
  <div class="bg-primary-100">
    <div class="container">
      <div class="h-screen flex justify-center items-center">
        <div class="w-72">
          <h1 class="font-zenMaru text-5xl text-primary-800 text-center mb-4">歐可可</h1>
          <VForm v-slot="{ errors }" @submit="login"
          class="bg-primary-50 p-4 rounded-lg border-2 border-primary-800">
            <h2 class="font-bold text-xl text-center py-6">
              後台登入
            </h2>
            <div class="mb-3">
              <FormFloat :id="'email'" :name="'電子信箱'" :type="'email'"
              :rules="'email|required'" v-model:value="user.username" :errors="errors">
              電子信箱 <span class="text-red-600">*</span></FormFloat>
            </div>
            <div class="mb-6">
              <FormFloat :id="'password'" :name="'密碼'"
              :type="`${isPwVisible? 'text': 'password'}`" :rules="'required'"
              v-model:value="user.password" :errors="errors">
              密碼 <span class="text-red-600">*</span>
              <template #icon>
                <button class=" absolute right-0 p-2 top-1/2 -translate-y-1/2"
                type="button" @click="isPwVisible = !isPwVisible">
                <i :class="`text-2xl bi bi-eye-${isPwVisible? 'slash-fill': 'fill'}`"></i>
                </button>
              </template>
              </FormFloat>
            </div>
            <button type="submit" class="w-full btn btn-primary mb-3">進入後台</button>
            <button type="button" class="w-full btn btn-link" @click="$router.go(-1)">回上一頁</button>
          </VForm>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import FormFloat from '@/components/shared/form/FormFloat.vue';

const { VITE_URL } = import.meta.env;

export default {
  data() {
    return {
      user: {},
      isPwVisible: false,
    };
  },
  components: {
    FormFloat,
  },
  methods: {
    async login() {
      try {
        const url = `${VITE_URL}/admin/signin`;
        console.log(this.user);
        const { data } = await this.$http.post(url, this.user);

        const { token, expired } = data;
        document.cookie = `token=${token}; expires=${new Date(expired)}`;
        this.$router.push('/admin/products');
      } catch (error) {
        console.log(error);
        this.$swal(error.data?.message || '發生錯誤');
      }
    },
  },
};
</script>
