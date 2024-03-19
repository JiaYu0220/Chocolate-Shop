<template>
  <div class="container py-10">
    <div class="pb-10 mb-8 border-b-2 border-primary-200">
      <!-- 麵包屑 -->
      <!-- <nav class="mb-6" aria-label="Breadcrumb">
        <ol class="flex text-sm md:text-sm">
          <li class="after:content-['/'] after:mx-1 after:md:mx-2">
            <RouterLink class="link" to="/">首頁</RouterLink>
          </li>
          <li class="after:content-['/'] after:mx-1 after:md:mx-2">
            <RouterLink class="link" to="/products">產品列表</RouterLink>
          </li>
          <li>{{ currentBreadcrumb }}</li>
        </ol>
      </nav> -->
      <h2 class="text-center text-2xl font-bold tracking-widest text-primary-800
      pb-6">{{ currentCategory || '全部' }}</h2>
      <ul class="flex justify-center gap-4 md:gap-8 text font-medium">
        <li>
          <span v-if="currentCategory === ''" class="relative text-primary-700
          after:absolute after:content-[''] after:w-full after:h-[2px]
          after:bg-primary-700 after:-bottom-1 after:left-0">全部</span>
          <RouterLink v-else class="link"
          :to="`/products`">
            全部
          </RouterLink>
        </li>
        <li v-for="category in categories" :key="category">
          <span v-if="currentCategory === category" class="relative text-primary-700
          after:absolute after:content-[''] after:w-full after:h-[2px]
          after:bg-primary-700 after:-bottom-1 after:left-0">{{category}}</span>
          <RouterLink v-else class="link"
          :to="`/products?category=${category}`">
            {{category}}
          </RouterLink>
        </li>
      </ul>
    </div>
    <!-- 產品 -->
    <div class="w-full">
      <ul v-if="products.length" class="flex flex-wrap -m-4 mb-8 *:p-4">
        <li class="w-full md:w-1/2 xl:w-1/3" v-for="product in products" :key="product.id">
          <ProductCard :product="product" />
        </li>
      </ul>
      <PaginationComponent :pagination="pagination" @get-data="getProducts"/>
    </div>
  </div>
</template>
<style>
.active{}
</style>

<script>
import ProductCard from '@/components/userPages/product/ProductCard.vue';
import PaginationComponent from '@/components/shared/pagination/PaginationComponent.vue';
import { mapState, mapActions } from 'pinia';
import loadingStore from '@/stores/loadingStore';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  components: {
    ProductCard, PaginationComponent,
  },
  data() {
    return {
      products: [],
      pagination: {},
      categories: ['基本', '特殊口味', '禮盒', '料理'],
      // currentBreadcrumb: '全部',
      currentCategory: '',
    };
  },
  mounted() {
    this.getProducts();
  },
  watch: {
    '$route.query': {
      handler() {
        this.getProducts();
      },
      deep: true,
    },
  },
  methods: {
    async getProducts(page = 1) {
      try {
        this.showLoading();
        this.currentCategory = this.$route.query.category || '';
        const url = `${VITE_URL}/api/${VITE_PATH}/products?page=${page}&category=${this.currentCategory}`;
        const res = await this.$http.get(url);
        this.products = res.data.products;
        this.pagination = res.data.pagination;

        this.hideLoading();
      } catch (error) {
        this.hideLoading();
        // 通知
        const { message } = error.response.data;
        this.$swal(Array.isArray(message) ? message[0] : message);
      }
    },
    ...mapActions(loadingStore, ['showLoading', 'hideLoading']),
  },
  computed: {
    ...mapState(loadingStore, ['loadingStatus']),
  },
};
</script>
