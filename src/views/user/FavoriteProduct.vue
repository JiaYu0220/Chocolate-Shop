<template>
  <div class="container flex h-full flex-col py-10">
    <h2 class="mb-8 border-b-2 border-primary-200 pb-10 text-center text-4xl font-bold">
      關注列表
    </h2>
    <ul v-if="products.length" class="-m-4 mb-8 flex flex-wrap *:p-4">
      <li class="w-full md:w-1/2 xl:w-1/3" v-for="product in products" :key="product.id">
        <ProductCard :product="product" />
      </li>
    </ul>
    <div v-else class="flex grow flex-col items-center justify-center">
      <i class="bi bi-heartbreak text-6xl"></i>
      <p class="py-6 text-lg">目前沒有關注的產品</p>
      <RouterLink to="/products" class="btn btn-primary">開始購物</RouterLink>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'pinia';
import loadingStore from '@/stores/loadingStore';
import ProductCard from '@/components/userPages/product/ProductCard.vue';
import productStore from '@/stores/productStore';
import favoriteStore from '@/stores/favoriteStore';

export default {
  components: {
    ProductCard,
  },
  data() {
    return {
      products: [],
    };
  },
  mounted() {
    this.filterFavoriteProduct();
  },
  methods: {
    async filterFavoriteProduct() {
      this.showLoading();
      // 取資料
      this.getFavorites();
      await this.getAllProducts();
      // 篩選
      this.products = this.allProducts.filter((item) => this.favorites.includes(item.id));

      this.hideLoading();
    },
    ...mapActions(productStore, ['getAllProducts']),
    ...mapActions(favoriteStore, ['getFavorites']),
    ...mapActions(loadingStore, ['showLoading', 'hideLoading']),
  },
  computed: {
    ...mapState(productStore, ['allProducts']),
    ...mapState(favoriteStore, ['favorites']),
  },
};
</script>
