<template>
  <div>
    <MyLoading />
    <!-- banner -->
    <section
      class="relative h-[400px] w-full bg-bannerImage-sm bg-cover bg-center sm:h-[600px]
        md:bg-bannerImage"
    >
      <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-primary-50">
        <div class="flex flex-col items-center backdrop:brightness-75">
          <h2
            class="mb-5 text-nowrap text-center text-lg font-bold leading-relaxed drop-shadow-md
              md:text-3xl md:leading-relaxed"
          >
            人生就像一塊
            <span
              class="relative px-1 drop-shadow-md before:absolute before:-inset-1 before:-skew-y-3
                before:bg-primary-900"
            >
              <span class="relative">黑巧克力</span></span
            >
            ，有苦有甜，但...<br />正是這份苦澀，讓甜美更加珍貴。
          </h2>
          <RouterLink to="/products" class="btn btn-primary"
            >立即逛逛 <i class="bi bi-arrow-right-short"></i
          ></RouterLink>
        </div>
      </div>
    </section>
    <!-- 分類 -->
    <section class="bg-primary-50 py-10 md:py-20">
      <div class="container overflow-hidden">
        <SectionTitle title="品項" link-to="/products" link-text="查看所有商品" />
        <ul class="-m-1 flex flex-wrap *:h-72 *:p-1">
          <li data-aos="fade-down-right" class="w-1/3">
            <RouterLink
              to="/products?category=基本"
              class="group/cate relative block h-full overflow-hidden"
            >
              <img
                class="h-full w-full object-cover transition-all duration-300
                  group-hover/cate:scale-110 group-hover/cate:brightness-75"
                loading="lazy"
                src="@/assets/基本.webp"
                alt="基本類別"
              />
              <h4
                class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-nowrap
                  bg-primary-100/70 p-4 text-xl font-black text-primary-800 transition-colors
                  duration-300 backdrop:bg-primary-300 group-hover/cate:bg-primary-300/70
                  group-hover/cate:text-primary-900 md:p-8 md:text-4xl"
              >
                基本
              </h4>
            </RouterLink>
          </li>
          <li data-aos="fade-down-left" class="w-2/3">
            <RouterLink
              to="/products?category=禮盒"
              class="group/cate relative block h-full overflow-hidden"
            >
              <img
                class="h-full w-full object-cover transition-all duration-300
                  group-hover/cate:scale-110 group-hover/cate:brightness-75"
                loading="lazy"
                src="@/assets/禮盒.webp"
                alt="禮盒類別"
              />
              <h4
                class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-nowrap
                  bg-primary-100/70 p-4 text-xl font-black text-primary-800 transition-colors
                  duration-300 group-hover/cate:bg-primary-300/70 group-hover/cate:text-primary-900
                  md:p-8 md:text-4xl"
              >
                禮盒
              </h4>
            </RouterLink>
          </li>
          <li data-aos="fade-up-right" class="w-1/2">
            <RouterLink
              to="/products?category=特殊口味"
              class="group/cate relative block h-full overflow-hidden"
            >
              <img
                class="h-full w-full object-cover transition-all duration-300
                  group-hover/cate:scale-110 group-hover/cate:brightness-75"
                loading="lazy"
                src="@/assets/特殊.webp"
                alt="特殊口味"
              />
              <h4
                class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-nowrap
                  bg-primary-100/70 p-4 text-xl font-black text-primary-800 transition-colors
                  duration-300 group-hover/cate:bg-primary-300/70 group-hover/cate:text-primary-900
                  md:p-8 md:text-4xl"
              >
                特殊
              </h4>
            </RouterLink>
          </li>
          <li data-aos="fade-up-left" class="w-1/2">
            <RouterLink
              to="/products?category=料理"
              class="group/cate relative block h-full overflow-hidden"
            >
              <img
                class="h-full w-full object-cover transition-all duration-300
                  group-hover/cate:scale-110 group-hover/cate:brightness-75"
                loading="lazy"
                src="@/assets/料理.webp"
                alt="料理類別"
              />
              <h4
                class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-nowrap
                  bg-primary-100/70 p-4 text-xl font-black text-primary-800 transition-colors
                  duration-300 group-hover/cate:bg-primary-300/70 group-hover/cate:text-primary-900
                  md:p-8 md:text-4xl"
              >
                料理
              </h4>
            </RouterLink>
          </li>
        </ul>
      </div>
    </section>
    <!-- 跑馬燈 -->
    <SaleMarquee />
    <!-- 優勢 -->
    <section class="bg-primary-100 py-10 text-primary-800 md:py-20">
      <div class="container">
        <SectionTitle data-aos="fade-up" title="巧克力也可以吃得很健康" />
        <ul
          data-aos="fade-up"
          class="-m-4 flex flex-wrap *:w-full *:p-4 *:text-center *:sm:w-1/2 md:*:w-1/4"
        >
          <li v-for="item in features" :key="item.title">
            <i :class="`bi ${item.icon} text-7xl`"></i>
            <h4 class="mb-2 mt-6 text-2xl font-bold">{{ item.title }}</h4>
            <p class="text-left">{{ item.text }}</p>
          </li>
        </ul>
      </div>
    </section>
    <!-- 推薦商品 -->
    <section class="overflow-hidden bg-primary-50">
      <div data-aos="fade-up" class="container py-10 md:py-20">
        <SectionTitle title="推薦商品" link-to="/products" link-text="查看所有商品" />
        <ProductSwiper />
      </div>
    </section>
    <!-- 倒數 -->
    <section class="bg-primary-100">
      <div class="container pt-10 md:pt-20">
        <SectionTitle title="快閃優惠" />
        <div data-aos="fade-up" class="relative rounded">
          <img
            class="w-full object-cover"
            lazy="loading"
            src="@/assets/discount-banner.webp"
            alt="產品圖"
          />
          <ProductSpot
            v-for="product in imageProductData"
            :key="product.id"
            :class="product.position"
            :product="product"
          >
          </ProductSpot>
        </div>
        <div
          data-aos="fade-up"
          class="flex flex-col gap-4 bg-orange-700 p-6 text-center text-primary-50 md:flex-row
            md:items-center md:justify-center md:gap-16 md:p-10"
        >
          <div>
            <p class="mb-1 text-nowrap text-2xl font-bold md:text-5xl">
              全館 {{ coupon.percent / 10 }} 折
            </p>
            <p class="text-nowrap md:text-lg">輸入優惠碼 {{ coupon.code }}</p>
          </div>
          <!-- 倒數 -->
          <div class="flex flex-col items-center gap-8 lg:flex-row lg:gap-16">
            <ul class="flex justify-center gap-2 md:gap-3 md:py-0">
              <li v-for="(item, key) in couponTimer" :key="`${key}-${item}`">
                <p class="mb-1 text-2xl font-bold md:text-4xl">
                  {{ item }}
                  <span v-if="key !== '秒'" class="px-2">:</span>
                </p>
                <p class="pl-2 text-start text-sm md:pl-3 md:text-base">
                  {{ key }}
                </p>
              </li>
            </ul>
            <RouterLink
              class="btn md:btn-lg border border-primary-50 hover:bg-primary-50
                hover:text-orange-700 focus:bg-primary-50 focus:text-orange-700 active:bg-primary-50
                active:text-orange-700 md:text-xl"
              to="/products"
              >去購物</RouterLink
            >
          </div>
        </div>
      </div>
    </section>
    <!-- 最新消息 -->
    <section class="bg-primary-50">
      <div class="container py-10 md:py-20">
        <SectionTitle title="最新消息" link-to="/articles" link-text="查看所有文章" />
        <ul data-aos="fade-up" v-if="articles.length" class="flex flex-wrap sm:-mx-2 sm:-my-4">
          <template v-for="(article, i) in articles" :key="article.id">
            <li
              v-if="i < 3"
              class="w-full sm:w-1/2 sm:px-2 py-4 sm:first:w-full xl:w-1/3 xl:first:w-1/3"
            >
              <ArticleCard :article="article" />
            </li>
          </template>
        </ul>
      </div>
    </section>
  </div>
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
import timerStore from '@/stores/timerStore';

// import @/assets/基本.webp from '@/assets/基本.webp';
// import @/assets/禮盒.webp from '@/assets/禮盒.webp';
// import @/assets/特殊.webp from '@/assets/特殊.webp';
// import @/assets/料理.webp from '@/assets/料理.webp';
// import discountBanner from '@/assets/discount-banner.webp';

export default {
  components: {
    SaleMarquee,
    SectionTitle,
    MyLoading,
    ProductSwiper,
    ArticleCard,
    ProductSpot,
  },
  data() {
    return {
      features: [
        {
          title: '美味',
          text: '嚴選台灣在地食材，搭配獨家比例配方，保證一試成主顧',
          icon: 'bi-emoji-heart-eyes',
        },
        {
          title: '快樂',
          text: '巧克力含有色胺酸，能促進血清素分泌讓你擁有快樂好心情',
          icon: 'bi-emoji-laughing',
        },
        {
          title: '健康',
          text: '低加工、低糖、零添加，讓你吃的無負擔、無罪惡',
          icon: 'bi-tree',
        },
        {
          title: '安心',
          text: '經 SGS 檢驗合格、所有巧克力產品皆符合歐盟標準',
          icon: 'bi-hand-thumbs-up',
        },
      ],
      imageProductInfo: [
        { id: '-NobCvfHIstyHzbSxthN', position: 'top-[25%] left-1/4' },
        { id: '-NtVmptoh2i8Udg7zz9w', position: 'top-[25%] left-[48%]' },
        { id: '-NtVoiUruLXM8sUb349I', position: 'top-[15%] left-[68%]' },
      ],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      this.showLoading();
      const promiseArray = [this.getAllProducts(), this.getAllArticles()];
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
    ...mapState(timerStore, ['couponTimer', 'coupon']),
  },
};
</script>
