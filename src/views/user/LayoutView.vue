<template>
  <MyLoading />
  <header>
  <nav>
  <RouterLink to="/">首頁</RouterLink>
  </nav>
  </header>
  <footer>
    <RouterLink to="/login">後台登入</RouterLink>
  </footer>
</template>
<script>
import MyLoading from '@/components/shared/helpers/MyLoading.vue';

export default {
  components: {
    MyLoading,
  },
};
</script>
