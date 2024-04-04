<template>
  <div class="container py-10">
    <div class="mb-8 border-b-2 border-primary-200 pb-10">
      <h2 class="pb-6 text-center text-2xl font-bold tracking-widest text-primary-800">
        {{ currentCategory || '全部' }}
      </h2>
      <ul class="text flex justify-center gap-4 font-medium md:gap-8">
        <CategoryLinks category="全部" />
        <CategoryLinks
          v-for="(item, category) in categories"
          :key="category"
          :category="category"
        />
      </ul>
    </div>
    <!-- 產品 -->
    <div class="w-full">
      <ul v-if="products.length" class="-m-4 mb-8 flex flex-wrap *:p-4">
        <li class="w-full md:w-1/2 xl:w-1/3" v-for="product in products" :key="product.id">
          <ProductCard :product="product" />
        </li>
      </ul>
      <PaginationComponent :pagination="pagination" @get-data="getProducts" />
    </div>
  </div>
</template>

<script>
import ProductCard from '@/components/userPages/product/ProductCard.vue';
import PaginationComponent from '@/components/shared/pagination/PaginationComponent.vue';
import { mapState, mapActions } from 'pinia';
import loadingStore from '@/stores/loadingStore';
import productStore from '@/stores/productStore';
import CategoryLinks from '@/components/userPages/product/CategoryLinks.vue';
import swalStore from '@/stores/swalStore';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  components: {
    ProductCard,
    PaginationComponent,
    CategoryLinks,
  },
  data() {
    return {
      products: [],
      pagination: {},
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
        const { category = '' } = this.$route.query;
        this.updatedCategory(category);
        const url = `${VITE_URL}/api/${VITE_PATH}/products?page=${page}&category=${this.currentCategory}`;
        const res = await this.$http.get(url);
        this.products = res.data.products;
        this.pagination = res.data.pagination;

        this.hideLoading();
      } catch (error) {
        this.hideLoading();
        // 通知
        this.apiErrorSwal(error);
      }
    },
    ...mapActions(loadingStore, ['showLoading', 'hideLoading']),
    ...mapActions(productStore, ['updatedCategory']),
    ...mapActions(swalStore, ['apiErrorSwal']),
  },
  computed: {
    ...mapState(loadingStore, ['loadingStatus']),
    ...mapState(productStore, ['categories', 'currentCategory']),
  },
};
</script>
