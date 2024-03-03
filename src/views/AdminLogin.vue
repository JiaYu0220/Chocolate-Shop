<template>
   <MyLoading></MyLoading>
  <div class="bg-primary-100">
    <div class="container">
      <div class="h-screen flex justify-center items-center">
        <div class="w-72">
          <h1 class="font-zenMaru text-5xl text-primary-800 text-center mb-4">歐可</h1>
          <VForm v-slot="{ errors }" @submit.prevent="login"
          class="bg-primary-50 p-4 rounded-lg border-2 border-primary-800">
            <h2 class="font-bold text-xl text-center py-6">
              後台登入
            </h2>
            <div class="mb-3">
              <FormFloat :label-for="'email'" :label="'電子信箱'" :errors="errors">
              <template #default="{inputClass}">
                <VField
                type="email" name="電子信箱" id="email"
                rules="email|required" v-model="user.username"
                :class="inputClass" placeholder required>
                </VField>
              </template>
            </FormFloat>
            </div>
            <div class="mb-6">
              <FormFloat :label-for="'password'" :label="'密碼'" :errors="errors">
                <template #default="{inputClass}">
                  <VField
                  :type="`${isPwVisible? 'text': 'password'}`" name="密碼" id="password"
                  rules="required" v-model="user.password"
                  :class="inputClass" placeholder required>
                  </VField>
                </template>
                <template #icon="{iconClass}">
                  <button :class="iconClass"
                  type="button" @click="isPwVisible = !isPwVisible">
                  <i :class="`text-2xl bi bi-eye-${isPwVisible? 'slash-fill': 'fill'}`"></i>
                  </button>
                </template>
              </FormFloat>
            </div>
            <button type="button" class="w-full btn btn-primary btn-lg mb-3"
            @click="autoLogin">一鍵登入 (測試用)</button>
            <button type="submit" class="w-full btn btn-primary btn-lg mb-3">進入後台</button>
            <button type="button" class="w-full btn btn-link btn-lg"
            @click="$router.go(-1)">回上一頁</button>
          </VForm>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import FormFloat from '@/components/shared/form/FormFloat.vue';
import MyLoading from '@/components/shared/helpers/MyLoading.vue';
import { mapActions } from 'pinia';
import loadingStore from '@/stores/loadingStore';

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
    MyLoading,
  },
  methods: {
    autoLogin() {
      this.user = {
        username: 'alice49885@gmail.com',
        password: 'a12345',
      };
      this.login();
    },
    async login() {
      try {
        this.showLoading();
        const url = `${VITE_URL}/admin/signin`;
        const { data } = await this.$http.post(url, this.user);

        const { token, expired } = data;
        document.cookie = `token=${token}; expires=${new Date(expired)}`;
        this.$router.push('/admin/products');
      } catch (error) {
        // console.log(error);
        this.$swal(error.data?.message || '發生錯誤');
      } finally {
        this.hideLoading();
      }
    },
    ...mapActions(loadingStore, ['showLoading', 'hideLoading']),
  },
  // computed: {
  //   ...mapState(loadingStore, ['isLoading']),
  // },
};
</script>
