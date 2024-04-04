<template>
  <template v-if="Object.keys(article).length">
    <div class="relative h-64 w-full md:h-96">
      <img class="h-full w-full object-cover" lazy="loading" :src="article.image" alt="文章圖" />
      <div class="absolute bottom-0 left-0 mb-8 flex w-full justify-center md:mb-12">
        <div class="bg-primary-800/60 p-4 font-bold text-primary-50">
          <p class="mb-2 md:text-lg">
            {{ timestampToDate(article.create_at) }}
          </p>
          <h2 class="text-xl md:text-4xl">{{ article.title }}</h2>
        </div>
      </div>
    </div>
    <div class="container py-10">
      <pre class="mx-auto mb-6 text-wrap md:w-1/2">{{ article.content }}</pre>
      <ul class="mx-auto mb-20 md:w-1/2">
        <li v-for="item in article.tag" :key="item" class="text-primary-700"># {{ item }}</li>
      </ul>
      <div class="flex justify-between md:text-lg">
        <!-- 上一篇 -->
        <RouterLink v-if="prevId" class="link" :to="`/article/${prevId}`"
          ><i class="bi bi-chevron-left me-1"></i>上一篇
        </RouterLink>
        <span v-else class="text-stone-500" :class="{ link: prevId }">
          <i class="bi bi-chevron-left me-1"></i>上一篇
        </span>
        <!-- 返回文章列表 -->
        <RouterLink class="link" to="/articles">返回文章列表</RouterLink>
        <!-- 下一篇 -->
        <RouterLink v-if="nextId" class="link" :to="`/article/${nextId}`"
          >下一篇<i class="bi bi-chevron-right ml-1"></i
        ></RouterLink>
        <span v-else class="text-stone-500" :class="{ link: nextId }">
          下一篇<i class="bi bi-chevron-right ml-1"></i>
        </span>
      </div>
    </div>
  </template>
</template>
<script>
import { mapActions, mapState } from 'pinia';
import loadingStore from '@/stores/loadingStore';
import helperStore from '@/stores/helperStore';
import articleStore from '@/stores/articleStore';
import swalStore from '@/stores/swalStore';

const { VITE_URL, VITE_PATH } = import.meta.env;
export default {
  data() {
    return {
      article: {},
      currentId: '',
      prevId: '',
      nextId: '',
    };
  },
  mounted() {
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
      window.scrollTo(0, 0);
      const promiseArray = [this.getSingleArticle(), this.getAllArticles()];
      const resArr = await Promise.allSettled(promiseArray);
      resArr.forEach((res) => {
        if (res.status === 'rejected') {
          this.hideLoading();
          this.$swal(res.response.data);
        }
      });
      // 取得上一篇和下一篇的 id
      this.getAdjacentArticleId();
      this.hideLoading();
    },
    async getSingleArticle() {
      try {
        this.currentId = this.$route.params.id;
        const url = `${VITE_URL}/api/${VITE_PATH}/article/${this.currentId}`;
        const res = await this.$http.get(url);
        this.article = res.data.article;
      } catch (error) {
        this.hideLoading();
        // 通知
        this.apiErrorSwal(error);
      }
    },
    getAdjacentArticleId() {
      const lastIndex = this.articles.length - 1;
      const index = this.articles.findIndex((item) => item.id === this.currentId);
      if (index !== 0) {
        this.prevId = this.articles[index - 1].id;
      }
      if (index !== lastIndex) {
        this.nextId = this.articles[index + 1].id;
      }
    },
    ...mapActions(loadingStore, ['showLoading', 'hideLoading']),
    ...mapActions(helperStore, ['timestampToDate']),
    ...mapActions(articleStore, ['getAllArticles']),
    ...mapActions(swalStore, ['apiErrorSwal']),
  },
  computed: {
    ...mapState(articleStore, ['articles']),
  },
};
</script>
