<template>
  <div v-if="Object.keys(product).length" class="container py-10">
    <div class="flex flex-col pb-16 sm:flex-row">
      <!-- 圖 -->
      <div class="h-96 pb-5 sm:w-1/2 sm:pb-0 sm:pr-4 md:h-[500px]">
        <!-- 顯示的圖 -->
        <swiper-container
          class="mx-auto h-4/5 w-full *:overflow-hidden *:rounded-sm"
          thumbs-swiper=".thumbs"
          space-between="10"
          navigation="true"
        >
          <!-- 主圖 -->
          <swiper-slide lazy="true">
            <VueMagnifier
              :src="product.imageUrl"
              mgShape="square"
              class="aspect-square object-cover"
            />
          </swiper-slide>
          <!-- 其他圖 -->
          <swiper-slide v-for="(img, i) in product.imagesUrl" :key="`img${i}`" lazy="true">
            <VueMagnifier :src="img" class="aspect-square object-cover" />
          </swiper-slide>
        </swiper-container>
        <!-- thumbs -->
        <swiper-container
          class="thumbs h-1/5 pt-2 *:h-full *:w-1/4 *:cursor-pointer *:overflow-hidden *:rounded-sm
            *:opacity-40"
          slides-per-view="4"
          free-mode="true"
          space-between="10"
          watch-slides-progress="true"
        >
          <!-- 主圖 -->
          <swiper-slide lazy="true"
            ><img
              loading="lazy"
              class="h-full w-full object-cover"
              :src="product.imageUrl"
              alt="產品圖"
          /></swiper-slide>
          <!-- 其他圖 -->
          <swiper-slide v-for="(img, i) in product.imagesUrl" :key="`img${i}`" lazy="true">
            <img class="h-full w-full object-cover" loading="lazy" :src="img" alt="產品圖" />
          </swiper-slide>
        </swiper-container>
      </div>
      <!-- 內容 -->
      <div class="relative flex flex-col justify-between sm:w-1/2 sm:pl-4">
        <h2 class="mb-3 text-2xl font-bold text-primary-800">{{ product.title }}</h2>
        <p class="mb-5">{{ product.unit }}</p>
        <p class="mb-5">{{ product.description }}</p>
        <p class="mb-5">
          <span class="mr-1 text-2xl text-primary-800">
            <template v-if="product.price !== product.origin_price">特惠</template>
            NT$ {{ product.price }}</span
          >
          <del v-if="product.price !== product.origin_price">NT$ {{ product.origin_price }}</del>
        </p>
        <!-- 數量按鈕 -->
        <p>數量</p>
        <div class="mb-5 flex w-fit rounded border-2 border-primary-700 *:px-3 *:py-2">
          <button
            type="button"
            class="transition-colors hover:bg-primary-700 hover:text-primary-50 focus:bg-primary-700
              focus:text-primary-50 active:bg-primary-700 active:text-primary-50
              disabled:cursor-not-allowed disabled:bg-stone-100 disabled:text-stone-500"
            @click="qty--"
            :disabled="qty === 1"
          >
            －
          </button>
          <input
            type="text"
            class="w-10 border-x border-y-0 border-primary-700 bg-transparent text-center
              focus:ring-primary-700"
            v-model="qty"
            readonly
          />
          <button
            type="button"
            class="transition-colors hover:bg-primary-700 hover:text-primary-50 focus:bg-primary-700
              focus:text-primary-50 active:bg-primary-700 active:text-primary-50
              disabled:cursor-not-allowed disabled:bg-stone-100/50 disabled:text-stone-500"
            @click="qty++"
          >
            ＋
          </button>
        </div>
        <LoadingBtn
          class="btn btn-primary mt-auto w-full"
          @click.prevent="postCart(product.id, qty)"
          :is-loading="loadingStatus.productId === product.id"
          >加入購物車</LoadingBtn
        >
      </div>
    </div>
    <!-- 推薦商品 -->
    <div class="mb-5 flex items-center justify-between">
      <h2 class="text-xl font-bold text-primary-800">推薦商品</h2>
      <RouterLink to="/products" class="link font-bold">查看所有商品 →</RouterLink>
    </div>
    <ProductSwiper />
  </div>
</template>
<style scoped>
.thumbs .swiper-slide-thumb-active {
  @apply opacity-100;
}
swiper-container::part(container) {
  --swiper-theme-color: #361707;
}
swiper-container[thumbs-swiper]::part(button-prev),
swiper-container[thumbs-swiper]::part(button-next) {
  @apply text-primary-50;
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
import VueMagnifier from '@websitebeaver/vue-magnifier';
import '@websitebeaver/vue-magnifier/styles.css';
import swalStore from '@/stores/swalStore';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  props: ['id'],
  components: {
    LoadingBtn,
    ProductSwiper,
    VueMagnifier,
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
  watch: {
    '$route.params.id': {
      handler() {
        this.init();
      },
      deep: true,
    },
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
        this.apiErrorSwal(error);
      }
    },
    ...mapActions(cartStore, ['postCart']),
    ...mapActions(loadingStore, ['showLoading', 'hideLoading']),
    ...mapActions(productStore, ['getAllProducts']),
    ...mapActions(swalStore, ['apiErrorSwal']),
  },
  computed: {
    ...mapState(loadingStore, ['loadingStatus']),
  },
};
</script>
