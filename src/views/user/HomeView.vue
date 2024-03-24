<template>
  <MyLoading/>
  <!-- banner -->
  <section class="w-full h-[400px] sm:h-[600px]
  bg-bannerImage-sm md:bg-bannerImage bg-cover bg-center relative">
    <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-primary-50">
        <!-- <h2 class="text-8xl font-bold">黑巧克力專賣</h2> -->
        <div class="flex flex-col items-center backdrop:brightness-75">
          <h2 class="text-lg font-bold text-center text-nowrap leading-relaxed drop-shadow-md mb-5
          md:text-3xl md:leading-relaxed">
            人生就像一塊
            <span class="relative px-1 before:absolute before:-inset-1 before:-skew-y-3
            before:bg-primary-900 drop-shadow-md">
            <span class="relative">黑巧克力</span></span>
            ，有苦有甜，但...<br>正是這份苦澀，讓甜美更加珍貴。
          </h2>
          <RouterLink to="/products" class="btn btn-primary">立即逛逛
            <i class="bi bi-arrow-right-short"></i></RouterLink>
        </div>
    </div>
  </section>
  <!-- 分類 -->
  <section class="bg-primary-50 py-10 md:py-20">
    <div class="container">
      <SectionTitle title="品項" link-to="/products" link-text="查看所有商品"></SectionTitle>
      <ul class="flex flex-wrap -m-1 *:p-1 *:h-72">
        <li class="w-1/3">
          <RouterLink to="/products?category=基本" class="block h-full overflow-hidden relative
            group/cate">
            <img class="object-cover w-full h-full group-hover/cate:brightness-75 group-hover/cate:scale-110 transition-all duration-300" loading="lazy" src="https://images.pexels.com/photos/4110097/pexels-photo-4110097.jpeg?auto=compress&cs=tinysrgb&w=800&h=auto&dpr=1" alt="基本類別">
          <h4 class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 text-nowrap
          bg-primary-100/70 text-primary-800 text-xl font-black
            transition-colors duration-300
            group-hover/cate:bg-primary-300/70 group-hover/cate:text-primary-900
            md:text-4xl md:p-8
            backdrop:bg-primary-300">基本</h4>
        </RouterLink>
        </li>
        <li class="w-2/3">
          <RouterLink to="/products?category=禮盒"
          class="block h-full overflow-hidden relative group/cate">
            <img class="object-cover w-full h-full group-hover/cate:brightness-75 group-hover/cate:scale-110 transition-all duration-300" loading="lazy" src="https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="禮盒類別">
            <h4 class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 text-nowrap
          bg-primary-100/70 text-primary-800 text-xl font-black
            transition-colors duration-300
            group-hover/cate:bg-primary-300/70 group-hover/cate:text-primary-900
            md:text-4xl md:p-8">禮盒</h4>
          </RouterLink>
        </li>
        <li class="w-1/2">
          <RouterLink to="/products?category=特殊口味"
          class="block h-full overflow-hidden relative group/cate">
            <img class="object-cover w-full h-full group-hover/cate:brightness-75 group-hover/cate:scale-110 transition-all duration-300" loading="lazy" src="https://images.unsplash.com/photo-1545396635-f4865ca1448b?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="特殊口味">
            <h4 class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 text-nowrap
          bg-primary-100/70 text-primary-800 text-xl font-black
            transition-colors duration-300
            group-hover/cate:bg-primary-300/70 group-hover/cate:text-primary-900
            md:text-4xl md:p-8">特殊</h4>
          </RouterLink>
        </li>
        <li class="w-1/2">
          <RouterLink to="/products?category=料理"
          class="block h-full overflow-hidden relative group/cate">
            <img class="object-cover w-full h-full group-hover/cate:brightness-75 group-hover/cate:scale-110 transition-all duration-300" loading="lazy" src="https://images.pexels.com/photos/5078594/pexels-photo-5078594.jpeg?auto=compress&cs=tinysrgb&w=800&h=auto&dpr=1" alt="料理類別">
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
  <SaleMarquee/>
    <!-- 優勢 -->
    <section class="py-10 md:py-20 bg-primary-100 text-primary-800">
    <div class="container">
      <SectionTitle title="巧克力也可以吃得很健康"></SectionTitle>
      <ul class="flex flex-wrap -m-4 *:text-center *:w-full *:sm:w-1/2 *:p-4 md:*:w-1/4">
        <li v-for="item in features" :key="item.title">
          <i :class="`bi ${item.icon} text-7xl`"></i>
          <h4 class="text-2xl font-bold mt-6 mb-2">{{ item.title }}</h4>
          <p class="text-left">{{ item.text }}</p>
        </li>
      </ul>
    </div>
  </section>
  <!-- 推薦商品 -->
  <section class="bg-primary-50 overflow-hidden">
    <div class="container py-10 md:py-20">
      <SectionTitle title="推薦商品" link-to="/products" link-text="查看所有商品"></SectionTitle>
      <ProductSwiper/>
    </div>
  </section>
  <!-- 倒數 -->
  <section class="bg-primary-100">
    <div class="container pt-10 md:pt-20">
      <SectionTitle title="快閃優惠"></SectionTitle>
      <div class="rounded relative">
        <img class="object-cover w-full" lazy="loading" src="https://storage.googleapis.com/vue-course-api.appspot.com/jiayu/1711024085141.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=dgPjEh%2BoMN9HqpgPCOYpMPSvmcjvky0%2BYvmvD0Q4T8pubg%2BU92ZgA4E10wNqeIKbv62XpiQuiwcno7VIDL4hrd6n6JoGKqpFp8T%2FhHozBz83kN1jWa0Er7JqJxRU%2BnTOngwy1AD7h5E4co1a0RcpJQsheMsO9mMkNeEsTlRwKIyenxyumtBnNr6XR362IKmrEv9INKYBCwD6sDf8AAJqn6vL%2FF4ajiMkN0L2M5xEyTJ9OaAhxA8vHGjO5mP8Fn6BAO7S93NmIVnPwzMEcKjOcqLuN36GFR5pmfkXydsJqSheenwd9SaaOUoy8g3CQClCc0%2FeccNQo%2FunRKm2vlTWww%3D%3D" alt="">
        <ProductSpot v-for="product in imageProductData" :key="product.id"
        :class="product.position" :product="product">
        </ProductSpot>
      </div>
      <div class="p-6 bg-orange-700 text-primary-50 text-center gap-4
      flex flex-col md:flex-row md:items-center md:justify-center md:p-10 md:gap-16">
        <div>
          <p class="text-2xl mb-1 font-bold text-nowrap md:text-5xl">全館 8 折</p>
          <p class="text-nowrap md:text-lg">輸入優惠碼 ILOVECACAO</p>
        </div>
        <!-- 倒數 -->
        <div class="flex flex-col items-center gap-8 lg:gap-16 lg:flex-row">
          <ul class="flex justify-center gap-2 md:py-0 md:gap-3">
            <li
            v-for="(item, key) in timer" :key="item">
              <p class="text-2xl font-bold mb-1 md:text-4xl">
                {{ item }}
              <span v-if="key !== '秒'" class="px-2">:</span></p>
              <p class="text-sm text-start pl-2 md:pl-3 md:text-base">{{ key }}</p>
            </li>
          </ul>
          <RouterLink class=" btn border border-primary-50 md:text-xl md:btn-lg
          hover:bg-primary-50 hover:text-orange-700 focus:bg-primary-50 focus:text-orange-700
          active:bg-primary-50 active:text-orange-700
          " to="/products">去購物</RouterLink>
        </div>
      </div>
    </div>
  </section>
  <!-- 最新消息 -->
  <section class="bg-primary-50">
    <div class="container py-10 md:py-20">
      <SectionTitle title="最新消息" link-to="/articles" link-text="查看所有文章"></SectionTitle>
      <ul v-if="articles.length" class="flex flex-wrap sm:-mx-2 sm:-my-4" >
        <template v-for="(article, i) in articles" :key="article.id">
          <li v-if="i < 3"
          class="w-full sm:first:w-full sm:w-1/2 xl:w-1/3 xl:first:w-1/3 sm:px-2 sm:py-4">
            <ArticleCard  :article="article"/>
          </li>
        </template>
      </ul>
    </div>
  </section>

</template>
<script>
import { mapActions, mapState } from 'pinia';
import loadingStore from '@/stores/loadingStore';
import productStore from '@/stores/productStore';
import articleStore from '@/stores/articleStore';

import SaleMarquee from '@/components/userPages/home/SaleMarquee.vue';
import SectionTitle from '@/components/userPages/home/SectionTitle.vue';
import MyLoading from '@/components/shared/helpers/MyLoading.vue';
import ProductSwiper from '@/components/userPages/product/ProductSwiper.vue';
import ArticleCard from '@/components/userPages/article/ArticleCard.vue';
import ProductSpot from '@/components/userPages/home/ProductSpot.vue';

export default {
  components: {
    SaleMarquee, SectionTitle, MyLoading, ProductSwiper, ArticleCard, ProductSpot,
  },
  props: ['myTimer'],
  data() {
    return {
      timer: {},
      features: [{ title: '美味', text: '嚴選台灣在地食材，搭配獨家比例配方，保證一試成主顧', icon: 'bi-emoji-heart-eyes' }, { title: '快樂', text: '巧克力含有色胺酸，能促進血清素分泌讓你擁有快樂好心情', icon: 'bi-emoji-laughing' }, { title: '健康', text: '低加工、低糖、零添加，讓你吃的無負擔、無罪惡', icon: 'bi-tree' }, { title: '安心', text: '經 SGS 檢驗合格、所有巧克力產品皆符合歐盟標準', icon: 'bi-hand-thumbs-up' }],
      imageProductInfo: [{ id: '-NobCvfHIstyHzbSxthN', position: 'top-[25%] left-1/4' }, { id: '-NtVmptoh2i8Udg7zz9w', position: 'top-[25%] left-[48%]' }, { id: '-NtVoiUruLXM8sUb349I', position: 'top-[15%] left-[68%]' }],
    };
  },
  watch: {
    myTimer() {
      this.timer = this.myTimer;
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      this.showLoading();
      const promiseArray = [this.getAllProducts(),
        this.getAllArticles()];
      const resArr = await Promise.allSettled(promiseArray);
      resArr.forEach((res) => {
        if (res.status === 'rejected') {
          this.hideLoading();
          this.$swal(res.response.data);
        }
      });
      this.hideLoading();
    },
    ...mapActions(loadingStore, ['showLoading', 'hideLoading']),
    ...mapActions(productStore, ['getAllProducts']),
    ...mapActions(articleStore, ['getAllArticles']),
  },
  computed: {
    imageProductData() {
      const data = [...this.imageProductInfo];
      this.imageProductInfo.forEach((product, index) => {
        const spotData = this.allProducts.find((item) => item.id === product.id);
        if (spotData) {
          data[index] = { ...product, ...spotData };
        }
      });
      return data;
    },
    ...mapState(articleStore, ['articles']),
    ...mapState(productStore, ['allProducts']),
  },
};
</script>
