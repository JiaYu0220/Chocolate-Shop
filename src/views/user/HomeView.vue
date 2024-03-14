<template>
  <MyLoading/>
  <!-- banner -->
  <section class="w-full h-[600px] bg-bannerImage-sm md:bg-bannerImage bg-cover">

  </section>
  <!-- 分類 -->
  <section class="bg-primary-50 py-10 md:py-20">
    <div class="container">
      <SectionTitle>品項</SectionTitle>
        <ul class="w-full mx-auto flex flex-wrap -m-4 *:p-1">
          <li class="w-1/3">
            <RouterLink to="" class="block h-40 overflow-hidden relative md:h-52 group/cate">
              <img class="object-cover w-full h-full group-hover/cate:brightness-75 group-hover/cate:scale-110 transition-all duration-300" loading="lazy" src="https://images.pexels.com/photos/65882/chocolate-dark-coffee-confiserie-65882.jpeg?auto=compress&cs=tinysrgb&w=500&h=400&dpr=1" alt="基本類別">
            <h4 class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 text-nowrap
            bg-primary-100/70 text-primary-800 text-xl font-black
              transition-colors duration-300
              group-hover/cate:bg-primary-300/70 group-hover/cate:text-primary-900
              md:text-4xl md:p-8">基本</h4>
          </RouterLink>
          </li>
          <li class="w-2/3">
            <RouterLink to="" class="block h-40 overflow-hidden relative md:h-52 group/cate">
              <img class="object-cover w-full h-full group-hover/cate:brightness-75 group-hover/cate:scale-110 transition-all duration-300" loading="lazy" src="https://images.pexels.com/photos/65882/chocolate-dark-coffee-confiserie-65882.jpeg?auto=compress&cs=tinysrgb&w=500&h=400&dpr=1" alt="禮盒類別">
              <h4 class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 text-nowrap
            bg-primary-100/70 text-primary-800 text-xl font-black
              transition-colors duration-300
              group-hover/cate:bg-primary-300/70 group-hover/cate:text-primary-900
              md:text-4xl md:p-8">禮盒</h4>
            </RouterLink>
          </li>
          <li class="w-1/2">
            <RouterLink to="" class="block h-40 overflow-hidden relative md:h-52 group/cate">
              <img class="object-cover w-full h-full group-hover/cate:brightness-75 group-hover/cate:scale-110 transition-all duration-300" loading="lazy" src="https://images.pexels.com/photos/65882/chocolate-dark-coffee-confiserie-65882.jpeg?auto=compress&cs=tinysrgb&w=500&h=400&dpr=1" alt="特殊類別">
              <h4 class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 text-nowrap
            bg-primary-100/70 text-primary-800 text-xl font-black
              transition-colors duration-300
              group-hover/cate:bg-primary-300/70 group-hover/cate:text-primary-900
              md:text-4xl md:p-8">特殊</h4>
            </RouterLink>
          </li>
          <li class="w-1/2">
            <RouterLink to="" class="block h-40 overflow-hidden relative md:h-52 group/cate">
              <img class="object-cover w-full h-full group-hover/cate:brightness-75 group-hover/cate:scale-110 transition-all duration-300" loading="lazy" src="https://images.pexels.com/photos/65882/chocolate-dark-coffee-confiserie-65882.jpeg?auto=compress&cs=tinysrgb&w=500&h=400&dpr=1" alt="料理類別">
              <h4 class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 text-nowrap
            bg-primary-100/70 text-primary-800 text-xl font-black
              transition-colors duration-300
              group-hover/cate:bg-primary-300/70 group-hover/cate:text-primary-900
              md:text-4xl md:p-8">料理</h4>
            </RouterLink>
          </li>
        </ul>
    </div>
  </section>
  <!-- 跑馬燈 -->
  <SaleMarquee v-if="saleProducts.length" :data="saleProducts"/>
    <!-- 優勢 -->
    <section class="py-10 md:py-20 bg-primary-100 text-primary-800">
    <div class="container">
      <SectionTitle>巧克力也可以吃得很健康</SectionTitle>
      <ul class="flex flex-wrap -m-4 *:text-center *:w-full *:sm:w-1/2 *:p-4 md:*:w-1/4">
      <li>
        <i class="bi bi-emoji-heart-eyes text-7xl"></i>
        <h4 class="text-2xl font-bold mt-6 mb-2">美味</h4>
        <p class="text-left">嚴選台灣在地食材，搭配獨家比例配方，保證一試成主顧</p>
      </li>
      <li>
        <i class="bi bi-emoji-laughing text-7xl"></i>
        <h4 class="text-2xl font-bold mt-6 mb-2">快樂</h4>
        <p class="text-left">巧克力含有色胺酸，能促進血清素分泌讓你擁有快樂好心情</p>
      </li>
      <li>
        <i class="bi bi-tree text-7xl"></i>
        <h4 class="text-2xl font-bold mt-6 mb-2">健康</h4>
        <p class="text-left">低加工、低糖、零添加，讓你吃的無負擔、無罪惡</p>
      </li>
      <li>
        <i class="bi bi-hand-thumbs-up text-7xl"></i>
        <h4 class="text-2xl font-bold mt-6 mb-2">安心</h4>
        <p class="text-left">經 SGS 檢驗合格、所有巧克力產品皆符合歐盟標準</p>
      </li>
      </ul>
    </div>
  </section>
  <!-- 推薦商品 -->
  <section class="bg-primary-50 overflow-hidden">
    <div class="container py-10 md:py-20">
      <SectionTitle>推薦商品</SectionTitle>
      <swiper-container init="false"
      ref="productSwiper"
      >
        <swiper-slide v-for="product in homeProducts" :key="product.id">
        <ProductCard :product="product"></ProductCard>
        </swiper-slide>
      </swiper-container>
      <div class="flex justify-center mt-8">
        <RouterLink to="" class="btn btn-link">查看所有商品</RouterLink>
      </div>
    </div>
  </section>
  <!-- 倒數 -->
  <!-- 最新消息 -->
  <section class="bg-primary-100 overflow-hidden">
    <div class="container py-10 md:py-20">
      <SectionTitle>最新消息</SectionTitle>
      <ul v-if="articles.length">
        <li v-for="article in articles" :key="article.id"
        class="bg-primary-50 rounded-md p-4
        md:flex md:justify-center md:items-center md:overflow-visible md:h-56 md:px-10 md:py-0">
          <div class="flex w-full">
            <!-- 圖 -->
            <div class="w-1/3 md:relative">
              <div class="w-full rounded-sm
              md:absolute md:left-0 md:-inset-y-5 lg:-inset-y-8  md:overflow-hidden">
                <img class="w-full h-full object-cover" height="100" :src="article.image" alt="文章圖">
              </div>
            </div>
            <!-- 標題、文(桌機板) -->
            <div class="w-2/3 ml-auto pl-4 flex flex-col md:py-6 md:pl-6">
              <div class="flex justify-between items-center mb-2">
                <h4 class="text-xl md:text-2xl text-primary-800 font-bold">{{ article.title }}</h4>
                <span class="hidden md:inline md:text-stone-500 md:text-xs">2024/4/5</span>
              </div>
              <ul class="flex gap-1 mb-2 text-xs md:text-sm">
              <li class="bg-primary-300 text-primary-900 py-1 px-2 rounded-sm">
              標籤一</li>
              <li class="bg-primary-300 text-primary-900 py-1 px-2 rounded-sm">
              標籤一</li>
              </ul>
              <div class="hidden md:flex md:flex-col">
                <p class="line-clamp-3 text-justify mb-2">{{ article.description }}</p>
                <RouterLink to="" class="ml-auto text-sm self-end btn btn-link">
                  了解更多<i class="bi bi-arrow-right-short"></i>
                </RouterLink>
              </div>
            </div>
          </div>
          <!-- 標題、文(行動版) -->
          <div class="mt-2 flex flex-col gap-2 md:hidden">
            <span class="text-stone-500 text-sm">2024/4/5</span>
            <p class="line-clamp-3 text-justify">{{ article.description }}</p>
            <RouterLink to="" class="text-sm ml-auto btn btn-link">
              了解更多<i class="bi bi-arrow-right-short"></i>
            </RouterLink>
          </div>
        </li>
      </ul>
      <div class="flex justify-center mt-8">
        <RouterLink to="" class="btn btn-link">查看所有文章</RouterLink>
      </div>
    </div>
  </section>

</template>
<style scoped>
swiper-container::part(container){
  --swiper-theme-color: #361707;
  @apply overflow-visible cursor-grab active:cursor-grabbing
}
swiper-slide{
  @apply h-auto
}

swiper-container::part(button-prev),swiper-container::part(button-next){
  width: 20px;
  --swiper-navigation-size: 20px;
  --swiper-navigation-sides-offset: 40px;
  --swiper-navigation-top-offset: 30%;
  @apply bg-primary-50 rounded-full p-4 hover:scale-110 transition-transform duration-300
}
swiper-container::part(scrollbar){
  --swiper-scrollbar-drag-bg-color: rgba(38, 16, 5, 0.5);
  --swiper-scrollbar-bg-color: rgba(38, 16, 5, 0.1);
  @apply static mt-5 w-2/3 mx-auto
}

</style>
<script>
import { register } from 'swiper/element/bundle';
import SaleMarquee from '@/components/userPages/home/SaleMarquee.vue';
import SectionTitle from '@/components/userPages/home/SectionTitle.vue';
import { mapActions } from 'pinia';
import loadingStore from '@/stores/loadingStore';
import MyLoading from '@/components/shared/helpers/MyLoading.vue';
import ProductCard from '@/components/userPages/ProductCard.vue';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  components: {
    SaleMarquee, SectionTitle, MyLoading, ProductCard,
  },
  data() {
    return {
      saleProducts: [],
      homeProducts: [],
      articles: [],
    };
  },
  mounted() {
    this.init();
    register();
    Object.assign(this.$refs.productSwiper, {
      slidesPerView: 2,
      spaceBetween: 12,
      setWrapperSize: true,
      navigation: {
        enabled: false,
      },
      scrollbar: {
        enabled: true,
        draggable: true,
      },
      breakpoints: {
        768: {
          slidesPerView: 3,
          spaceBetween: 16,
          navigation: {
            enabled: true,
          },
        },
        1280: {
          slidesPerView: 4,
        },
      },
    });
    this.$refs.productSwiper.initialize();
  },
  methods: {
    async init() {
      const promiseArray = [this.getAllProducts(),
        this.getAllArticles()];
      const resArr = await Promise.allSettled(promiseArray);
      resArr.forEach((res) => {
        if (res.status === 'rejected') {
          this.$swal(res.response.data);
        }
      });
    },
    async getAllProducts() {
      try {
        this.showLoading();
        const url = `${VITE_URL}/api/${VITE_PATH}/products/all`;
        const res = await this.$http.get(url);
        const { products } = res.data;
        this.homeProducts = [...products].filter((item) => item.origin_price !== item.price);
        this.saleProducts = [...products].filter((item) => item.origin_price !== item.price);
        this.hideLoading();
      } catch (error) {
        this.hideLoading();
        // 通知
        const { message } = error.response.data;
        this.$swal(Array.isArray(message) ? message[0] : message);
      }
    },
    async getAllArticles() {
      try {
        this.showLoading();
        const url = `${VITE_URL}/api/${VITE_PATH}/articles`;
        const res = await this.$http.get(url);

        this.articles = res.data.articles.slice(0, 2);
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
};
</script>
