<template>
  <RouterLink
  :to="path" custom v-slot="{ navigate, isExactActive }">
    <li class="text-nowrap"
    :class="(isExactActive && currentCategory === category) ?
    'link-active' : 'link cursor-pointer'"
    @click="navigate" role="link">{{ category }}</li>
  </RouterLink>
</template>
<script>
import { mapState } from 'pinia';
import productStore from '@/stores/productStore';

export default {
  props: {
    category: String,
  },
  data() {
    return {
      path: '/products',
    };
  },
  mounted() {
    if (this.category !== '全部') {
      this.path += `?category=${this.category}`;
    }
  },
  computed: {
    ...mapState(productStore, ['categories', 'currentCategory']),
  },
};
</script>
<style>
  .link-active{
    @apply relative text-primary-700 after:absolute after:content-['']
    after:w-full after:h-[2px] after:bg-primary-700 after:-bottom-1 after:left-0
  }
</style>
