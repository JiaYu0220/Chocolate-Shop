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
                src="https://storage.googleapis.com/vue-course-api.appspot.com/jiayu/1713337131802.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=oRih4b4Z1VlDg%2B3EqwWrl8MwU%2FPxlGfo0E4PWPOuJEUpjTdzQKSEC9w1ICP1q8SU5dSmNRC3fUY0jf2%2FGVr0mfhABOzylZ0V5U4abI3D8bhqJlvCMl%2FYNYbSClGt2Ks0gcbyYVvIen%2FOzA6jEZ5RxCgqRAm5rpOzDqGA0SlySFvYDNgLfTUducHacOKod3UgyqbaBBBbYrKiFQQnqVOxcUAICZ9zjlUt2o5WCGUK5QNgBQvTzL5l1v2u7RLDS4EefrODXWRfxt6fQmephZLSC%2BWDoLb3Ia69pmiCSLNSGtasWjTwII3XRk7B6erOYrVM44hE%2BwLBFU4P1RRCNzIfEg%3D%3D"
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
                src="https://storage.googleapis.com/vue-course-api.appspot.com/jiayu/1713337134466.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=Lqrs%2F1WZOU3Br79owH4lxUw6DI4rHmT%2FfLKc6O2VcT7cEJgD54%2BtBxeojIrZLfmY2Mqp5dhd2TFRVMJwilLSGBLdVOrI6lNLKLCUfb6P0rz9V5hocfAXSBMktyYyeS78I2NEoP%2F1%2BFZ6I8%2BsN3KoAQBM9EoubCYk2P%2B%2FCTOBwgFbG6cBs3I7CL%2Bc1ZRPdjSR80IYVTfOBrLMtIjFVKXbzCbVbY%2BSERIlzqmJcj80BN1WaCyDVLBkbegsNYxzvgATzfZDpuKXLtH1CqtzJ0MyPlQ7IC%2FsnANZ5MZW4JpAa86WfgsxJvFuux0Lha1hagdx58g8IdFd0Hdv5zmhpnv1aQ%3D%3D"
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
                src="https://storage.googleapis.com/vue-course-api.appspot.com/jiayu/1713337131786.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=h5qOn5xloWsqcyvUWeUtdqpls4PzVjYsoiPXr9b0YJzzRXkrfrEifKZUzIL2q%2FIw2dmnEQLyqmP6Xs4L9c6exyiH2N0fkuZlkvNDF7%2FJDujmpSVhzCQuXTTdSw5UN%2Fd0WTannl36FptwPfotqy9oXKvUCvxSJGHPGhV1ZIhnVznlHbqEDrrGU2qMc5ykCztD3Rnfbh%2FlfwluDzPM%2Fajos7rV59E3cjkDpHp3qkz%2BrXmdmoqRUTIZR2e8soedweMNVMDyMPW%2BT4pPZHf9Xh%2Bg0Ei%2FtDJ4Vbo%2B3SmisAIGFl8MtA%2BcgwcWVAZAAgf44bUVFgqHhQDRriDLtoMp5fCFVw%3D%3D"
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
                src="https://storage.googleapis.com/vue-course-api.appspot.com/jiayu/1713337131784.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=QT462OibVv3iH3ESqvqbN%2F7Z59mhRTultacAbJxt307TjmfIMYM%2BdYE0z7VRlmQH49GC%2FgNK8TGhIgqZ66T9Qwx6Avnh1Pvsn%2FouE%2BA9vWG6hZY4aRGdZN5GmjQWEJyI2JwxxbAsAHGdmbJzYVA9v88d4Jqirv4GgQb2m4rur6ak%2BNqkqFeJ%2B%2BBjP5dzwCxhNZ7qV93A%2BeaJsBKEY87FyOyfjIhTgp3sgEoPY5Uasyq8EBpaack23DgENs5hXv9wiCLKJQjPtV6BEMiNKBJuwccxzDy%2F6VKI%2FlX3Kx3osWe8MthBsyCFo3tCeVcezrqD7pdw9J7W6MEG3CHiBTTaXg%3D%3D"
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
      <div data-aos="fade-up" class="container pt-10 md:pt-20">
        <SectionTitle title="快閃優惠" />
        <div class="relative rounded">
          <picture>
            <source
              media="(min-width:768px)"
              srcset="
                https://storage.googleapis.com/vue-course-api.appspot.com/jiayu/1713285198077.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=lWOjPk%2B0S8DHi%2BrZeQKrUW5uS4r3RLtBqPh06Zw70bVWqAVqMbYUEoZCRbC6JwNJj%2FdCZ6s2fRw8hzx1tlBlYPTMEcVjVcaXyxHOzTDRgodyI5hZncDLJ3HNxowP5d3SBxSou2GR6nK7QQBzdj9xIyqz51eo9FjQuFaWDwPjsdc%2FWvtRLH3j6wn7JtGL0RwrNGdlKvuMyzymejnT1WcF3PutiBUkAfn61dankw9DybTlM8QfVR%2FifvH4Y2eWrzNnJARKnJ2Ktv6PGioOtejB98nyw6QT986phzgQpL5wmBpo66RUESH32Zab%2FP4h4nRGegrLo7W3SyhDAnagYu%2BLWw%3D%3D
              "
            />
            <img
              class="w-full object-cover"
              lazy="loading"
              src="https://storage.googleapis.com/vue-course-api.appspot.com/jiayu/1713335272912.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=m7lCjQVfyvMt0lTe3Q6HdQoTntbisp8HBx41%2FtaRt0ZLKpzoZXzMxT5ukHa4BarSrhII53X7iHnklQAk2KsxPka8KQSWte1suVn6GpzoM2MOGMZXsv74fD8n2iQF%2Fnt75SSs%2BFkGX9HXCYMTrJ6x2il6w%2FoaqlcBlyJJR6Gtqr7b09mx%2BUlnyUhakolsPsSTYsLjcSb0xNScrKx31DaXUbfrrmf4eVbe2KHwrT%2BpJKrkpBam5pDuNtAAvdbR6hDpVy%2BCUOh0xcvbUcQFNVqRVUSiWcOR4D8fGhjTCxu2UaPH9%2FC%2FrRpXdCIyXloynOGxxYvrLDvk9Dn%2B%2Bv%2FA8GW5GA%3D%3D"
              alt="產品圖"
            />
          </picture>
          <ProductSpot
            v-for="product in imageProductData"
            :key="product.id"
            :class="product.position"
            :product="product"
          >
          </ProductSpot>
        </div>
        <div
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
