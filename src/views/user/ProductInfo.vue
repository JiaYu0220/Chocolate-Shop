<template>
  <div v-if="Object.keys(product).length" class="container py-10">
    <div class="flex flex-col sm:flex-row pb-16">
      <!-- 圖 -->
      <div class="sm:w-1/2 pb-5 sm:pb-0 sm:pr-4 h-96">
        <swiper-container class="w-full h-4/5 mx-auto *:rounded-sm *:overflow-hidden"
        thumbs-swiper=".thumbs" space-between="10" navigation="true">
          <swiper-slide lazy="true"><img class="object-cover h-full w-full" loading="lazy"
          :src="product.imageUrl" alt="產品圖"></swiper-slide>
          <swiper-slide v-for="(img, i) in product.imagesUrl" :key="`img${i}`" lazy="true">
            <img class="object-fit" loading="lazy" :src="img" alt="產品圖">
          </swiper-slide>
        </swiper-container>
        <swiper-container class="thumbs h-1/5 pt-2
        *:w-1/4 *:h-full *:opacity-40 *:cursor-pointer *:rounded-sm *:overflow-hidden"
        slides-per-view="4" free-mode="true" space-between="10"
        watch-slides-progress="true">
          <swiper-slide lazy="true"><img loading="lazy" class="object-cover h-full w-full"
          :src="product.imageUrl" alt="產品圖"></swiper-slide>
          <swiper-slide v-for="(img, i) in product.imagesUrl" :key="`img${i}`" lazy="true">
            <img class="object-fit" loading="lazy" :src="img" alt="產品圖">
          </swiper-slide>
        </swiper-container>
      </div>
      <!-- 內容 -->
      <div class="sm:w-1/2 sm:pl-4 flex flex-col justify-between">
        <h2 class="font-bold text-2xl text-primary-800 mb-3">{{ product.title }}</h2>
        <p class="mb-5">{{ product.unit }}</p>
        <p class="mb-5">{{ product.description }}</p>
        <p class="mb-5">
          <span class="text-2xl text-primary-800 mr-1">
          <template v-if="product.price !== product.origin_price">特惠</template>
          NT$ {{ product.price }}</span>
          <del v-if="product.price !== product.origin_price">NT$ {{ product.origin_price }}</del>
        </p>
        <!-- 數量按鈕 -->
        <p>數量</p>
        <div class=" flex w-fit border-2 border-primary-700 rounded mb-5 *:px-3 *:py-2">
          <button type="button"
          class="transition-colors hover:bg-primary-700 hover:text-primary-50
          focus:bg-primary-700 focus:text-primary-50 active:bg-primary-700 active:text-primary-50
          disabled:text-stone-500 disabled:bg-stone-100 disabled:cursor-not-allowed"
          @click="qty--" :disabled="qty === 1">
          －
          </button>
          <input type="text" class="border-y-0 bg-transparent w-10 text-center
          border-x border-primary-700
          focus:ring-primary-700"
          v-model="qty" readonly>
          <button type="button"
          class="transition-colors hover:bg-primary-700 hover:text-primary-50
          focus:bg-primary-700 focus:text-primary-50 active:bg-primary-700 active:text-primary-50
          disabled:text-stone-500 disabled:bg-stone-100/50 disabled:cursor-not-allowed"
          @click="qty++">
          ＋
          </button>
        </div>
        <LoadingBtn class="btn btn-primary w-full mt-auto"
        @click.prevent="postCart(product.id, qty)"
        :is-loading="(loadingStatus.productId === product.id)"
        >加入購物車</LoadingBtn>
      </div>
    </div>
    <!-- 推薦商品 -->
    <div class="flex justify-between items-center mb-5">
      <h2 class="text-primary-800 text-xl font-bold">推薦商品</h2>
      <RouterLink to="/products" class="btn btn-link">查看所有商品</RouterLink>
    </div>
    <ProductSwiper/>
  </div>
</template>
<style scoped>
.thumbs .swiper-slide-thumb-active{
  @apply opacity-100
}
swiper-container::part(container){
  --swiper-theme-color: #361707;
}
swiper-container[thumbs-swiper]::part(button-prev),
swiper-container[thumbs-swiper]::part(button-next) {
  @apply text-primary-50
}
</style>
<script>
import { mapState, mapActions } from 'pinia';
import loadingStore from '@/stores/loadingStore';
import cartStore from '@/stores/cartStore';
import { register } from 'swiper/element/bundle';
import LoadingBtn from '@/components/shared/button/LoadingBtn.vue';
import ProductSwiper from '@/components/userPages/product/ProductSwiper.vue';
import productStore from '@/stores/productStore';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  props: ['id'],
  components: {
    LoadingBtn, ProductSwiper,
  },
  data() {
    return {
      product: {},
      qty: 1,
    };
  },
  mounted() {
    register();
    this.init();
  },
  methods: {
    async init() {
      this.showLoading();
      const promiseArray = [this.getAllProducts(), this.getSingleProduct()];
      const resArr = await Promise.allSettled(promiseArray);
      resArr.forEach((res) => {
        if (res.status === 'rejected') {
          this.hideLoading();
          this.$swal(res.response.data);
        }
      });
      this.hideLoading();
    },
    async getSingleProduct() {
      try {
        const url = `${VITE_URL}/api/${VITE_PATH}/product/${this.id}`;
        const res = await this.$http.get(url);
        this.product = res.data.product;
      } catch (error) {
        this.hideLoading();
        // 通知
        const { message } = error.response.data;
        this.$swal(Array.isArray(message) ? message[0] : message);
      }
    },
    ...mapActions(cartStore, ['postCart']),
    ...mapActions(loadingStore, ['showLoading', 'hideLoading']),
    ...mapActions(productStore, ['getAllProducts']),
  },
  computed: {
    ...mapState(loadingStore, ['loadingStatus']),
  },
};
</script>
